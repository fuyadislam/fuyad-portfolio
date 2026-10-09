/* CYBER QUEST: a small pixel adventure that holds the portfolio. */
(function () {
  var Q = window.Q, S = Q.sfx;
  var $ = function (i) { return document.getElementById(i); };
  var W = 320, H = 192, cv = $('cv'), cx = cv.getContext('2d'), ov = $('ov');
  cx.imageSmoothingEnabled = false;
  var scene = 'none', sel = 2, cur = 0, page = 0, last = 0;
  function R(c, x, y, w, h, col) { c.fillStyle = col; c.fillRect(x, y, w, h); }
  function shade(hex, f) { var n = parseInt(hex.slice(1), 16); return 'rgb(' + (((n >> 16) * f) | 0) + ',' + ((((n >> 8) & 255) * f) | 0) + ',' + (((n & 255) * f) | 0) + ')'; }
  var seed = 11;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function u(n) { return 'calc(var(--u)*' + n + ')'; }

  /* ---------- content ---------- */
  var B = [
    { id: 'about', lb: 'HOME', tx: 1, c: '#d8584a', say: 'HOME: my trainer card and quest log.' },
    { id: 'projects', lb: 'DEX', tx: 5, c: '#4a78d8', say: 'DEX HALL: four projects I built.' },
    { id: 'skills', lb: 'DOJO', tx: 9, c: '#e0a030', say: 'DOJO: the moves I have learned.' },
    { id: 'badges', lb: 'GYM', tx: 13, c: '#58a858', say: 'GYM: badges I earned on the way.' },
    { id: 'contact', lb: 'POST', tx: 17, c: '#a058c8', say: 'POST OFFICE: send me a message!' }
  ];
  var PRO = [
    { sn: 'DEFENSE AGENT', n: 'Attack-Defense Agent', ty: ['AI', 'SEC'], d: 'Two AI agents duel. One plans the attack, the other writes the defense.', mv: 'RECON, EXPLOIT, PRIVESC, EXFIL, COUNTER', st: 'PYTHON, LANGGRAPH, GROQ, LLAMA 3.3, STREAMLIT', u: 'https://github.com/tausif112/attack-defense-agent', ic: 'shield' },
    { sn: 'PACKET LOGGER', n: 'Packet Logger', ty: ['DFIR', 'NET'], d: 'Captures live or pcap traffic, then exports JSON, CSV and pcap.', mv: 'CAPTURE, IP, TCP, UDP, DNS', st: 'PYTHON, WIRESHARK', u: 'https://github.com/fuyadislam/Packet-Logger', ic: 'packets' },
    { sn: 'TRAFFIC WATCH', n: 'Network Traffic Analysis & Anomaly Detection', ty: ['SEC', 'DATA'], d: 'Reads traffic logs, builds reports and flags odd behaviour.', mv: 'PARSE, REPORT, FLAG ODD, JSONL', st: 'PYTHON', u: 'https://github.com/fuyadislam/Network-Traffic-Analysis-Anomaly-Detection', ic: 'graph' },
    { sn: 'F1 PREDICTOR', n: 'Formula 1 Race Prediction', ty: ['ML', 'DATA'], d: 'Predicts race results from practice, qualifying and weather.', mv: 'PRACTICE, QUALI, TRACK, WEATHER', st: 'PYTHON', u: 'https://github.com/fuyadislam/formula_1_prediction', ic: 'flag' }
  ];
  var SK = [
    ['PYTHON', 'CODE', 'Everything I build starts here.'], ['LINUX', 'OS', 'Home turf for tools and terminals.'],
    ['WIRESHARK', 'NET', 'Reads captured traffic packet by packet.'], ['SCAPY', 'NET', 'Builds and analyses packets in Python.'],
    ['NMAP', 'SCAN', 'Maps hosts and open ports.'], ['BURP SUITE', 'WEB', 'Tests how web apps behave.'],
    ['LANGGRAPH', 'AI', 'Orchestrates my attacker and defender agents.'], ['GROQ', 'AI', 'Fast LLM inference for my agents.'],
    ['STREAMLIT', 'UI', 'Turns scripts into quick demo apps.'], ['GIT', 'TOOL', 'Keeps every project on track.'],
    ['FORENSICS', 'DFIR', 'Works out what really happened.'], ['MACHINE LEARN', 'AI', 'Predicting outcomes from data.'],
    ['GEN AI', 'AI', 'A Google course badge in my bag.'], ['DATA ANALYSIS', 'DATA', 'Turning raw logs into answers.']
  ];
  var BD = [
    { n: 'MASTERCARD', full: 'Mastercard Cybersecurity Job Simulation', by: 'Forage', y: '2026', c: '#f0c020', u: 'https://www.theforage.com/completion-certificates/mfxGwGDp6WkQmtmTf/vcKAB5yYAgvemepGQ_mfxGwGDp6WkQmtmTf_6a4115c5dc925520a54be178_1782651743432_completion_certificate.pdf' },
    { n: 'IT SUPPORT', full: 'Technical Support Fundamentals', by: 'Google', y: '2025', c: '#58a0e8', u: 'https://www.coursera.org/account/accomplishments/verify/J24IAOOHIS00' },
    { n: 'GEN AI', full: 'Introduction to Generative AI', by: 'Google', y: '2024', c: '#58c878', u: 'https://www.cloudskillsboost.google/public_profiles/6996d883-ce97-4166-916f-bb2d18649375/badges/12768254' }
  ];
  var CT = [
    ['EMAIL', 'fuyadislam1@gmail.com', 'mailto:fuyadislam1@gmail.com'],
    ['GITHUB', 'github.com/fuyadislam', 'https://github.com/fuyadislam'],
    ['LINKEDIN', 'linkedin.com/in/fuyadislam', 'https://www.linkedin.com/in/fuyadislam']
  ];
  var LOG = [['MAY 2022', 'A-LEVELS BEGIN'], ['2024', 'TEACHER, MANGROVE SCHOOL'], ['NOV 2024', 'GOOGLE GEN AI BADGE'], ['2025', 'TU DUBLIN QUEST BEGINS'], ['OCT 2025', 'GOOGLE IT SUPPORT BADGE'], ['JUN 2026', 'MASTERCARD SIM BADGE'], ['SEP 2026', 'PEER MENTOR AT TU DUBLIN']];

  /* ---------- sprite ---------- */
  var BODY = ['.....HHHH.....', '....HHHHHH....', '...HHHHHHHH...', '..QHHHHHHHHQ..', '..QHSSSSSSHQ..', '..QSGGSSGGSQ..', '...SGESSEGS...', '...SSSSSSSS...', '....SSMMSS....', '.....SSSS.....', '...PPPPPPPP...', '..PPPPPPPPPP..', '..PPPPPPPPPP..', '...PPPPPPPP...'];
  var LEGS = { idle: ['....DD..DD....', '....DD..DD....'], a: ['....DD........', '...DD...DD....'], b: ['........DD....', '....DD..DD....'] };
  var PAL = { H: '#2a2018', S: '#c08a62', Q: '#4a4a56', G: '#1a1a22', E: '#f0f0f0', P: '#e07f86', M: '#8a3a3a', D: '#34406a' };
  function drawSpr(c, rows, x, y) {
    for (var j = 0; j < rows.length; j++) for (var i = 0; i < rows[j].length; i++) { var ch = rows[j].charAt(i); if (ch !== '.') R(c, x + i, y + j, 1, 1, PAL[ch]); }
  }
  function backView(rows) { return rows.map(function (r, j) { return j >= 4 && j <= 9 ? r.replace(/[SGEM]/g, 'H') : r; }); }
  var P = { x: 168, y: 124, dir: 1, wt: 0, st: 0, ent: false, pend: false, door: 0 };
  function doorX(i) { return (B[i].tx + 1) * 16 + 8; }

  /* ---------- world art ---------- */
  var world = document.createElement('canvas'); world.width = W; world.height = H;
  function tree(c, x, y) { R(c, x + 6, y + 10, 4, 6, '#7a4a2a'); R(c, x + 2, y + 2, 12, 10, '#2f8f3f'); R(c, x + 4, y, 8, 4, '#2f8f3f'); R(c, x + 3, y + 3, 3, 3, '#4fb85a'); }
  function buildWorld() {
    var c = world.getContext('2d'), i;
    R(c, 0, 0, W, H, '#6fc45e');
    for (i = 0; i < 150; i++) { var x = (rnd() * W) | 0, y = (rnd() * H) | 0; R(c, x, y, 2, 1, '#86d874'); R(c, x + 1, y - 1, 1, 1, '#86d874'); }
    for (i = 0; i < 18; i++) { var fx = (rnd() * W) | 0, fy = 130 + ((rnd() * 12) | 0); R(c, fx, fy, 2, 2, ['#f0f0f0', '#f0d050', '#f08090'][i % 3]); }
    R(c, 0, 112, W, 16, '#e6d6a0'); R(c, 0, 112, W, 1, '#c9b878'); R(c, 0, 127, W, 1, '#c9b878');
    B.forEach(function (b) {
      var x = b.tx * 16, dx = (b.tx + 1) * 16;
      R(c, dx, 96, 16, 16, '#e6d6a0'); R(c, dx, 96, 1, 16, '#c9b878'); R(c, dx + 15, 96, 1, 16, '#c9b878');
      R(c, x, 64, 48, 32, '#f2ead2'); R(c, x, 95, 48, 1, '#b8a880');
      R(c, x - 2, 38, 52, 28, b.c); R(c, x - 2, 38, 52, 3, shade(b.c, 0.8)); R(c, x - 2, 62, 52, 4, shade(b.c, 0.65));
      for (var k = 0; k < 5; k++) R(c, x - 2, 44 + k * 4, 52, 1, shade(b.c, 0.88));
      R(c, x + 6, 72, 8, 8, '#7ab8e8'); R(c, x + 34, 72, 8, 8, '#7ab8e8'); R(c, x + 6, 72, 8, 1, '#fff'); R(c, x + 34, 72, 8, 1, '#fff');
      R(c, x + 18, 72, 12, 24, '#6b4a2e'); R(c, x + 19, 73, 10, 22, '#8a6240'); R(c, x + 26, 84, 2, 2, '#f0d060');
    });
    [64, 128, 192, 256].forEach(function (tx) { tree(c, tx, 50); });
    tree(c, 0, 110 + 0); tree(c, 304, 132);
  }

  /* ---------- title screen art ---------- */
  var stars = [], sky = [];
  function buildTitle() {
    var i; seed = 5;
    for (i = 0; i < 60; i++) stars.push([(rnd() * W) | 0, (rnd() * 110) | 0, rnd() * 6.28]);
    for (i = 0; i < 20; i++) sky.push([i * 16, 36 + ((rnd() * 58) | 0), (rnd() * 1000) | 0]);
  }
  function drawTitle(t) {
    var g = cx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#150c3a'); g.addColorStop(0.55, '#6a2a78'); g.addColorStop(1, '#e8607a');
    cx.fillStyle = g; cx.fillRect(0, 0, W, H);
    stars.forEach(function (s) { var a = 0.4 + 0.6 * Math.abs(Math.sin(t / 700 + s[2])); cx.fillStyle = 'rgba(255,255,255,' + a.toFixed(2) + ')'; cx.fillRect(s[0], s[1], 1, 1); });
    cx.fillStyle = '#f8e8b8'; for (var dy = -9; dy <= 9; dy++) { var w = Math.round(Math.sqrt(81 - dy * dy)); cx.fillRect(250 - w, 40 + dy, w * 2, 1); }
    sky.forEach(function (b) { R(cx, b[0], H - b[1], 16, b[1], '#1a1030'); for (var k = 0; k < 6; k++) { var wx = b[0] + 3 + (k % 2) * 6, wy = H - b[1] + 6 + ((k / 2) | 0) * 9; if (((b[2] >> k) & 1)) R(cx, wx, wy, 2, 3, '#f8d878'); } });
    R(cx, 0, H - 20, W, 20, '#0e0a1c');
    drawSpr(cx, BODY.concat(LEGS.idle), 153, H - 36);
  }

  /* ---------- dialogue ---------- */
  var typer = null, full = '';
  function say(txt, done) {
    var el = $('dl'); if (!el) return;
    clearInterval(typer); full = txt; var i = 0; el.textContent = '';
    typer = setInterval(function () {
      i++; el.textContent = full.slice(0, i); if (i % 2 === 0) S.blip();
      if (i >= full.length) { clearInterval(typer); typer = null; if (done) done(); }
    }, 26);
  }
  function skipTyping() { if (typer) { clearInterval(typer); typer = null; var el = $('dl'); if (el) el.textContent = full; return true; } return false; }
  var DLG = '<div class="dlg"><span id="dl"></span><i class="arrow"></i></div>';
  function win(x, y, w, h, inner, cls) { return '<div class="win ' + (cls || '') + '" style="left:' + u(x) + ';top:' + u(y) + ';width:' + u(w) + ';height:' + u(h) + '">' + inner + '</div>'; }

  /* ---------- icons ---------- */
  var ICONS = {
    shield: function (c) { var y; for (y = 0; y < 12; y++) { var w = 12 - Math.max(0, y - 6) * 2; R(c, (16 - w) / 2, 2 + y, w, 1, '#3a78d8'); R(c, (16 - w) / 2, 2 + y, 1, 1, '#1c3c7c'); R(c, (16 - w) / 2 + w - 1, 2 + y, 1, 1, '#1c3c7c'); } R(c, 2, 2, 12, 1, '#1c3c7c'); R(c, 7, 4, 2, 8, '#fff'); R(c, 5, 6, 6, 2, '#fff'); },
    packets: function (c) { R(c, 2, 3, 12, 3, '#58c0a0'); R(c, 2, 3, 12, 1, '#2a8a70'); R(c, 2, 7, 9, 3, '#e8c040'); R(c, 2, 7, 9, 1, '#a88a20'); R(c, 2, 11, 12, 3, '#e06060'); R(c, 2, 11, 12, 1, '#a03838'); R(c, 12, 8, 2, 1, '#fff'); },
    graph: function (c) { R(c, 1, 14, 14, 1, '#444'); R(c, 1, 2, 1, 12, '#444'); [[2, 11], [4, 9], [6, 10], [8, 4], [10, 10], [12, 8], [14, 9]].forEach(function (p) { R(c, p[0], p[1], 2, 2, '#e8503a'); }); R(c, 8, 1, 2, 2, '#f0d040'); },
    flag: function (c) { R(c, 3, 1, 1, 14, '#ddd'); var i, j; for (i = 0; i < 4; i++) for (j = 0; j < 3; j++) R(c, 4 + i * 3, 2 + j * 3, 3, 3, (i + j) % 2 ? '#fff' : '#222'); },
    medal: function (c, col) { R(c, 4, 0, 3, 5, '#d04040'); R(c, 9, 0, 3, 5, '#4060d0'); var dy; for (dy = -5; dy <= 5; dy++) { var w = Math.round(Math.sqrt(30 - dy * dy)); R(c, 8 - w, 10 + dy, w * 2, 1, col); } R(c, 6, 8, 4, 1, '#fff'); R(c, 7, 7, 2, 5, '#fff'); R(c, 5, 9, 6, 1, '#fff'); }
  };
  function paintIcons() {
    [].forEach.call(ov.querySelectorAll('canvas[data-ic]'), function (el) {
      var c = el.getContext('2d'); c.clearRect(0, 0, 16, 16); ICONS[el.getAttribute('data-ic')](c, el.getAttribute('data-col'));
    });
  }

  /* ---------- world scene ---------- */
  function showWorld(firstTime) {
    scene = 'world'; setTimeout(function () { Q.dockOn(); }, 0); P.ent = false; P.pend = false; P.door = 0; P.y = 124; P.dir = 1;
    var h = '';
    B.forEach(function (b, i) { h += '<div class="lbl' + (i === sel ? ' on' : '') + '" style="left:' + u(b.tx * 16 + 24) + '">' + b.lb + '</div>'; });
    ov.innerHTML = h + DLG;
    say(firstTime ? 'Hi! I am Fuyad. Walk with LEFT and RIGHT, press A to enter a building.' : B[sel].say);
  }
  function setSel(i) {
    sel = (i + B.length) % B.length; S.move();
    [].forEach.call(ov.querySelectorAll('.lbl'), function (el, k) { el.classList.toggle('on', k === sel); });
    say(B[sel].say);
  }

  /* ---------- sections ---------- */
  function openSec(id) {
    scene = id; page = 0; cur = 0; renderSec(); Q.dockOn();
    var m = { about: S.card, projects: S.dex, skills: S.learn, badges: S.fanfare, contact: S.ring }[id]; if (m) m();
  }
  function renderSec() {
    var h = '<div class="sec">', i;
    if (scene === 'about') {
      if (page === 0) {
        h += win(8, 8, 90, 126, '<img class="pt" src="' + ('assets/avatar.png') + '" alt="Pixel render of the 3D avatar"><div class="cap">TRAINER<br>ID 2026</div>', 'tc');
        h += win(102, 8, 210, 126, '<div class="k">NAME</div> HKM FUYAD ISLAM<div class="k">CLASS</div> DIGITAL FORENSICS &amp;<br> CYBERSECURITY<div class="k">SCHOOL</div> TU DUBLIN 2025-2029<div class="k">LIKES</div> AI, ML, SOFTWARE DEV');
      } else {
        var l = ''; LOG.forEach(function (e) { l += '<div class="lg"><span class="k">' + e[0] + '</span> ' + e[1] + '</div>'; });
        h += win(8, 8, 304, 126, '<div class="k">QUEST LOG</div>' + l);
      }
    } else if (scene === 'projects') {
      var li = '<div class="k">DEX</div>'; PRO.forEach(function (p, k) { li += '<div class="it' + (k === cur ? ' on' : '') + '">' + p.sn + '</div>'; });
      h += win(8, 8, 118, 126, li, 'lst');
      var p = PRO[cur];
      h += win(130, 8, 182, 126, '<canvas class="ico" width="16" height="16" data-ic="' + p.ic + '"></canvas><div class="nm">' + p.n + '</div><div class="ty">' + p.ty.map(function (t) { return '<b>' + t + '</b>'; }).join('') + '</div><div class="mv"><span class="k">MOVES</span> ' + p.mv + '</div><div class="mv"><span class="k">STACK</span> ' + p.st + '</div>', 'det');
    } else if (scene === 'skills') {
      var c1 = '', c2 = '';
      SK.forEach(function (s, k) { var row = '<div class="it' + (k === cur ? ' on' : '') + '">' + s[0] + '<span class="tg">' + s[1] + '</span></div>'; if (k < 7) c1 += row; else c2 += row; });
      h += win(8, 8, 304, 126, '<div class="k">MOVES</div><div class="two"><div>' + c1 + '</div><div>' + c2 + '</div></div>');
    } else if (scene === 'badges') {
      var bs = ''; BD.forEach(function (b, k) { bs += '<div class="bd' + (k === cur ? ' on' : '') + '"><canvas class="med" width="16" height="16" data-ic="medal" data-col="' + b.c + '"></canvas><div>' + b.n + '</div></div>'; });
      h += win(8, 8, 304, 126, '<div class="k">BADGES</div><div class="row3">' + bs + '</div>');
    } else if (scene === 'contact') {
      var cs = '<div class="k">POST OFFICE</div>'; CT.forEach(function (c, k) { cs += '<div class="it big' + (k === cur ? ' on' : '') + '">' + c[0] + '<div class="k">' + c[1] + '</div></div>'; });
      h += win(8, 8, 304, 126, cs);
    }
    ov.innerHTML = h + '</div>' + DLG; paintIcons();
    var t = '';
    if (scene === 'about') t = page === 0 ? 'I trace what happened on a network and build AI agents and tools. A: next' : 'Every quest taught me something new. A or B: leave.';
    else if (scene === 'projects') t = PRO[cur].d + ' A: open on GitHub';
    else if (scene === 'skills') t = SK[cur][2];
    else if (scene === 'badges') t = BD[cur].full + ' by ' + BD[cur].by + ', ' + BD[cur].y + '. A: verify.';
    else if (scene === 'contact') t = 'Send me a message! A: open.';
    say(t);
  }
  function leaveSec() { S.back(); wipe(function () { showWorld(false); }); }
  function openUrl(u2) { if (u2.indexOf('mailto:') === 0) location.href = u2; else window.open(u2, '_blank', 'noopener'); }

  function secKey(k) {
    var n = { projects: PRO.length, skills: SK.length, badges: BD.length, contact: CT.length }[scene] || 0, old = cur;
    if (k === 'b') { leaveSec(); return; }
    if (scene === 'about') { if (k === 'a') { if (skipTyping()) return; if (page === 0) { page = 1; S.sel(); renderSec(); } else leaveSec(); } return; }
    if (scene === 'projects') { if (k === 'up') cur = (cur + n - 1) % n; else if (k === 'down') cur = (cur + 1) % n; else if (k === 'a') { S.sel(); openUrl(PRO[cur].u); return; } }
    else if (scene === 'skills') { if (k === 'up') cur = (cur + n - 1) % n; else if (k === 'down') cur = (cur + 1) % n; else if (k === 'left' && cur >= 7) cur -= 7; else if (k === 'right' && cur < 7) cur = Math.min(cur + 7, n - 1); }
    else if (scene === 'badges') { if (k === 'left') cur = (cur + n - 1) % n; else if (k === 'right') cur = (cur + 1) % n; else if (k === 'a') { S.sel(); openUrl(BD[cur].u); return; } }
    else if (scene === 'contact') { if (k === 'up') cur = (cur + n - 1) % n; else if (k === 'down') cur = (cur + 1) % n; else if (k === 'a') { S.sel(); openUrl(CT[cur][2]); return; } }
    if (cur !== old) { S.move(); if (scene === 'skills') S.learn(); if (scene === 'projects') S.dex(); renderSec(); }
  }

  /* ---------- flow ---------- */
  function wipe(cb) {
    var w = $('wipe'); w.classList.remove('on'); void w.offsetWidth; w.classList.add('on');
    setTimeout(cb, 450); setTimeout(function () { w.classList.remove('on'); }, 950);
  }
  Q.wipe = wipe; Q.openSec = function (id) { openSec(id); };
  function dockOn() { [].forEach.call(document.querySelectorAll('#dock button'), function (b) { b.classList.toggle('on', b.getAttribute('data-go') === scene); }); }
  Q.go = function (id) { if (scene === 'none') return; S.sel(); if (scene === id) return; wipe(function () { openSec(id); dockOn(); }); };
  Q.dockOn = dockOn;
  function showTitle() {
    scene = 'title';
    ov.innerHTML = '<div class="logo">CYBER<br>QUEST</div><div class="sub">A DIGITAL FORENSICS ADVENTURE</div><div class="ps">PRESS START</div><div class="cr">2026 HKM FUYAD ISLAM</div>';
    S.title();
  }
  Q.enterGame = function () { $('desk').hidden = false; showTitle(); };
  function press(k) {
    Q.unlock();
    if (scene === 'title') { if (k === 'a' || k === 'start') { S.sel(); wipe(function () { showWorld(true); }); } return; }
    if (scene === 'world') {
      if (P.ent || P.door) return;
      if (k === 'left') setSel(sel - 1); else if (k === 'right') setSel(sel + 1);
      else if (k === 'a' || k === 'up') { if (skipTyping() && k === 'a') return; P.pend = true; S.sel(); }
      return;
    }
    if (scene !== 'none') secKey(k);
  }
  Q.press = press;

  /* ---------- loop ---------- */
  function update(dt) {
    if (scene !== 'world') return;
    var tx = doorX(sel), dx = tx - P.x;
    if (P.ent) { P.y -= 50 * dt; P.wt += dt; P.st += dt; if (P.st > 0.18) { P.st = 0; S.step(); } if (P.y <= 100) { P.y = 100; P.ent = false; P.door = 1; S.door(); setTimeout(function () { wipe(function () { openSec(B[sel].id); }); }, 350); } return; }
    if (Math.abs(dx) > 1) { P.x += Math.sign(dx) * Math.min(84 * dt, Math.abs(dx)); P.dir = Math.sign(dx); P.wt += dt; P.st += dt; if (P.st > 0.18) { P.st = 0; S.step(); } }
    else { P.wt = 0; if (P.pend) { P.pend = false; P.ent = true; } }
  }
  function frame(t) {
    var dt = Math.min((t - last) / 1000 || 0.016, 0.05); last = t;
    update(dt);
    if (scene === 'title') drawTitle(t);
    else if (scene === 'world') {
      cx.drawImage(world, 0, 0);
      var b = B[sel]; if (P.door) { R(cx, b.tx * 16 + 19, 73, 10, 22, '#140c1c'); }
      var legs = LEGS.idle, rows;
      if (P.ent || Math.abs(doorX(sel) - P.x) > 1) legs = (Math.floor(P.wt * 8) % 2) ? LEGS.a : LEGS.b;
      rows = BODY.concat(legs); if (P.ent) rows = backView(rows);
      if (!P.door) drawSpr(cx, rows, Math.round(P.x - 7), Math.round(P.y - 16));
    }
    requestAnimationFrame(frame);
  }

  /* ---------- input ---------- */
  var KEYS = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down', a: 'left', d: 'right', w: 'up', s: 'down', Enter: 'a', ' ': 'a', z: 'a', Escape: 'b', Backspace: 'b', x: 'b' };
  addEventListener('keydown', function (e) { if ($('desk').hidden) return; var k = KEYS[e.key]; if (k) { e.preventDefault(); press(k); } });
  [].forEach.call(document.querySelectorAll('[data-k]'), function (b) { b.addEventListener('pointerdown', function (e) { e.preventDefault(); press(b.getAttribute('data-k')); }); });
  ov.addEventListener('pointerdown', function (e) {
    var l = e.target.closest ? e.target.closest('.lbl') : null;
    if (scene === 'world' && l) { var i = [].indexOf.call(ov.querySelectorAll('.lbl'), l); if (i >= 0) { if (i === sel) press('a'); else setSel(i); } }
    else if (scene === 'title') press('start');
    else if (scene !== 'world' && scene !== 'none') { var it = e.target.closest ? e.target.closest('.it,.bd') : null; if (it) { var all = [].slice.call(ov.querySelectorAll('.it,.bd')), idx = all.indexOf(it); if (idx >= 0 && idx !== cur && scene !== 'about') { cur = idx; S.move(); renderSec(); } else if (idx === cur) press('a'); } }
  });
  var mb = $('mute');
  function paintMute() { mb.textContent = Q.isMuted() ? 'SOUND: OFF' : 'SOUND: ON'; }
  mb.onclick = function () { Q.unlock(); Q.setMute(!Q.isMuted()); paintMute(); if (!Q.isMuted()) S.sel(); };
  paintMute();

  buildWorld(); buildTitle(); requestAnimationFrame(frame);
})();
