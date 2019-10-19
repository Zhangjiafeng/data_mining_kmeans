const mongoose=require('mongoose')
mongoose.connect('mongodb://zjf:123456@ds028310.mlab.com:28310/travelmanage',{useNewUrlParser:true},function(err){
	if(err){
		console.log('Connect Error!')
	}else{
		console.log('Connect Success!')
	}
})
var db=mongoose.connection;
var TeacherSchema=mongoose.Schema({
	name:{
		type:String
	},
	sex:{
		type:String
	},
	tel:{
		type:String
	},
	address:{
		type:String
	},
	creditCard:{
		type:String
	},
	evaluation:{
		type:Number
	},
	salary:{
		type:Number
	},
	times:{
		type:Number
	},
	kind:{
		type:Number
	}
})
var Teacher=module.exports=mongoose.model('teachers',TeacherSchema);
module.exports.findAll=function(callback){
	var query={};
	Teacher.find(query,callback)
}

module.exports.insertOne=function(data,callback){
	var query=data;
	Teacher.insertMany(query,callback);
}

module.exports.deleteOne=function(id,callback){
	var query={_id:id};
	Teacher.remove(query,callback);
}

module.exports.findTeacher=function(id,callback){
	var query={_id:id};
	Teacher.findOne(query,callback);
}

module.exports.updateTeacher=function(id,change,callback){
	var query={_id:id};
	Teacher.updateOne(query,change,callback)
}

module.exports.findByKind=function(kind,callback){
	var query={kind:kind};
	Teacher.find(query,callback);
}
module.exports.updateTimes=function(id,change,callback){
	var query={_id:id}
	Teacher.updateOne(query,change,callback)
}

// module.exports.updateOne=function(id,change,callback){
//   var query={_id:id};
//   UserActi.update(query,change,callback);
// }

