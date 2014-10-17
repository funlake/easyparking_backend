define(["jquery"],function($){
	return {
		run : function(){
			var mca = location.pathname.split("/");
			if(mca.length >= 3){
				var m = mca[1],c = mca[2],a = mca[3];
				require(["./"+m+"/"+c],function(f){
					if(f != null){
						f[a]()
					}
				})
			}
			this.init();
		},
		init : function(){
			$(".modal-remove").click(function(){
				var ele = $(this);
				$('#modal-delete-cfm #modal-confirm-btn').attr('href',ele.attr('data-href'))
			})
		}
	}
})