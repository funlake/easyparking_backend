//User/Manage controller
module.exports = function(app,database,config){
	var common = require("../../Helpers/Common.js")();
	return {
		Login : function(req,res){
			res.render("Login",{req:req,res:res})
		},
		Verify : function(req,res){
			if(req.body.user != "admin" || req.body.pass != "@lai@2014#%"){
				req.session.msgtype 	= 1;
				req.session.message = "错误的用户名密码!"
				res.redirect('/User/Auth/Login')
			}
			else{
				req.session.logined = true;
				res.redirect('/User/Manage/List')
			}
		},
		Logout : function(req,res){
			delete req.session.logined;
			res.redirect('/User/Auth/Login')
		}
	}
}