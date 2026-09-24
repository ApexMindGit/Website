# Apex Mind website — agent guide

Marketing site for **Apex Mind LLP**, a founder-led software/AI/automation
consultancy. Next.js 15 App Router, React 19, TypeScript strict, custom CSS.

**Read `PRD.md` first** — it covers what we're building, the sitemap, the
homepage anatomy, design direction, and constraints. This file is the quick
orientation.

## Fast facts
- **Design reference:** beew.studio only (editorial, blue accent `#39c8ff`,
  motion-forward). The old red system in `globals.css` is NOT approved. Never
  copy Beew's assets or claims.
- **Theming:** homepage is **dark**; **every other page is light/white**. A
  route-aware `theme-shell.tsx` sets `data-theme`; light overrides sit at the end
  of `site.css` under `.theme-shell[data-theme="light"]`. **Footer stays dark.**
  See PRD §2.
- **CSS cascade (last wins):** `app/globals.css` → `app/studio.css` →
  `app/site.css`. Put production styling in `site.css`.
- **Routes:** everything under `app/(site)/`. `/_design` is a dev-only style
  guide outside the group — don't touch it, it's stripped from prod builds.
- **Capabilities:** 5 dedicated pages under `/what-we-do/` (build, intelligence
  [branded "Applied AI"], automate, rpa, web-seo), one per Services-accordion
  subheading. Names come from `nav-data.ts` (`capabilityChildren`). Built with
  `capability-page.tsx` (beew-services layout). **We don't build mobile apps.**
- **Case studies:** single source `app/components/case-studies-data.ts`. To
  hide a study from the homepage but keep it elsewhere, add its slug to
  `HIDE_FROM_HOME` (don't delete the data).
- **Buttons:** always reuse `app/components/button.tsx` (`default` / `light` /
  `secondary`). Don't hand-roll CTAs.
- **Copy is provisional.** No fabricated metrics/logos/testimonials beyond
  what's authorized. Note: the site is now **indexable** (`robots: index`), so
  provisional copy and draft legal pages are publicly crawlable — verify before relying.

## Commands
```bash
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm lint
pnpm build
```
Must pass typecheck, lint, and build before finishing. No horizontal overflow
at 375px. Respect `prefers-reduced-motion` for new motion.

## Docs
`PRD.md` · `README.md` · `copy-drafts.md` · `case-study-source-speclens.md` ·
`design/review-notes.md`
