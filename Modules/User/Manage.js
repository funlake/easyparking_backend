//User/Manage controller
module.exports = function(app,database,config){
	var common = require("../../Helpers/Common.js")();
	return {

		List : function(req,res){
			//res.end("Welcome to easyparking!");
			var Db = database.connect();
			if(req.query.p == null || req.query.p <= 0){
				req.query.p = 1;
			}
			var start  = (req.query.p-1) * 1 * config.DataLimit;
			var result = Db.users.find({state:{$ne:'removed'}}).skip(start).limit(config.DataLimit)
			result.count(function(e,total){
				result.toArray(function(error,docs){
					res.render("List",{data :docs,pageNav : common.pageNav(total,req.query.p,config.DataLimit,req),req:req,res:res})
				})
			})
			
		},
		Add : function(req,res){
			res.render("Edit",{req:req,res:res,title:'添加用户',data:{
				user : '',
				points : 0,
				city:'',
				phone:'',
				loc : {
					longitude : '',
					latitude : ''
				},
				_id : ''
			}})
		},
		Edit : function(req,res){
			var Db = database.connect();
			Db.users.findOne({_id:Db.ObjectId(req.query.id)},function(error,data){
				if(!error && data!=null){
					res.render("Edit",{req:req,res:res,title:'更新用户',data:data})
				}
			})
			
		},
		Delete : function(req,res){
			var Db = database.connect();
			if(req.query.id == null){
				req.session.msgtype = 1;
				req.session.message = "请指定用户id进行删除!";
				res.redirect("/User/Manage/List")
			}
			Db.users.update({_id:Db.ObjectId(req.query.id)},{$set:{state:'removed'}},function(err,store){
				if(!err){
					req.session.msgtype = 3;
					req.session.message = "用户删除成功!";
				}
				else{
					req.session.msgtype = 1;
					req.session.message = "用户删除失败!";
				}
				res.redirect("/User/Manage/List")
			})
		},
		Save : function(req,res){

		}
	}
}