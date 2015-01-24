module.exports = function(){
	return {
		'pageNav' : function(total,curpage,rowPerPage,req){
			var pages = Math.ceil(total/rowPerPage);
			var qs = [];
			for(var o in req.query){
				if(o == 'p'){
					qs[qs.length] = 'p=%d'
				}
				else{
					qs[qs.length] = o+'='+req.query[o]
				}
			}
			var pq = qs.join('&');
			var html = '<ul class="pagination pull-right">' 	
			if(pages > 1){
				for(var i=0;i<pages;i++){
					var c=i+1,link = pq.replace('%d',c),cls = ''
					if(curpage == c){
						cls = 'active'
					}
					html += '<li class="'+cls+'"><a href="?'+link+'">' + c + '</a></li>'
				}
			}
			html+= '</ul>'
			return html;
		},
		'spotState' : function(state){
			var obj = {
				'normal' 	: '正常',
				'unverify'  : '未验证',
				'removed'	: '已删除'
			}
			return obj[state];
		}

	}
}