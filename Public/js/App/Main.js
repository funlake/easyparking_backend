require.config({
      catchError : true,
      urlArgs:"bust="+(+(new Date())),
      paths : {
        'jquery' : "../Lib/jquery",
        'bootstrap' : '../Lib/bootstrap.min'
      }
	//depends config
    ,shim : {
      'bootstrap' : ['jquery'],
      'App' : ['bootstrap']
    }
    ,waitSeconds: 15
});

require(['App'],function(app){
	app.run();
});