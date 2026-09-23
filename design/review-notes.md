# Design reference review

## Latest founder direction

Beew Studio (https://beew.studio/) is the sole design reference. All other references in the original brief are retired. The current preview was primarily driven by the original prescribed design system and has not been approved. Reassess its visual direction against Beew before further page implementation; preserve company facts and functional requirements. Study Beew’s visual presentation before revising, rather than relying on extracted text alone.

## Implemented milestone

Development-only /_design page: hero direction, six-color palette and semantic colors, complete type scale, spacing and responsive grids, action states, problem cards, metric and label examples, interactive form specimens, contact controls, consent specimen, three asymmetric layouts, approved process, and replayable motion samples.

Copy is provisional under the founder’s instruction to select text after seeing the design. Images are labeled placeholders. No production inquiry integrations or analytics run here.

## Verification

- Next.js production build passed. Route output contains / and /_not-found only; /_design is excluded.
- TypeScript and ESLint checked. Two configuration-style warnings were subsequently corrected.
- Browser preview loaded without console errors.
- Form demonstration validated inputs and displayed its local-only confirmation.
- Engagement selector switched to Monthly retainer.
- Consent demonstration displayed the declined state without loading analytics.
- Mobile viewport tested at 390 × 844. No horizontal document overflow (375px content viewport and 375px scroll width).
- Mobile menu opened, focused its first link, and closed with Escape.
- Desktop and mobile hero visually inspected.
- Reduced-motion CSS disables animation/transforms and smooth scrolling. OS/browser emulation of reduced motion and full accessibility audit remain for later QA; do not claim those have been tested.

## Next review

Review the visual direction, typography, spacing, and components before extending the system to the production site. Final text selection may follow implementation as requested. Production forms, email/Sheets delivery, security headers, SEO, real assets, and all other routes are later milestones.

## Revision 02: Beew visual direction

Reworked the preview after directly inspecting beew.studio: black page frame, rounded white/gray panels, compact tightly spaced headings, muted secondary words, leading square arrow controls, a split feature area, image-led work section using labeled placeholders, and native expandable service rows. Previous square-corner and red-led styling is superseded for this revision by the founder’s requested Beew direction. No Beew assets, customer logos, testimonials, or numerical claims were copied. Text remains provisional.

## Revision 04: Beew palette restored
Founder requested the Beew Studio palette on the revised layout. Restored the neutral black, white, graphite, soft gray, panel gray, and muted-gray treatment, retaining panel shapes, spacing, typography, and service disclosures. This is a review variant, not final design approval.

## Revision 05: strategic blue accent
Founder noted that Beew uses blue strategically. Added one controlled blue accent treatment to the featured SpecLens surface and added Strategic blue to the design tokens. The rest of the interface remains neutral so blue carries attention rather than becoming a general theme color.

## Revision 06: Beew-inspired motion
Added restrained motion patterns: staged page entrance, arrow-led hover feedback, panel lift, image scale, expandable-service reveal, strategic-blue drift, and focus-visible treatment. All motion is disabled or reduced under `prefers-reduced-motion`, with focus and color states preserved.

## Revision 07: inner-page patterns from Beew
Added a design-reference section based on the accessible Work and About page rhythms from Beew: inner-page hero, selected-work index with filters and metadata, founder-led About layout, engagement choice panel, inquiry path, and FAQ accordion. Only the approved SpecLens case study is represented; the second work row is explicitly marked as a future placeholder. No Beew copy, testimonials, client names, prices, or claims were copied.

## Revision 08: button interaction pass
Refined the primary button behavior around Beew’s compact arrow-led controls: a restrained fill sweep, arrow travel, slight hover lift, clear pressed state, blue keyboard focus ring, disabled treatment, and reduced-motion fallback. The interaction stays neutral by default so the strategic blue accent remains reserved for featured work and focus.

## Revision 09: red removed from the review page
Removed the inherited red treatment from focus, validation, rules, and semantic token states on the design reference. Neutral gray remains the default accent, with blue reserved for strategic feature and focus moments.

## Revision 10: Apex Mind logo added
Added the supplied compressed logo mark to the header and review footer. The transparent mark is cropped in CSS for compact lockups and inverted on the dark canvas so it stays legible without changing the Beew-inspired layout.

## Revision 11: logo crop corrected
Widened and recentered the header and footer logo windows so the complete supplied mark remains visible at desktop and mobile sizes.

## Milestone: full marketing site build

Built out every approved core page in the Beew visual direction, reusing the proven `studio.css`
component kit (dark canvas, floating rounded panels, blue-neutral accent) rather than the original
unapproved red/square system in `globals.css`. Marketing pages live in an `app/(site)/` route group
with shared chrome (`SiteHeader` with a "What we do" dropdown, `SiteFooter`, fixed WhatsApp, and a
slim preview banner); `/_design` is untouched and remains dev-only.

Routes created (all static): `/`, `/what-we-do` (+ `/build`, `/intelligence`, `/automate`),
`/solutions`, `/how-we-work`, `/case-studies` (+ `/speclens`), `/about`, `/government`, `/contact`
(+ `/received`), `/start`, `/legal/{privacy,terms,cookies}`, and a 404. New CSS is isolated in
`app/site.css`; shared components under `app/components/`.

Copy is provisional per the founder's "visual first" instruction (headline #2, subhead A, problem
Set A, pillars A, About A, founder bio A, government hero A, footer tagline A; meta descriptions A).
Per copy-drafts §14.5 the "coming soon" case teasers are omitted and SpecLens is shown alone. Only
authorized SpecLens wording is used (300+ signed-up users; live in production; used by procurement
teams across multiple industries) with no named clients, metrics, prices, or certification marks
(registrations listed as text, marks pending). Images remain labeled placeholders. `robots:index:false`
is set site-wide until launch. The inquiry form has no backend yet — it routes to `/contact/received`
and states nothing is sent or stored.

