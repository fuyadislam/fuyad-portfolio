/* Linux PC intro: power on, neofetch, apt install, launch. Types with keyboard clicks. */
(function () {
  var Q = (window.Q = window.Q || {});
  var tt, skip = false;
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, skip ? Math.min(ms, 6) : ms); }); };
  function put(txt, cls) {
    var s = document.createElement('span');
    if (cls) s.className = cls;
    s.textContent = txt;
    tt.appendChild(s);
    tt.parentNode.scrollTop = tt.parentNode.scrollHeight;
    return s;
  }
  function prompt() { put('fuyad@ubuntu', 'u'); put(':'); put('~', 'p'); put('$ '); }
  async function typeCmd(txt) {
    prompt();
    for (var i = 0; i < txt.length; i++) {
      put(txt.charAt(i)); Q.sfx.key();
      await sleep(48 + Math.random() * 55);
    }
    Q.sfx.enter(); put('\n');
    await sleep(260);
  }
  async function okLine(label) {
    put(label + ' ...... ');
    await sleep(340);
    put('[ '); put(' OK ', 'ok'); put(' ]\n');
    Q.sfx.ok();
    await sleep(160);
  }

  var ART = [
    '  .-------------.  ',
    '  | .---------. |  ',
    '  | | FUYAD   | |  ',
    '  | | QUEST   | |  ',
    '  | \'---------\' |  ',
    '  |   +    o o  |  ',
    '  |  +++    o   |  ',
    '  \'-------------\'  '
  ];
  var INFO = [
    ['fuyad@ubuntu', 'u'], ['------------', 'd'],
    ['OS: Fuyad OS 2026 x86_64', ''], ['Host: TU Dublin, Dublin IE', ''],
    ['Kernel: digital-forensics 5.x', ''], ['Shell: python3', ''],
    ['Likes: AI | ML | software', ''], ['Projects: 4 installed', '']
  ];

  Q.runTerminal = async function (done) {
    tt = document.getElementById('tt');
    function sk() { skip = true; }
    addEventListener('pointerdown', sk); addEventListener('keydown', sk);
    await sleep(500);

    await typeCmd('neofetch');
    for (var i = 0; i < ART.length; i++) {
      put(ART[i], 'p'); put(INFO[i][0], INFO[i][1]); put('\n');
      await sleep(70);
    }
    put('                    ');
    ['#cc0000', '#4e9a06', '#c4a000', '#3465a4', '#75507b', '#06989a', '#d3d7cf'].forEach(function (c) { var s = put('███', ''); s.style.color = c; });
    put('\n\n'); await sleep(500);

    await typeCmd('sudo apt install adventure-mode');
    put('[sudo] password for fuyad: ');
    for (i = 0; i < 8; i++) { Q.sfx.key(); await sleep(70); }
    Q.sfx.enter(); put('\n'); await sleep(300);
    put('Reading package lists... Done\n'); await sleep(260);
    put('Building dependency tree... Done\n'); await sleep(260);
    put('The following NEW packages will be installed:\n  adventure-mode pixel-sprites chiptune-sfx\n', 'd'); await sleep(300);
    var bar = put('Unpacking adventure-mode (1.0) [');
    var fill = put('', ''); put('] ');
    for (i = 0; i <= 20; i++) { fill.textContent = '#'.repeat(i) + '.'.repeat(20 - i); await sleep(45); }
    put('\n'); put('Setting up adventure-mode (1.0) ...\n'); await sleep(400);

    await typeCmd('./adventure --start');
    await okLine('Loading pixel sprites');
    await okLine('Loading chiptune sound effects');
    await okLine('Building overworld map');
    await okLine('Loading trainer data');
    put('\nStarting adventure mode...\n', 'wn');
    await sleep(700);
    removeEventListener('pointerdown', sk); removeEventListener('keydown', sk);
    done();
  };
})();
