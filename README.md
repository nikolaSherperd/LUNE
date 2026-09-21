# LUNE — Aerospace Website

A dark, editorial aerospace website for **LUNE**, built to closely translate the supplied reference image into an aerospace and industrial design language.

---

## Technical Stack

- **Framework:** React 19 + TypeScript
- **Bundler & Tooling:** Vite 7
- **Styling:** Tailwind CSS v4 + Vanilla CSS Design System (`src/styles.css`)
- **Icons:** Lucide React
- **Routing:** React Router 7 (Code-split with `React.lazy` + `Suspense`)
- **Smooth Scroll:** Lenis (Inertial momentum scrolling)

---

## Run Locally

```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev
```

Open the local Vite URL shown in the terminal (typically `http://localhost:5173`).

### Production Build & Preview

```bash
# Type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Routes & Architecture

| Route | Page Component | Description |
| :--- | :--- | :--- |
| `/` | `src/pages/Home.tsx` | Flagship homepage with North Star hero, metrics, capabilities, foundry pillars, and ecosystem |
| `/systems` | `src/pages/SystemsPage.tsx` | Platform specs matrix, CubeSat/SmallSat dossiers, and Payload User's Guide (PUG) |
| `/infrastructure` | `src/pages/InfrastructurePage.tsx` | Cleanroom, TVAC vacuum thermal cycling, and dynamic vibration test rigs in Abuja |
| `/missions` | `src/pages/MissionsPage.tsx` | Real-time orbital ground track canvas, flight manifest, and sequential capability roadmap |
| `/research` | `src/pages/ResearchPage.tsx` | Deep aerospace R&D, radiation-tolerant avionics, and aerospike propulsion simulation |
| `/about` | `src/pages/AboutPage.tsx` | The LUNE industrial manifesto, PAUSN university consortium, and academy fellowships |
| `/contact` | `src/pages/ContactPage.tsx` | Direct in-page transmission terminal & modal dispatch for commercial and academic RFQs |

---

## Project Structure

```text
/home/nikola/lune-aerospace-code/
├── public/
│   ├── favicon.svg               # High-contrast aerospace radar vector icon
│   ├── manifest.json             # PWA web app manifest
│   ├── site-background.webp      # 231 KB high-efficiency hero background (90%+ compressed)
│   ├── site-background.png       # PNG fallback
│   ├── site-background-mobile.webp
│   └── site-background-mobile.png
├── src/
│   ├── components/
│   │   ├── layout/               # Shared structural chrome and navigation
│   │   │   ├── BackToTopButton.tsx
│   │   │   ├── InteriorPageHero.tsx
│   │   │   ├── Layout.tsx        # Persistent shell with dynamic document headers & side rail
│   │   │   ├── SectionLabel.tsx
│   │   │   ├── SiteFooter.tsx    # SpaceX-style technical minimalist footer
│   │   │   ├── SiteHeader.tsx    # Sticky navigation bar with mobile drawer
│   │   │   └── index.ts
│   │   ├── sections/             # Reusable aerospace sections across routes
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── EcosystemSection.tsx
│   │   │   ├── ResearchSection.tsx
│   │   │   ├── SystemsSections.tsx
│   │   │   └── index.ts
│   │   ├── CommandPalette.tsx    # Cmd+K global aerospace search & shortcut terminal
│   │   ├── ContactModal.tsx      # Modal telemetry transmission terminal with Escape-key support
│   │   ├── OrbitalTracker.tsx    # Real-time HTML5 canvas orbital ground track & SGP4 telemetry
│   │   ├── ResearchModal.tsx     # Research paper briefing drawer
│   │   ├── RoadmapModal.tsx      # Industrial roadmap deliverables modal
│   │   ├── SpacecraftHotspots.tsx# Interactive CubeSat/SmallSat HUD pins & specs
│   │   ├── StatusStrip.tsx       # Live status beacon & launch countdown ticker
│   │   └── SystemDrawer.tsx      # Subsystem technical dossier drawer
│   ├── hooks/
│   │   └── useReveal.ts          # IntersectionObserver scroll reveals, count-up physics & magnetic buttons
│   ├── pages/                    # Code-split lazy-loaded route views
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── Home.tsx
│   │   ├── InfrastructurePage.tsx
│   │   ├── MissionsPage.tsx
│   │   ├── ResearchPage.tsx
│   │   ├── SystemsPage.tsx
│   │   └── index.ts
│   ├── services/
│   │   └── contact.ts            # Persistent inquiry transmission service with local flight ledger
│   ├── App.tsx                   # Central router with React.lazy and telemetry Suspense fallback
│   ├── data.ts                   # Centralized specifications, manifests, partners & brand assets
│   ├── main.tsx                  # React DOM root entry
│   └── styles.css                # SpaceX-inspired dark aesthetic, architectural rail & typography
├── index.html                    # SEO, OpenGraph, Twitter Cards, preloads & JSON-LD schema
├── package.json
└── tsconfig.json
```

---

## Completed Upgrades & Optimizations

### 1. Codebase Modularization & Refactoring
- **Hook Extraction:** Isolated scroll reveal observer, magnetic button physics, and numerical count-up logic in [`src/hooks/useReveal.ts`](file:///home/nikola/lune-aerospace-code/src/hooks/useReveal.ts).
- **Layout Primitives:** Modularized shared chrome into [`src/components/layout/`](file:///home/nikola/lune-aerospace-code/src/components/layout/).
- **Page Isolation:** Decomposed monolithic `App.tsx` (~2,500 lines) into clean standalone pages in [`src/pages/`](file:///home/nikola/lune-aerospace-code/src/pages/).
- **Code-Splitting:** Implemented `React.lazy` and `Suspense` in [`src/App.tsx`](file:///home/nikola/lune-aerospace-code/src/App.tsx) with a custom telemetry loading fallback, reducing initial bundle weight.

### 2. Performance & Asset Optimization
- **Asset Weight Reduction:** Converted full-bleed photography (`site-background.png`, **2.47 MB**) into modern WebP format (**231 KB**), achieving over **90% bandwidth reduction**.
- **Progressive Enhancement:** Implemented CSS `image-set()` in [`src/styles.css`](file:///home/nikola/lune-aerospace-code/src/styles.css) with automatic PNG fallback for older browsers.
- **Resource Preloads:** Optimized [`index.html`](file:///home/nikola/lune-aerospace-code/index.html) to preload the WebP asset for accelerated Largest Contentful Paint (LCP).

### 3. Real Form Handling & Backend Integration
- **Unified Contact Service:** Built [`src/services/contact.ts`](file:///home/nikola/lune-aerospace-code/src/services/contact.ts) with packet ID generation (`LUNE-TX-XXXXXX`), optional external endpoint dispatch (`VITE_CONTACT_API_URL`), and local flight ledger persistence (`localStorage`).
- **Modal Feedback:** Enhanced [`src/components/ContactModal.tsx`](file:///home/nikola/lune-aerospace-code/src/components/ContactModal.tsx) with live transmitting state, error alerts, and receipt confirmation.
- **In-Page Dispatch Terminal:** Added an interactive direct dispatch form on [`src/pages/ContactPage.tsx`](file:///home/nikola/lune-aerospace-code/src/pages/ContactPage.tsx).

### 4. SEO, Social Previews & Metadata
- **Dynamic Route Headers:** Configured [`Layout.tsx`](file:///home/nikola/lune-aerospace-code/src/components/layout/Layout.tsx) to automatically update `document.title` and `meta[name="description"]` dynamically across all routes.
- **Social Graph Previews:** Implemented OpenGraph (`og:title`, `og:image`, `og:description`) and Twitter Cards (`summary_large_image`) in [`index.html`](file:///home/nikola/lune-aerospace-code/index.html).
- **PWA & Branding:** Created a vector aerospace radar favicon ([`public/favicon.svg`](file:///home/nikola/lune-aerospace-code/public/favicon.svg)) and web app manifest ([`public/manifest.json`](file:///home/nikola/lune-aerospace-code/public/manifest.json)).
- **Structured Data (JSON-LD):** Added schema.org `Organization` metadata describing LUNE's aerospace engineering and small-satellite manufacturing enterprise.

### 5. Interactive Visual Telemetry & Micro-Interactions
- **Orbital Telemetry Canvas:** Built [`src/components/OrbitalTracker.tsx`](file:///home/nikola/lune-aerospace-code/src/components/OrbitalTracker.tsx), featuring:
  - High-DPI HTML5 canvas simulation with coordinate grid and continental outlines.
  - SGP4 sine ground track and real-time sub-satellite coordinate telemetry.
  - Real-time Line-Of-Sight (LOS / AOS) indicator and radar footprint relative to the Abuja Telemetry Gateway.
  - Multi-satellite switching (`LUNE Pathfinder-1`, `AFRI-OBS-3`, `PAUSN Explorer`) and 1x/5x/10x simulation speed controls.
- **Integrated into Missions:** Featured the live tracker on [`src/pages/MissionsPage.tsx`](file:///home/nikola/lune-aerospace-code/src/pages/MissionsPage.tsx).
- **Keyboard Navigation:** Added `Escape` key handling to all interactive modals and drawers for seamless accessibility.

---

## Verification & Build Status

The application compiles cleanly with zero TypeScript or bundling errors:

```bash
npm run build
# Output:
# ✓ 1633 modules transformed.
# dist/index.html                     3.29 kB │ gzip:   1.26 kB
# dist/assets/site-background.webp  231.49 kB
# dist/assets/index.css              90.36 kB │ gzip:  17.45 kB
# dist/assets/index.js              319.13 kB │ gzip: 101.95 kB
# ✓ built in 13.14s
```
