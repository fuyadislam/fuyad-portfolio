// Optional: rebuilds the self-contained index.html from the readable files in src/.
// Run with: node build.js   (no packages needed)
const fs = require('fs'), path = require('path');
const R = (p) => fs.readFileSync(path.join(__dirname, 'src', p), 'utf8');
const png = fs.readFileSync(path.join(__dirname, 'src', 'assets', 'avatar.png')).toString('base64');
let h = R('index.html');
h = h.replace('<link rel="stylesheet" href="css/style.css">', () => '<style>\n' + R('css/style.css') + '\n' + R('css/desktop.css') + '\n</style>')
     .replace('\n<link rel="stylesheet" href="css/desktop.css">', '');
h = h.replace(/<script src="(js\/[^"]+)"><\/script>/g, (m, s) => {
  let c = R(s);
  if (s === 'js/game.js') c = c.split("'assets/avatar.png'").join("'data:image/png;base64," + png + "'");
  return '<script>\n' + c + '\n</script>';
});
fs.writeFileSync(path.join(__dirname, 'index.html'), h);
console.log('index.html built (' + Math.round(h.length / 1024) + ' KB)');
