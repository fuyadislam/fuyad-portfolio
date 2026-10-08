(function(){
var secs=[].slice.call(document.querySelectorAll('section'));
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.1});
document.querySelectorAll('.rv').forEach(function(n){io.observe(n);});
function cur_i(){var y=scrollY+innerHeight*.5,i=0;for(var s=0;s<secs.length;s++){if(secs[s].offsetTop<=y)i=s;}return i;}
var cv=document.getElementById('gl'),R;
try{R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});}catch(e){return;}
R.setClearColor(0x000000,0);R.setPixelRatio(Math.min(devicePixelRatio,2));R.outputEncoding=THREE.sRGBEncoding;
var S=new THREE.Scene();
var C=new THREE.PerspectiveCamera(40,1,.1,200);S.add(C);
S.add(new THREE.HemisphereLight(0xd6d9e0,0x1c1d22,.8));var rm=new THREE.DirectionalLight(0xe4e8f2,.7);rm.position.set(-3,2,-3);S.add(rm);var rb=new THREE.DirectionalLight(0xb4bddc,.45);rb.position.set(3,1,-3);S.add(rb);
var pl=new THREE.PointLight(0xf4eee6,.75,0);pl.position.set(2,3,3);C.add(pl);
/* extra face detail: split every triangle in 4 (twice) so the lips, nose and brows get sharp edges instead of smeared vertex colours */
function sd(g){
  var idx=g.index&&g.index.array;if(!idx)return g;
  var names=Object.keys(g.attributes),out={},sz={},nv=g.attributes.position.count;
  names.forEach(function(k){var at=g.attributes[k],s=at.itemSize,arr=new Array(nv*s),i;
    for(i=0;i<nv;i++){arr[i*s]=at.getX(i);if(s>1)arr[i*s+1]=at.getY(i);if(s>2)arr[i*s+2]=at.getZ(i);if(s>3)arr[i*s+3]=at.getW(i);}
    out[k]=arr;sz[k]=s;});
  var em={},cnt=nv,ni=[],t;
  function mid(a,b){var key=a<b?a*1e7+b:b*1e7+a,r=em[key];if(r!==undefined)return r;
    names.forEach(function(k){var s=sz[k],o=out[k];for(var c=0;c<s;c++)o[cnt*s+c]=(o[a*s+c]+o[b*s+c])/2;});
    em[key]=cnt;return cnt++;}
  for(t=0;t<idx.length;t+=3){var a=idx[t],b=idx[t+1],c=idx[t+2],ab=mid(a,b),bc=mid(b,c),ca=mid(c,a);
    ni.push(a,ab,ca,ab,b,bc,ca,bc,c,ab,bc,ca);}
  var ng=new THREE.BufferGeometry();
  names.forEach(function(k){ng.setAttribute(k,new THREE.Float32BufferAttribute(out[k],sz[k]));});
  ng.setIndex(ni);return ng;
}
function tune(m){
  var sm=function(a,b,x){var t=Math.min(Math.max((x-a)/(b-a),0),1);return t*t*(3-2*t);};
  var cs=[],band;
  m.traverse(function(o){
    if(!o.isMesh)return;
    var g=o.geometry,n=g.attributes.position.count;
    if(o.name==='head'){
      g=o.geometry=sd(sd(g));
      /* flat illustrated nose + mouth drawn per pixel in the head shader, so the lines stay crisp at any size */
      o.material=o.material.clone();
      o.material.onBeforeCompile=function(sh){
        sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vFP;').replace('#include <begin_vertex>','#include <begin_vertex>\nvFP=position;');
        sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vFP;\n'+"float sg(vec2 p,vec2 a,vec2 b,float wa,float wb,float e){vec2 pa=p-a,ba=b-a;float t=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);float d=length(pa-ba*t);float w=mix(wa,wb,t);return 1.-smoothstep(w-e,w+e,d);}\nfloat el2(vec2 p,vec2 c,vec2 r,float e){vec2 X=(p-c)/r;float u=length(X);if(u<1e-5)return 1.;float gr=length(X/r)/u;return 1.-smoothstep(-e,e,(u-1.)/gr);}").replace('#include <color_fragment>','#include <color_fragment>\n'+"{vec2 p=vFP.xy;\nif(vFP.z>.3&&abs(p.x)<.2&&p.y<-.05&&p.y>-.45){\nfloat e=.001;vec3 c=diffuseColor.rgb;float m;\nm=.9*el2(p,vec2(0.00000,-0.18900),vec2(.09,.032),e);c*=1.-m*(1.-vec3(.8,.7,.66));\nm=el2(p,vec2(0.01680,-0.31740),vec2(.095,.017),e);c*=1.-m*(1.-vec3(.8,.62,.6));\nm=el2(p,vec2(0.00840,-0.35940),vec2(.063,.0147),e);c*=1.-m*(1.-vec3(.92,.84,.82));\nfloat l=0.;\nl=max(l,sg(p,vec2(-0.13020,-0.33210),vec2(-0.06720,-0.32790),0.00217,0.00502,e));\nl=max(l,sg(p,vec2(-0.06720,-0.32790),vec2(0.00000,-0.33105),0.00502,0.00620,e));\nl=max(l,sg(p,vec2(0.00000,-0.33105),vec2(0.06930,-0.33000),0.00620,0.00502,e));\nl=max(l,sg(p,vec2(0.06930,-0.33000),vec2(0.13230,-0.31950),0.00502,0.00217,e));\nl=max(l,sg(p,vec2(-0.05460,-0.39300),vec2(-0.01470,-0.40140),0.00192,0.00502,e));\nl=max(l,sg(p,vec2(-0.01470,-0.40140),vec2(0.02730,-0.40140),0.00502,0.00502,e));\nl=max(l,sg(p,vec2(0.02730,-0.40140),vec2(0.07560,-0.38880),0.00502,0.00193,e));\nl=max(l,sg(p,vec2(0.05520,-0.11700),vec2(0.06670,-0.15700),0.00100,0.00340,e));\nl=max(l,sg(p,vec2(0.06670,-0.15700),vec2(0.08510,-0.20100),0.00340,0.00580,e));\nl=max(l,sg(p,vec2(0.08510,-0.20100),vec2(0.09430,-0.22500),0.00580,0.00820,e));\nl=max(l,sg(p,vec2(-0.06900,-0.19300),vec2(-0.04600,-0.20100),0.00168,0.00389,e));\nl=max(l,sg(p,vec2(-0.04600,-0.20100),vec2(-0.01840,-0.19700),0.00389,0.00480,e));\nl=max(l,sg(p,vec2(-0.01840,-0.19700),vec2(0.00920,-0.20700),0.00480,0.00389,e));\nl=max(l,sg(p,vec2(0.00920,-0.20700),vec2(0.03680,-0.20100),0.00389,0.00168,e));\nl=max(l,el2(p,vec2(0.13230,-0.31950),vec2(.0095,.0095),e));\nc=mix(c,vec3(.06,.02,.016),l);\ndiffuseColor.rgb=c;}}");
      };
      var p=g.attributes.position,q;
      for(q=0;q<p.count;q++){
        var x=p.getX(q),y=p.getY(q),z=p.getZ(q);
        /* jaw: keep width, add a defined jaw angle and a flatter, forward chin */
        var wd=sm(-.35,-.65,y),jb=Math.exp(-Math.pow((y+.38)/.09,2))*sm(.25,.45,Math.abs(x));
        x*=1+.3*wd;
        x+=(x<0?-1:1)*.04*jb;
        z+=.06*sm(-.45,-.65,y)*sm(0,.3,z);
        /* nose: bridge, tip and base */
        var fr=sm(.25,.6,z),sg=.05+.05*sm(.02,-.14,y);
        var A=y>-.13?.01*sm(.12,-.12,y):.01*sm(-.25,-.13,y);
        z+=fr*A*Math.exp(-x*x/(2*sg*sg));
        p.setXYZ(q,x,y,z);
      }
      var ym=-.33;
      /* lips: ellipse edges with the same crisp width on every side (the old falloff was soft at the corners and sharp on top) */
      var ell=function(x,y,cy,rx,ry,e){var X=x/rx,Y=(y-cy)/ry,u=Math.sqrt(X*X+Y*Y);if(u<1e-6)return 1;var gr=Math.sqrt(X*X/(rx*rx)+Y*Y/(ry*ry))/u;return 1-sm(-e,e,(u-1)/gr);};
      var lw=function(x,y){var dx=x/.145;
        return[ell(x,y,ym+.02,.145,.03,.0035),ell(x,y,ym-.032,.145,.044,.0035),Math.exp(-Math.pow((y-(ym-.004))/.006,2))*(1-sm(.82,1,Math.abs(dx)))];};
      for(q=0;q<p.count;q++){var x2=p.getX(q),y2=p.getY(q),z2=p.getZ(q);if(z2<.3)continue;
        var w=lw(x2,y2),wing=Math.exp(-Math.pow((Math.abs(x2)-.075)/.03,2)-Math.pow((y2+.17)/.035,2));
        p.setZ(q,z2);}
      p.needsUpdate=true;g.computeVertexNormals();
      /* clean skin: across the front of the face use smooth head-shaped normals, so no soft smudgy shadows are left around the nose, mouth and chin */
      var nm=g.attributes.normal;
      for(q=0;q<p.count;q++){
        var X1=p.getX(q),Y1=p.getY(q),Z1=p.getZ(q),wt=sm(.15,.4,Z1)*sm(.3,.12,Y1)*sm(-.7,-.55,Y1);
        if(wt<=0)continue;
        var ex1=X1/.3364,ey1=Y1/.49,ez1=Z1/.49,ln1=Math.sqrt(ex1*ex1+ey1*ey1+ez1*ez1)||1;ex1/=ln1;ey1/=ln1;ez1/=ln1;
        var mx1=nm.getX(q)*(1-wt)+ex1*wt,my1=nm.getY(q)*(1-wt)+ey1*wt,mz1=nm.getZ(q)*(1-wt)+ez1*wt,l2=Math.sqrt(mx1*mx1+my1*my1+mz1*mz1)||1;
        nm.setXYZ(q,mx1/l2,my1/l2,mz1/l2);
      }
      nm.needsUpdate=true;
      var cc=g.attributes.color;
      if(cc){var sk=[.392,.165,.078],lu=[.3,.085,.062],ll=[.37,.11,.08],lnc=[.1,.03,.025];
        for(q=0;q<cc.count;q++){var x3=p.getX(q),y3=p.getY(q),z3=p.getZ(q),c=sk.slice();
          if(z3>.2){
            var ch=Math.exp(-(Math.pow(Math.abs(x3)-.3,2)/.02+Math.pow(y3+.14,2)/.012));c[0]+=.05*ch;c[1]-=.004*ch;
            }
          cc.setXYZ(q,c[0],c[1],c[2]);}
        cc.needsUpdate=true;}
    }else if(n===240)cs.push(o);
    else if(n===117&&Math.abs(o.position.y-.425)<.03&&Math.abs(o.position.x)<.07)o.visible=false;
    else if(n===231){var pp=g.attributes.position,bb=new THREE.Box3().setFromBufferAttribute(pp),cy=(bb.min.y+bb.max.y)/2,k2;for(k2=0;k2<pp.count;k2++)pp.setY(k2,cy+(pp.getY(k2)-cy)*.68);pp.needsUpdate=true;}
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
    A.position.copy(P);
    var nr=P.clone().sub(new THREE.Vector3(0,.55,0)).normalize();
    A.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),nr);
    A.scale.set(sA*1.05,sA*.65,sA*1.05);
  }
}

