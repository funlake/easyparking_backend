//User/Manage controller
module.exports = function(app){
	return {
		'List' : function(req,res){
			//res.end("Welcome to easyparking!");
			res.render("List",{'lake':req.query.a})
		}
	}
}