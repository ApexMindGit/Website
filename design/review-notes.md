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
authorized SpecLens wording is used (300+ signed-up users in first month; live in production; used by procurement
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

## Homepage revision: process section restyle, type + motion tweaks

- **Process ("A clear path") section restyled for consistency**: dropped the busy grid-line background,
  glassmorphism, and bright cyan `#39c8ff`; now a clean full-bleed dark band (`#0f0f11`) with one subtle
  blue glow, a two-column intro + highlight card, and the 5 approved stages as a connected "path" of
  columns with a blue (`#3b6bff`) top-tick on hover — matching the site's calmer language and blue accent.
  Data kept: eyebrow "How we work / Our process", "A clear path. Room for conversation." heading, a
  problem-first lead, "See how we work" link, the five stages (title + one line each), and a tightened
  highlight card ("Before we build / We agree what 'done' looks like.").
- **Type reduced**: hero H1 clamp max 64→54px (≈47px at 1265w) and the scroll-reveal lines 68→50px.
- **Aurora sped up ~3×**: `aurora-flow` and `cta-aurora-flow` 18s/16s → 6s (hero card, services banner,
  CTA band).
- Verification: `npm run build` = 28 static pages, no errors; DOM confirmed the flat dark process band,
  5-column path, blue tick, reduced type sizes, and 6s aurora, with no overflow.

## Homepage revision: animated primary button + hero grey gradient

- **New primary `Button` component** (`app/components/button.tsx`) with a layered hover interaction:
  the black chip expands left→right to fill the whole pill, the dark label slides up while a white
  label rises from below, and the arrow slides out to the left as a new white arrow enters from the
  left. Renders as Link / a / button (supports `type`, `disabled`, and a `light` variant for the CTA
  band). All motion behind `prefers-reduced-motion`; keyboard focus triggers the same reveal.
  Migrated every `.button` usage (hero, FAQ, CTA band, works "All projects"/"View case", inquiry
  submit, received, 404) to it. Verified on hover: fill right→0 + radius→10px, label-out up / label-in
  in, icon-out left / icon-in in.
- **Hero grey gradient**: replaced the faint bottom-left sheen with a soft grey gradient — a bright
  diagonal streak with grey pooling toward the lower-right and edges (radial + linear on
  `.studio-hero::after`).
- Verification: `npx tsc --noEmit` clean; `npm run build` = 28 static pages, no errors; the hovered
  button and hero gradient confirmed in a screenshot.

## Fix: invalid easing token + button retuned to the Beew reference

- **Bug found & fixed:** `--ease-out-soft` was `cubic-bezier(0.22, 1, 0, 0.36, 1)` — **five** values, which
  is invalid (cubic-bezier needs four). An invalid timing function invalidates the whole `transition`
  shorthand, so **every `--ease-out-soft` transition across the site had been snapping instantly** (the
  primary button, the services/FAQ accordions, the process hover tick, etc.). Corrected to
  `cubic-bezier(0.22, 1, 0.36, 1)` in globals.css, so those interactions now actually animate.
- **Primary button retuned** to match the Beew reference (analyzed from the founder's screen recording,
  frame-by-frame): the black fill is now a **constant-inset box that grows width-only** (height and
  radius stay fixed) instead of also expanding its height/corners; the arrow is a **subtle settle**
  (translateX 48% ≈ 20px) instead of the previous big 165% slide; and the timing is **~600ms** (fill
  600ms, label 560ms, arrow 360ms) to match the reference's slower ease-out. Chip height raised to
  ~44px (inset 5px) so the fill reads as width-only.
- Verification: served CSS confirmed valid `transition: right 600ms cubic-bezier(0.22,1,0.36,1)`; hover
  shows fill right 47→5px with constant top/bottom/left/radius, label swap, and the smaller arrow
  settle. `npm run build` = 28 static pages, no errors.

## Secondary button animation + rollout

- **Secondary button variant added** (`Button variant="secondary"`), analyzed frame-by-frame from the
  founder's Beew "Works" recording: a plain pill (no arrow/fill) whose **background lightens white→gray
  on hover** and whose label does a **blurred vertical swap** — the current text blurs up and out while
  a fresh copy blurs in from below (both dark). CSS in `.btn-secondary` (site.css); component renders
  just the two label copies for this variant.
- **Rolled out to every primary/secondary button:** primaries already use the `Button` component; the
  secondary CTAs paired with them were converted — hero "Explore our work", 404 "Explore what we do",
  and received "Message on WhatsApp". The **design reference** (`/_design`) now imports `Button` and its
  hero + Actions specimens demonstrate the real primary + secondary interactions.
  - Exception: the CTA band's WhatsApp action sits on the dark aurora, where a white→gray secondary
    doesn't read; it keeps its existing dark ghost text-link. Flagged for a possible dark secondary.
- Verification: `tsc` clean; `npm run build` = 28 static pages, no errors. The secondary hover end-state
  was confirmed visually (bg darkens, label swaps). Note: `getComputedStyle` in the preview pane returns
  stale values and synthetic `:hover` doesn't persist for reads, so hover was verified by injecting the
  end-state and screenshotting rather than by reading computed styles.

## Featured card: dot progress timers + CTA pill

- **Dot progress indicators:** each dot in the hero featured carousel is now a track; the active dot is
  wider and holds a white **progress fill that animates 0→100% over the 6s window**, showing how long
  the current card stays and when it advances. The advance is driven by the fill's `animationend` (via
  `onAnimationEnd`), so **hovering pauses the fill and the timer in perfect sync** (no more separate
  interval that could drift). Reduced motion shows a static full bar and falls back to a plain interval.
