(function(){
	var oCanvas=document.querySelector('canvas');
	var ctx=oCanvas.getContext('2d');
	var amount=200;
	var dotArr=[];
	var range=50;
	var first=true;
	for(var i=0;i<amount;i++){
		dotArr.push({
			x:rnd(0,oCanvas.width),
			y:rnd(0,oCanvas.height),
			speedX:rndSing()*rnd(2,5)*0.1,
			speedY:rndSing()*rnd(2,5)*0.1,
			r:rnd(10,20)*0.1
		});
	}
	ctx.fillStyle='#8d8620';
	setInterval(function(){
		ctx.clearRect(0,0,oCanvas.width,oCanvas.height);
		dotArr.forEach(function(dot,index){
			ctx.beginPath();
			ctx.arc(dot.x,dot.y,dot.r,0,2*Math.PI,false);
			ctx.fill();
			dot.x+=dot.speedX;
			dot.y+=dot.speedY;
			if(dot.x<0||dot.x>oCanvas.width-dot.r){
				dot.speedX*=-1;
			}
			if(dot.y<0||dot.y>oCanvas.height-dot.r){
				dot.speedY*=-1;
			}
			for(let i=index+1;i<dotArr.length;i++){
				var distance=Math.sqrt(Math.pow(dot.x-dotArr[i].x,2)+Math.pow(dot.y-dotArr[i].y,2));
				if(distance<range){
					ctx.beginPath();
					ctx.moveTo(dot.x,dot.y);
					ctx.lineTo(dotArr[i].x,dotArr[i].y);
					ctx.strokeStyle=`rgba(141,134,32,${1-distance/range})`;
					ctx.stroke();
				}
			}
		})
	},16)
	oCanvas.onmousemove=function({clientX,clientY}){
		if(first){
			dotArr.unshift({
				x:clientX-oCanvas.offsetLeft,
				y:clientY-oCanvas.offsetTop,
				speedX:0,
				speedY:0,
				r:0.1
			})
			first=false;
		}
		dotArr[0].x=clientX-oCanvas.offsetLeft;
		dotArr[0].y=clientY-oCanvas.offsetTop;
	};
})()
