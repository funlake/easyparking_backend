define(['jquery'],function($){
	return {
		List : function(){
			//alert("i am list page")
		},
		Add : function(){
			//this.Edit()
		},
		Edit : function(){
			$(function(){
				var point = $('#gmap').attr("data-lng"),ll = point.split(","),lat = parseFloat(ll[0]),lng = parseFloat(ll[1])
				var mapObj = new AMap.Map("gmap",{
					rotateEnable:true,
					dragEnable:true,
					zoomEnable:true,
					//二维地图显示视口
					view: new AMap.View2D({
					    center:new AMap.LngLat(lng,lat),//地图中心点
					    zoom:13 //地图显示的缩放级别
					})
				});
				var marker = new AMap.Marker({
					position:mapObj.getCenter(),
					draggable:true, //点标记可拖拽
					cursor:'move',  //鼠标悬停点标记时的鼠标样式
					raiseOnDrag:true//鼠标拖拽点标记时开启点标记离开地图的效果

				});
				marker.setMap(mapObj);
			})
		}
	}
})