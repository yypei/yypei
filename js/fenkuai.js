// JavaScript Document
(function(){
	/*分块运动*/
	(function(){
		var oDiv = document.getElementById("fkyd");
		var oExplode=document.getElementById('btn_explode');
		var oTile=document.getElementById('btn_tile');
		var oBars=document.getElementById('btn_bars');
		var oCube=document.getElementById('btn_cube');
		var oTurn=document.getElementById('btn_turn');
		var now=0;
		var ready=true;
		var W=450;
		var H=250;
		document.onmousedown=function (){
			return false;
		};
		function next(){
			return (now+1)%3;
		}
		function setStyle(obj, json){
			if(obj.length){
				for(var i=0;i<obj.length;i++){
					setStyle(obj[i], json);
				}
			}else{
				for(var i in json){
					obj.style[i]=json[i];
				}
			}
		}	
		//鐖嗙偢
		oExplode.onclick=function (){
        		if(!ready)return;
	        	ready=false;            
	        	var R=5;
	        	var C=9;            
	        	var cw=W/2;
	        	var ch=H/2;         
	        	oDiv.innerHTML='';
	        	oDiv.style.background='url(images/'+(next()+1)+'.jpg) center no-repeat';           
	        	var aData=[];           
	        	var wait=R*C;           
        		for(var i=0;i<R;i++){
            		for(var j=0,k=0;j<C;j++,k++){
                		aData[i]={left: W*j/C, top: H*i/R};
                		var oSpan=document.createElement('span');              
		                setStyle(oSpan, {
		                    position: 'absolute',
		                    background: 'url(images/'+(now+1)+'.jpg)'+-aData[i].left+'px '+-aData[i].top+'px no-repeat',
		                    width:Math.ceil(W/C)+'px', height: Math.ceil(H/R)+'px', left: aData[i].left+'px', top: aData[i].top+'px'
		                });                 
                		oDiv.appendChild(oSpan);                  
                		var l=((aData[i].left+W/(2*C))-cw)*rnd(2,3)+cw-W/(2*C);
                		var t=((aData[i].top+H/(2*R))-ch)*rnd(2,3)+ch-H/(2*R);               
                		setTimeout((function (oSpan,l,t){
                        		return function (){
                        		buffer(
                            		oSpan,
                           		{left: oSpan.offsetLeft, top: oSpan.offsetTop, opacity: 100, x:0,y:0,z:0,scale:1, a:0},
                            		{left: l, top: t, opacity: 0, x:rnd(-180, 180), y:rnd(-180, 180), z:rnd(-180, 180), scale:rnd(1.5, 3), a:1},
                            		function (now){
                                		this.style.left=now.left+'px';
                                		this.style.top=now.top+'px';
                                		this.style.opacity=now.opacity/100;
                                		setStyle3(oSpan, 'transform', 
                                		'perspective(500px) rotateX('+now.x+'deg) rotateY('+now.y+'deg) rotateZ('+now.z+'deg) scale('+now.scale+')')
                            		}, function (){
                                		setTimeout(function (){
                                    		oDiv.removeChild(oSpan);
                                	}, 200);
                                	if(--wait==0){
                                    		ready=true;
                                    		now=next();
                                	}
                           		}, 10);
                    			};
                		})(oSpan,l,t), rnd(0, 200));
            		}
        		}
    		};
		//缈昏浆		
		oTile.onclick=function (){
			if(!ready)return;
			ready=false;		
			var R=3;
			var C=6;		
			var wait=R*C;		
			var dw=Math.ceil(W/C);
			var dh=Math.ceil(H/R);		
			oDiv.style.background='none';
			oDiv.innerHTML='';		
			for(var i=0;i<C;i++){
				for(var j=0;j<R;j++){
					var oSpan=document.createElement('span');
					var t=Math.ceil(H*j/R);
					var l=Math.ceil(W*i/C);				
					setStyle(oSpan, {
						position: 'absolute', background: 'url(images/'+(now+1)+'.jpg) '+-l+'px '+-t+'px no-repeat',
						left: l+'px', top: t+'px', width: dw+'px', height: dh+'px'});				
						(function (oSpan, l, t){
							oSpan.ch=false;					
							setTimeout(function (){
								linear(oSpan, {y:0}, {y:180}, function (now){
									if(now.y>90 && !oSpan.ch){
										oSpan.ch=true;
										oSpan.style.background='url(images/'+(next()+1)+'.jpg) '+-l+'px '+-t+'px no-repeat';
									}							
									if(now.y>90){
										setStyle3(oSpan, 'transform', 'perspective(500px) rotateY('+now.y+'deg) scale(-1,1)');
									}
									else{
										setStyle3(oSpan, 'transform', 'perspective(500px) rotateY('+now.y+'deg)');
									}
								}, function (){
									if((--wait)==0){
										ready=true;
										now=next();
									}
								}, 22);
							}, (i+j)*200);
						})(oSpan, l, t);				
					oDiv.appendChild(oSpan);
				}/*for end*/
			}/*for end*/
		};		
		//鎵洸
		oBars.onclick=function (){
			if(!ready)return;
			ready=false;
			var C=7;			
			var wait=C;			
			var dw=Math.ceil(W/C);			
			oDiv.style.background='none';
			oDiv.innerHTML='';			
			for(var i=0;i<C;i++){
				var oP=document.createElement('p');				
				setStyle(oP, {width: dw+'px', height: '100%', position: 'absolute', left: W*i/C+'px', top: 0});
				setStyle3(oP, 'transformStyle', 'preserve-3d');
				setStyle3(oP, 'transform', 'perspective(1000px) rotateX(0deg)');				
				(function (oP,i){
					oP.style.zIndex=C/2-Math.abs(i-C/2);					
					setTimeout(function (){
						buffer(oP, {a:0, x:0}, {a:100, x:-90}, function (now){
							setStyle3(oP, 'transform', 
							'perspective(1000px) rotateY('+((3*(i-C/2))*(50-Math.abs(now.a-50))/50)+'deg) rotateX('+now.x+'deg)');
						}, function (){
							if(--wait==0){
								ready=true;
							}
							now=next();
						}, 8);
					}, (i+1)*130);
				})(oP,i);				
				oP.innerHTML='<span></span><span></span><span></span><span></span>';				
				var oNext=oP.getElementsByTagName('span')[0];
				var oNow=oP.getElementsByTagName('span')[1];
				var oBack=oP.getElementsByTagName('span')[2];
				var oBack2=oP.getElementsByTagName('span')[3];				
				setStyle([oNext, oNow, oBack, oBack2], {width: '100%', height: '100%', position: 'absolute', left: 0, top: 0});
				setStyle(oNext, {background: 'url(images/'+(next()+1)+'.jpg) '+-W*i/C+'px 0px no-repeat'});
				setStyle3(oNext, 'transform', 'scale3d(0.836,0.836,0.836) rotateX(90deg) translateZ('+H/2+'px)');				
				setStyle(oNow, {background: 'url(images/'+(now+1)+'.jpg) '+-W*i/C+'px 0px no-repeat'});
				setStyle3(oNow, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(0deg) translateZ('+H/2+'px)');				
				setStyle(oBack, {background: '#666'});
				setStyle3(oBack, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(0deg) translateZ(-'+H/2+'px)');				
				setStyle(oBack2, {background: '#666'});
				setStyle3(oBack2, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(90deg) translateZ(-'+H/2+'px)');				
				oDiv.appendChild(oP);
			}
		};		
		//绔嬫柟浣�
		oCube.onclick=function (){
			if(!ready)return;
			ready=false;			
			oDiv.innerHTML='';
			oDiv.style.background='none';			
			setStyle3(oDiv, 'transformStyle', 'preserve-3d');
			setStyle3(oDiv, 'transform', 'perspective(1000px) rotateY(0deg)');			
			var oNow=document.createElement('span');
			var oNext=document.createElement('span');			
			setStyle([oNow, oNext], {
				position: 'absolute',
				width: '100%', height: '100%', left: 0, top: 0
			});			
			setStyle3(oNow, 'transform', 'scale3d(0.741,0.741,0.741) rotate3d(0,1,0,0deg) translate3d(0,0,'+W/2+'px)');
			setStyle3(oNext, 'transform', 'scale3d(0.741,0.741,0.741) rotate3d(0,1,0,90deg) translate3d(0,0,'+W/2+'px)');			
			oDiv.appendChild(oNext);
			oDiv.appendChild(oNow);			
			oNow.style.background='url(images/'+(now+1)+'.jpg) center no-repeat';
			oNext.style.background='url(images/'+(next()+1)+'.jpg) center no-repeat';
			setTimeout(function (){
				flex(oDiv, {y:0}, {y:-90}, function (now){
					setStyle3(oDiv, 'transform', 'perspective(1000px) rotateY('+now.y+'deg)');
				}, function (){
					setStyle3(oDiv, 'transition', 'none');
					setStyle3(oDiv, 'transformStyle', 'flat');
					setStyle3(oDiv, 'transform', 'none');					
					oDiv.innerHTML='';
					oDiv.style.background='url(images/'+(next()+1)+'.jpg) center no-repeat';					
					now=next();					
					ready=true;
				}, 10, 0.6);
			},0);
		};		
		//缈婚〉
		oTurn.onclick=function (){
			if(!ready)return;
			ready=false;			
			oDiv.innerHTML='';
			oDiv.style.background='url(images/'+(next()+1)+'.jpg) center no-repeat';			
			var oSpan=document.createElement('span');			
			setStyle(oSpan, {	
				position: 'absolute', background: 'url(images/'+(now+1)+'.jpg) right no-repeat', zIndex: 3,
				left: '50%', top: 0, width: '50%', height: '100%', overflow: 'hidden'
			});
			setStyle3(oSpan, 'transform', 'perspective(1000px) rotateY(0deg)');
			setStyle3(oSpan, 'transformOrigin', 'left');			
			oDiv.appendChild(oSpan);		
			var oSpanOld=document.createElement('span');			
			setStyle(oSpanOld, {
				position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex:2,
				background: 'url(images/'+(now+1)+'.jpg) left no-repeat'
			});			
			oDiv.appendChild(oSpanOld);		
			var oDivShadow=document.createElement('div');			
			setStyle(oDivShadow, {
				position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex:2,
				background: 'rgba(0,0,0,1)'
			});			
			oDiv.appendChild(oDivShadow);			
			oSpan.ch=false;
			buffer(oSpan, {y:0, opacity: 1}, {y:-180, opacity: 0}, function (now){
				if(now.y<-90 && !oSpan.ch){
					oSpan.ch=true;
					oSpan.innerHTML='<img />';					
					var oImg=oSpan.getElementsByTagName('img')[0];					
					oImg.src='images/'+(next()+1)+'.jpg';
					setStyle3(oImg, 'transform', 'scaleX(-1)');					
					setStyle(oImg, {
						position: 'absolute', right: 0, top: 0, width: '200%', height: '100%'});					
					setStyle3(oSpan, 'transformOrigin', 'left');
				}				
				if(now.y<-90){
					setStyle3(oSpan, 'transform', 'perspective(1000px) scale(-1,1) rotateY('+(180-now.y)+'deg)');
				}else{
					setStyle3(oSpan, 'transform', 'perspective(1000px) rotateY('+now.y+'deg)');
				}
				oDivShadow.style.background='rgba(0,0,0,'+now.opacity+')';
			}, function (){
				now=next();
				ready=true;
			}, 14);
		};
		
		//视差
		var aLi=document.getElementsByTagName('li');

		var x=0;
		var y=0;
		
		document.onmousedown=function(ev){
		    var e=ev||event;
		    var disX= e.clientX-x;
		    var disY= e.clientY-y;
		
		    document.onmousemove=function(ev){
		        var e=ev||event;
		        x= e.clientX-disX;//doc不动，得到了坐标
		        y= e.clientY-disY;
		
		        for(var i=0;i<aLi.length;i++){
					            			aLi[i].style.marginLeft=(x*aLi[i].style.zIndex)/3+'px';
					            			aLi[i].style.marginTop=(y*aLi[i].style.zIndex)/3+'px';
		        }
		
		    };
		    document.onmouseup=function(){
		        document.onmousemove=document.onmouseup=null;
		    };
		    return false;
		};
	})();
	
});