Verification: `npm run build` compiled all 20 routes as static with `/_design` excluded (only
`<img>` optimization warnings). Dev-server checks confirmed: homepage, capability, SpecLens, About,
and how-we-work render; the contact form submits through to `/contact/received`; a bad URL shows the
404; the header dropdown and mobile menu (with submenu) work; and there is no horizontal overflow at
375px on home, contact, and a capability page. Reduced-motion fallbacks retained. Not approved for
publication; copy and legal text remain pending review.

## Homepage revision: sections, SEO, balanced audience

Reworked the homepage from a section + SEO + customer standpoint (founder chose: balanced startup +
public-sector tone; add FAQ and how-we-think; delegated the H1 and credentials calls). Changes:
- H1 switched to a keyword-explicit hybrid — "Software, AI, and automation. / Built around your
  problem." — naming the three services while keeping the problem-led philosophy; subhead now names
  both audiences and the Lucknow/India geo.
- New sections: **How we think** ("start with the problem, not the spec"), a text-only
  **credentials strip** (Registered LLP, GST, MSME/Udyam, Startup India, ISO 27001:2022, GeM — no
  marks; "certificate details to follow"), and an **FAQ** (5 Q&As covering after-inquiry, startups +
  government, fixed-scope vs retainer, no-spec-needed, and location).
- A "also: integrations, modernization, mobile apps, plus government software" line under the pillars
  for internal linking to the capability hub and the Government page.
- Structured data: `ProfessionalService` and `FAQPage` JSON-LD (single source shared with the FAQ
  UI); OG/Twitter metadata added to the root layout. Section order: hero → what we do → how we think →
  process → SpecLens → credentials → FAQ → CTA.

Verification: typecheck clean; dev render confirmed all 8 sections, 6 credential chips, 5 FAQ items,
both JSON-LD blocks parsing, and no 375px overflow. Open items for the founder: confirm ISO 27001
wording/scope before launch; provide social profiles for `sameAs` and an OG share image; `robots`
stays noindex until launch.

## Homepage revision: hero spacing, aurora card, real case studies

- **Hero spacing/height:** restructured the hero into a top group (eyebrow + H1 + CTAs) and a
  bottom group (description + disciplines + baseline) pinned via `margin-top:auto`, matching Beew's
  "headline top, trust row bottom, calm gap between" rhythm, with a soft light sheen. Height set to
  **90vh on desktop** (founder request), reduced on tablet/mobile. Hero and side column stay matched.
- **Aurora featured card:** the hero's SpecLens card now uses a continuously-moving aurora background
  (dark base + drifting blue/purple/cyan radial light + SVG film grain), replacing the static blue
  gradient — modeled on Beew's Design Club card. Animation pauses under `prefers-reduced-motion`.
