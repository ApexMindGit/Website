# Blog plan — SEO & GEO topic roadmap

_Last updated: 2026-09-25_

Posts live in `app/components/blog-data.ts` (single source for `/blog`,
`/blog/[slug]`, the sitemap, and JSON-LD). This file tracks **what to write
next and why**.

## Strategy

1. **Topic clusters mapped to capabilities.** Every post links to one
   `/what-we-do/*` page (`capabilityHref`) and 1–2 case studies. This builds
   topical authority and routes readers towards an inquiry.
2. **Proof comes from our own case studies.** We can't compete with big
   agencies on volume, but we can say "here's what we built and what happened".
   Firsthand experience (the E in E-E-A-T) is also what AI engines look for
   when picking sources to cite.
3. **Write for citation (GEO).** Every post has:
   - a "Short answer" (TL;DR) block at the top (`tldr`)
   - question-shaped H2s, lists, and at least one comparison table
   - specific numbers, each one either an authorized case-study metric or an
     external stat with a link in `sources`
   - a named author, published/updated dates, and 3–5 FAQs (emitted as
     `FAQPage` JSON-LD)
   - no keyword stuffing (the GEO research found it didn't help)
4. **Target reachable queries.** Long-tail, comparison ("X vs Y"),
   "how to", and India-specific queries rather than head terms like "AI agency".
5. **Freshness.** Review the top posts quarterly and bump `updated` only when
   the content actually changes.

## Published

| # | Post | Cluster | Primary keyword | Case study |
|---|---|---|---|---|
| 1 | RPA vs API integration vs AI agents | Automate / RPA | rpa vs ai agents, rpa vs api | healthcare-rcm-automation |
| 2 | Generative engine optimization guide | Web & SEO | generative engine optimization | combinehealth-seo-redesign |
| 3 | How to scope an AI MVP in 8 weeks | Build / Applied AI | ai mvp development | speclens |

## Backlog (prioritized)

Priority: **P1** = strong search demand + direct case-study proof + buyer
intent. **P2** = good fit, less proof or intent. **P3** = supporting or
awareness content.

### Applied AI (`/what-we-do/intelligence`)
| P | Working title | Target query | Intent | Proof |
|---|---|---|---|---|
| P1 | AI insurance eligibility verification: how RCM teams automate payer portals | insurance verification automation, rcm automation ai | Commercial | healthcare-rcm-automation |
| P1 | Intelligent document processing with LLMs: what accuracy to expect (and how to measure it) | intelligent document processing, llm invoice extraction | Informational → commercial | speclens |
| P2 | Building an AI email agent that drafts replies (with a human in the loop) | ai email agent, automate inbound leads | Commercial | autonomous-inbound-email-agent |
| P2 | RAG vs fine-tuning: which should your business use? | rag vs fine tuning | Informational | speclens, seo-internal-linking-ai-agent |
| P3 | How to evaluate an AI feature before you ship it | llm evaluation for startups | Informational | — |

### Automate & RPA (`/what-we-do/automate`, `/what-we-do/rpa`)
| P | Working title | Target query | Intent | Proof |
|---|---|---|---|---|
| P1 | Which business processes to automate first: a scoring framework | what processes to automate first | Commercial | healthcare-rcm-automation |
| P2 | n8n vs Make vs Zapier vs custom code: choosing a workflow tool | n8n vs zapier vs make | Comparison | — |
| P2 | Automating legacy systems with no API | automate legacy software without api | Commercial | healthcare-rcm-automation |
| P3 | How to calculate automation ROI (with a worksheet) | automation roi calculator | Informational | — |

### Software development (`/what-we-do/build`)
| P | Working title | Target query | Intent | Proof |
|---|---|---|---|---|
| P1 | MVP development cost in India (2026): what drives the price | mvp development cost india | Commercial (high) | speclens |
| P2 | Hiring an agency vs freelancers vs an in-house team for your first product | software agency vs freelancer | Commercial | — |
| P2 | Next.js for SaaS marketing sites and products: when it's the right choice | next.js saas development | Informational | combinehealth-seo-redesign |
| P3 | Legacy software modernization: rebuild, refactor, or wrap? | legacy application modernization | Commercial | — |

### Web & SEO (`/what-we-do/web-seo`)
| P | Working title | Target query | Intent | Proof |
|---|---|---|---|---|
| P1 | Technical SEO checklist for SaaS websites (2026) | technical seo checklist saas | Informational → commercial | combinehealth-seo-redesign |
| P1 | Internal linking at scale: using an AI agent on a 400-page site | internal linking automation, ai internal linking | Informational | seo-internal-linking-ai-agent |
| P2 | How we took a site from ~25% to 100% PageSpeed | improve pagespeed score next.js | Informational | combinehealth-seo-redesign |
| P3 | llms.txt explained: what it is and whether you need one | llms.txt | Informational | combinehealth-seo-redesign |

### Government & procurement (`/government`)
| P | Working title | Target query | Intent | Proof |
|---|---|---|---|---|
| P2 | Buying software through GeM: a guide for government departments | software services on gem portal | Commercial (public sector) | — |
| P3 | What MSME and Startup India registration mean for public-sector buyers | msme vendor benefits government procurement | Informational | — |

## Before writing any post, check

- [ ] Fits a cluster and links to its capability page + a case study
- [ ] The title/H1 answers a real question; the first 2–3 sentences answer it directly
- [ ] Only authorized metrics (see PRD §6); every external stat linked in `sources`
- [ ] 3–5 FAQs a buyer would actually ask
- [ ] Founder has reviewed it (copy is provisional and the site is indexable)

## Measuring

- Google Search Console + **Bing Webmaster Tools** (Copilot and some other AI
  assistants rely on Bing's index): submit `https://apexminds.in/sitemap.xml`.
- Monthly: run each post's primary question through ChatGPT, Perplexity,
  Gemini, Copilot, and Claude, and log whether apexminds.in is cited.
- Vercel Analytics: watch referrers such as `chatgpt.com` and `perplexity.ai`.
