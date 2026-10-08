(function(){
var c=document.getElementById('sf'),x=c.getContext('2d'),W=0,H=0,DPR=1,mx=0,sy=0,ST=[],sh=null,nx=2500,i;
function rs(){DPR=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;c.width=W*DPR;c.height=H*DPR;x.setTransform(DPR,0,0,DPR,0,0);}
var FS=[],FP=[],lastD=0,fi=false;
function fstar(s,far){s.x=Math.random()*3.2-1.6;s.y=Math.random()*3.2-1.6;s.z=far?1+Math.random()*.15:Math.random()*.98+.04;return s;}
function flight(D,wp){
  var dD=D-lastD,kf=H*.45,cx=W/2,cy=H/2,i,s,p;lastD=D;
  if(!fi){fi=true;FS=[];for(i=0;i<460;i++)FS.push(fstar({},false));
    FP=[{x:.55,y:-.22,z:1.5,R:.13,a:'#b9bac2',b:'#2b2c32',r:1},{x:-.7,y:.3,z:1.85,R:.17,a:'#aeb0b8',b:'#26272c',r:0},{x:.42,y:.48,z:2.1,R:.12,a:'#c0c1c8',b:'#2d2e34',r:1}];}
  for(i=0;i<FP.length;i++){p=FP[i];p.z-=dD;if(p.z<.09)continue;planet(cx+p.x/p.z*kf,cy+p.y/p.z*kf,p.R/p.z*kf,p.a,p.b,p.r);}
  for(i=0;i<FS.length;i++){s=FS[i];var z0=s.z;s.z-=dD;
    if(s.z<=.04){fstar(s,true);continue;}
    var x0=cx+s.x/z0*kf,y0=cy+s.y/z0*kf,x1=cx+s.x/s.z*kf,y1=cy+s.y/s.z*kf,al=Math.min(1,.2+(1-s.z)*.9),w=.6+(1-s.z)*1.8;
    x.strokeStyle='rgba(255,255,255,'+al.toFixed(2)+')';x.lineWidth=w;x.beginPath();x.moveTo(x0,y0);x.lineTo(x1,y1);x.stroke();
    if(Math.abs(x1-x0)+Math.abs(y1-y0)<1.5){x.fillStyle='rgba(255,255,255,'+al.toFixed(2)+')';x.fillRect(x1,y1,w,w);}}
}
rs();addEventListener('resize',rs);
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;});
addEventListener('scroll',function(){sy=scrollY;},{passive:true});
for(i=0;i<260;i++)ST.push({x:Math.random()*2400,y:Math.random()*1600,z:Math.random(),t:Math.random()*6.28,c:'255,255,255'});
var PS=[[.84,.25,.09,'#a8a9b0','#24252a',1],[.09,.9,.05,'#9d9ea6','#1f2024',0],[.8,1.5,.07,'#a2a3ab','#222328',1],[.12,2.1,.06,'#9fa0a8','#202125',0],[.78,2.7,.1,'#adaeb5','#26272c',1]];
function planet(px,py,r,a,b,ring){
  if(py<-r*3||py>H+r*3)return;
  function rg(front){x.save();x.translate(px,py);x.rotate(-.35);x.scale(1,.28);x.strokeStyle='rgba(207,208,213,.25)';x.lineWidth=r*.1;x.beginPath();if(front)x.arc(0,0,r*1.75,0,Math.PI);else x.arc(0,0,r*1.75,0,6.283);x.stroke();x.restore();}
  if(ring)rg(false);
  var g=x.createRadialGradient(px-r*.35,py-r*.35,r*.1,px,py,r);g.addColorStop(0,a);g.addColorStop(1,b);
  x.shadowColor=a;x.shadowBlur=r*.5;x.fillStyle=g;x.beginPath();x.arc(px,py,r,0,6.283);x.fill();x.shadowBlur=0;
  if(ring)rg(true);
}
function loop(t){
  x.clearRect(0,0,W,H);var wpp=window.WARP||0;if(wpp>.02){flight(window.FLYD||0,wpp);requestAnimationFrame(loop);return;}fi=false;var m=Math.min(W,H),k;
  for(k=0;k<PS.length;k++){var p=PS[k];planet(W*p[0]-mx*40*(k%2+1),H*p[1]-sy*.35,m*p[2],p[3],p[4],p[5]);}
  for(k=0;k<ST.length;k++){var s=ST[k],px=((s.x-mx*s.z*50)%W+W)%W,py=((s.y-sy*(.08+s.z*.45))%H+H)%H,al=.85*(.3+.55*(.5+.5*Math.sin(t/700+s.t))*(.4+s.z*.6)),z=.6+s.z*1.7;
    x.fillStyle='rgba('+s.c+','+al.toFixed(2)+')';x.fillRect(px,py,z,z);}
  if(t>nx&&!sh){sh={x:Math.random()*W,y:Math.random()*H*.4,l:0};nx=t+5000+Math.random()*5000;}
  if(sh){sh.l+=.025;var q=sh.l,sx=sh.x-q*420,sy2=sh.y+q*200,g=x.createLinearGradient(sx,sy2,sx+90,sy2-43);g.addColorStop(0,'rgba(255,255,255,'+(1-q).toFixed(2)+')');g.addColorStop(1,'rgba(255,255,255,0)');x.strokeStyle=g;x.lineWidth=1.5;x.beginPath();x.moveTo(sx,sy2);x.lineTo(sx+90,sy2-43);x.stroke();if(q>=1)sh=null;}
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();