- **Real case studies (founder-directed):** imported all six case studies from
  aryanrawther.com/case-studies **as-is** (client names and metrics retained; clients that are
  anonymized at source stay anonymized) — this consciously overrides the earlier "SpecLens only / no
  named clients / no extra metrics" brief, on founder instruction. Full faithful content was pulled
  from each source write-up (SpecLens uses the authorized Apex source since its personal-site page was
  a TODO stub). Data lives in `app/components/case-studies-data.ts`.
  - New dynamic route `app/(site)/case-studies/[slug]/page.tsx` (SSG via `generateStaticParams`,
    per-page metadata) renders problem / approach / results tiles / takeaways / related. The bespoke
    `/case-studies/speclens` page was removed; SpecLens is now the `speclens` slug (existing links
    still valid).
  - `/case-studies` index lists all six via the work-index pattern.
  - Homepage "Selected work" band replaced with an **auto-scrolling carousel** of the five featured
    case studies (`app/components/case-carousel.tsx`), pause-on-hover, reduced-motion safe, edge-faded.
- Verification: `npm run build` = 28 static pages, `/case-studies/[slug]` prerendered for all six, no
  errors; dev render confirmed the aurora + carousel animate, detail pages render (client/steps/result
  tiles), and no 375px overflow. Publishing note: these pages now carry named client (CombineHealth)
  and metrics — a deliberate founder override of the original conservative brief; still `robots:noindex`
  until launch.

## Homepage revision: scroll-reveal, animated grain, rotating featured card

- **Scroll-scrubbed reveal section** added after the hero (`app/components/scroll-reveal.tsx`):
  a full-height "focus-pull" statement where each character resolves from a blurred blue into crisp
  white as the block scrolls up, fully resolved when its centre reaches the middle of the viewport.
  Progress is published as one CSS var (`--p`) via a rAF-throttled scroll listener; the per-character
  blur/opacity/color math runs in CSS (`color-mix`). Reduced motion shows it fully resolved. Provisional
  copy: "Think of us as your senior software team. Without the headcount. / You bring the problem. We
  bring the engineering to ship it."
- **Animated granular grain** on the aurora card: the noise layer now jitters (`aurora-grain`, stepped
  translate) so the particles keep changing, on top of the drifting color (`aurora-flow`). Frozen under
  reduced motion.
- **Rotating hero featured card** (`app/components/featured-carousel.tsx`): the aurora card now cycles
  the **top 3** case studies (SpecLens, Healthcare RCM, CombineHealth SEO) on a 6s auto-advance
  (pause-on-hover, dots for manual nav, disabled under reduced motion), replacing the single SpecLens
  card. Concise hero copy added to those three entries in `case-studies-data.ts` (`hero` field +
  `heroCaseStudies` export).
- Verification: `npm run build` = 28 static pages, no errors; reveal math verified (at --p=0.5 the first
  half of characters are white/sharp while the tail stays blue+blurred; at --p=1 all resolved); rotator
  advances and grain animates; no 375px overflow. Note: the scroll scrub relies on requestAnimationFrame,
  which browsers pause for hidden tabs — it runs normally when the page is actually on screen.

## Homepage revision: Beew-style services section + reveal gradient

- **Services section redesigned** (`app/components/services-accordion.tsx`), replacing the old
  three-pillar `studio-services` block and the redundant "how we think" block (its message now lives
  in the scroll-reveal statement):
  - Full-bleed **white** section (`.services-section`) spanning the screen.
  - An **aurora banner** reusing the hero card's moving aurora + animated grain (`.aurora-card`):
    "SERVICES" eyebrow, "Everything your team needs to build and ship." heading, and a right-aligned
    "You bring the priorities / We bring the thinking, craft, and execution." tagline.
  - A four-row **expanding accordion** (Software development · AI integration & agentic workflows ·
    Workflow automation · Web development & SEO). Each row: number, big title, +/− toggle; expands
    with a smooth `grid-template-rows: 0fr → 1fr` + opacity animation to reveal two columns of
    sub-services and a description with an "Explore →" link to the relevant page. Single-open,
    first row open by default; reduced-motion disables the animation.
