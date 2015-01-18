//User/Manage controller
module.exports = function(app,database,config){
	var common = require("../../Helpers/Common.js")();
	var path   = require('path');
	var shop_fields = {
		_id 	: "",
		title 	: "",
		points  : "",
		desc	: "",
		img		: "",
		state   : 0
	}
	return {
		List : function(req,res){
			//res.end("Welcome to easyparking!");
			var Db = database.connect();
			if(req.query.p == null || req.query.p <= 0){
				req.query.p = 1;
			}
			var start  = (req.query.p-1) * 1 * config.DataLimit;
			var result = Db.shop.find({state:{$lt:2}}).sort({_id:-1}).skip(start).limit(config.DataLimit)
			result.count(function(e,total){

				result.toArray(function(error,result){
					res.render("List",{data : result,pageNav : common.pageNav(total,req.query.p,config.DataLimit,req),req:req,res:res})
				})
			})

			
		},
		Add : function(req,res){
			res.render('Edit',{req:req,res:res,data:shop_fields,title:'添加商品'});
		},
		Edit : function(req,res){
			var Db = database.connect();
			Db.shop.findOne({_id:Db.ObjectId(req.query.id)},function(err,data){
				if(data != null){
					res.render('Edit',{req:req,res:res,data:data,title:'编辑商品'})
				}
			})
			
		},
		Save : function(req,res){
			var Db = database.connect();
			//console.log(req.files)
			var id = req.body.id || "",dataObject = {
				title : req.body.title,
				points : req.body.points,
				//img : req.files.image.name || "",
				desc : req.body.desc,
				state : req.body.state*1
			}
			if(typeof req.files.image != "undefined"){
				var im = require('imagemagick');
				dataObject.img =  req.files.image.name;
				dataObject.img_thumb = dataObject.img.replace(/(\.\w+)$/,'.thumb$1');
				var uploadDir = path.dirname(req.files.image.path)
				im.resize({
				  srcPath: req.files.image.path,
				  dstPath: uploadDir+'/'+dataObject.img_thumb,
				  width:   150
				}, function(err, stdout, stderr){
				  //if (err) throw err;
				  console.log(err);
				});
			}

			if(!id)
			{//add
				if(dataObject.title == null || dataObject.points == null){
					req.session.msgtype = 1;
					req.session.message = "商品添加失败!标题或积分不能为空"
					res.redirect("/Shop/Manage/Add");
				}
				else{
					Db.shop.save(dataObject,function(err,store){
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
			else{
				if(dataObject.title == null || dataObject.points == null){
					req.session.msgtype = 1;
					req.session.message = "商品添加失败!标题或积分不能为空"
					res.redirect("/Shop/Manage/Edit?id="+id);
				}
				else{
					Db.shop.update({_id:Db.ObjectId(id)},{
						$set : dataObject
					},function(err,store){
						if(!err && store!=null){
							req.session.msgtype = 3;
							req.session.message = "商品更新成功!";
						}
						else{
							req.session.msgtype = 1;
							req.session.message = "商品更新失败!("+err+")";
						}
						res.redirect("/Shop/Manage/List");
					})					
				}

			}

		},
		Delete : function(req,res){
			var Db = database.connect();
			if(req.query.id == null){
				req.session.msgtype = 1;
				req.session.message = "请指定商品id进行删除!";
				res.redirect("/Shop/Manage/List")
			}
			Db.shop.update({_id:Db.ObjectId(req.query.id)},{$set:{state:2}},function(err,status){
				if(!err){
					req.session.msgtype = 3;
					req.session.message = "商品删除成功!";
				}
				else{
					req.session.msgtype = 1;
					req.session.message = "商品删除失败!";
				}
				res.redirect("/Shop/Manage/List")
			})
		}
	}
}