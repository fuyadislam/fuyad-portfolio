/* Sound engine: every effect is synthesised with the Web Audio API (no audio files).
   Soft, natural sounds: filtered noise for clicks and air, sine "bells" for chimes, all through a gentle low-pass and compressor. */
(function () {
  var Q = (window.Q = window.Q || {});
  var AC = null, MG = null, muted = false, lastBlip = 0;
  try { muted = localStorage.getItem('q-mute') === '1'; } catch (e) {}

  function au() {
    if (!AC) {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      AC = new C();
      MG = AC.createGain(); MG.gain.value = muted ? 0 : 0.7;
      var lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 5200; lp.Q.value = 0.4;
      var cp = AC.createDynamicsCompressor(); cp.threshold.value = -20; cp.ratio.value = 4; cp.attack.value = 0.005; cp.release.value = 0.2;
      MG.connect(lp); lp.connect(cp); cp.connect(AC.destination);
    }
    if (AC.state === 'suspended') AC.resume();
    return AC;
  }
  /* one soft tone with a gentle attack and a natural decay */
  function tone(f, t0, d, type, v, f2) {
    var a = au(); if (!a || muted) return;
    var o = a.createOscillator(), g = a.createGain(), t = a.currentTime + t0;
    o.type = type || 'sine';
    o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(v || 0.05, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(MG);
    o.start(t); o.stop(t + d + 0.05);
  }
  /* bell: fundamental plus two quiet overtones, like a small chime */
  function bell(f, t0, d, v) { tone(f, t0, d, 'sine', v); tone(f * 2.01, t0, d * 0.6, 'sine', v * 0.28); tone(f * 3.02, t0, d * 0.35, 'sine', v * 0.1); }
  /* filtered noise burst: type is the filter type, f the centre frequency, sweep an optional end frequency */
  function noise(t0, d, v, f, q, type, sweep) {
    var a = au(); if (!a || muted) return;
    var n = Math.floor(a.sampleRate * d), b = a.createBuffer(1, n, a.sampleRate), x = b.getChannelData(0), i, t = a.currentTime + t0;
    for (i = 0; i < n; i++) x[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 1.6);
    var s = a.createBufferSource(); s.buffer = b;
    var fl = a.createBiquadFilter(); fl.type = type || 'bandpass'; fl.frequency.setValueAtTime(f || 2500, t); fl.Q.value = q || 1;
    if (sweep) fl.frequency.exponentialRampToValueAtTime(sweep, t + d);
    var g = a.createGain(); g.gain.value = v || 0.1;
    s.connect(fl); fl.connect(g); g.connect(MG);
    s.start(t);
  }
  function seq(notes, step, v) {
    var t = 0;
    notes.forEach(function (n) { if (n[0]) bell(n[0], t, n[1] * step * 2.2, v || 0.06); t += n[1] * step; });
  }
  var r = Math.random;

  var SFX = {
    /* keyboard and boot: soft mechanical clicks, a quiet beep */
    key: function () { noise(0, 0.016, 0.09, 2800 + r() * 1800, 1.2); tone(170 + r() * 60, 0, 0.035, 'sine', 0.035); },
    enter: function () { noise(0, 0.03, 0.11, 1700, 1); tone(120, 0, 0.07, 'sine', 0.06); },
    post: function () { tone(880, 0, 0.18, 'sine', 0.045); },
    ok: function () { bell(660, 0, 0.3, 0.04); bell(880, 0.07, 0.35, 0.04); },
    /* game interface: quiet ticks and chimes */
    blip: function () { var n = performance.now(); if (n - lastBlip < 55 || r() < 0.4) return; lastBlip = n; tone(300 + r() * 70, 0, 0.03, 'sine', 0.016); },
    move: function () { noise(0, 0.012, 0.05, 2200, 1); tone(520, 0, 0.03, 'sine', 0.02); },
    sel: function () { bell(784, 0, 0.35, 0.05); bell(1175, 0.06, 0.4, 0.045); },
    back: function () { tone(440, 0, 0.12, 'sine', 0.045, 300); },
    step: function () { noise(0, 0.05, 0.06, 420, 0.7, 'lowpass'); },
    door: function () { noise(0, 0.22, 0.07, 320, 1.2); tone(110, 0, 0.18, 'sine', 0.06, 70); },
    whoosh: function () { noise(0, 0.9, 0.09, 300, 0.5, 'bandpass', 1800); noise(0.35, 0.6, 0.05, 1800, 0.5, 'bandpass', 500); },
    /* building sounds: soft bells */
    title: function () { seq([[523, 1], [659, 1], [784, 1], [1047, 2]], 0.16, 0.05); },
    card: function () { bell(1047, 0, 0.35, 0.05); bell(1319, 0.08, 0.4, 0.045); },
    dex: function () { seq([[880, 0.6], [1100, 0.6], [1320, 0.6], [1760, 1]], 0.09, 0.04); },
    learn: function () { tone(300, 0, 0.45, 'sine', 0.045, 900); bell(784, 0.18, 0.5, 0.04); },
    fanfare: function () { seq([[523, 1], [659, 1], [784, 1], [1047, 3]], 0.14, 0.05); tone(262, 0, 0.9, 'sine', 0.04); },
    ring: function () { for (var i = 0; i < 3; i++) { bell(1319, i * 0.4, 0.3, 0.05); bell(1760, i * 0.4 + 0.12, 0.3, 0.04); } },
    /* room objects */
    lamp: function (on) { noise(0, 0.008, 0.12, 2600, 1); tone(on ? 1300 : 900, 0, 0.02, 'sine', 0.025); tone(120, 0, 0.05, 'sine', 0.06); noise(0.03, 0.03, 0.05, 900, 1); },
    sip: function () { noise(0, 0.25, 0.06, 550, 0.8, 'lowpass'); tone(210, 0.05, 0.14, 'sine', 0.025, 130); },
    alien: function () { tone(520, 0, 0.12, 'sine', 0.04, 760); tone(760, 0.13, 0.16, 'sine', 0.035, 560); },
    book: function () { noise(0, 0.16, 0.05, 3400, 0.5, 'bandpass', 1500); },
    phone: function () { bell(1319, 0, 0.35, 0.05); bell(1760, 0.13, 0.4, 0.045); },
    chord: function () { [392, 494, 587].forEach(function (f, i) { bell(f, i * 0.09, 0.9, 0.04); }); },
    /* synth key: a soft electric piano */
    note: function (f) { tone(f, 0, 1.3, 'sine', 0.11); tone(f * 2, 0, 0.7, 'sine', 0.03); tone(f * 4.01, 0, 0.18, 'sine', 0.012); noise(0, 0.01, 0.03, 3000, 1); }
  };

  Q.sfx = SFX;
  Q.unlock = au;
  Q.isMuted = function () { return muted; };
  Q.setMute = function (m) {
    muted = !!m;
    try { localStorage.setItem('q-mute', muted ? '1' : '0'); } catch (e) {}
    if (MG) MG.gain.value = muted ? 0 : 0.7;
  };
})();
