/* Alien-world wallpaper for the desktop: stars, nebula, ringed planet, moon, alien city, UFO. */
(function () {
  var c = document.getElementById('wall'), g = c.getContext('2d'), W = 0, H = 0, S = [], B = [], mx = 0, my = 0, i;
  function rs() { W = c.width = Math.ceil(innerWidth / 3); H = c.height = Math.ceil(innerHeight / 3); }
  rs(); addEventListener('resize', rs);
  addEventListener('pointermove', function (e) { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
  for (i = 0; i < 150; i++) S.push([Math.random(), Math.random() * .8, .2 + Math.random() * .8, Math.random() * 6.28]);
  for (i = 0; i < 40; i++) B.push([i / 40, 8 + Math.random() * 30, 2 + (Math.random() * 3 | 0), Math.random() > .5 ? 1 : 0, Math.random()]);
  function frame(t) {
    requestAnimationFrame(frame);
    if (document.getElementById('desk').hidden) return;
    var s = t / 1000, k, r, x, y, gr;
    gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#080320'); gr.addColorStop(.55, '#2a0f5e'); gr.addColorStop(1, '#0f8a86');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    [[.2, .3, .5, 'rgba(255,60,170,.22)'], [.75, .5, .45, 'rgba(60,200,255,.18)'], [.5, .15, .35, 'rgba(160,90,255,.22)']].forEach(function (n) {
      var rg = g.createRadialGradient(n[0] * W - mx * 6, n[1] * H, 0, n[0] * W - mx * 6, n[1] * H, n[2] * W); rg.addColorStop(0, n[3]); rg.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = rg; g.fillRect(0, 0, W, H);
    });
    S.forEach(function (st) { var a = .35 + .65 * Math.abs(Math.sin(s * st[2] + st[3])); g.fillStyle = 'rgba(255,255,255,' + a.toFixed(2) + ')'; g.fillRect(((st[0] * W - mx * st[2] * 14) % W + W) % W | 0, st[1] * H - my * st[2] * 6 | 0, st[2] > .8 ? 2 : 1, 1); });
    x = W * .78 - mx * 10; y = H * .3 - my * 6; r = H * .2;
    g.save(); g.translate(x, y); g.rotate(-.35);
    g.strokeStyle = 'rgba(255,200,150,.55)'; g.lineWidth = 3; g.beginPath(); g.ellipse(0, 0, r * 1.9, r * .5, 0, Math.PI, 6.28); g.stroke();
    gr = g.createLinearGradient(-r, -r, r, r); gr.addColorStop(0, '#ffb070'); gr.addColorStop(.6, '#e0508a'); gr.addColorStop(1, '#5a1a6a'); g.fillStyle = gr; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
    g.fillStyle = 'rgba(255,255,255,.12)'; for (k = -2; k < 3; k++) g.fillRect(-r * .9, k * r * .3, r * 1.8, 2);
    g.beginPath(); g.ellipse(0, 0, r * 1.9, r * .5, 0, 0, Math.PI); g.stroke(); g.restore();
    x = W * .16 - mx * 5; y = H * .26; g.fillStyle = '#8ff0e0'; g.beginPath(); g.arc(x, y, H * .05, 0, 7); g.fill(); g.fillStyle = 'rgba(0,80,90,.35)'; g.fillRect(x - 4, y - 2, 4, 3); g.fillRect(x + 1, y + 2, 3, 2);
    for (k = 0; k < 2; k++) { g.fillStyle = k ? '#04101c' : '#0a1a2c'; var base = H * (k ? .98 : .9) - my * (k ? 3 : 6);
      B.forEach(function (b) { var bx = ((b[0] * W + (k ? 12 : 0) - mx * (k ? 14 : 8)) % W + W) % W, bh = b[1] * (k ? 1.4 : .9); g.fillRect(bx, base - bh, b[2] * 3, bh); if (b[3]) g.fillRect(bx + 3, base - bh - 6, 1, 6);
        if (!k && b[4] > .4) { g.fillStyle = '#7ff7e6'; g.fillRect(bx + 1, base - bh + 4, 1, 2); g.fillStyle = '#0a1a2c'; } }); }
    x = ((s * 14) % (W + 90)) - 45; y = H * .16 + Math.sin(s * 1.6) * 3;
    gr = g.createLinearGradient(x, y, x, y + H * .5); gr.addColorStop(0, 'rgba(160,255,200,' + (Math.sin(s / 2) > .6 ? .28 : 0) + ')'); gr.addColorStop(1, 'rgba(160,255,200,0)'); g.fillStyle = gr; g.beginPath(); g.moveTo(x - 4, y + 3); g.lineTo(x + 4, y + 3); g.lineTo(x + 14, y + H * .5); g.lineTo(x - 14, y + H * .5); g.fill();
    g.fillStyle = '#9ab0c8'; g.beginPath(); g.ellipse(x, y, 11, 3.5, 0, 0, 7); g.fill(); g.fillStyle = '#7de8ff'; g.beginPath(); g.ellipse(x, y - 2, 5, 3.5, 0, Math.PI, 6.28); g.fill();
    for (k = -1; k < 2; k++) { g.fillStyle = Math.sin(s * 5 + k) > 0 ? '#ffe060' : '#ff5090'; g.fillRect(x + k * 5 - 1, y + 1, 2, 1); }
  }
  requestAnimationFrame(frame);
})();