- **Scroll-reveal blue gradient band widened**: the focus-pull now resolves over a `--band` of ~7
  characters, so the trailing characters form a visible blue→white gradient (blue `#4b74ff`) while
  resolved characters are crisp white — matching the reference. Still fully resolved by viewport centre
  and reduced-motion safe.
- Verification: `npm run build` = 28 static pages, no errors; dev render confirmed the aurora banner,
  the 4-row accordion (open row shows the two item columns + description in a 3-column layout), the
  widened ~5-char gradient band mid-scroll, and no horizontal overflow at a real desktop width (the
  carousel track lives inside an overflow-hidden wrapper).

## Homepage revision: Highlighted Projects, banner + logo tweaks

- **New "Works / Highlighted Projects" section** (`app/components/highlighted-projects.tsx`) replaces
  the auto-scrolling "Real problems / Measurable results" carousel band. Full-bleed white, centered
  header ("WORKS" + "Highlighted projects that made a real impact." + subtext + "All projects" button),
  then the top 3 case studies as **alternating showcases** (meta ↔ visual): client name + industry
  badge, punchy title (hero tagline), a blue highlight pill (result metric), and a "View case" button,
  with an `ImageSlot` placeholder for the visual. `CaseCarousel` is no longer used on the homepage.
- **Preview banner removed** from the (site) layout.
- **Navbar logo now white**: the header mark uses `logo-mark-on-dark` (invert) so it reads on the dark
  header (it was previously the dark mark on a dark bar).
- Verification: `npm run build` = 28 static pages, no errors; dev render confirmed the white logo, no
  preview banner, the works section with 3 alternating rows (item 1 reversed), correct titles/pills,
  and no horizontal overflow at desktop width.

## Homepage/footer revision: FAQ redesign, credentials to footer, footer brandmark

- **Credentials moved to the footer**: the homepage "Registered & recognized" section was removed;
  the list now lives in `nav-data.ts` (`credentials`) and renders as a chip strip in the footer above
  the meta row (`.site-footer-creds`).
- **FAQ redesigned** to the two-column layout: left intro (eyebrow, "Frequently Asked Questions"
  heading, description, "More on how we work" button) + right accordion (`app/components/faq-accordion.tsx`)
  with +/− toggles and a smooth grid-rows expand. Single-open, reduced-motion safe. Full-bleed white.
  The FAQPage schema still reads from the same `faqs` array on the homepage.
- **Giant footer brandmark**: a large "apex mind" wordmark at the very end of the footer with a
  top-light → dark gradient clipped to text, clipped by `overflow:hidden` on the footer (decorative,
  aria-hidden), echoing the reference. No document overflow.
- Verification: `npm run build` = 28 static pages, no errors; dev render confirmed homepage creds gone,
  FAQ two-column with working expand, 6 footer credential chips, and the ~269px brandmark, with no
  horizontal overflow at desktop width.

## Revision 12: Beew signature motion references
Studied beew.studio's own animations directly and added three specimens to the Motion section (05) as design reference, rebuilt in Apex Mind tokens rather than copied: (A) a focus-pull letter reveal — each character resolves from a blue blur into crisp white, left to right, triggered by an IntersectionObserver on scroll-in and re-armed when scrolled back below the viewport; (B) an aurora mesh panel — a slow strategic-blue radial-gradient drift echoing Beew's Design Club card, kept to blue only so it stays in the background; (C) a trust marquee — a continuous, low-speed logo ticker that pauses on hover, using placeholder client labels. All three degrade to a static, legible state under `prefers-reduced-motion` (letters shown crisp, gradient and marquee held still). No Beew assets, client names, or copy were used. Typecheck passed; computed-style check confirmed the reveal, drift, and marquee are live with no console errors.

## Revision 13: Aurora closing CTA

- Replaced the plain end CTA with a large Beew-inspired moving aurora panel immediately before the footer, with centered copy, a "Get a Custom Quote" primary action, WhatsApp secondary action, response-time note, and a lower ticker of Apex Mind capabilities instead of unsupported client logos.
- Homepage CTA copy changed to: "Your software backlog isn't getting any shorter." The body now positions Apex Mind around product, AI, automation, and internal tools as a founder-led software partner.
- The same CTA specimen was added to the design reference page before the review footer. Motion uses drifting radial gradients plus film grain and pauses to a static state for reduced-motion users.
