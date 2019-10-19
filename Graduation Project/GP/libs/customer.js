const mongoose=require('mongoose')
mongoose.connect('mongodb://zjf:123456@ds028310.mlab.com:28310/travelmanage',{useNewUrlParser:true},function(err){
	if(err){
		console.log('Connect Error!')
	}else{
		console.log('Connect Success!')
	}
})
var db=mongoose.connection;
var CustomerSchema=mongoose.Schema({
	username:{
		type:String
	},
	name:{
		type:String
	},
	password:{
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
	email:{
		type:String
	},
	violation:{
		type:Number
	},
	reservation:{
		type:Number
	}
})
var Customer=module.exports=mongoose.model('customers',CustomerSchema);
module.exports.insertOne=function(data,callback){
	var query=data;
	Customer.insertMany(query,callback)
}
module.exports.findOne=function(username,callback){
	var query={username:username};
	Customer.find(query,callback);
}
module.exports.checkCustomer=function(cus,callback){
	var query={username:cus.username,password:cus.password}
	Customer.find(query,callback)
}
module.exports.findAll=function(callback){
	Customer.find({},callback)
}
module.exports.findById=function(id,callback){
	var query={_id:id};
	Customer.find(query,callback)
}