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

## Routes & Information Architecture

LUNE’s website is organized around a disciplined 6-pillar Information Architecture:

| Route | Page Component | Sub-Areas & Dedicated Modules |
| :--- | :--- | :--- |
| `/` | `src/pages/Home.tsx` | Flagship 5-chapter story: North Star, Systems Architecture, Projects, Deep Tech & Ecosystem |
| `/systems` | `src/pages/SystemsPage.tsx` | **Space Systems**, **Avionics**, **Autonomous Systems**, **Manufacturing** + Calculators & ICD Viewer |
| `/projects` | `src/pages/ProjectsPage.tsx` | **Active**, **Research**, **Completed** + Live Pan-African Ground Station Telemetry Tracker (`OrbitalTracker.tsx`) |
| `/research` | `src/pages/ResearchPage.tsx` | **Papers** (PAUSN Archive with BibTeX), **Technical Notes**, **Engineering Logs** (TVAC/Shaker telemetry) |
| `/technology` | `src/pages/TechnologyPage.tsx` | **Embedded**, **AI** (Edge NPU 4.2 TOPS), **Communications**, **Control** (ADCS Reaction Wheels) |
| `/about` | `src/pages/AboutPage.tsx` | **Mission** (8-stage roadmap), **Philosophy** (Continuous Cycle), **Team** (PAUSN Consortium Nodes) |
| `/journal` | `src/pages/JournalPage.tsx` | **Updates**, **Experiments** (TVAC & vibration qualification records), **Field Notes** (Ground station deployments) |
| `/infrastructure` | `src/pages/InfrastructurePage.tsx` | ISO Class 7 cleanrooms, TVAC vacuum thermal cycling, and 20 kN vibration testing in Abuja |
| `/contact` | `src/pages/ContactPage.tsx` | Transmission terminal & dispatch for sovereign, commercial, and academic payload RFQs |

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
│   │   ├── ADCSSimulator.tsx     # [NEW] 3-axis reaction wheel & attitude simulator
│   │   ├── CommandPalette.tsx    # Cmd+K global aerospace search & shortcut terminal
│   │   ├── ContactModal.tsx      # Modal telemetry transmission terminal with Escape-key support
│   │   ├── MissionCalculator.tsx # [NEW] Interactive orbit mechanics & Delta-V RFQ generator
│   │   ├── OrbitalTracker.tsx    # [UPGRADED] Pan-African Ground Station Network & live AOS predictor
│   │   ├── PayloadBudgetProfiler.tsx # [NEW] Battery Depth-of-Discharge & RF downlink margin profiler
│   │   ├── PayloadICDViewer.tsx  # [NEW] Interactive Payload Interface Control Document (ICD v2.4)
│   │   ├── ResearchArchive.tsx   # [NEW] Searchable PAUSN technical paper archive & BibTeX exporter
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

## Dedicated Aerospace Features Implemented

### 1. Interactive Orbit & Delta-V Mission Calculator (`MissionCalculator.tsx`)
- **Location:** `/systems`
- Computes orbital velocity ($v = \sqrt{GM/r}$), period, daylight/eclipse duration, empirical atmospheric drag lifetime, daily passes over Abuja, and required de-orbit Delta-V.
- 1-click **"Copy Mission Briefing"** and **"Dispatch RFQ With This Spec"** handoff directly to the contact transmission terminal.

### 2. Payload Electrical & Data Budget Profiler (`PayloadBudgetProfiler.tsx`)
- **Location:** `/systems`
- Dynamic sliders for peak power (W), average power (W), duty cycle (%), and sensor data rate (Mbps).
- Calculates battery Depth-of-Discharge (DoD %) during eclipse, solar array generation required, daily data generation (GB/day), and S-Band vs. X-Band pass feasibility.

### 3. Interactive Payload Interface Control Document (`PayloadICDViewer.tsx`)
- **Location:** `/systems` (replaces static PUG card)
- Tabbed technical inspector covering **Mechanical Envelopes**, **Power & Electrical Harnessing (28V / 5V / 3.3V)**, **Avionics Protocols (SpaceWire / CAN / RS-422)**, and **Qualification Testing (NASA GEVS 14.1 Grms & TVAC)**.
- Downloadable JSON ICD specification for flight integration teams.

### 4. Pan-African Ground Station Network Tracker (`OrbitalTracker.tsx`)
- **Location:** `/missions`
- High-DPI HTML5 canvas displaying real-time orbital ground track over Africa with multi-gateway coverage cones:
  - **Abuja Telemetry Gateway (HQ), Nigeria** (S/X-Band)
  - **Nairobi Earth Station, Kenya** (S-Band Relay)
  - **Cape Town Ground Station, South Africa** (X/Ka-Band)
  - **Cairo Gateway, Egypt** (UHF/S-Band)
- Live Acquisition of Signal (AOS) countdown timer (MM:SS) and active downlink beam rendering.

### 5. Searchable PAUSN Technical Paper Archive (`ResearchArchive.tsx`)
- **Location:** `/research`
- Search and filter monographs across *Thermal & Power*, *Avionics*, *Bus Architecture*, *ADCS*, and *Earth Observation*.
- In-browser full-paper briefing reader and 1-click BibTeX citation copy to clipboard.

### 6. Spacecraft Attitude Determination & Control Simulator (`ADCSSimulator.tsx`)
- **Location:** `/systems`
- Visual 3-axis gyro sphere demonstrating **Nadir Earth Pointing**, **Sun-Tracking**, **Abuja Target Slew**, and **B-Dot Magnetic Detumbling**.
- Real-time reaction wheel RPM monitors (Wheels X, Y, Z from -6000 to +6000 RPM), star tracker lock indicator, and pointing error readout (<0.03°).

---

## Verification & Build Status

The application compiles cleanly with zero TypeScript or bundling errors:

```bash
npm run build
# Output:
# ✓ 1638 modules transformed.
# dist/index.html                     3.29 kB │ gzip:   1.26 kB
# dist/assets/site-background.webp  231.49 kB
# dist/assets/index.css              92.21 kB │ gzip:  17.70 kB
# dist/assets/index.js              319.18 kB │ gzip: 101.98 kB
# ✓ built in 17.25s
```
