# LUNE — Aerospace Website

A dark, editorial aerospace website for **LUNE**, built to closely translate the supplied reference image into an aerospace/industrial design language.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React
- React Router

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

Production build:

```bash
npm run build
npm run preview
```

## Image replacement

All visual assets are centralized in:

`src/data.ts`

Replace the URLs in the `images` object with Lune's own photography, CDN URLs, or local `/public/images/...` paths.

## Routes

- `/`
- `/mission`
- `/systems`
- `/research`
- `/about`
- `/contact`

## Design notes

The implementation intentionally avoids the common "space website" treatment. The primary design decisions are:

- 94px architectural desktop rail
- restrained top navigation
- oversized editorial typography
- asymmetrical content grids
- monochrome photographic treatment
- warm bronze accent used only for navigation/status cues
- thin rules and technical metadata
- layered hero composition
- sparse, industrial content rhythm
- subtle motion with reduced-motion support

The image composition is deliberately controlled by CSS rather than by conventional centered cards so that the visual behavior remains close to the supplied reference.
