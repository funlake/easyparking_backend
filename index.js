var express = require("express");
var app     = express();
var bodyParser = require('body-parser')
var session = require('express-session');
var path = require('path');
var database = require("./Helpers/Db.js")();
var config   = require("./config.js")()
app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.cookieParser());
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: '60bzlr1t9servnd8r9rxawu25csz7r4c'
}));
//check for error message
app.use(function(req,res,next){
  var msgtype = req.session.msgtype || 0;
  var msg = req.session.message;
  delete req.session.msgtype;
  delete req.session.message;
  res.locals.message = '';
  var cls = '';
  switch(msgtype){
    case 1:
      cls = 'danger'
    break;

    case 2 :
      cls = 'warning'
    break;

    case 3 :
      cls = 'success'
    break;
  }
  if (msgtype) res.locals.message = '<div class="alert alert-dismissable alert-'+cls+'">' + msg + '</div>';
  next();
})

app.set('view engine', 'jade');
app.set('views', __dirname + '/Views');

app.get("/:module/:controller/:action",function(req,res){
	//res.end(req.params.module+"/"+req.params.controller+"/"+req.params.action)
  beforeRequest(req,res);
	app.set('views', __dirname + '/Views/'+req.params.module+"/"+req.params.controller);
	var mvc = require("./Modules/"+req.params.module+"/"+req.params.controller)(app,database,config)
	mvc[req.params.action](req,res);
})
app.post("/:module/:controller/:action",function(req,res){
  //res.end(req.params.module+"/"+req.params.controller+"/"+req.params.action)
  beforeRequest(req,res);
  app.set('views', __dirname + '/Views/'+req.params.module+"/"+req.params.controller);
  var mvc = require("./Modules/"+req.params.module+"/"+req.params.controller)(app,database,config)
  mvc[req.params.action](req,res);
})
//check if logined
function beforeRequest(req,res){
  var page = req.params.module+"/"+req.params.controller+"/"+req.params.action;
  if(page == "User/Auth/Login"){
    if(req.session.logined != null){
      res.redirect("/User/Manage/List")
     // return;
    }
  }
  else{
    if( (page != "User/Auth/Verify") && (page != "User/Auth/Logout")){
      if(!req.session.logined){
        req.session.msgtype = 2;
        req.session.message = "请登录后进行操作!"
        res.redirect("/User/Auth/Login")
       // return;
      }
    }
  }
}
app.listen(9528,function(){
	console.log("site on 9528")
})