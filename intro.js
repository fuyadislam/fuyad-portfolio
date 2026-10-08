(function(){
var d=document,R=matchMedia('(prefers-reduced-motion:reduce)').matches,h1=d.querySelector('#hero h1');
if(!h1)return;
var pc=d.getElementById('pc'),cx=pc.getContext('2d'),W=0,H=0,DPR=1,L=[],F='',S=80,started=false,grav=false,px=-999,py=-999,down=false,sy=0;
function rs(){DPR=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;pc.width=W*DPR;pc.height=H*DPR;cx.setTransform(DPR,0,0,DPR,0,0);}
function measure(){
  var cs=getComputedStyle(h1),node=h1.firstChild,txt=h1.textContent,idx=0;
  F=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;S=parseFloat(cs.fontSize);
  for(var i=0;i<txt.length;i++){var ch=txt.charAt(i);if(ch===' ')continue;
    var r=d.createRange();r.setStart(node,i);r.setEnd(node,i+1);var b=r.getBoundingClientRect();
    var l=L[idx];if(!l)l=L[idx]={ch:ch,x:W/2,y:H*.35,vx:0,vy:0,a:0,av:0};
    l.ch=ch;l.hx=b.left+b.width/2;l.hy=b.top+b.height/2+scrollY;l.w=b.width;idx++;}
}
addEventListener('resize',function(){rs();if(started)measure();});
addEventListener('pointermove',function(e){px=e.clientX;py=e.clientY;});
addEventListener('pointerdown',function(e){down=true;px=e.clientX;py=e.clientY;});
addEventListener('pointerup',function(){down=false;});
addEventListener('pointercancel',function(){down=false;});
var ph=d.getElementById('ph');
addEventListener('scroll',function(){sy=scrollY;ph.classList.toggle('on',started&&sy<H*.5);},{passive:true});
var gb=d.getElementById('gb');
function toggleG(){grav=!grav;gb.textContent=grav?'put them back (G)':'drop letters (G)';if(grav)L.forEach(function(l){l.vx+=(Math.random()-.5)*500;l.vy-=Math.random()*300;});}
gb.onclick=toggleG;
addEventListener('keydown',function(e){if(started&&(e.key==='g'||e.key==='G'))toggleG();});
function bang(){measure();fa=0;L.forEach(function(l){l.x=l.hx;l.y=l.hy;l.vx=0;l.vy=0;l.a=0;l.av=0;});}
function step(dt){
  var fl=H*.97,pyp=py+sy,hero=sy<H*.9,i,j,l;
  for(i=0;i<L.length;i++){l=L[i];var ax=0,ay=0;
    if(!grav){ax=(l.hx-l.x)*26-l.vx*6;ay=(l.hy-l.y)*26-l.vy*6;}else{ay=1900;ax=-l.vx*.35;}
    if(hero&&px>-900){var dx=l.x-px,dy=l.y-pyp,dd=Math.sqrt(dx*dx+dy*dy)||1,Rr=S*(down?2.2:1.2);
      if(dd<Rr){var t=1-dd/Rr,f=t*t*16000;
        if(down){ax+=-dx/dd*f*.75+(-dy/dd)*f*.5;ay+=-dy/dd*f*.75+(dx/dd)*f*.5;}else{ax+=dx/dd*f;ay+=dy/dd*f;}}}
    l.vx+=ax*dt;l.vy+=ay*dt;
    var sp=Math.sqrt(l.vx*l.vx+l.vy*l.vy);if(sp>2400){l.vx*=2400/sp;l.vy*=2400/sp;}
    l.x+=l.vx*dt;l.y+=l.vy*dt;
    l.av+=(-l.a*16-l.av*3)*dt+ax*.00002;l.a+=l.av*dt;
    if(grav){var r=S*.36;
      if(l.y>fl-r){l.y=fl-r;l.vy*=-.5;l.vx*=.93;l.av+=l.vx*.002;if(Math.abs(l.vy)<45)l.vy=0;}
      if(l.x<l.w*.5){l.x=l.w*.5;l.vx*=-.5;}if(l.x>W-l.w*.5){l.x=W-l.w*.5;l.vx*=-.5;}}
  }
  if(grav){var rr=S*.36;for(i=0;i<L.length;i++)for(j=i+1;j<L.length;j++){var a=L[i],b=L[j],ex=b.x-a.x,ey=b.y-a.y,e=Math.sqrt(ex*ex+ey*ey)||1;
    if(e<rr*2){var o=(rr*2-e)/2,nx=ex/e,ny=ey/e;a.x-=nx*o;a.y-=ny*o;b.x+=nx*o;b.y+=ny*o;
      var vn=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;if(vn<0){var im=-(1.4)*vn/2;a.vx-=im*nx;a.vy-=im*ny;b.vx+=im*nx;b.vy+=im*ny;}}}}
}
var last=0,fa=0;
function loop(t){
  var dt=Math.min((t-last)/1000||.016,.033);last=t;
  cx.clearRect(0,0,W,H);
  if(started){fa=Math.min(1,fa+dt*1.1);step(dt);var al=Math.max(0,Math.min(1,1-sy/(H*.9)))*fa;
    if(al>0){cx.font=F;cx.textAlign='center';cx.textBaseline='middle';
      L.forEach(function(l){var y=l.y-sy;if(y<-S||y>H+S)return;cx.save();cx.globalAlpha=al;cx.translate(l.x,y);cx.rotate(l.a);cx.fillStyle='#e6e7ea';cx.shadowColor='rgba(255,255,255,.2)';cx.shadowBlur=12;cx.fillText(l.ch,0,0);cx.restore();});}}
  requestAnimationFrame(loop);
}
var bt=d.getElementById('bt'),st=d.getElementById('st'),boot=d.getElementById('boot'),fl=d.getElementById('fl'),begun=false;
var skip=false,bd=d.querySelector('.term .bd'),fast=function(){return R||skip;};
window.ZF=14;window.WARP=0;window.FLYD=0;
function say(txt,ms,pause,cls){var sp=d.createElement('span');if(cls)sp.className=cls;bt.appendChild(sp);return new Promise(function(r){var i=0;(function n(){if(i<txt.length){sp.textContent+=txt.charAt(i++);bd.scrollTop=bd.scrollHeight;setTimeout(n,fast()?0:ms);}else setTimeout(r,fast()?0:pause);})();});}
function wait(ms){return new Promise(function(r){setTimeout(r,fast()?0:ms);});}
function bar(label){var sp=d.createElement('span');sp.className='dim';bt.appendChild(sp);return new Promise(function(r){var p=0;(function f(){p=Math.min(100,p+(fast()?100:4));var n=Math.round(p/5);sp.textContent=label+' ['+'#'.repeat(n)+'-'.repeat(20-n)+'] '+p+'%'+(p>=100?'\n':'');bd.scrollTop=bd.scrollHeight;if(p<100)setTimeout(f,35);else setTimeout(r,fast()?0:300);})();});}
function finish(){
  d.body.classList.remove('lock');d.body.classList.add('live','phys');started=true;
  (d.fonts&&d.fonts.ready?d.fonts.ready:Promise.resolve()).then(bang);ph.classList.add('on');
}
function zoomIn(){
  boot.classList.add('off');
  if(R){window.ZF=1;window.WARP=0;finish();return;}
  var t0=performance.now(),T=3400,Z0=14;
  (function f(n){var p=Math.min(1,(n-t0)/T),e=1-Math.pow(1-p,3);window.ZF=1+(1-e)*(Z0-1);window.WARP=Math.pow(1-p,1.4);window.FLYD=2.2*e;
    if(p<1)requestAnimationFrame(f);else{window.ZF=1;window.WARP=0;finish();}})(t0);
}
function begin(){
  if(begun)return;begun=true;st.classList.remove('show');st.style.display='none';bt.textContent='';boot.classList.add('run');
  function sk(){skip=true;}addEventListener('pointerdown',sk);addEventListener('keydown',sk);
  say('$ sudo -i\n',30,200)
  .then(function(){return say('[sudo] password for fuyad: ',18,0);})
  .then(function(){return say('********\n',70,300,'dim');})
  .then(function(){return say('root@portfolio:~# nmap -sS -p- 10.10.10.4\n',20,300);})
  .then(function(){return say('PORT      STATE  SERVICE\n22/tcp    open   ssh\n80/tcp    open   http\n443/tcp   open   https\n',6,300,'dim');})
  .then(function(){return say('root@portfolio:~# ./crack --target 10.10.10.4\n',20,250);})
  .then(function(){return bar('brute-forcing credentials');})
  .then(function(){return say('[+] login: admin   password: ********\n',8,300,'dim');})
  .then(function(){return say('root@portfolio:~# ./bypass_firewall.sh\n',20,250);})
  .then(function(){return say('[+] injecting payload ........ ok\n[+] escalating privileges ... root\n',7,300,'dim');})
  .then(function(){return say('root@portfolio:~# gpg --decrypt avatar.glb.gpg\n',20,250);})
  .then(function(){return bar('decrypting avatar.glb');})
  .then(function(){return say('\nACCESS GRANTED\n',45,500,'ok');})
  .then(function(){return say('> loading portfolio',45,200);})
  .then(function(){boot.classList.add('gl');return wait(450);})
  .then(zoomIn);
}
st.onclick=begin;
addEventListener('keydown',function(e){if(!begun&&e.key==='Enter')begin();});
rs();requestAnimationFrame(loop);
say('HKM FUYAD ISLAM 2026\ndigital forensics & cybersecurity\nclick start to begin ',34,200).then(function(){st.classList.add('show');st.focus({preventScroll:true});});
})();
