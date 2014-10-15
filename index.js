var express = require("express");
var app     = express();
var bodyParser = require('body-parser')
var session = require('express-session');
var path = require('path');
app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: '60bzlr1t9servnd8r9rxawu25csz7r4c'
}));
app.use(function(req,res,next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
})


app.set('view engine', 'jade');
app.set('views', __dirname + '/Views');

app.get("/:module/:controller/:action",function(req,res){
	//res.end(req.params.module+"/"+req.params.controller+"/"+req.params.action)
	app.set('views', __dirname + '/Views/'+req.params.module+"/"+req.params.controller);
	var mvc = require("./Modules/"+req.params.module+"/"+req.params.controller)(app)
	mvc[req.params.action](req,res);
})
// app.get("/:module/:controller/:action/:params",function(req,res){
// 	res.end(req.params.module+"/"+req.params.controller+"/"+req.params.action)
// })
app.listen(9528,function(){
	console.log("site on 9528")
})