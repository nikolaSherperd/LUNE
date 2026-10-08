# TODO — Lune Aerospace Website Tasks

## Scheduled for Later Today (Oct 8, 2026)

### 1. Footer & Body Background Color Bleed
- [x] **Bleed footer color into body and vice versa:**
  - Softened the transition between the page body and the footer so colors bleed seamlessly in both directions without an abrupt solid break.
  - Implemented vertical upward gradient bleed overlay (`::before`, 100px falloff), radial ambient glow (`radial-gradient`), and a feathered horizon line (`::after`) where `.spacex-footer` meets preceding sections.
  - **Key Files:**
    - [`src/styles.css`](file:///home/nikola/lune-aerospace-code/src/styles.css) (lines ~5046–5125: `.spacex-footer`, `.spacex-footer-inner`, bleed overlays)
    - [`src/components/layout/SiteFooter.tsx`](file:///home/nikola/lune-aerospace-code/src/components/layout/SiteFooter.tsx)

---

### 2. Social Links (X & LinkedIn)
- [x] **Include links to LUNE's official pages on X and LinkedIn:**
  - Added links for **X (Twitter)** and **LinkedIn** into the footer navigation.
  - Ensured external links open securely (`target="_blank"` and `rel="noopener noreferrer"`).
  - Centralized URLs and company profiles in [`src/data.ts`](file:///home/nikola/lune-aerospace-code/src/data.ts) (`socialLinks`, `companyContact`).
  - Added verified social channel badges to [`src/pages/ContactPage.tsx`](file:///home/nikola/lune-aerospace-code/src/pages/ContactPage.tsx).
  - Added Twitter cards and JSON-LD schema metadata to [`index.html`](file:///home/nikola/lune-aerospace-code/index.html).
  - **Key Files:**
    - [`src/components/layout/SiteFooter.tsx`](file:///home/nikola/lune-aerospace-code/src/components/layout/SiteFooter.tsx)
    - [`src/data.ts`](file:///home/nikola/lune-aerospace-code/src/data.ts)
    - [`src/pages/ContactPage.tsx`](file:///home/nikola/lune-aerospace-code/src/pages/ContactPage.tsx)
    - [`index.html`](file:///home/nikola/lune-aerospace-code/index.html)
