/* Boot flow: power button, BIOS, Linux terminal, then the game. */
(function () {
  var Q = window.Q, $ = function (i) { return document.getElementById(i); }, on = false;
  var BIOS = ['FUYAD BIOS v1.0', 'MEMORY TEST: 16384K OK', 'DETECTING DRIVES ... OK', 'BOOTING FROM DISK ...'];
  function power() {
    if (on) return; on = true;
    removeEventListener('keydown', power); removeEventListener('pointerdown', power);
    Q.unlock(); Q.sfx.post();
    $('pwh').style.display = 'none';
    var pre = $('pwt'), i = 0;
    (function next() {
      if (i < BIOS.length) { pre.textContent += BIOS[i++] + '\n'; setTimeout(next, 330); }
      else setTimeout(function () {
        $('pw').style.display = 'none'; $('term').hidden = false;
        function fin() { Q.wipe(function () { $('term').hidden = true; Q.enterGame(); }); Q.sfx.whoosh(); }
        Q.room.start(function (ok) {
          if (!ok) { $('term').classList.remove('bg'); Q.runTerminal(fin); return; }
          Q.room.zoomed(function () { Q.room.unlock(); Q.runTerminal(function () { Q.sfx.whoosh(); Q.room.arrive(function () { $('term').hidden = true; Q.enterGame(); }); }); });
        });
      }, 450);
    })();
  }
  [].forEach.call(document.querySelectorAll('#dock button'), function (b) { b.onclick = function () { var id = b.getAttribute('data-go'); if (id === 'room') $('zo').click(); else Q.go(id); }; });
  addEventListener('pointermove', function (e) { var d = $('desk'); d.style.setProperty('--tx', ((e.clientX / innerWidth - .5) * 9).toFixed(2) + 'deg'); d.style.setProperty('--ty', ((.5 - e.clientY / innerHeight) * 6).toFixed(2) + 'deg'); });
  function tick() { $('clk').textContent = Q.clock(); } tick(); setInterval(tick, 15000);
  $('zo').onclick = function () { $('desk').hidden = true; Q.sfx.whoosh(); Q.room.out(); };
  function sit() { if (Q.room.mode() === 'idle') { Q.sfx.whoosh(); Q.room.back(function () { $('desk').hidden = false; }); } }
  addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') sit(); }); Q.room.onSit = sit;
  addEventListener('keydown', power); addEventListener('pointerdown', power);
})();
