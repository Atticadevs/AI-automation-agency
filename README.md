# NEXUS.AI — AI Automation Agency Website

A single-page marketing site for a fictional boutique AI automation agency. Built with plain HTML, CSS, and vanilla JavaScript: no frameworks, no build tools, no backend.

> **We make the complex feel simple.**

## Features

- Editorial, type-led design: display headlines up to 120px, asymmetric 12-column grid, generous whitespace
- Alternating dark and light sections with a single electric-blue accent (`#2D2DFF`)
- Three animation systems, all dependency-free:
  - Scroll-triggered reveals with the Intersection Observer API
  - Stat count-up using `requestAnimationFrame`
  - CSS-only infinite logo marquee
- Sticky header that gains a blurred background on scroll, plus a full-screen mobile menu
- Fully responsive (desktop, tablet, mobile) with `prefers-reduced-motion` support
- No contact form: the CTA links to a `mailto:` address

## Sections

Navigation · Hero + logo marquee · Stats · Services · How It Works · Featured Work · Testimonials · CTA · Footer

## Project structure

```
nexus-ai-website/
├── index.html
├── style.css
├── main.js
├── assets/
│   ├── hero-graphic.svg
│   └── icons/        chatbot.svg · workflow.svg · data.svg · content.svg
├── inspiration-1.png
├── inspiration-2.png
├── inspiration-3.png
└── README.md
```

## Run it

No install needed. Open `index.html` in a browser, or serve the folder with VS Code Live Server.

## Design system

- **Fonts:** Space Grotesk (display) and Inter (body), via Google Fonts
- **Tokens:** colors, spacing and shadows are CSS custom properties at the top of `style.css`
- **CSS order:** reset → variables → typography → layout → components → navigation → sections → animations → media queries

## Customising

Replace `hello@nexusai.com` in `index.html` with your own address, and swap the placeholder client names, testimonials and project links.

## Design inspiration

The `inspiration-*.png` files are the visual references the design blends: editorial black-and-white typography, playful oversized stat counters, and a clean trust-forward service layout.

All names, quotes and metrics on the site are fictional placeholders.
