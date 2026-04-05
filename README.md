# Mini Browser Projects

A collection of self-contained browser experiments, UI components, animations, utilities, and mini games built with plain HTML, CSS, and JavaScript.

## Overview

Each project lives in its own folder and can be opened directly in the browser without a build step. The repository mixes:

- UI concepts and interface experiments
- CSS animations and hover effects
- browser-based mini games
- small utility tools
- decorative visual demos

## Run Locally

Open any project folder and launch its `index.html` file in a browser.

If you want a local server from the repository root, use one of these:

```bash
python -m http.server 8000
```

or

```bash
npx serve .
```

Then open the relevant project folder in your browser.

## Projects

| Project | What it is |
| --- | --- |
| `3D Card Animation` | A 3D hover card demo themed around world-place showcase panels. |
| `3D Parallax Slider` | A layered image slider with a 3D parallax presentation. |
| `3D Rubik Cube` | A neon-style 3D cube demo with modal and particle-inspired visual effects. |
| `Air Monitor` | A dashboard-style air quality and environment monitor interface. |
| `Animated 3D Card Hover Effect` | A fantasy-themed 3D card hover effect with layered artwork. |
| `Animated 404 Page not found` | An animated 404 error page with a stylized looping background. |
| `Animated Login form with Changing Background` | A login form concept with animated layout and changing background presentation. |
| `Animated-Login-form` | A compact animated login form interface demo. |
| `Be My Valentine` | A playful Valentine interaction page with animated yes/no actions. |
| `Beginner Encoder and Decoder` | A simple text encoder and decoder utility for beginner-friendly experimentation. |
| `Creepy Eye Button` | A creepy interactive button effect with animated eye behavior. |
| `Flower Animation` | A decorative flower animation built with HTML, CSS, and JavaScript. |
| `Glassmorphism Lockpad` | A glassmorphism-inspired keypad and restricted-access UI concept. |
| `Glowing Button Effect` | A glowing button hover effect demo focused on neon interaction styling. |
| `Glowing Navigation Menu` | A glowing navigation menu with animated active-state treatment. |
| `Glowing Product Card` | A glowing product card concept for a stylized catalog presentation. |
| `Hacker Loader` | A stylized loading screen with hacker-terminal aesthetics. |
| `Interactive Follow Card` | Social-style profile cards with interactive follow actions. |
| `Interactive Social Icons` | A hover-driven social icon set with interactive motion. |
| `Loading Animation` | A playful loading animation with an off-track motion concept. |
| `Markdown Editor` | A live Markdown editor with preview, HTML copy, and `.md` download actions. |
| `Notification Toast` | A toast notification demo with success, error, warning, and info states. |
| `Password Checker` | A password strength analyzer interface. |
| `Password Checker/password-checker-offline` | An offline password checker variant with local-only analysis notes. |
| `Pro Puzzle Suite` | A browser puzzle game interface with guide, reset, replay, and modal states. |
| `Rock Paper Scissors Game` | A classic rock-paper-scissors browser game. |
| `Rotational Slider` | A rotating travel-style image slider presentation. |
| `Skeleton Loader` | A skeleton loading UI demo with theme switching. |
| `Spider Clock Animation` | A spider-themed animated clock interface. |
| `Spider Cursor Animation` | A spider-themed custom cursor animation demo. |
| `Star Particle Animation` | A decorative particle-style star animation effect. |
| `System Access Terminal` | A faux terminal and system access interface with fullscreen-style interaction. |

## Repository Structure

```text
.
|-- <project-name>/
|   |-- index.html
|   |-- style.css
|   `-- script.js
|-- index.html
`-- README.md
```

Not every project uses all three files, but most follow that pattern.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Notes

- Every demo is intentionally lightweight and easy to inspect.
- There is no package manager or build pipeline required for the included projects.
- Assets are stored locally inside the relevant project folders.
- The root `index.html` acts as the landing page for all project folders that expose an `index.html`.
