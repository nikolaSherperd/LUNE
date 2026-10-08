# TODO — Lune Aerospace Website Tasks

## Scheduled for Later Today (Oct 8, 2026)

### 1. Footer & Body Background Color Bleed
- [ ] **Bleed footer color into body and vice versa:**
  - Soften the transition between the page body and the footer so colors bleed seamlessly in both directions instead of having an abrupt solid break.
  - Implement smooth vertical gradient overlays / radial ambient glow / faded border masks where `.spacex-footer` meets preceding sections/prefooter.
  - **Key Files:**
    - [`src/styles.css`](file:///home/nikola/lune-aerospace-code/src/styles.css) (lines ~5046–5120: `.spacex-footer`, `.spacex-footer-inner`, pre-footer styles)
    - [`src/components/layout/SiteFooter.tsx`](file:///home/nikola/lune-aerospace-code/src/components/layout/SiteFooter.tsx)

---

### 2. Social Links (X & LinkedIn)
- [ ] **Include links to LUNE's official pages on X and LinkedIn:**
  - Add links for **X (Twitter)** and **LinkedIn** into the footer navigation.
  - Ensure links open securely (`target="_blank"` and `rel="noopener noreferrer"`).
  - Centralize URLs in [`src/data.ts`](file:///home/nikola/lune-aerospace-code/src/data.ts) (as outlined in [`SOCIAL_AND_CONTACT_SETUP.md`](file:///home/nikola/lune-aerospace-code/SOCIAL_AND_CONTACT_SETUP.md)).
  - **Key Files:**
    - [`src/components/layout/SiteFooter.tsx`](file:///home/nikola/lune-aerospace-code/src/components/layout/SiteFooter.tsx)
    - [`src/data.ts`](file:///home/nikola/lune-aerospace-code/src/data.ts)
    - [`src/pages/ContactPage.tsx`](file:///home/nikola/lune-aerospace-code/src/pages/ContactPage.tsx)
