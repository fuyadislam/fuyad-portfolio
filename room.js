/* 3D room: a MacBook on a desk at night. The camera flies in until the screen fills the view, then the coding starts. */
(function () {
  var Q = window.Q, $ = function (i) { return document.getElementById(i); };
  function now() { return new Date(); }
  function tm() { return now().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); }
  function dshort() { return now().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).replace(',', ''); }
  function dlong() { return now().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).replace(',', ''); }
  var HR = now().getHours() + now().getMinutes() / 60, DK = (HR >= 8 && HR < 17) ? 1 : (HR >= 5.5 && HR < 8) ? (HR - 5.5) / 2.5 : (HR >= 17 && HR < 19.5) ? 1 - (HR - 17) / 2.5 : 0;
  function mixc(a, b, k) { return new THREE.Color(a).lerp(new THREE.Color(b), k); }
  Q.clock = function () { return dshort() + ' ' + tm(); };
  var mon2, mt2, m2On = true, m2Last = 0, m2Data = [], m2Log = [], dcx, dct, dcLast = -1, phoneT = 0, phoneMat, IA = [], lampL, lampP, amb, bulb, lampOn = DK < .6, lampK = DK < .6 ? 1 : 0, mug, plant, books = [], keys = [], steam = [], sipT = 0, hopT = 0, swayT = 0, bookOut = false, mxp = 0, myp = 0, AC = null, tip, RC, mv = new THREE.Vector2(), R, C, S, ufo, alien, st, prog = 0, tp = 0, rate = 1 / 7, doneT = false, zcb = null, after = null, last = 0, mode = 'in', locked = true, lastKey = '';
  var cv2 = document.createElement('canvas'), sx = cv2.getContext('2d'); cv2.width = 2048; cv2.height = 1270;
  var COL = { u: '#8ae234', p: '#729fcf', d: '#888a85', ok: '#8ae234', wn: '#fce94f' };
  var V = function (a) { return new THREE.Vector3(a[0], a[1], a[2]); };
  var PC = new THREE.CatmullRomCurve3([[2.7, 1.6, 2.6], [1.5, 1.5, 1.7], [.5, 1.42, .8], [0, 1.381, .232]].map(V));
  var LC = new THREE.CatmullRomCurve3([[0, .95, -.2], [0, 1.05, -.35], [0, 1.15, -.44], [0, 1.196, -.464]].map(V));
  function tex(w, h, fn) { var c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); var t = new THREE.CanvasTexture(c); t.anisotropy = 4; t.encoding = THREE.sRGBEncoding; return t; }
  function ia(o, k) { o.userData.k = k; IA.push(o); return o; }
  function tone(f, d, ty, v) { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); var o = AC.createOscillator(), g = AC.createGain(); o.type = ty || 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(v || .12, AC.currentTime); g.gain.exponentialRampToValueAtTime(.001, AC.currentTime + d); o.connect(g); g.connect(AC.destination); o.start(); o.stop(AC.currentTime + d); } catch (e) {} }
  function wood(base, dark) { return tex(1024, 512, function (g, w, h) { g.fillStyle = base; g.fillRect(0, 0, w, h); for (var i = 0; i < 300; i++) { var y = Math.random() * h; g.strokeStyle = 'rgba(' + dark + ',' + (.05 + Math.random() * .16) + ')'; g.lineWidth = .5 + Math.random() * 2.2; g.beginPath(); g.moveTo(0, y); g.bezierCurveTo(w * .3, y + Math.random() * 12 - 6, w * .6, y + Math.random() * 12 - 6, w, y + Math.random() * 8 - 4); g.stroke(); } }); }
  function mat(c, r, m, e) { return new THREE.MeshStandardMaterial({ color: c, roughness: r === undefined ? .7 : r, metalness: m || 0, emissive: e || 0 }); }
  function bx(w, h, d, m, x, y, z, parent) { var o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; (parent || S).add(o); return o; }
  function cy(r, h, m, x, y, z, rt) { var o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 20), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; S.add(o); return o; }

  function drawScreen(t) {
    var key = mode !== 'in' ? 'g' + ((t / 90) | 0) : locked ? 'l' + ((t / 1000) | 0) : $('tt').textContent.length + ':' + (((t / 500) | 0) % 2);
    if (key === lastKey) return; lastKey = key;
    var W = 1024, H = 635, g = sx, i, lines = [[]]; g.setTransform(2, 0, 0, 2, 0, 0);
    var gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#5a1a4a'); gr.addColorStop(1, '#e95420'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = '#0b0610'; g.fillRect(0, 0, W, 28); g.fillStyle = '#eee'; g.font = '16px monospace'; g.fillText('Activities', 14, 19); g.fillText(dshort() + '  ' + tm(), W - 190, 19);
    g.fillStyle = '#000'; g.beginPath(); g.moveTo(W / 2 - 66, 0); g.lineTo(W / 2 + 66, 0); g.lineTo(W / 2 + 66, 12); g.quadraticCurveTo(W / 2 + 66, 22, W / 2 + 54, 22); g.lineTo(W / 2 - 54, 22); g.quadraticCurveTo(W / 2 - 66, 22, W / 2 - 66, 12); g.fill();
    if (mode !== 'in') { g.fillStyle = '#2b2b2b'; g.fillRect(130, 70, 764, 520); g.drawImage($('cv'), 140, 104, 744, 446); g.fillStyle = '#ddd'; g.fillText('Cyber Quest', 150, 92); st.needsUpdate = true; return; }
    if (locked) { g.fillStyle = 'rgba(0,0,0,.28)'; g.fillRect(0, 28, W, H); g.fillStyle = '#fff'; g.textAlign = 'center'; g.font = 'bold 130px sans-serif'; g.fillText(tm(), W / 2, H / 2 + 10); g.font = '28px sans-serif'; g.fillText(dlong(), W / 2, H / 2 + 56); g.font = '20px monospace'; g.fillStyle = 'rgba(255,255,255,.75)'; g.fillText('fuyad@ubuntu', W / 2, H - 70); g.textAlign = 'left'; st.needsUpdate = true; return; }
    g.fillStyle = '#300a24'; g.fillRect(70, 64, W - 140, H - 96); g.fillStyle = '#2b2b2b'; g.fillRect(70, 64, W - 140, 32);
    ['#e95420', '#777', '#555'].forEach(function (c, k) { g.fillStyle = c; g.beginPath(); g.arc(90 + k * 20, 80, 6, 0, 7); g.fill(); });
    g.fillStyle = '#ddd'; g.fillText('fuyad@ubuntu: ~', W / 2 - 60, 86);
    [].forEach.call($('tt').childNodes, function (n) { var col = n.style.color || COL[n.className] || '#eeeeec'; n.textContent.split('\n').forEach(function (p, k) { if (k) lines.push([]); if (p) lines[lines.length - 1].push([p, col]); }); });
    g.font = '20px "Ubuntu Mono",monospace'; var mx = 21, y0 = 124, s = Math.max(0, lines.length - mx), cw = 0;
    for (i = s; i < lines.length; i++) { var x = 90; cw = 0; lines[i].forEach(function (p) { g.fillStyle = p[1]; g.fillText(p[0], x, y0 + (i - s) * 22); var w = g.measureText(p[0]).width; x += w; cw += w; }); }
    if (((t / 500) | 0) % 2) { g.fillStyle = '#eee'; g.fillRect(90 + cw, y0 + (Math.min(lines.length, mx) - 1) * 22 - 16, 11, 20); }
    st.needsUpdate = true;
  }

  function build() {
    R = new THREE.WebGLRenderer({ canvas: $('room'), antialias: true }); R.setPixelRatio(Math.min(devicePixelRatio, 2));
    R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap; R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = .95 + .25 * DK; R.outputEncoding = THREE.sRGBEncoding;
    S = new THREE.Scene(); var bgc = mixc(0x070a14, 0x9cc4ec, DK); S.background = bgc; S.fog = new THREE.Fog(bgc, 6, 16);
    C = new THREE.PerspectiveCamera(40, 1, .05, 40);
    amb = new THREE.AmbientLight(mixc(0x2a3a6a, 0x9ab4d8, DK), .9); S.add(amb);
    var rim = new THREE.DirectionalLight(mixc(0x6d8cff, 0xfff0d8, DK), .55); rim.position.set(0, 3, -4); S.add(rim); amb.userData.r = rim;
    var lamp = new THREE.SpotLight(0xffd29a, 2.2, 7, .9, .7); lamp.position.set(-1.2, 2.05, .25); lamp.target.position.set(-.1, .8, .1); lamp.castShadow = true; lamp.shadow.mapSize.set(1024, 1024); lamp.shadow.bias = -.0005; S.add(lamp, lamp.target); lampL = lamp; lampP = new THREE.PointLight(0xffc880, .5, 3.5); lampP.position.set(-1.1, 1.45, .3); S.add(lampP);
    var glow = new THREE.PointLight(0xdfeaff, .9, 3); glow.position.set(0, 1.1, .1); S.add(glow);
    // room
    var fl = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshStandardMaterial({ map: wood('#3a2616', '10,6,2'), roughness: .55 })); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; S.add(fl);
    var wl = tex(512, 512, function (g, w, h) { var q = g.createLinearGradient(0, 0, 0, h); q.addColorStop(0, '#1b2238'); q.addColorStop(1, '#2a2f45'); g.fillStyle = q; g.fillRect(0, 0, w, h); for (var i = 0; i < 4000; i++) { g.fillStyle = 'rgba(255,255,255,' + Math.random() * .035 + ')'; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); } });
    var wall = new THREE.Mesh(new THREE.PlaneGeometry(16, 7), new THREE.MeshStandardMaterial({ map: wl, roughness: .95 })); wall.position.set(0, 3.5, -2.7); wall.receiveShadow = true; S.add(wall);
    var city = tex(1024, 512, function (g, w, h) {
      var warm = Math.max(0, 1 - Math.abs(DK - .5) * 2) * (DK > .02 && DK < .98 ? 1 : 0), q = g.createLinearGradient(0, 0, 0, h);
      q.addColorStop(0, mixc('#050a1c', '#3f86d6', DK).getStyle()); q.addColorStop(.6, mixc(mixc('#142346', '#8cc4f0', DK), new THREE.Color('#ff9a5a'), warm * .5).getStyle()); q.addColorStop(1, mixc(mixc('#3a3050', '#cfe8ff', DK), new THREE.Color('#ffb070'), warm * .7).getStyle()); g.fillStyle = q; g.fillRect(0, 0, w, h);
      for (var i = 0; i < 120; i++) { g.fillStyle = 'rgba(255,255,255,' + Math.random() * .8 * (1 - DK) + ')'; g.fillRect(Math.random() * w, Math.random() * h * .5, 1.5, 1.5); }
      if (DK > .15) { var sg = g.createRadialGradient(w * .72, h * .28, 0, w * .72, h * .28, 120); sg.addColorStop(0, 'rgba(255,248,220,' + DK + ')'); sg.addColorStop(.25, 'rgba(255,230,160,' + DK * .5 + ')'); sg.addColorStop(1, 'rgba(255,230,160,0)'); g.fillStyle = sg; g.fillRect(0, 0, w, h); }
      for (i = 0; i < 38; i++) { var bw = 22 + Math.random() * 40, bh = 50 + Math.random() * 190, bx0 = i * 28 - 10; g.fillStyle = mixc(i % 2 ? '#0a1124' : '#0e162c', i % 2 ? '#6a7c98' : '#5a6c88', DK).getStyle(); g.fillRect(bx0, h - bh, bw, bh); for (var k = 0; k < 16; k++) if (Math.random() < .45 * (1 - DK) + .03) { g.fillStyle = Math.random() < .8 ? '#ffd890' : '#a8d4ff'; g.fillRect(bx0 + 4 + (k % 4) * 8, h - bh + 8 + ((k / 4) | 0) * 14, 4, 7); } }
      g.globalCompositeOperation = 'lighter'; for (i = 0; i < 46 * (1 - DK); i++) { var X = Math.random() * w, Y = h * .45 + Math.random() * h * .5, Rr = 8 + Math.random() * 26, rg = g.createRadialGradient(X, Y, 0, X, Y, Rr); var cc = ['255,200,120', '255,120,140', '140,200,255'][i % 3]; rg.addColorStop(0, 'rgba(' + cc + ',.35)'); rg.addColorStop(1, 'rgba(' + cc + ',0)'); g.fillStyle = rg; g.fillRect(X - Rr, Y - Rr, Rr * 2, Rr * 2); }
    });
    var wn = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.3), new THREE.MeshBasicMaterial({ map: city })); wn.position.set(0, 2.1, -2.66); S.add(wn);
    var fr = mat(0x0d0f16, .6); [[4.4, .12, 0, 3.3], [4.4, .12, 0, .95], [.12, 2.4, -2.14, 2.12], [.12, 2.4, 2.14, 2.12], [.07, 2.3, 0, 2.12]].forEach(function (f) { bx(f[0], f[1], .12, fr, f[2], f[3], -2.6); }); bx(4.6, .08, .3, mat(0x1c1f2a, .5), 0, .93, -2.5);
    ufo = new THREE.Group(); var sc = new THREE.Mesh(new THREE.SphereGeometry(.2, 20, 10), mat(0x9ab0c8, .3, .7)); sc.scale.y = .25; ufo.add(sc); var dm = new THREE.Mesh(new THREE.SphereGeometry(.1, 14, 8, 0, 6.3, 0, 1.6), new THREE.MeshBasicMaterial({ color: 0x7de8ff })); dm.position.y = .03; ufo.add(dm); for (var q = 0; q < 6; q++) { var ln = new THREE.Mesh(new THREE.SphereGeometry(.018, 6, 6), new THREE.MeshBasicMaterial({ color: q % 2 ? 0xffe060 : 0xff5090 })); ln.position.set(Math.cos(q * 1.05) * .18, -.01, Math.sin(q * 1.05) * .18); ufo.add(ln); } ufo.position.set(-.8, 2.9, -2.4); S.add(ufo);
    // desk
    var wd = new THREE.MeshStandardMaterial({ map: wood('#8a5a36', '44,24,10'), roughness: .5 });
    bx(3.6, .07, 1.6, wd, 0, .765, -.1); [[-1.7, -.8], [1.7, -.8], [-1.7, .6], [1.7, .6]].forEach(function (l) { bx(.07, .73, .07, mat(0x0e0e12, .4, .6), l[0], .365, l[1]); });
    // MacBook
    var al = mat(0xc4c8ce, .32, .9), hinge = new THREE.Group(); ia(bx(1.1, .035, .76, al, 0, .8, 0), 'mac');
    var kt = tex(1024, 512, function (g, w, h) { g.fillStyle = '#17181c'; g.fillRect(0, 0, w, h); for (var r = 0; r < 6; r++) for (var c = 0; c < 14; c++) { g.fillStyle = '#2c2e34'; g.fillRect(14 + c * 71.5, 14 + r * 80, 62, 68); g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(24 + c * 71.5, 24 + r * 80, 22, 4); } });
    var kb = new THREE.Mesh(new THREE.PlaneGeometry(.98, .38), new THREE.MeshStandardMaterial({ map: kt, roughness: .6 })); kb.rotation.x = -Math.PI / 2; kb.position.set(0, .8185, -.12); S.add(kb); ia(kb, 'mac');
    var tpd = new THREE.Mesh(new THREE.PlaneGeometry(.42, .26), mat(0xb4b8be, .25, .9)); tpd.rotation.x = -Math.PI / 2; tpd.position.set(0, .8185, .22); S.add(tpd); ia(tpd, 'mac');
    hinge.position.set(0, .8175, -.38); hinge.rotation.x = -.26; S.add(hinge);
    ia(bx(1.1, .72, .02, al, 0, .36, 0, hinge), 'mac'); ia(bx(1.04, .66, .004, mat(0x050507, .3), 0, .365, .011, hinge), 'mac');
    st = new THREE.CanvasTexture(cv2); st.anisotropy = 8; st.encoding = THREE.sRGBEncoding; var sm = new THREE.Mesh(new THREE.PlaneGeometry(1, .62), new THREE.MeshBasicMaterial({ map: st })); sm.position.set(0, .37, .0135); hinge.add(sm); ia(sm, 'mac');
    // desk props
    var lm = mat(0x16161c, .4, .6); ia(cy(.14, .03, lm, -1.3, .8, .25), 'lamp'); ia(cy(.015, .75, lm, -1.3, 1.17, .25), 'lamp'); var lh = new THREE.Mesh(new THREE.ConeGeometry(.17, .22, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0x2a2a34, side: THREE.DoubleSide, roughness: .4, metalness: .6 })); lh.position.set(-1.2, 1.55, .25); lh.rotation.z = -.5; lh.castShadow = true; S.add(lh); ia(lh, 'lamp'); var bl = new THREE.Mesh(new THREE.SphereGeometry(.05, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffe2b0 })); bl.position.set(-1.16, 1.5, .25); S.add(bl); ia(bl, 'lamp'); bulb = bl;
    mug = cy(.06, .11, mat(0xe95420, .4), 1.05, .855, .28); ia(mug, 'mug'); [0xb03030, 0x2f5f9a, 0xd0a030].forEach(function (c, i) { books.push(ia(bx(.5 - i * .04, .06, .34, mat(c, .8), -1.0, .83 + i * .06, -.5), 'book')); });
    plant = new THREE.Group(); plant.position.set(1.5, .88, -.6); S.add(plant); ia(cy(.1, .16, mat(0x8a4a30, .8), 1.5, .88, -.6), 'plant'); for (var lf = 0; lf < 7; lf++) { var lo = new THREE.Mesh(new THREE.SphereGeometry(.12, 10, 8), mat(0x2f7a3a, .7)); lo.scale.set(.5, 1.1, .2); lo.position.set(Math.cos(lf) * .1, .22 + lf * .02, Math.sin(lf) * .1); lo.rotation.set(Math.sin(lf) * .6, lf, Math.cos(lf) * .6); lo.castShadow = true; plant.add(lo); ia(lo, 'plant'); }
    alien = new THREE.Group(); var gm = mat(0x7be36b, .5, 0, 0x16380f), bk = new THREE.MeshBasicMaterial({ color: 0x050505 });
    var hd = new THREE.Mesh(new THREE.SphereGeometry(.07, 16, 12), gm); hd.scale.set(1, .9, 1); hd.position.y = .1; hd.castShadow = true; alien.add(hd); var bd = new THREE.Mesh(new THREE.SphereGeometry(.048, 12, 10), gm); bd.position.y = .03; alien.add(bd);
    [-.028, .028].forEach(function (x) { var ey = new THREE.Mesh(new THREE.SphereGeometry(.016, 8, 6), bk); ey.scale.set(1.3, 1.8, .6); ey.position.set(x, .11, .06); alien.add(ey); var an = new THREE.Mesh(new THREE.CylinderGeometry(.003, .003, .08, 6), gm); an.position.set(x * 1.4, .2, 0); alien.add(an); var tp2 = new THREE.Mesh(new THREE.SphereGeometry(.01, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff5090 })); tp2.position.set(x * 1.4, .245, 0); alien.add(tp2); });
    alien.position.set(.95, .8, -.3); S.add(alien); alien.traverse(function (o) { if (o.isMesh) ia(o, 'alien'); });
    // mini synth
    bx(1.0, .04, .2, mat(0x15151c, .5, .3), 0, .82, .57); var NS = [261.6, 293.7, 329.6, 349.2, 392, 440, 493.9, 523.3];
    NS.forEach(function (f, i) { var k = bx(.092, .025, .16, mat(0xf2f2ee, .4), -.35 + i * .1, .8445, .585); k.userData.f = f; k.userData.y0 = k.position.y; ia(k, 'key'); keys.push(k); });
    [0, 1, 3, 4, 5].forEach(function (i) { var k = bx(.055, .03, .1, mat(0x101014, .4), -.3 + i * .1, .862, .55); k.userData.f = NS[i] * 1.0595; k.userData.y0 = k.position.y; ia(k, 'key'); keys.push(k); });
    for (var sp = 0; sp < 8; sp++) { var pf = new THREE.Mesh(new THREE.SphereGeometry(.016, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false })); pf.userData.o = sp; steam.push(pf); S.add(pf); }
    RC = new THREE.Raycaster(); tip = document.createElement('div'); tip.id = 'rt'; tip.hidden = true; document.body.appendChild(tip);
    // desk mat, second monitor, speakers, headphones, phone, notebook, mouse, clock
    var mc = tex(512, 256, function (g, w, h) { g.fillStyle = '#23252c'; g.fillRect(0, 0, w, h); for (var i = 0; i < 5000; i++) { g.fillStyle = 'rgba(255,255,255,' + Math.random() * .05 + ')'; g.fillRect(Math.random() * w, Math.random() * h, 1, 1); } g.strokeStyle = '#e95420'; g.setLineDash([6, 5]); g.lineWidth = 2; g.strokeRect(8, 8, w - 16, h - 16); });
    var dm = new THREE.Mesh(new THREE.PlaneGeometry(2.0, .85), new THREE.MeshStandardMaterial({ map: mc, roughness: .95 })); dm.rotation.x = -Math.PI / 2; dm.position.set(0, .8015, .08); dm.receiveShadow = true; S.add(dm);
    var m2c = document.createElement('canvas'); m2c.width = 1024; m2c.height = 576; mon2 = m2c.getContext('2d'); mt2 = new THREE.CanvasTexture(m2c); mt2.encoding = THREE.sRGBEncoding; mt2.anisotropy = 4;
    var dk = mat(0x0c0c10, .4, .5); ia(bx(1.5, .88, .04, dk, .45, 1.42, -.72), 'monitor'); var m2s = new THREE.Mesh(new THREE.PlaneGeometry(1.42, .8), new THREE.MeshBasicMaterial({ map: mt2 })); m2s.position.set(.45, 1.42, -.697); S.add(m2s); ia(m2s, 'monitor');
    bx(.1, .6, .03, mat(0x16161c, .4, .7), .45, 1.1, -.77); bx(.5, .02, .28, mat(0x16161c, .4, .7), .45, .81, -.68);
    var g2 = new THREE.PointLight(0x6fe0ff, .5, 3); g2.position.set(.45, 1.4, -.35); S.add(g2);
    [[-.8, -.72], [1.3, -.72]].forEach(function (p) { bx(.16, .3, .16, mat(0x1a1a20, .6), p[0], .95, p[1]); var c1 = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, .01, 18), mat(0x08080a, .8)); c1.rotation.x = Math.PI / 2; c1.position.set(p[0], .92, p[1] + .085); S.add(c1); var c2 = new THREE.Mesh(new THREE.CylinderGeometry(.025, .025, .01, 14), mat(0x08080a, .8)); c2.rotation.x = Math.PI / 2; c2.position.set(p[0], 1.04, p[1] + .085); S.add(c2); });
    var hp = new THREE.Group(); hp.position.set(-.55, .8, -.5); S.add(hp); var hm = mat(0x1d1d22, .5, .3);
    [[new THREE.CylinderGeometry(.07, .07, .02, 18), 0, .01, 0], [new THREE.CylinderGeometry(.01, .01, .3, 8), 0, .17, 0]].forEach(function (a) { var o = new THREE.Mesh(a[0], hm); o.position.set(a[1], a[2], a[3]); o.castShadow = true; hp.add(o); ia(o, 'phones'); });
    var hb = new THREE.Mesh(new THREE.TorusGeometry(.1, .012, 8, 24, Math.PI), hm); hb.position.y = .3; hb.castShadow = true; hp.add(hb); ia(hb, 'phones');
    [-.1, .1].forEach(function (x) { var cu = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, .035, 18), mat(0x2a2a30, .6)); cu.rotation.z = Math.PI / 2; cu.position.set(x, .3, 0); cu.castShadow = true; hp.add(cu); ia(cu, 'phones'); });
    phoneMat = new THREE.MeshBasicMaterial({ color: 0x203a5a }); var ph = bx(.075, .008, .155, mat(0x0e0e12, .3, .5), 1.32, .804, .2); ph.rotation.y = .5; ia(ph, 'phone'); var pf = new THREE.Mesh(new THREE.PlaneGeometry(.068, .148), phoneMat); pf.rotation.x = -Math.PI / 2; pf.position.set(0, .0045, 0); ph.add(pf);
    var nb = bx(.3, .02, .4, mat(0xe8e2d0, .9), -.82, .81, .3); nb.rotation.y = .15; bx(.31, .012, .41, mat(0x2a3a5a, .7), -.82, .8, .3).rotation.y = .15; var pn = new THREE.Mesh(new THREE.CylinderGeometry(.006, .006, .15, 8), mat(0xe95420, .4)); pn.rotation.set(Math.PI / 2, 0, 1.2); pn.position.set(-.66, .83, .38); pn.castShadow = true; S.add(pn);
    var ms2 = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), mat(0x2a2a30, .3, .6)); ms2.scale.set(.04, .022, .066); ms2.position.set(.78, .82, .22); ms2.castShadow = true; S.add(ms2);
    dcx = document.createElement('canvas'); dcx.width = dcx.height = 256; dct = new THREE.CanvasTexture(dcx); dct.encoding = THREE.sRGBEncoding;
    var dcb = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, .045, 32), mat(0xe95420, .4)); dcb.rotation.x = Math.PI / 2; dcb.position.set(1.22, .9, -.32); dcb.castShadow = true; S.add(dcb); ia(dcb, 'clock'); var dcf = new THREE.Mesh(new THREE.CircleGeometry(.088, 32), new THREE.MeshBasicMaterial({ map: dct })); dcf.position.set(1.22, .9, -.2965); S.add(dcf); ia(dcf, 'clock'); bx(.14, .02, .08, mat(0xe95420, .4), 1.22, .81, -.32);
    function size() { R.setSize(innerWidth, innerHeight, false); C.aspect = innerWidth / innerHeight; C.updateProjectionMatrix(); } addEventListener('resize', size); size();
  }

  var LB = { lamp: 'LAMP  [L]', mug: 'COFFEE', alien: 'ALIEN PLUSH', plant: 'PLANT', book: 'BOOKS', key: 'MINI SYNTH  [A-K]', mac: 'MACBOOK: SIT DOWN', monitor: 'SECOND MONITOR  (ON/OFF)', phone: 'PHONE', phones: 'HEADPHONES', clock: 'DESK CLOCK  (REAL TIME)' };
  function pick(e) { mv.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); RC.setFromCamera(mv, C); var h = RC.intersectObjects(IA, false); return h.length ? h[0].object : null; }
  function play(k) { tone(k.userData.f, .6, 'triangle', .14); k.userData.p = .16; }
  function act(o) {
    var k = o.userData.k;
    if (k === 'lamp') { lampOn = !lampOn; tone(lampOn ? 1100 : 700, .06, 'square', .06); }
    else if (k === 'mug') { sipT = 1.3; tone(180, .35, 'sine', .08); }
    else if (k === 'alien') { hopT = .6; tone(880, .08, 'square', .05); setTimeout(function () { tone(1320, .1, 'square', .05); }, 90); }
    else if (k === 'plant') swayT = 1.6;
    else if (k === 'book') { bookOut = !bookOut; tone(240, .08, 'sine', .08); }
    else if (k === 'key') play(o);
    else if (k === 'monitor') { m2On = !m2On; m2Last = 0; tone(m2On ? 1000 : 600, .08, 'square', .05); }
    else if (k === 'phone') { phoneT = .6; tone(1568, .3, 'sine', .12); setTimeout(function () { tone(2093, .3, 'sine', .1); }, 130); }
    else if (k === 'phones') { [392, 494, 587].forEach(function (f, i) { setTimeout(function () { tone(f, .5, 'triangle', .1); }, i * 90); }); }
    else if (k === 'mac' && Q.room.onSit) Q.room.onSit();
  }
  function anim(t, dt) {
    lampK += ((lampOn ? 1 : 0) - lampK) * Math.min(1, dt * 9);
    lampL.intensity = 2.2 * lampK; lampP.intensity = .5 * lampK; amb.intensity = (.22 + .68 * lampK) * (1 - DK) + 1.0 * DK; amb.userData.r.intensity = (.25 + .3 * lampK) * (1 - DK) + .9 * DK; bulb.material.color.setRGB(.18 + .82 * lampK, .15 + .74 * lampK, .12 + .56 * lampK);
    if (sipT > 0) { sipT -= dt; mug.rotation.x = -.5 * Math.sin(Math.PI * Math.max(0, 1 - sipT / 1.3)); } else mug.rotation.x = 0;
    steam.forEach(function (p, i) { var ph = (t / 1700 + i / 8) % 1; p.position.set(1.05 + Math.sin(ph * 6 + i) * .018, .93 + ph * .2, .28); p.scale.setScalar(1 + ph * 2.2); p.material.opacity = (1 - ph) * (.14 + (sipT > 0 ? .25 : 0)); });
    if (hopT > 0) { hopT -= dt; alien.position.y = .8 + .12 * Math.sin(Math.PI * Math.max(0, 1 - hopT / .6)); } else alien.position.y = .8;
    if (swayT > 0) { swayT -= dt; plant.rotation.z = .09 * Math.sin(t / 80) * swayT / 1.6; } else plant.rotation.z = 0;
    books[2].position.x += ((bookOut ? -.72 : -1.0) - books[2].position.x) * Math.min(1, dt * 8);
    var tn = now(), sec = tn.getSeconds();
    if (sec !== dcLast) { dcLast = sec; var cg = dcx.getContext('2d'), cc = 128; cg.fillStyle = '#f4efe2'; cg.fillRect(0, 0, 256, 256); cg.fillStyle = '#222'; cg.font = 'bold 26px sans-serif'; cg.textAlign = 'center'; cg.textBaseline = 'middle'; for (var n = 1; n <= 12; n++) cg.fillText(n, cc + Math.sin(n * Math.PI / 6) * 98, cc - Math.cos(n * Math.PI / 6) * 98);
      var hand = function (a, l, w, c) { cg.strokeStyle = c; cg.lineWidth = w; cg.lineCap = 'round'; cg.beginPath(); cg.moveTo(cc, cc); cg.lineTo(cc + Math.sin(a) * l, cc - Math.cos(a) * l); cg.stroke(); };
      hand((tn.getHours() % 12 + tn.getMinutes() / 60) * Math.PI / 6, 62, 9, '#222'); hand((tn.getMinutes() + sec / 60) * Math.PI / 30, 92, 6, '#222'); hand(sec * Math.PI / 30, 100, 3, '#e95420'); dct.needsUpdate = true; }
    if (phoneT > 0) { phoneT -= dt; phoneMat.color.setHex(Math.sin(phoneT * 30) > 0 ? 0xcfe8ff : 0x203a5a); } else phoneMat.color.setHex(0x203a5a);
    if (t - m2Last > 220) { m2Last = t; var g = mon2, W = 1024, H = 576, i; g.fillStyle = m2On ? '#04080f' : '#050506'; g.fillRect(0, 0, W, H);
      if (m2On) { g.fillStyle = '#0b1a2a'; g.fillRect(0, 0, W, 40); g.fillStyle = '#5cf0a0'; g.font = 'bold 20px monospace'; g.fillText('SOC // NETWORK WATCH', 16, 27); g.fillStyle = '#9ab'; g.fillText(tm() + '  ' + dshort(), W - 230, 27);
        m2Data.push(Math.max(6, Math.min(94, (m2Data[m2Data.length - 1] || 50) + (Math.random() - .5) * 22))); if (m2Data.length > 70) m2Data.shift();
        g.strokeStyle = '#123'; for (i = 0; i < 6; i++) { g.beginPath(); g.moveTo(16, 70 + i * 50); g.lineTo(600, 70 + i * 50); g.stroke(); } g.fillStyle = '#7ab'; g.font = '14px monospace'; g.fillText('INBOUND Mbps', 16, 62);
        var gr = g.createLinearGradient(0, 70, 0, 320); gr.addColorStop(0, 'rgba(60,220,255,.45)'); gr.addColorStop(1, 'rgba(60,220,255,0)'); g.beginPath(); g.moveTo(16, 320); m2Data.forEach(function (v, k) { g.lineTo(16 + k * 8.4, 320 - v * 2.4); }); g.lineTo(16 + (m2Data.length - 1) * 8.4, 320); g.fillStyle = gr; g.fill(); g.strokeStyle = '#3cdcff'; g.lineWidth = 2; g.beginPath(); m2Data.forEach(function (v, k) { k ? g.lineTo(16 + k * 8.4, 320 - v * 2.4) : g.moveTo(16, 320 - v * 2.4); }); g.stroke();
        m2Log.push((Math.random() < .12 ? 'WARN ' : 'ACK  ') + '10.0.' + ((Math.random() * 9) | 0) + '.' + ((Math.random() * 250) | 0) + ' > 192.168.1.5:' + [443, 22, 80, 8080][(Math.random() * 4) | 0] + ' len=' + ((Math.random() * 1400) | 0)); if (m2Log.length > 16) m2Log.shift();
        g.font = '13px monospace'; m2Log.forEach(function (l, k) { g.fillStyle = l.charAt(0) === 'W' ? '#fce94f' : '#6fe39a'; g.fillText(l, 630, 70 + k * 18); });
        [['THREATS', '0', '#5cf0a0'], ['ALERTS', '2', '#fce94f'], ['HOSTS', '14', '#3cdcff'], ['UPTIME', '99.9%', '#c8a0ff']].forEach(function (c, k) { g.fillStyle = '#0b1a2a'; g.fillRect(16 + k * 250, 410, 236, 130); g.fillStyle = '#789'; g.font = '16px monospace'; g.fillText(c[0], 30 + k * 250, 440); g.fillStyle = c[2]; g.font = 'bold 54px monospace'; g.fillText(c[1], 30 + k * 250, 508); }); }
      mt2.needsUpdate = true; }
    keys.forEach(function (k) { if (k.userData.p > 0) k.userData.p -= dt; k.position.y = k.userData.y0 - (k.userData.p > 0 ? .012 : 0); });
  }

  function hint(txt) { var h = $('rh'); h.textContent = txt || ''; h.hidden = !txt; }
  function frame(t) {
    if ($('room').classList.contains('off')) { last = t; requestAnimationFrame(frame); return; }
    var dt = Math.min((t - last) / 1000 || .016, .05); last = t;
    var d = tp - prog; if (Math.abs(d) > 1e-4) prog += Math.sign(d) * Math.min(Math.abs(d), dt * rate);
    var e = prog * prog * (3 - 2 * prog); PC.getPoint(e, C.position); LC.getPoint(e, C.userData.l = C.userData.l || new THREE.Vector3());
    if (mode === 'idle') { C.position.x += mxp * .5; C.position.y -= myp * .22; }
    C.lookAt(C.userData.l); C.fov = 40 + 8 * e; C.updateProjectionMatrix();
    ufo.position.x = -.8 + Math.sin(t / 3400) * 1.6; ufo.position.y = 2.9 + Math.sin(t / 800) * .06; ufo.rotation.z = Math.sin(t / 1600) * .15; alien.rotation.z = Math.sin(t / 500) * .06;
    anim(t, dt); drawScreen(t); R.render(S, C);
    if (zcb && prog >= .999) { var z = zcb; zcb = null; z(); }
    if (doneT && prog >= .999 && after) { var f = after; after = null; f(); }
    if (mode === 'out' && prog <= tp + 1e-3 && after) { var g = after; after = null; g(); }
    requestAnimationFrame(frame);
  }

  Q.room = {
    start: function (go) {
      try { build(); } catch (er) { console.error(er); go(false); return; }
      $('room').classList.remove('off'); hint(''); $('room').addEventListener('pointerdown', function (e) { if (mode === 'idle') { var o = pick(e); if (o) act(o); } else if (mode === 'in' && prog < .999) rate = 1 / 1.2; });
      addEventListener('pointermove', function (e) { mxp = e.clientX / innerWidth - .5; myp = e.clientY / innerHeight - .5; if (mode !== 'idle' || $('room').classList.contains('off')) { tip.hidden = true; return; } var o = pick(e); tip.hidden = !o; $('room').style.cursor = o ? 'pointer' : 'default'; if (o) { tip.textContent = LB[o.userData.k]; tip.style.left = e.clientX + 14 + 'px'; tip.style.top = e.clientY + 16 + 'px'; } });
      addEventListener('keydown', function (e) { if (mode !== 'idle') return; var k = e.key.toLowerCase(); if (k === 'l') act(IA.filter(function (o) { return o.userData.k === 'lamp'; })[0]); var ix = 'asdfghjk'.indexOf(k); if (ix > -1) play(keys[ix]); });
      go(true); requestAnimationFrame(frame); tp = 1;
    },
    zoomed: function (cb) { zcb = cb; },
    unlock: function () { locked = false; lastKey = ''; },
    arrive: function (cb) { doneT = true; after = function () { setTimeout(function () { $('room').classList.add('off'); cb(); }, 450); }; },
    out: function () { mode = 'out'; $('room').classList.remove('off'); rate = 1 / 3; tp = .3; after = function () { mode = 'idle'; hint('CLICK THINGS ON THE DESK  -  CLICK THE MACBOOK OR PRESS ENTER TO SIT DOWN'); }; },
    back: function (cb) { mode = 'in'; lastKey = ''; hint(''); rate = 1 / 3; tp = 1; doneT = true; after = function () { $('room').classList.add('off'); cb(); }; },
    mode: function () { return mode; }
  };
})();
