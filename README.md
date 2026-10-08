# Fuyad Islam — Portfolio

An interactive 3D scroll portfolio: a terminal-style intro, a starfield, and a 3D avatar that follows your cursor as you scroll through my résumé, projects and certifications.

**Live site:** https://fuyadislam.github.io/portfolio/

## About me

I'm a Digital Forensics & Cybersecurity student (BSc Computing) at TU Dublin, based in Dublin. I'm interested in security operations, digital forensics, threat detection and AI/ML, and I'm looking for a cybersecurity internship.

## Project structure

```
.
├── index.html          # page markup and content
├── css/
│   └── style.css       # layout, theme, animations
├── js/
│   ├── avatar.js       # Three.js scene, avatar face and scroll camera
│   ├── intro.js        # terminal boot sequence and title particles
│   └── starfield.js    # background starfield and planets
├── assets/
│   └── avatar.glb      # 3D avatar model
├── README.md
└── .gitignore
```

## Tech

- HTML, CSS, vanilla JavaScript
- [Three.js](https://threejs.org/) r128 with GLTFLoader (loaded from a CDN)
- Canvas 2D for the starfield and particle title
- Custom shader tweak for the avatar's drawn nose and mouth
- Hosted on Vercel

## Run locally

The avatar model loads with `fetch`, so open the site through a local server instead of double-clicking `index.html`:

```bash
git clone https://github.com/fuyadislam/portfolio.git
cd portfolio
python3 -m http.server 8000
```

Then visit http://localhost:8000. An internet connection is needed because Three.js and the fonts load from CDNs.

## Deploy

For GitHub Pages, open repository Settings → Pages, choose “Deploy from a branch”, select `main` and `/(root)`, then save. There is no build step.

## Contact

- LinkedIn: https://www.linkedin.com/in/fuyadislam
- GitHub: https://github.com/fuyadislam
