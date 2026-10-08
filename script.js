(function(){
var GLB_URL="scene.glb";

var secs=[].slice.call(document.querySelectorAll('section'));
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.1});
document.querySelectorAll('.rv').forEach(function(n){io.observe(n);});
function cur_i(){var y=scrollY+innerHeight*.5,i=0;for(var s=0;s<secs.length;s++){if(secs[s].offsetTop<=y)i=s;}return i;}
var cv=document.getElementById('gl'),R;
try{R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});}catch(e){return;}
R.setClearColor(0x000000,0);R.setPixelRatio(Math.min(devicePixelRatio,2));R.outputEncoding=THREE.sRGBEncoding;
var S=new THREE.Scene();
var C=new THREE.PerspectiveCamera(40,1,.1,50);S.add(C);
S.add(new THREE.HemisphereLight(0xfff6e6,0xbcc3a2,1.2));
var pl=new THREE.PointLight(0xfff0dc,.9,0);pl.position.set(2,3,3);C.add(pl);
function tune(m){
  var sm=function(a,b,x){var t=Math.min(Math.max((x-a)/(b-a),0),1);return t*t*(3-2*t);};
  var cs=[],band;
  m.traverse(function(o){
    if(!o.isMesh)return;
    var g=o.geometry,n=g.attributes.position.count;
    if(o.name==='head'){
      var p=g.attributes.position,q;
      for(q=0;q<p.count;q++){
        var x=p.getX(q),y=p.getY(q),z=p.getZ(q);
        /* jaw: keep width, add a defined jaw angle and a flatter, forward chin */
        var wd=sm(-.35,-.65,y),jb=Math.exp(-Math.pow((y+.38)/.09,2))*sm(.25,.45,Math.abs(x));
        x*=1+.3*wd;
        x+=(x<0?-1:1)*.04*jb;
        z+=.06*sm(-.45,-.65,y)*sm(0,.3,z);
        /* nose: bridge, tip and base */
        var fr=sm(.25,.6,z),sg=.045+.045*sm(.02,-.14,y);
        var A=y>-.13?.11*sm(.12,-.12,y):.11*sm(-.25,-.13,y);
        z+=fr*A*Math.exp(-x*x/(2*sg*sg));
        p.setXYZ(q,x,y,z);
      }
      p.needsUpdate=true;g.computeVertexNormals();
      var cc=g.attributes.color;
      if(cc){for(q=0;q<cc.count;q++){if(Math.hypot(cc.getX(q)-.392,cc.getY(q)-.165,cc.getZ(q)-.078)>.05)cc.setXYZ(q,.392,.165,.078);}cc.needsUpdate=true;}
      var ym=-.33,z0=0;
      for(q=0;q<p.count;q++){if(Math.abs(p.getX(q))<.04&&Math.abs(p.getY(q)-ym)<.03)z0=Math.max(z0,p.getZ(q));}
      var mk=function(sx,sy,sz,col,y,z){var mm=new THREE.Mesh(new THREE.SphereGeometry(1,20,12),new THREE.MeshStandardMaterial({color:new THREE.Color(col).convertSRGBToLinear(),roughness:.6}));mm.scale.set(sx,sy,sz);mm.position.set(0,y,z);o.add(mm);};
      mk(.14,.034,.05,0x8e4540,ym+.022,z0-.012);
      mk(.12,.046,.055,0xa65750,ym-.032,z0-.014);
      var ln=new THREE.Mesh(new THREE.TorusGeometry(.3,.008,6,32,Math.PI*.34),new THREE.MeshStandardMaterial({color:new THREE.Color(0x2b100f).convertSRGBToLinear(),roughness:.6}));
      ln.rotation.z=-Math.PI/2-Math.PI*.17;ln.position.set(0,ym+.3-.004,z0+.046);o.add(ln);
    }else if(n===240)cs.push(o);
    else if(n===117&&Math.abs(o.position.y-.425)<.03&&Math.abs(o.position.x)<.07)o.visible=false;
    else if(n===637)band=o;
  });
  if(band)band.position.y+=.06;
  /* hair: a swept, fuller style that sits on the head instead of a puffy afro */
  var N=cs.length,i,D=Math.PI/180;
  for(i=0;i<N;i++){
    var A=cs[i],sA=A.scale.x;
    var u=(i+.5)/N,th=Math.acos(1-u*1.57),ph=i*2.39996,cp=Math.cos(ph),sp=Math.sin(ph);
    var tm=(47+81*sm(.7,-.5,cp))*D,ff=sm(.2,.7,cp);
    if(th>tm)th=tm-((i*37)%10)*.011;
    var L=.01+.03*Math.sin(5*th+2*ph);
    var P=new THREE.Vector3(.6*Math.sin(th)*sp,.7*Math.cos(th),.66*Math.sin(th)*cp).multiplyScalar(1+L);
    if(ff>.4&&th>tm-.2){P.y-=.01;P.z+=.03;P.x+=.05;}
    if(P.y<.45){P.x=Math.max(-.53,Math.min(.53,P.x));}
    P.y+=.55;
    A.position.copy(P);A.scale.setScalar(sA*.8);
  }
}

var model,eL,eR;
new THREE.GLTFLoader().load(GLB_URL,function(g){model=g.scene;tune(model);S.add(model);eL=model.getObjectByName('eyeL');eR=model.getObjectByName('eyeR');},undefined,function(e){console.error(e);});
/* camera keyframes: azimuth, elevation, distance, head screen offset, look height */
var K=[[0,.05,4.5,0,.08],[-.8,-.3,2.7,1,.5],[.5,.7,3,1.1,.55],[1.2,.05,2.8,1,.5],[.6,-.55,3.2,-1.1,.5],[6.283,.1,3.7,1.1,.5],[-2.2,.25,3,1,.5]];
var cur=K[0].slice(),mx=0,my=0,ex=0,ey=0;
function sm(t){return t*t*(3-2*t);}
function size(){R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix();}
addEventListener('resize',size);size();
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;});
function cl(v){return Math.max(-1,Math.min(1,v));}
function tick(t){
  var y=scrollY+innerHeight*.5,i=cur_i(),j=Math.min(i+1,secs.length-1),a=secs[i],b=secs[j];
  var f=j===i?0:Math.min(Math.max((y-a.offsetTop)/(b.offsetTop-a.offsetTop),0),1);
  f=sm(Math.min(Math.max((f-.25)/.75,0),1));
  var ka=K[+a.dataset.k],kb=K[+b.dataset.k],nw=innerWidth<800;
  for(var k=0;k<5;k++){var v=ka[k]+(kb[k]-ka[k])*f;
    if(nw){if(k===3)v=0;if(k===2)v*=1.4;if(k===4)v-=.6;}
    cur[k]+=(v-cur[k])*.07;}
  var az=cur[0]+mx*.3,el=cur[1]-my*.12,d=cur[2],ce=Math.cos(el);
  var tx=Math.cos(az)*cur[3],tz=-Math.sin(az)*cur[3],ty=cur[4];
  C.position.set(tx+Math.sin(az)*ce*d,ty+Math.sin(el)*d,tz+Math.cos(az)*ce*d);
  C.lookAt(tx,ty,tz);
  ex+=(cl(mx*2)-ex)*.15;ey+=(cl(my*2)-ey)*.15;
  if(model){model.position.y=Math.sin(t/800)*.02;model.rotation.y=ex*.1;model.rotation.x=ey*.05;}
  if(eL){eL.rotation.y=eR.rotation.y=ex*.5;eL.rotation.x=eR.rotation.x=ey*.35;}
  R.render(S,C);requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
})();