- **"Explore the project" restyled** into a glassy pill on the aurora card — translucent white bg, thin
  border, backdrop blur, and a dark arrow chip that nudges right on hover.
- Verification: `npm run build` = 28 static pages, no errors; live checks confirmed 3 dots (active 40px
  vs 22px), the active fill mid-progress at ~74%, the fill-driven auto-advance, and the CTA pill
  (radius 999px, translucent bg, 1px border).

## Featured CTA (full-width glass), auto-hide nav, RPA service

- **Featured card CTA** rebuilt to the Beew "Explore Design Club" reference (analyzed frame-by-frame):
  a **full-width glassy button** (aurora shows through, thin light border, white text left + arrow
  right). On hover it **fills solid white** while the label does an in-place **blur crossfade
  white→dark** and the arrow turns dark and nudges right.
- **Auto-hiding header:** `SiteHeader` now hides on scroll-down (past 120px) and reveals on scroll-up,
  via a rAF-throttled direction check toggling `.site-header.is-hidden { transform: translateY(-100%) }`
  (stays visible while the mobile menu is open). Confirmed the CSS hides the 88px header fully.
- **RPA added as a service:** new "Robotic Process Automation (RPA)" row in the services accordion
  (UI/desktop bots, legacy-portal automation, UiPath/Selenium, human-in-the-loop) grounded in the
  healthcare-RCM case study; also added to the org-schema `knowsAbout` and the CTA ticker. Removed the
  now-duplicated "RPA orchestration" chip from the Workflow-automation row.
- Verification: `tsc` clean; `npm run build` = 28 static pages, no errors; live checks confirmed the
  full-width glass CTA, 5 service rows incl. RPA, and the header hide transform. Note: the header
  auto-hide relies on requestAnimationFrame, which the preview pane pauses when hidden, so it was
  verified via the CSS toggle rather than a synthetic scroll.

## Navbar "Let's talk" CTA + reveal type bump

- **Navbar CTA:** replaced the "Contact" text link with a **"Let's talk"** button using the hero's
  primary interaction in its **white variant** (`Button variant="light" className="nav-cta"`) — white
  pill, dark arrow chip, black-fill + label-swap on hover. Added a hairline border so it stays defined
  when the black fill lands on the dark header; drop-shadow removed; hidden ≤1199px (mobile menu keeps
  its own Contact CTA).
- **Reveal type:** bumped the "Think of us as…" lines up a little (`.sr-line` clamp min 26→30px,
  `.sr-sub` 15→17px).
