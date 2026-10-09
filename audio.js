/* Sound engine: every effect is synthesised with the Web Audio API, no audio files. */
(function () {
  var Q = (window.Q = window.Q || {});
  var AC = null, MG = null, muted = false;
  try { muted = localStorage.getItem('q-mute') === '1'; } catch (e) {}

  function au() {
    if (!AC) {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      AC = new C();
      MG = AC.createGain();
      MG.gain.value = muted ? 0 : 0.9;
      MG.connect(AC.destination);
    }
    if (AC.state === 'suspended') AC.resume();
    return AC;
  }
  function tone(f, t0, d, type, v, f2) {
    var a = au(); if (!a || muted) return;
    var o = a.createOscillator(), g = a.createGain(), t = a.currentTime + t0;
    o.type = type || 'square';
    o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(v || 0.1, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(MG);
    o.start(t); o.stop(t + d + 0.03);
  }
  function noise(t0, d, v, f, q) {
    var a = au(); if (!a || muted) return;
    var n = Math.floor(a.sampleRate * d), b = a.createBuffer(1, n, a.sampleRate), x = b.getChannelData(0), i;
    for (i = 0; i < n; i++) x[i] = (Math.random() * 2 - 1) * (1 - i / n);
    var s = a.createBufferSource(); s.buffer = b;
    var fl = a.createBiquadFilter(); fl.type = 'bandpass'; fl.frequency.value = f || 2500; fl.Q.value = q || 1;
    var g = a.createGain(); g.gain.value = v || 0.2;
    s.connect(fl); fl.connect(g); g.connect(MG);
    s.start(a.currentTime + t0);
  }
  function seq(notes, step, type, v) {
    var t = 0;
    notes.forEach(function (n) { if (n[0]) tone(n[0], t, n[1] * step * 1.1, type || 'square', v || 0.08); t += n[1] * step; });
  }

  var SFX = {
    /* Linux PC: keyboard, BIOS beep, boot ticks */
    key: function () { noise(0, 0.018, 0.35, 2200 + Math.random() * 1800, 2); tone(140 + Math.random() * 50, 0, 0.02, 'square', 0.03); },
    enter: function () { noise(0, 0.035, 0.32, 1400, 1); tone(190, 0, 0.07, 'square', 0.06); },
    post: function () { tone(1000, 0, 0.16, 'square', 0.08); },
    ok: function () { tone(880, 0, 0.05, 'square', 0.06); tone(1320, 0.05, 0.07, 'square', 0.06); },
    /* game UI */
    blip: function () { tone(420 + Math.random() * 90, 0, 0.035, 'square', 0.045); },
    move: function () { tone(660, 0, 0.04, 'square', 0.07); },
    sel: function () { tone(784, 0, 0.05, 'square', 0.08); tone(1175, 0.05, 0.09, 'square', 0.08); },
    back: function () { tone(440, 0, 0.06, 'square', 0.07); tone(300, 0.05, 0.09, 'square', 0.07); },
    step: function () { noise(0, 0.04, 0.12, 500, 0.8); },
    door: function () { noise(0, 0.2, 0.18, 900, 1.5); tone(180, 0, 0.22, 'sawtooth', 0.05, 90); },
    whoosh: function () { noise(0, 0.7, 0.22, 1200, 0.6); tone(900, 0, 0.6, 'square', 0.05, 120); },
    /* one signature sound per building */
    title: function () { seq([[523, 1], [659, 1], [784, 1], [1047, 2], [784, 1], [1047, 3]], 0.12, 'square', 0.08); tone(262, 0, 1.3, 'triangle', 0.1); },
    card: function () { tone(1200, 0, 0.08, 'triangle', 0.1); tone(1600, 0.07, 0.14, 'triangle', 0.1); },
    dex: function () { seq([[880, 0.5], [1100, 0.5], [1320, 0.5], [1760, 1]], 0.07, 'square', 0.06); },
    learn: function () { tone(300, 0, 0.38, 'square', 0.07, 1400); tone(600, 0.1, 0.3, 'triangle', 0.06, 1800); },
    fanfare: function () { seq([[523, 1], [784, 1], [1047, 1], [784, 0.5], [1047, 0.5], [1319, 3]], 0.11, 'square', 0.08); seq([[262, 2], [392, 1], [523, 3]], 0.11, 'triangle', 0.1); },
    ring: function () { for (var i = 0; i < 4; i++) { tone(440, i * 0.28, 0.12, 'sine', 0.12); tone(480, i * 0.28, 0.12, 'sine', 0.12); } }
  };

  Q.sfx = SFX;
  Q.unlock = au;
  Q.isMuted = function () { return muted; };
  Q.setMute = function (m) {
    muted = !!m;
    try { localStorage.setItem('q-mute', muted ? '1' : '0'); } catch (e) {}
    if (MG) MG.gain.value = muted ? 0 : 0.9;
  };
})();
