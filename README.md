# Mini Browser Projects

A small collection of self-contained browser experiments, UI components, and mini games built with plain HTML, CSS, and JavaScript.

## Overview

This repository groups multiple front-end demos in separate folders. Each project can be opened on its own and does not require a build step or framework setup.

Most projects focus on one idea:

- interactive UI patterns
- CSS visual effects and animations
- browser-based mini games
- playful interface concepts

## Run Locally

Pick any project folder and open its `index.html` file in a browser.

If you prefer running a local server, you can use one of these options from the repository root:

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
| `3D Parallax Slider` | A layered image slider with a 3D parallax presentation. |
| `3D Rubik Cube` | A neon-style 3D cube demo with modal and particle-inspired visual effects. |
| `Air Monitor` | A dashboard-style air quality / environment monitor interface. |
| `Be My Valentine` | A playful Valentine interaction page with animated yes/no actions. |
| `Beginner Encoder and Decoder` | A simple text encoder/decoder utility for beginner-friendly experimentation. |
| `Glassmorphism Lockpad` | A glassmorphism-inspired keypad and restricted-access UI concept. |
| `Hacker Loader` | A stylized loading screen with hacker-terminal aesthetics. |
| `Interactive Follow Card` | Social-style profile cards with interactive follow actions. |
| `Markdown Editor` | A live Markdown editor with preview, HTML copy, and `.md` download actions. |
| `Notification Toast` | A toast notification demo with success, error, warning, and info states. |
| `Password Checker` | A password strength analyzer interface. |
| `Password Checker/password-checker-offline` | An offline password checker variant with local-only analysis notes. |
| `Pro Puzzle Suite` | A browser puzzle game interface with guide, reset, replay, and modal states. |
| `Rock Paper Scissors Game` | A classic rock-paper-scissors browser game. |
| `Skeleton Loader` | A skeleton loading UI demo with theme switching. |
| `System Access Terminal` | A faux terminal / system access interface with fullscreen-style interaction. |

## Repository Structure

```text
.
|-- 3D Parallax Slider/
|-- 3D Rubik Cube/
|-- Air Monitor/
|-- Be My Valentine/
|-- Beginner Encoder and Decoder/
|-- Glassmorphism Lockpad/
|-- Hacker Loader/
|-- Interactive Follow Card/
|-- Markdown Editor/
|-- Notification Toast/
|-- Password Checker/
|-- Pro Puzzle Suite/
|-- Rock Paper Scissors Game/
|-- Skeleton Loader/
|-- System Access Terminal/
`-- README.md
```

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Notes

- Every demo is intentionally lightweight and easy to inspect.
- There is no package manager or build pipeline required for the included projects.
- Assets are stored locally inside the relevant project folders.
