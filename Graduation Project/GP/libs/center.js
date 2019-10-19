const mongoose=require('mongoose')
mongoose.connect('mongodb://zjf:123456@ds028310.mlab.com:28310/travelmanage',{useNewUrlParser:true},function(err){
	if(err){
		console.log('Connect Error!')
	}else{
		console.log('Connect Success!')
	}
})
var db=mongoose.connection;
var CenterSchema=mongoose.Schema({
	posX:{
		type:Number
	},
	posY:{
		type:Number
	},
	posZ:{
		type:Number
	},
	kind:{
		type:Number
	}
})
var Center=module.exports=mongoose.model('centers',CenterSchema);
module.exports.findAll=function(callback){
	var query={};
	Center.find(query,callback)
}

module.exports.insertOne=function(data,callback){
	var query=data;
	Center.insertMany(query,callback)
}

module.exports.deleteAll=function(callback){
	var query={};
	Center.deleteMany(query,callback);
}

// module.exports.insertOne=function(data,callback){
// 	var query=data;
// 	Teacher.insertMany(query,callback);
// }

