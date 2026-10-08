# Fuyad Islam — 3D Portfolio

A single-page, scroll-driven 3D portfolio built with HTML, CSS, and vanilla JavaScript, using [Three.js](https://threejs.org/) and GLTFLoader for the interactive 3D scene. The experience combines responsive design, smooth scroll-driven camera movement, animations, and an embedded 3D model to showcase my background, projects, skills, and contact details.

**Live site:** https://YOUR-PROJECT.vercel.app

## About me

I'm a Digital Forensics & Cybersecurity student (BSc Computing) at TU Dublin, based in Dublin. I'm interested in security operations, digital forensics, threat detection, and AI/ML, and I'm currently looking for a cybersecurity internship.

## What's on the page

- A short introduction and personal profile
- Education and experience timeline
- Selected cybersecurity, forensics, AI, networking, and software projects
- Certifications and skills
- GitHub, LinkedIn, and contact links
- Interactive 3D scene with scroll-driven camera movement

## Tech stack

- **HTML5** — page structure and content
- **CSS3** — responsive layout, typography, effects, and animations
- **Vanilla JavaScript** — interactions, scroll logic, animation, and Three.js scene control
- **Three.js r128** — real-time 3D rendering
- **GLTFLoader** — loading the `.glb` 3D model
- **Google Fonts** — Gaegu and Cormorant Garamond

## Project structure

```text
fuyad-portfolio/
├── index.html      # Page structure and content
├── style.css       # All custom styling and responsive rules
├── script.js       # Three.js scene and portfolio interactions
├── scene.glb       # 3D model used by the scene
├── README.md
└── .gitignore
```

The project intentionally has no build step or framework. HTML, CSS, and JavaScript are kept in separate files so the repository remains easy to understand and maintain.

## Run locally

No npm install or build process is required. Clone the repository and serve the folder with a local web server:

```bash
git clone https://github.com/fuyadislam/portfolio.git
cd portfolio
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

A local web server is recommended because the 3D model is loaded as a `.glb` asset. An internet connection is also needed for Three.js and the Google Fonts loaded from CDNs.

## Deploy

The project can be deployed directly to Vercel, GitHub Pages, Netlify, or any static hosting service. There is no build command; the repository root is the site root.

## Contact

- LinkedIn: https://www.linkedin.com/in/fuyadislam
- GitHub: https://github.com/fuyadislam
