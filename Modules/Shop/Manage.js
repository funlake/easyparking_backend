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
			var result = Db.shop.find({}).skip(start).limit(config.DataLimit)
			result.count(function(e,total){

				result.toArray(function(error,result){
					res.render("List",{data : result,pageNav : common.pageNav(total,req.query.p,config.DataLimit,req),req:req,res:res})
				})
			})

			
		},
		Add : function(req,res){
			res.render('Edit',{req:req,res:res});
		},
		Save : function(req,res){
			var Db = database.connect();
			console.log(req.files);
			Db.shop.save({
				title : req.body.title.trim(),
				points : req.body.points,
				img : '',
				desc : req.body.desc	,
				state : req.body.state
			},function(err,store){
				if(store != null){
					req.session.msgtype = 3;
					req.session.message = "商品添加成功!"
					res.redirect("/Shop/Manage/List");
				}
				else{
					req.session.msgtype = 1;
					req.session.message = "商品添加失败!";
					res.redirect("/Shop/Manage/Add");
				}
			})
		}
	}
}