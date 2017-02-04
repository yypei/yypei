//作品
//苹果菜单
(function(){

	var aLi=$('.case').children;
	var aMenu=$('.menu').children;
	for(var i=0;i<aLi.length;i++){
		aMenu[i].index=i;
		aMenu[i].onclick=function(){
			for(var i=0;i<aLi.length;i++){
				aMenu[i].classList.remove('active');
				aLi[i].style.transition='0.5s';
				aLi[i].classList.remove('active');
			}
			this.classList.add('active');
			aLi[this.index].style.transition='0.5s 0.5s';
			aLi[this.index].classList.add('active');
		};
	}
	//导航栏
	var aDiv=$('.case li:nth-child(2) div');
	var oBg=$('.case li:nth-child(2) div')[4];
	for(var i=0;i<aDiv.length-1;i++){
		aDiv[i].onmouseenter=function(){
			toMove(oBg,this.offsetLeft)
		};
	}
	//照片墙
	var aList=$('.case li:nth-child(3) .box .list');
	aList.forEach(function(oList,index){
		oList.style.backgroundImage=`url(img/cat/${index+1}.jpg)`;
	})
	//3D
	
})()
huan()
function huan(){
	var oBox=$('.content .caseBox .case li:nth-child(4) .box');
	var amount=8;
	for(var i=0;i<amount;i++){
		var oDiv=document.createElement('div');
		oDiv.classList.add('block');
		oDiv.style.backgroundImage=`url(img/cat/${i+1}.jpg)`;
		oBox.appendChild(oDiv);
		var oShadow=document.createElement('div');
		oShadow.classList.add('shadow');
		oShadow.style.backgroundImage=`url(img/cat/${i+1}.jpg)`;
		oDiv.appendChild(oShadow);
	}
	var aDiv=oBox.querySelectorAll('.block');
	aDiv.forEach(function(oDiv,index){
		setTimeout(function(){
			oDiv.style.transition=`0.3s ${(amount-index)*0.5}s`;
			oDiv.style.transform=`rotateY(${360/amount*index}deg) translateZ(300px)`;
		})
	})
	aDiv[0].addEventListener('transitionend',function(){
		aDiv.forEach(function(oDiv,index){
			var Deg=index*360/amount;
			oDiv.style.transition=`0.3s`;
			oDiv.style.opacity=`${Math.abs(Deg-180)/180+0.2}`;
		})
	},false);
	var delX=0;
	var delY=75;
	var lastX=0;
	var lastY=0;
	var timer=null;
	oBox.onmousedown=function({clientX,clientY}){
		var disX=clientX-delX;
		var disY=clientY-delY;
		clearInterval(timer);
		var speedX=0;
		var speedY=0;
		document.onmousemove=function({clientX,clientY}){
			delX=clientX-disX;
			delY=clientY-disY;
			speedX=delX-lastX;
			speedY=delY-lastY;
			lastX=delX;
			lastY=delY;
			setPos();
		};
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;
			timer=setInterval(function(){
				speedX*=0.96;
				speedY*=0.96;
				delX+=speedX;
				delY+=speedY;
				setPos();
			},16);
		};
		return false;
	};
	function setPos(){
		aDiv.forEach(function(oDiv,index){
			var Deg=index*360/amount;
			oDiv.style.transition=``;
			oDiv.style.transform=`rotateY(${360/amount*index+delX}deg) translateZ(300px)`;
			oDiv.style.opacity=`${Math.abs(Math.abs(Deg+delX)%360-180)/180+0.2}`;
		})
		oBox.style.transform=`rotateX(${-0.2*delY}deg)`;
	}
}

cases();
function cases(){
	var oLi=$('.case li:nth-child(1)');
	var aImg=$('.case li:nth-child(1) img');
	oLi.onmousemove=function(ev){
		var {clientX,clientY}=ev;
		aImg.forEach(function(oImg,index){
			var a=getPos(oImg).left+oImg.offsetWidth/2-clientX;
			var b=getPos(oImg).top-getPos($('.case li:nth-child(1)')).top+oImg.offsetHeight/2-clientY;
			var c=Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
			var scale=1-c/500;
			scale<0.5&&(scale=0.5);
			oImg.style.width=scale*160+'px';
		})
	};
}
function toMove(obj,iTarget){
	var speed=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		speed*=0.8;
		speed+=(iTarget-obj.offsetLeft)/10;
		obj.style.left=obj.offsetLeft+speed+'px';
		if(obj.offsetLeft==iTarget&&Math.abs(speed)<1){
			clearInterval(obj.timer);
		}
	},16)
}