var model,eL,eR;
fetch('./avatar.glb').then(function(r){return r.arrayBuffer();}).then(function(bin){new THREE.GLTFLoader().parse(bin,'',function(g){model=g.scene;tune(model);S.add(model);eL=model.getObjectByName('eyeL');eR=model.getObjectByName('eyeR');},function(e){console.error(e);});}).catch(function(e){console.error(e);});
/* camera keyframes: azimuth, elevation, distance, head screen offset, look height */
var K=[[0,.05,4.6,0,.05],[-.8,-.3,2.7,1,.5],[.5,.7,3,1.1,.55],[1.2,.05,2.8,1,.5],[.6,-.55,3.2,-1.1,.5],[6.283,.1,3.7,1.1,.5],[-2.2,.25,3,1,.5]];
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
  var az=cur[0]+mx*.3,el=cur[1]-my*.12,d=cur[2]*(window.ZF||1),ce=Math.cos(el);
  var tx=Math.cos(az)*cur[3],tz=-Math.sin(az)*cur[3],ty=cur[4];
  C.position.set(tx+Math.sin(az)*ce*d,ty+Math.sin(el)*d,tz+Math.cos(az)*ce*d);
  C.lookAt(tx,ty,tz);
  ex+=(cl(mx*2)-ex)*.15;ey+=(cl(my*2)-ey)*.15;
  if(model){model.position.y=Math.sin(t/800)*.02;model.rotation.y=ex*.1;model.rotation.x=ey*.05;}
  if(eL){eL.rotation.y=eR.rotation.y=ex*.26;eL.rotation.x=eR.rotation.x=ey*.16;}
  R.render(S,C);requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
})();
