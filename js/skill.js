(function(){
		 var oUllago = document.getElementById("ulJnyl");
		  var aLilago = oUllago.children;
		  
		  for(var i = 0; i < aLilago.length; i++){
			  
			  lagou(aLilago[i]);
			  
		  }
		  function getDir(obj1,oEvent){
			  var x = oEvent.clientX - (getPos(obj1).left + obj1.offsetWidth/2);
			  var y = getPos(obj1).top + obj1.offsetHeight/2 - oEvent.clientY;
			  
			  // 0左 1下 2右 3 上
			  return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
		  }
		  
		  
		  function lagou(obj){
		  
			  obj.onmouseover= function(ev){
				  var oEvent = ev || event;
				  
				  var oFrom = oEvent.fromElement || oEvent.relatedTarget;
				  
				  if(obj.contains(oFrom)){
					  return;
				  }
				  
				  var oSpan = obj.getElementsByTagName("span")[0];
				  var n = getDir(obj,oEvent);
			  
				  switch(n){
					  case 0:
					  
					  oSpan.style.left = "-200px";
					  oSpan.style.top = "0";
					   
					  break;
					  case 1:
					  oSpan.style.left = "0";
					  oSpan.style.top = "250px";
					  break;
					  case 2:
					  oSpan.style.left = "200px";
					  oSpan.style.top = "0"; 
					  break;
					  case 3:
					  oSpan.style.left = "0";
					  oSpan.style.top = "-250px";
					  break;
					  
				  } 
				  
				  move(oSpan,{left:0,top:0});
				  
			  };
			  
			  obj.onmouseout = function(ev){
				  var oEvent = ev || event;
			  
				  var oTo = oEvent.toElement || oEvent.relatedTarget;
				  
				  if(obj.contains(oTo)){
					  return;
				  }
		  
				  var oSpan =obj.getElementsByTagName("span")[0];
				  var n = getDir(obj,oEvent);
				  
				  switch(n){
					  case 0:
					  move(oSpan,{left:-200,top:0});
					  break;
					  case 1:
					  move(oSpan,{left:0,top:250});
					  break;
					  case 2:
					  move(oSpan,{left:200,top:0});
					  break;
					  case 3:
					  move(oSpan,{left:0,top:-250});
					  break;
					  
				  } 
			  };
		  };	
	})();