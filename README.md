# Apex Mind website

Next.js 15, React, TypeScript strict mode, Tailwind CSS 4. Target hosting: Vercel. This checkout currently contains the design reference milestone, not the full production site.

## Local development

Use Node.js 24 LTS and pnpm. Run `pnpm install`, then `pnpm dev`. Open `http://localhost:3000/_design`.

Copy is provisional and centralized for review in `copy-drafts.md`. The founder has authorized design implementation before final text selection. SpecLens source boundaries are documented in `case-study-source-speclens.md`.

## Checks

- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`

The design route is generated only for development by `scripts/run-next.mjs`. The build command removes its route entry while creating `.next-production`, then restores the development entry. No design reference route is included in production. `APEX_BUILD=1` must be set when serving `.next-production` directly.

Fonts are packaged locally for the review environment. Images are deliberate labeled placeholders. The form, loading button, and consent controls on the reference page are demonstrations: no inquiries are sent, no data is persisted, and no analytics are loaded.

## Next milestones

Founder review of the design reference, followed by root navigation/footer and individual pages in the agreed order. Email, Sheets, anti-spam, analytics, SEO, and final security headers belong to subsequent implementation milestones. Nothing has been published.
