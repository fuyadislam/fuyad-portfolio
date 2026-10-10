# HKM Fuyad Islam: Cyber Quest

A portfolio you play. A realistic 3D room that follows your real time (the clocks show your local time and the window shows day, dusk or night) with a MacBook, a second monitor, a lamp and more on a wooden desk. The camera flies in until the MacBook screen fills the view, the coding starts, and a Linux desktop opens with a small 16-bit adventure. Walk to a building and press A:

| Building | What is inside |
| --- | --- |
| HOME | Trainer card and quest log |
| DEX | Projects |
| DOJO | Skills |
| GYM | Certificates |
| POST | Email, GitHub and LinkedIn |

The dock on the left jumps straight to any section. **ZOOM OUT** takes you back to the room, where you can switch the lamp on and off (click it or press **L**), play the mini synth (click the keys or press **A S D F G H J K**), sip the coffee, ring the phone and more. Click the MacBook or press Enter to sit back down.

Works on phones and tablets in portrait and landscape: the camera adapts to the screen shape, the dock moves to the bottom in portrait, and the touch controls move to the sides in landscape. All sounds are soft, synthesised on the fly, and can be muted with the SOUND button.

**Controls:** arrow keys or WASD to move, Enter, Space or Z for A, Esc, Backspace or X for B. On touch screens use the on-screen buttons.

## How this repo is organised

```
.
├── index.html        # the finished site, one self-contained file (this is what gets hosted)
├── src/              # the readable source: HTML, CSS, JavaScript and the avatar image
│   ├── index.html
│   ├── css/          # style.css, desktop.css
│   ├── js/           # audio, terminal, room (3D), wall, game, main
│   └── assets/avatar.png
├── build.js          # optional: rebuilds index.html from src/ (node build.js)
├── vercel.json
├── .nojekyll
├── .gitattributes
├── .gitignore
└── README.md
```

`index.html` in the root already contains all the CSS, JavaScript and the image, so it works even if nothing else is uploaded. Edit the files in `src/`, run `node build.js`, and commit the new `index.html`.

## Deploy on Vercel

1. Push this repo to GitHub.
2. On vercel.com choose **Add New, Project** and import the repo.
3. Leave **Framework Preset** as **Other**, and leave Build Command and Output Directory empty. Click **Deploy**.

## Deploy on GitHub Pages

Open the repo, go to **Settings, Pages**, set the source to **Deploy from a branch**, pick `main` and `/ (root)`, and save.

## Run locally

Double-click `index.html`, or run `python3 -m http.server 8000` and open http://localhost:8000. An internet connection is needed because Three.js and the fonts load from CDNs.

## Tech

Plain HTML, CSS and JavaScript. [Three.js](https://threejs.org/) r128 for the 3D room, Canvas 2D for the pixel world, Web Audio for all sounds (no audio files). Fonts: Press Start 2P and Ubuntu Mono from Google Fonts.
