define(function(){
	return {
		run : function(){
			var mca = location.pathname.split("/");
			if(mca.length >= 3){
				var m = mca[1],c = mca[2],a = mca[3];
				require(["./"+m+"/"+c],function(C){
					if(C != null){
						C[a]()
					}
				})
			}

		}
	}
})