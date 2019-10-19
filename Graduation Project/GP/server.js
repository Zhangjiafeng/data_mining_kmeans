const express=require('express');
const static=require('express-static');
const bodyParser=require('body-parser');
const multer=require('multer');
const multerObj=multer({dest:'./static/upload'});
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const expressRoute=require('express-route');
const Customer=require('./libs/customer.js');
const Recommend=require('./libs/recommend.js');
const Teacher=require('./libs/teacher.js');
const common=require('./libs/common.js');
const Center=require('./libs/center.js');

var server=express();
server.listen(8080);

//获取请求数据
server.use(bodyParser.urlencoded({extended:false}));
server.use(multerObj.any());

//cookie session
var keys=[];
for(var i=0;i<100000;i++){
	keys[i]='a_'+Math.random();
}
server.use(cookieParser());
server.use(cookieSession({
	name:'sess_id',
	keys:keys,
	maxAge:20*60*1000
}));

server.use('/check',(req,res)=>{
	var file_path1='./static/userPic/pic'+req.query.picName+'.jpg';
	var bData=fs.readFileSync(file_path1);
	var base64Str=bData.toString('base64');
	var datauri = 'data:image/png;base64,' + base64Str;
	res.send(datauri).end();
})
//route
server.use('/customer/',require('./route/customer.js')());

server.use('/recommendTeacher',(req,res)=>{
    var post=''
    req.on('data',function(chunk){
        post+=chunk
    })
    req.on('end',function(){
        post=JSON.parse(post);
      //  console.log(post);
        Recommend.findByUserId(post.id,function(err,recommends){
            if(err){
                res.send('数据库错误')
            }else{
                var kind=-1;
                if(recommends.length<3){
                    kind=Math.floor(Math.random()*6);
                    // console.log('没有记录')
                      Teacher.findByKind(kind,function(err,teachers){
                       if(err){
                            console.log('database error')
                        }else{
                            res.send(teachers).end();
                        }
                    })
                }else{
                   // res.send('还没写...')
                   var salary=0,time=0,score=0;
                   for(let i=0;i<recommends.length;i++){
                    salary+=recommends[i].teacherSalary;
                    time+=recommends[i].teacherTime;
                    score+=recommends[i].teacherScore;
                   }
                   salary=salary/recommends.length;
                   time=time/recommends.length;
                   score=score/recommends.length;
                   console.log(salary+','+time+','+score);
                   Center.findAll(function(err,centers){
                    if(err){
                        console.log(err);
                    }else{
                        var min=10000000000;
                        var temp=-1;
                        for(let j=0;j<centers.length;j++){
                            var distance=Math.pow((Math.pow((score-centers[j].posX),2)+Math.pow((salary-centers[j].posY),2)+Math.pow((time-centers[j].posZ),2)),1/3);
                            if(min>distance){
                                min=distance;
                                temp=j;
                            }
                        }
                        kind=temp;
                        console.log(kind);
                          Teacher.findByKind(kind,function(err,teachers){
                           if(err){
                                console.log('database error')
                            }else{
                                res.send(teachers).end();
                            }
                        })
                    }
                   })
                }
              
            }
        })
    })
})

server.use('/getOrderList',(req,res)=>{
    var post='';
    req.on('data',function(chunk){
        post+=chunk;
    })
    req.on('end',function(){
        post=JSON.parse(post)

        Recommend.findByUserId(post.id,function(err,recs){
            if(err){
                console.log(err);
            }else{
                console.log(recs);
                res.send(recs);
            }
        })
    })
})

server.use('/getCusById',(req,res)=>{
    var post=''
    req.on('data',function(chunk){
        post+=chunk;
    })
    req.on('end',function(){
        post=JSON.parse(post)
        console.log(post)
        Teacher.findTeacher(post.id,function(err,tea){
            if(err){
                console.log('database error')
                res.send('database error')
            }else{

                res.send(tea)
            }
        })
    })
})

server.use('/cusLogin',(req,res)=>{
    var post='';
    req.on('data',function(chunk){
        post+=chunk;
    });
    req.on('end',function(){
        post=JSON.parse(post);
        Customer.checkCustomer(post,function(err,cus){
            if(err){
                res.send('')
            }else{
                if(cus.length==0){
                    res.send('')
                }else{
                    res.send(cus)
                }
            }
        })
     
    })
})

