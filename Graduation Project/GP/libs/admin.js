var mongoose = require('mongoose');

mongoose.connect('mongodb://zjf:123456@ds028310.mlab.com:28310/travelmanage',{useNewUrlParser: true},function(err){
	if(err){
		console.log('Connect Error:'+err)
	}else{
		console.log('Connect Success!')
	}
});
var db = mongoose.connection;
var UserSchema = mongoose.Schema({
	username:{
		type:String
	},
	password:{
		type:String
	}
});

var Admin = module.exports = mongoose.model('admins',UserSchema);
module.exports.checkUser=function(username,password,callback){
	var query={username:username,password:password};
	Admin.findOne(query,callback)
}
