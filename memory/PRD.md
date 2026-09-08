# PRD — Yuna Punyaja Portfolio

## Original Problem Statement
Build a complete, responsive, interactive portfolio page with an elegant pastel aesthetic, dynamic HTML5 canvas scroll effects, and horizontal layered page transitions. Requested as Next.js App Router + Framer Motion + Tailwind + Canvas; environment is CRA React, so implemented as equivalent React components (portable to `app/page.tsx`).

- Palette: cream `#FDFBF7` / `#FAF9F6`, rose `#FBEBE8`, lavender `#EAE7EC`, champagne `#F5EBE0`, charcoal `#1F2937`
- Hero: 200vh sticky scroll container, procedural pixelated portrait canvas, text scale/fade 0→0.4, pixel radial explosion 0.2→1.0
- Sections: A) About with dual tilted framed photos; B) Experience/Skills/Languages with 4-node horizontal timeline, skill pills, language card; C) Contact form + Buy Me a Coffee CTA

## User Personas
- Recruiters / hiring managers evaluating Yuna's AI/CV experience
- Enterprise clients seeking an implementation manager
- Visitors wanting to connect or tip via Buy Me a Coffee

## Architecture
- Frontend-only React (CRA) SPA. Components: `HeroSection`, `PixelCanvas` (rAF procedural pixel grid), `HorizontalSections` (tab + wheel-driven stacked transitions), `AboutSection`, `ExperienceSection`, `ContactSection`
- Framer Motion for scroll-linked transforms and panel slide transitions; Sonner for toasts; Tailwind for styling; Cormorant Garamond / Plus Jakarta Sans / Fira Code fonts
- Backend: default FastAPI template untouched (no API needs for v1)

## Implemented (2026-09-07)
- Sticky hero with scroll-driven text shrink/fade and pastel pixel-portrait explosion (requestAnimationFrame)
- Horizontal stacking sections with tab pill nav, wheel gesture navigation, stacked card depth layers, dot indicators
- About: dual rotated framed photos with hover-straighten, bio copy, highlight rows
- Experience: 4-node timeline with hover/click detail card, pastel skill pills (Python, MediaPipe, OpenCV, Scikit-Learn, Next.js, REST APIs, Oracle DBs, Docker, PyTorch), languages card with animated level bars (English, French)
- Contact: validated form with toast confirmation; Buy Me a Coffee card with 3 drink tiers, optional note, toast confirmation (MOCKED — no real payments)
- data-testid attributes on all interactive elements; responsive mobile/desktop

## Verified
- Screenshot-tested: hero top (pixel portrait + headline), mid-scroll explosion, post-hero sections, tab transitions, contact form fill, coffee toast

## Backlog
- P0: None
- P1: Persist contact messages (FastAPI + MongoDB endpoint); real Buy Me a Coffee link or Stripe payments; resume/CV download
- P2: Use actual portrait photo for pixel sampling instead of procedural grid; blog/writing section; dark pastel mode toggle; OG meta + SEO

## Test Credentials
No auth. See /app/memory/test_credentials.md (empty — no credentials required).