server.use('/cusSubscribe',(req,res)=>{
    var post='';
    req.on('data',function(chunk){
        post+=chunk;
    })
    req.on('end',function(){
        post=JSON.parse(post)
        console.log(post);
        Recommend.isExist(post.teacherid,post.date,function(err,recommends){
            if(err){
                console.log('database error...')
                res.send('数据库错误')
            }else{
                if(recommends.length==0){
                    Teacher.findTeacher(post.teacherid,function(err,t){
                        if(err){
                            console(err)
                        }else{
                            post.teacherScore=t.evaluation;
                            post.teacherTime=t.times;
                            post.teacherSalary=t.salary;
                            post.status=0;
                            Recommend.insertOne(post,function(err){
                                if(err){
                                    console.log('database error...')
                                }else{
                                    res.send('预约成功！')
                                }
                            })
                        }
                    })
                    
                }else{
                    res.send('该老师今天已经有约！')
                }
            }
        })
        
       // res.send('get info')
    })
})

server.use('/confirmOrder',(req,res)=>{
    var post='';
    req.on('data',function(chunk){
        post+=chunk;
    })
    req.on('end',function(){
        post=JSON.parse(post);
        Recommend.updateRecommend(post.id,{$set:{
            status:1
        }},function(err){
            if(err){
                console.log(err);
                res.send('0')
            }else{
                Recommend.findOne(post.id,function(err,recs){
                    if(err){
                        console.log('error')
                    }else{
                      //  console.log(recs[0].teacherid);
                        Teacher.findTeacher(recs[0].teacherid,function(err,teacher){
                            if(err){
                                console.log(err)
                            }else{
                                 var time=teacher.times+1;
                                 console.log(teacher)
                                 var score=(teacher.evaluation*teacher.times+post.score)/time
                                 score=score.toFixed(2);
                                 console.log(score)
                                 Teacher.updateTeacher(recs[0].teacherid,{$set:{
                                    times:time,
                                    evaluation:score
                                }},function(err){
                                    if(err){
                                        res.send('0')
                                    }else{
                                      res.send('ggggggggggggggggggggggggg');  
                                    }
                                })
                            }
                        })
                    }
                })  
            }
        })
    })
})

server.use('/cancelOrder',(req,res)=>{
    var post='';
    req.on('data',function(chunk){
        post+=chunk;
    })
    req.on('end',function(){
        post=JSON.parse(post);
        Recommend.deleteOne(post.id,function(err){
            if(err){
                console.log(err);
                res.send('0')
            }else{
                res.send('1');
            }
        })
    })
})

server.use('/cusRegister',(req,res)=>{
    var post='';
    req.on('data',function(chunk){
        post+=chunk;
    });
    req.on('end',function(){
        post=JSON.parse(post);
        post.violation=0;
        post.reservation=0;
       // console.log(post);
       Customer.findOne(post.username,function(err,cus){
        if(err){
            res.send('数据库错误');
        }else{
            if(cus.length!=0){
                res.send('该用户名已存在')
            }else{
                Customer.insertOne(post,function(err){
                    if(err){
                        console.log('database error...')
                        res.send('数据库错误')
                    }else{
                        res.send('注册成功')
                    }
                   })
                }
            }
       })
    })
})

var timeOut=2*60*60*1000;

server.use('/refreshKind',(req,res)=>{
    Teacher.findAll(function(err,teachers){
        if(err){
            console.log('error...')
        }else{
            console.log('refresh success...')
            common.kmeansInit(teachers)
            var result=common.kmeansInit(teachers);
            console.log("result="+result)
            while(!result){
                result=common.kmeansInit(teachers);
            }
          	res.send('refresh success...');
        }
    })
})

var timer=setInterval(function(){
    Teacher.findAll(function(err,teachers){
        if(err){
            console.log('error...')
        }else{
            console.log('refresh success...')
            common.kmeansInit(teachers)
            var result=common.kmeansInit(teachers);
            console.log("result="+result)
            while(!result){
                result=common.kmeansInit(teachers);
            }
        }
    })
},timeOut)


server.use(static('./static'));