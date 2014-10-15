module.exports = function(app){
	return {
		'Welcome' : function(req,res){
			//res.end("Welcome to easyparking!");
			res.render("Welcome",{'lake':req.query.a})
		}
	}
}