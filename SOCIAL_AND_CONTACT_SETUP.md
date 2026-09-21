# LUNE — Social Media & Contact Information Setup Guide

This document details the configuration plan and copy-ready code for connecting LUNE's official social media accounts, email inboxes, physical facility information, and contact form backend.

Scheduled for implementation today at **8:00 PM**.

---

## 1. Centralized Data Architecture (`src/data.ts`)

Add the following configuration objects to `src/data.ts`:

```typescript
// Social Media Profiles
export const socialLinks = [
  {
    name: "X (TWITTER)",
    url: "https://x.com/LuneAerospace", // Replace with your actual URL
    handle: "@LuneAerospace",
  },
  {
    name: "LINKEDIN",
    url: "https://linkedin.com/company/lune-aerospace", // Replace with your actual URL
    handle: "lune-aerospace",
  },
  {
    name: "YOUTUBE",
    url: "https://youtube.com/@LuneAerospace", // Replace with your actual URL
    handle: "@LuneAerospace",
  },
  {
    name: "GITHUB",
    url: "https://github.com/lune-aerospace", // Replace with your actual URL
    handle: "lune-aerospace",
  },
];

// Official Company Contact Channels
export const companyContact = {
  generalEmail: "hello@lune.africa",
  rfqEmail: "missions@lune.africa",
  pressEmail: "press@lune.africa",
  careersEmail: "careers@lune.africa",
  phone: "+234 (0) 9 292 4800", // Replace with actual phone line
  address: {
    facility: "Cleanroom Integration Bay & Testing Campus",
    city: "Abuja",
    territory: "Federal Capital Territory",
    country: "Nigeria",
    coordinates: "09°04'N, 07°29'E",
  },
};
```

---

## 2. SpaceX-Style Minimalist Footer (`src/components/layout/SiteFooter.tsx`)

Update the footer link list to include the external social handles with `target="_blank"` and `rel="noopener noreferrer"`:

```tsx
import { socialLinks } from "../../data";

// In the footer links list:
{socialLinks.map((social) => (
  <li key={social.name}>
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow LUNE on ${social.name}`}
    >
      {social.name}
    </a>
  </li>
))}
```

---

## 3. Dedicated Contact Page (`src/pages/ContactPage.tsx`)

Enhance the `/contact` page with interactive tiles for:
1. **Primary Transmission Channels:** Direct mailto links to `companyContact.rfqEmail` and `companyContact.generalEmail`.
2. **Verified Social Media Badges:** Direct links to LUNE's profiles on X, LinkedIn, YouTube, and GitHub.
3. **Physical Campus Information:** Facility address, Abuja coordinates (`09°04'N, 07°29'E`), and visiting appointment booking.

---

## 4. Real Contact Form Email Delivery (`.env`)

To receive dispatches directly in your inbox when someone submits the form on the website:

1. Create a `.env` file in the project root (`/home/nikola/lune-aerospace-code/.env`):
   ```bash
   # Option A: Formspree (Free, no backend code required)
   VITE_CONTACT_API_URL="https://formspree.io/f/YOUR_FORM_ID"

   # Option B: Web3Forms (Sends dispatches directly to hello@lune.africa)
   VITE_CONTACT_API_URL="https://api.web3forms.com/submit"
   ```
2. The submission service in `src/services/contact.ts` will automatically route the message, parameters, and packet ID to that endpoint, with guaranteed fallback to the local flight ledger (`localStorage`).

---

## 5. SEO, Twitter Cards & JSON-LD Schema (`index.html`)

Add your Twitter handle and social links to metadata:

```html
<!-- Twitter Handle -->
<meta name="twitter:site" content="@LuneAerospace" />
<meta name="twitter:creator" content="@LuneAerospace" />

<!-- Structured Data (JSON-LD) sameAs array -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LUNE Aerospace",
  "url": "https://lune.africa",
  "sameAs": [
    "https://x.com/LuneAerospace",
    "https://linkedin.com/company/lune-aerospace",
    "https://youtube.com/@LuneAerospace"
  ]
}
</script>
```

---

## Quick Reference Checklist for 8:00 PM
- [ ] Confirm exact social profile URLs (X, LinkedIn, YouTube, GitHub)
- [ ] Confirm official email addresses (e.g. `hello@lune.africa`)
- [ ] Update `src/data.ts` with confirmed details
- [ ] Render social links in `SiteFooter.tsx`
- [ ] Add social badges and contact channels to `ContactPage.tsx`
- [ ] Add `.env` form endpoint for email delivery
- [ ] Run `npm run build` and commit changes
