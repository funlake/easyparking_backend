//User/Manage controller
module.exports = function(app,database){
	return {
		'List' : function(req,res){
			//res.end("Welcome to easyparking!");
			var Db = database.connect();
			Db.users.find({},function(error,result){
				res.render("List",{data : result})
			})
			
		}
	}
}