const mongoose=require('mongoose')
mongoose.connect('mongodb://zjf:123456@ds028310.mlab.com:28310/travelmanage',{useNewUrlParser:true},function(err){
	if(err){
		console.log('Connect Error!')
	}else{
		console.log('Connect Success!')
	}
})
var db=mongoose.connection;
var RecommendSchema=mongoose.Schema({
	userid:{
		type:String
	},
	userName:{
		type:String
	},
	teacherid:{
		type:String
	},
	teacherName:{
		type:String
	},
	teacherScore:{
		type:Number
	},
	teacherTime:{
		type:Number
	},
	teacherSalary:{
		type:Number
	},
	date:{
		type:String
	},
	teacherName:{
		type:String
	},
	status:{
		type:Number
	}

})
var Recommend=module.exports=mongoose.model('recommends',RecommendSchema);
module.exports.findByUserId=function(id,callback){
	var query={userid:id};
	Recommend.find(query,callback)
}
module.exports.isExist=function(teacherid,date,callback){
	var query={teacherid:teacherid,date:date}
	Recommend.find(query,callback)
}
module.exports.insertOne=function(data,callback){
	var query=data
	Recommend.insertMany(data,callback)
}
module.exports.updateRecommend=function(id,change,callback){
	var query={_id:id}
	Recommend.updateOne(query,change,callback)
}
module.exports.deleteOne=function(id,callback){
	var query={_id:id};
	Recommend.remove(query,callback)
}
module.exports.findOne=function(id,callback){
	var query={_id:id}
	Recommend.find(query,callback)
}
// module.exports.deleteOne=function(id,callback){
// 	var query={_id:id};
// 	Teacher.remove(query,callback);
// }

// module.exports.updateTeacher=function(id,change,callback){
// 	var query={_id:id};
// 	Teacher.updateOne(query,change,callback)
// }

// module.exports.insertOne=function(data,callback){
// 	var query=data;
// 	Customer.insertMany(query,callback)
// }
// module.exports.findOne=function(username,callback){
// 	var query={username:username};
// 	Customer.find(query,callback);
// }
// module.exports.checkCustomer=function(cus,callback){
// 	var query={username:cus.username,password:cus.password}
// 	Customer.find(query,callback)
// }
// module.exports.findAll=function(callback){
// 	Customer.find({},callback)
// }