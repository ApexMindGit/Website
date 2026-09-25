# Apex Mind — Website PRD

> Product requirements & context for the Apex Mind marketing website.
> Written for engineers and AI coding agents joining the project. Read this
> before making changes. Copy is **provisional** unless stated otherwise.

_Last updated: 2026-09-22_

---

## 1. What we're building

The marketing website for **Apex Mind LLP** — a founder-led software
consultancy in Lucknow, India that helps startups and public-sector teams
**build software, apply AI, and automate workflows**.

The site is a static, SEO-focused Next.js marketing site (no CMS, no backend
yet). Its job is to explain what Apex Mind does, prove it with real case
studies, and convert visitors into inquiries.

- **Positioning:** "Your senior software team, without the headcount."
- **Primary H1:** _"Software, AI, and automation. Built around your problem."_
- **Tone:** balanced — credible enough for government/procurement buyers,
  energetic enough for startup founders.
- **Founder:** Aryan Rawther (https://www.aryanrawther.com). Case studies are
  imported from his portfolio.

## 2. Design direction (important)

**beew.studio is the sole design reference.** The look is a dark, editorial,
motion-forward studio aesthetic: near-black background (`#050505`), floating
rounded panels, a single blue accent, mono labels, and scroll-driven motion.

- The **original** red/square system baked into `globals.css` is **NOT
  approved** — do not resurrect it. It is overridden downstream.
- Do **not** copy Beew's assets, copy, or claims — reference the _motion and
  layout language_ only.

### CSS cascade (load order matters — last wins)
`app/layout.tsx` imports, in order:
1. `app/globals.css` — design tokens + the old (unused) red system.
2. `app/studio.css` — global Beew override: dark body, floating panels, blue
   accent, the `.studio-*` component kit.
3. `app/site.css` — **production delta, loaded last, wins.** Most real page
   styling and all recent work lives here.

Key tokens/eases live in `globals.css` (`--ease-standard`, `--ease-out-soft`,
`--ease-in-sharp`). Note: `--ease-out-soft` must be a valid 4-number
`cubic-bezier` — a malformed value silently kills every transition using it.

### Theming: dark homepage, light inner pages
The **homepage keeps the dark studio canvas**; **every other route renders on a
light/white theme**. A route-aware `ThemeShell` (`app/components/theme-shell.tsx`)
wraps header + main + footer and sets `data-theme` (`dark` on `/`, `light`
elsewhere; `usePathname` resolves during SSR, so no flash). Light overrides live
at the **end of `site.css`** under `.theme-shell[data-theme="light"]`, plus a
`body:has(...)` rule to flip the canvas. The **footer stays dark on every page**.
The nav logo and CTA switch on `isHome` in `site-nav.tsx` (dark artwork +
`default` pill on light; inverted artwork + `light` pill on the dark home).
The blue accent (`#39c8ff`, exposed via `--color-apex-red`) is kept on white.

## 3. Audience & goals

| Audience | What they need | Where the site serves them |
|---|---|---|
| Startup founders | "Can you ship my product fast?" | Hero, Build capability, SpecLens case |
| Government / procurement | "Are you credible & compliant?" | `/government`, credentials in footer, registered-LLP framing |
| Ops leaders | "Can you automate our manual work?" | Automate/RPA, Healthcare RCM case |

Primary conversion: **inquiry** (`/contact`) or WhatsApp. Secondary: explore
case studies.

## 4. Sitemap

All routes live under the `app/(site)/` route group (shared header/footer).
`/_design` is a dev-only living style guide, **outside** the group — leave it
untouched.

```
/                          Homepage
/what-we-do                Capabilities hub (5 capabilities)
/what-we-do/build          Software development
/what-we-do/intelligence   Applied AI (document AI, agents, RAG)
/what-we-do/automate       Workflow automation & integrations
/what-we-do/rpa            Robotic Process Automation
/what-we-do/web-seo        Web development & SEO
/solutions                 Problem-led entry points
/how-we-work               Process + engagement models + FAQ
/case-studies              Index of all case studies
/case-studies/[slug]       Case study detail (SSG per study)
/about                     Founder-led about
/government                Public-sector / procurement
/contact                   Inquiry form → Google Sheet + email → /received
/contact/received          Confirmation
/start                     Lightweight project finder
/legal/{privacy,terms,cookies}   Draft legal (pending review)
not-found                  On-brand 404
```

`robots: { index: true, follow: true }` is now set site-wide — the site is
**indexable** by search engines and AI crawlers. Copy is still provisional and
the legal pages are drafts, so treat public content accordingly.

## 5. Homepage anatomy (top → bottom)

1. **Hero** (`studio-opening`, 90vh) — eyebrow, H1, two buttons (primary
   "Start a conversation" + secondary "Explore our work"), description +
   discipline chips. Right side = `FeaturedCarousel` (rotating top case
   studies with dot-timer progress) + a "Built to ship" engagement card.
2. **ScrollReveal** — scroll-scrubbed per-character focus-pull text
   ("Think of us as your senior software team…"), trailing chars fade to blue.
3. **Services** (`ServicesAccordion`) — full-bleed white, aurora banner,
   expanding accordion. Each row has sub-item links + a **primary button** to
   its capability page (see §7).
4. **Process** (`process-band`) — dark band, 5-stage connected path.
5. **Highlighted Projects** (`HighlightedProjects`) — **full-screen stacking
   panels**, one per featured case study, alternating white / light-grey
   (`#f3f3f1`), no shadow. Image side **alternates** L/R down the stack.
   Panels play looping demo videos where available.
6. **FAQ** (`FaqAccordion`) — two-column, drives `FAQPage` JSON-LD.
7. **CTABand** — closing "start a conversation" with a marquee ticker.

`ProfessionalService` + `FAQPage` JSON-LD are emitted from `app/(site)/page.tsx`.

## 6. Case studies

Single source of truth: `app/components/case-studies-data.ts`.

- Published **as-is** per founder direction — real client names and metrics
  are retained (clients anonymized on the source stay anonymized).
- `featured` → eligible for homepage; `hero` → eligible for the hero carousel.
- **Homepage ordering:** `CombineHealth` leads (via `leadFirst` sort), then
  the rest. Exports `featuredCaseStudies` (Highlighted Projects) and
  `heroCaseStudies` (carousel) apply this.
- **`HIDE_FROM_HOME` set:** `seo-internal-linking-ai-agent` and
  `autonomous-inbound-email-agent` are kept on `/case-studies` and their own
  detail pages but **excluded from the homepage** sections. Do not delete them
  from the data to hide them from home — add to this set instead.
- **Metric discipline:** no fabricated metrics beyond what's authorized.
  SpecLens = "300+ signed-up users in first month". Healthcare = "300+
  patients/day" — these are **different numbers**, don't cross them.

Current studies: `speclens`, `healthcare-rcm-automation`,
`combinehealth-seo-redesign`, `seo-internal-linking-ai-agent`,
`autonomous-inbound-email-agent`, `photoshoprequest-ai-editor`.

### Media
`media?: { src, poster }` on a case study renders a looping muted autoplay
video via `MediaSlot` (falls back to the labeled `ImageSlot` placeholder).
Videos live in `/public`. In the Highlighted Projects panels the video uses
`object-fit: contain` in a 16:9 frame so it is **never cropped**.

## 7. Component kit & conventions

Shared components in `app/components/`:

- `button.tsx` — **the** button. Variants: `default` (primary: black pill,
  left→right width-fill hover + sliding label + arrow swap), `light` (white
  bg, used on dark sections & nav), `secondary` (plain pill, blur label swap).
  **Reuse this for every CTA** — do not hand-roll buttons.
- `ui.tsx` — `Arrow`, `PageHero`, `CTABand`, `ImageSlot`, `MediaSlot`, `Metric`.
- `site-nav.tsx` — client header; auto-hides on scroll-down, shows on
  scroll-up. CTA = "Let's talk" (`light` variant).
- `site-footer.tsx` — footer with credential chips + giant faded "apex mind"
  brandmark.
- `theme-shell.tsx` — route-aware light/dark wrapper (see §2 Theming).
- `capability-page.tsx` — **beew-services layout** for the 5 capability pages:
  aurora hero panel (dual CTA + proof badge), 4-up icon feature row, optional
  "Selected work" strip (real case studies only — never fabricated logos), deep
  content (prose + aside + "what helps us start"), capability FAQ, closing CTA.
  Data shape: `{ eyebrow, title, intro, heroNote?, features?, paragraphs, bring,
  faqs?, cases?, related?, ctaTitle, ctaBody? }` (`features`/`faqs`/`cases`
  optional). Feature icons are `lucide-react` components.
- `services-accordion.tsx`, `faq-accordion.tsx`, `featured-carousel.tsx`,
  `highlighted-projects.tsx`, `scroll-reveal.tsx`,
  `inquiry-form.tsx`, `whatsapp-float.tsx`, `nav-data.ts`.

### Services accordion → destinations
Each accordion subheading now has its **own dedicated capability page** (5 total).
| Service | Button → page |
|---|---|
| Software development | `/what-we-do/build` |
| Applied AI | `/what-we-do/intelligence` |
| Workflow automation | `/what-we-do/automate` |
| Robotic Process Automation (RPA) | `/what-we-do/rpa` |
| Web development & SEO | `/what-we-do/web-seo` |

Capability names are the single source in `nav-data.ts` (`capabilityChildren`),
which feeds the navbar dropdown, the footer, and the `/what-we-do` hub cards.
Note: the `/what-we-do/intelligence` route keeps its slug but is branded
**"Applied AI"**; the accordion label lives in `services-accordion.tsx`. We do
**not** build mobile apps — don't reintroduce that claim.

## 8. Tech stack & commands

- **Next.js 15.5** (App Router), **React 19**, **TypeScript strict**.
- Styling: **custom CSS** in the 3-file cascade above (Tailwind 4 is installed
  but the site is authored in plain CSS — don't assume utility classes).
- Icons: `lucide-react`. Fonts: Inter + JetBrains Mono via `@fontsource`
  (packaged locally).
- The contact form posts via a server action (`app/(site)/contact/actions.ts`)
  to a Google Apps Script web app that appends a row to a Google Sheet and
  emails a notification. Setup: `google-apps-script/README.md`. Needs
  `GOOGLE_SCRIPT_URL` + `GOOGLE_SCRIPT_SECRET`. No DB.

```bash
pnpm install
pnpm dev          # http://localhost:3000  (and /_design)
pnpm typecheck    # tsc --noEmit
pnpm lint
pnpm build
```

Build uses `scripts/run-next.mjs`, which strips the `/_design` route from the
production build (`.next-production`) then restores it for dev. No design
route ships to production.

## 9. Constraints & guardrails

- Copy is **provisional** and centralized where possible — keep it easy to
  swap. Don't invent legal text.
- **beew.studio** = reference only; never copy its assets/claims.
- No fabricated metrics, testimonials, prices, or client logos beyond what the
  founder has authorized.
- `robots` is now `index: true` (site is indexable) — keep copy accurate since
  it is publicly crawlable.
- All new motion must respect `prefers-reduced-motion`.
- Must build clean: `pnpm typecheck`, `pnpm lint`, `pnpm build` all pass.
- No horizontal overflow at 375px.

## 10. Related docs

- `README.md` — setup + build mechanics.
- `copy-drafts.md` — provisional copy options for review.
- `case-study-source-speclens.md` — SpecLens source boundaries.
- `design/review-notes.md` — running log of design revisions & decisions.

## 11. Status

The full site is built (all routes render, build passes) and `robots` is now
set to **indexable**. Outstanding before/at launch: founder copy sign-off,
Google Sheet setup + env vars for the contact form (Turnstile if spam appears), analytics, final
SEO/security headers, and a purpose-made 1200×630 OG share image (currently a
`/icon.png` stopgap).
