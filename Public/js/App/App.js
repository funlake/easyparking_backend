define(function(){
	return {
		run : function(){
			require(["./Home/Index"],function(C){
				C['Welcome']()
			})
		}
	}
})