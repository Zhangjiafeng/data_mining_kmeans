const express=require('express');
const common=require('../libs/common');
const mysql=require('mysql');
const fs=require('fs');
const Admin=require('../libs/admin.js');
const Teacher=require('../libs/teacher.js')
const Center=require('../libs/teacher.js');
const Customer=require('../libs/customer.js')
var db=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'046337',
	database:'financemanage'
})

module.exports=function(){
	var router=express.Router();
	router.use((req,res,next)=>{
		if(!req.session['user_id']&&req.url!='/login'){
			res.redirect('/customer/login');
		}else{
			next();
		}
	})

	router.get('/login',(req,res)=>{
		common.loadHtml(req.url,res);
		//console.log(req);
	})

	router.post('/login',(req,res)=>{
		var username=req.body.username;
		var password=req.body.password;
		Admin.checkUser(username,password,function(err,admin){
			if(err){
				res.send('username is not correct').end();
			}else{
				if(!admin){
					res.send('password is not correct').end();
				}else{
					req.session['user_id']=username;
					res.write('true');
					res.end();
				}
			}
		})

	})

	router.use('/index',(req,res)=>{
		 common.loadHtml('/index',res);
	})

	router.use('/refreshKind',(req,res)=>{
		Teacher.findAll(function(err,teachers){
			if(err){
				res.status(500).send("database error!");
			}else{
				common.kmeans(teachers)
				res.send('1')
			}
		})
	})

	router.use('/initKind',(req,res)=>{
		Teacher.findAll(function(err,teachers){
			if(err){
				res.status(500).send('database error!');
			}else{
				common.kmeansInit(teachers);
				res.send('hamapi')
			}
		})
	})

	router.use('/account',(req,res)=>{
		var file_name='./static/account.txt';
		fs.readFile(file_name,(err,data)=>{
			if(err){
				res.write('404');
			}else{
				res.write(data);
			}
			res.end();
		})
	})

	router.use('/add',(req,res)=>{
	  //  console.log(req.body['persons[0][name]']);
	  console.log("insert...")
	    for(let i=0;i<106;i++){
	    	var data={};
	    	var str='persons['+i+']';
	    	data.name=req.body[str+'[name]'];
	    	data.sex=req.body[str+'[sex]'];
	    	data.tel=req.body[str+'[tel]'];
	    	data.address=req.body[str+'[address]'];
	    	data.creditCard=req.body[str+'[creditCard]'];
	    	data.evaluation=req.body[str+'[evaluation]'];
	    	data.salary=req.body[str+'[salary]'];
	    	data.times=req.body[str+'[times]'];
	    	data.kind=-1;
	   		// Teacher.insertOne(data,function(err){
	   		// 	if(err){
	   		// 		console.log('error...')
	   		// 	}else{
	   		// 		console.log('success...')
	   		// 	}
	   		// })
	    }
	})

	router.use('/addTeacher',(req,res)=>{
		// console.log(req.body);
		var data={};
		data.name=req.body.name;
		data.sex=req.body.sex;
		data.tel=req.body.tel;
		data.address=req.body.address;
		data.creditCard=req.body.credit;
		data.evaluation=7.5;
		data.salary=req.body.salary;
		data.times=0;
		data.kind=-1;

		Teacher.insertOne(data,function(err){
			if(err){
				console('insert teacher failed');
				res.send("0").end();
			}else{
				console.log('insert teacher success')
				res.send("1").end();
			}
		})
	})

	router.use('/delTeacher',(req,res)=>{
		// console.log(req.body)
		Teacher.deleteOne(req.body.id,function(err){
			if(err){
				res.status(500).send('database error').end();
			}else{
				res.send('success').end();
			}
		})
	})

	router.use('/getModTeacher',(req,res)=>{
		Teacher.findTeacher(req.body.id,function(err,teacher){
			if(err){
				console.log('some thing error');
				res.send('database error...').end();
			}else{
				res.send(teacher).end();
			}
		})
	})

	router.use('/modTeacher',(req,res)=>{
		console.log(req.body.id);
		Teacher.updateTeacher(req.body.id,{$set:{
			name:req.body.name,
			sex:req.body.sex,
			address:req.body.address,
			tel:req.body.tel,
			salary:parseFloat(req.body.salary),
			creditCard:req.body.credit
		}},function(err){
			if(err){
				console.log('failed')
				res.status(500).send("database error!")
			}else{
				res.send('1').end();
				console.log('update success...')
			}
		})
	})

	router.use('/getTeachers',(req,res)=>{
		//console.log("find teachers...")
		Teacher.findAll(function(err,teachers){
			//console.log(teachers);
			if(err){
				res.status(500).send("database error!");
			}else{
				res.send(teachers);
			}
		})
	})

	router.use('/getCustomers',(req,res)=>{
		Customer.findAll(function(err,customers){
			if(err){
				res.status(500).send('database error!')
			}else{
				res.send(customers);
			}
		})
	})
	return router;
}