- Verification: `tsc` clean; `npm run build` = 28 static pages, no errors; the white "Let's talk"
  button confirmed in the navbar and the larger reveal minimums applied.

## "Built to ship" card CTA → animated primary button

- The hero "Built to ship" engagement card (now a dark image card, `built-to-ship.webp`) had a plain
  arrow-chip CTA. Converted the card from a full `<Link>` to a `<div>` so a real interactive button can
  live inside, and replaced the CTA with the primary `Button` in its **white variant**
  (`variant="light"`, `.engagement-cta`) — full fill/label-swap/arrow-settle animation, with a hairline
  border so it stays defined when the black fill lands on the dark card. Anchored bottom-left via
  `.studio-engagement > .btn { margin-top:auto }`.
- Verification: `tsc` clean; `npm run build` = 28 static pages, no errors; the CTA renders as
  `btn btn-light engagement-cta` with fill + icon + dual label.

## Highlighted Projects: full-screen stacking panels

Refined the section from part-screen cards to **full-viewport panels**: the `works-stack` moved out of
the container (content re-wrapped in `.container` per panel), each `.work-card` is `min-height: 100vh`,
`sticky top: 0`, with **no border/radius/shadow** (no card chrome), and backgrounds **alternate white /
light-grey (`#f3f3f1`)**. Each project fills the screen and the next scrolls up to fully cover it.
Verified live: white SpecLens panel pinned while the grey Healthcare panel slides up over it with a
clean edge. Build: 28 static pages, no errors.

## Highlighted Projects: scroll-stacking cards (light palette)

- Rebuilt the "Highlighted Projects" section as a **scroll-stacking deck** (`highlighted-projects.tsx`)
  of the 5 featured case studies: each card is `position: sticky` at the **same top**, so the next card
  scrolls up and **fully covers** the previous (matching the Beew reference), separated by rounded
  corners + a soft top shadow + hairline border.
- Corrected an earlier mistake: the cards had been recoloured to a uniform dark `#141414`. They now
  keep the **original light palette** — white card surface, dark title/tags, the `#f1f1ef` category
  badge, the blue `#3b5bff` result pill, dark "View case" (blue arrow). Per-project colour will come
  from the real screenshots on the visual side once supplied.
- Verification: `npm run build` = 28 static pages, no errors; live check confirmed 5 white cards all
  sharing `top: 100px`, card 0 pinned while card 1 slides up to cover it (screenshot showed the light
  cards stacking). Note: the preview pane ignores programmatic `scrollTo`, so stacking was verified
  with a real wheel scroll + rect measurements.

## Revision 12: Beew signature motion references
Studied beew.studio's own animations directly and added three specimens to the Motion section (05) as design reference, rebuilt in Apex Mind tokens rather than copied: (A) a focus-pull letter reveal — each character resolves from a blue blur into crisp white, left to right, triggered by an IntersectionObserver on scroll-in and re-armed when scrolled back below the viewport; (B) an aurora mesh panel — a slow strategic-blue radial-gradient drift echoing Beew's Design Club card, kept to blue only so it stays in the background; (C) a trust marquee — a continuous, low-speed logo ticker that pauses on hover, using placeholder client labels. All three degrade to a static, legible state under `prefers-reduced-motion` (letters shown crisp, gradient and marquee held still). No Beew assets, client names, or copy were used. Typecheck passed; computed-style check confirmed the reveal, drift, and marquee are live with no console errors.

## Revision 13: Aurora closing CTA

- Replaced the plain end CTA with a large Beew-inspired moving aurora panel immediately before the footer, with centered copy, a "Get a Custom Quote" primary action, WhatsApp secondary action, response-time note, and a lower ticker of Apex Mind capabilities instead of unsupported client logos.
- Homepage CTA copy changed to: "Your software backlog isn't getting any shorter." The body now positions Apex Mind around product, AI, automation, and internal tools as a founder-led software partner.
- The same CTA specimen was added to the design reference page before the review footer. Motion uses drifting radial gradients plus film grain and pauses to a static state for reduced-motion users.
