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
			var result = Db.users.find({}).skip(start).limit(config.DataLimit)
			result.count(function(e,total){
				result.toArray(function(error,docs){
					res.render("List",{data :docs,pageNav : common.pageNav(total,req.query.p,config.DataLimit,req),req:req,res:res})
				})
			})

			
		}
	}
}