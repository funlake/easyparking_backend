module.exports = function(){
	var db = null;
	return {
		connect : function(){
			if(!db){
				db = require("mongojs").connect("easyparking", ["users","spot","apply","comment","shop","user_exchange"]);
				db.runCommand({ping:1}, function(err, res) {
				    if(!err && res.ok){
				    	console.log("Mongodb is ready\n");
				    }
				    else{
				    	console.log("[Error] could not connect to Mongodb\n");
				    }
				});
			}
			return db;
		}
	}

}