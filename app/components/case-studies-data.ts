// Case studies sourced from aryanrawther.com/case-studies, published as-is per
// founder direction (client names and metrics retained; clients that are
// anonymized on the source stay anonymized here). Single source for the cards,
// the homepage carousel, and the /case-studies/[slug] detail pages.

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  services: string[];
  client: string;
  timeline: string;
  summary: string; // card blurb
  result: string; // headline metric for cards
  featured: boolean; // shown in the homepage carousel
  // Concise copy for the rotating hero featured card (top 3 only).
  hero?: { name: string; tagline: string; value: string; label: string };
  // Optional looping demo video (served from /public). Falls back to the
  // labeled ImageSlot placeholder when absent.
  media?: { src: string; poster?: string };
  externalUrl?: { href: string; label: string };
  problem: string[];
  approach: { title: string; body: string }[];
  results: { value: string; label: string }[];
  takeaways: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "speclens",
    title: "SpecLens AI — Procurement SaaS",
    industry: "B2B / Procurement",
    services: ["SaaS Development", "Applied AI"],
    client: "SpecLens AI (own product)",
    timeline: "8 weeks to MVP",
    summary:
      "Reads vendor documents and turns them into a structured comparison matrix — with citations back to the source pages.",
    result: "Live · 300+ signed-up users in first month",
    featured: true,
    hero: {
      name: "SpecLens",
      tagline: "AI-powered procurement specification comparison.",
      value: "300+",
      label: "signed-up users in first month",
    },
    media: {
      src: "/SpecLens%20comparision%20matrix.mp4",
      poster: "/SpecLens%20hero%20Screenshot.png",
    },
    externalUrl: { href: "https://speclens.ai", label: "Visit speclens.ai" },
    problem: [
      "Procurement teams spend hours manually comparing product specification sheets across vendors. The work is time-consuming and error-prone: teams copy specifications from PDFs into spreadsheets, reformat inconsistent units, and chase missing fields.",
      "A comparison matrix can be out of date by the time the work is complete. The first version of SpecLens focused on a single flow — take uploaded documents and produce a comparison matrix.",
    ],
    approach: [
      {
        title: "Document ingestion",
        body: "Accept vendor documents across PDF, Word, Excel, PowerPoint, and HTML, and read them into a common structure.",
      },
      {
        title: "Extraction & normalization",
        body: "An AI pipeline extracts specifications and normalizes inconsistent units across vendors so like is compared with like.",
      },
      {
        title: "Cross-vendor alignment",
        body: "Align fields across vendors and produce a structured comparison matrix with citations back to the source pages.",
      },
      {
        title: "Confidence & summaries",
        body: "Add confidence scoring and executive-summary generation so buyers can trust and act on the comparison.",
      },
    ],
    results: [
      { value: "300+", label: "Signed-up users in the first month" },
      { value: "8 weeks", label: "Idea to working MVP" },
      { value: "5", label: "Document formats supported" },
    ],
    takeaways: [
      "A deliberately narrow first version — documents in, comparison out — made it possible to ship and learn quickly.",
      "The hardest problem was turning research prototypes into a reliable production pipeline, not the individual AI steps.",
    ],
  },
  {
    slug: "healthcare-rcm-automation",
    media: {
      src: "/healthcare-rcm-architecture.mp4",
      poster: "/healthcare-rcm-architecture-poster.png",
    },
    title: "Healthcare Insurance Verification & RCM Automation",
    industry: "Healthcare / RCM",
    services: ["Applied AI"],
    client: "Healthcare Billing & RCM Company (US/India)",
    timeline: "4 weeks",
    summary:
      "A custom AI pipeline integrated with eClinicalWorks that automates insurance verification end to end — logging into payer portals, extracting coverage, and writing results back.",
    result: "300 patients/day · replaced 7 FTEs",
    featured: true,
    hero: {
      name: "Healthcare RCM",
      tagline: "AI insurance-verification agent for a US billing company.",
      value: "7 FTEs",
      label: "reassigned · 300+ patients/day",
    },
    problem: [
      "In the US healthcare system, clinics and doctors claim insurance, which requires a heavy, manual verification setup. The client, an Indian company handling RCM and billing for US patients, had a large manual team dedicated to verifying insurance data.",
      "Verification requires logging into disparate payer portals to check whether a patient's insurance is active, and extracting complex data like copay, coinsurance, and deductibles — highly labor-intensive and error-prone.",
    ],
    approach: [
      {
        title: "EHR integration",
        body: "Built the foundational integration with eClinicalWorks to automatically extract daily appointment schedules and patient data, eliminating manual reports.",
      },
      {
        title: "Multi-modal extraction engine",
        body: "A dynamic pipeline that adapts to each payer portal — combining direct APIs, HTML parsing, Selenium web automation, and Chrome extensions to access the data.",
      },
      {
        title: "AI agentic parsing",
        body: "An AI agent layer using LLMs with structured JSON outputs parses irregular portal data to reliably extract copay, deductible, coinsurance, and active status.",
      },
      {
        title: "Closed-loop automation",
        body: "Structured verification results are written back into patient records in eClinicalWorks via UiPath and APIs.",
      },
    ],
    results: [
      { value: "7 FTEs", label: "Reassigned to new clients (>50% of team)" },
      { value: "300+", label: "Patients verified automatically per day" },
      { value: "4 weeks", label: "From idea to production pipeline" },
    ],
    takeaways: [
      "Healthcare automation often requires a 'by-any-means-necessary' approach: when portals lack APIs, fall back to DOM parsing or RPA gracefully.",
      "Agentic AI transforms scraping — an LLM understands the implicit structure of portal data instead of brittle regex per portal.",
    ],
  },
  {
    slug: "combinehealth-seo-redesign",
    title: "CombineHealth: Frontend Rebuild & 1M Impressions/Day",
    industry: "HealthTech / SaaS",
    services: ["Web Development", "SEO Services"],
    client: "CombineHealth",
    timeline: "1 week MVP + ongoing scaling",
    summary:
      "Rebuilt the CombineHealth frontend from Figma and implemented technical + AI-SEO strategies to scale organic marketing.",
    result: "1M+ daily impressions · 100% PageSpeed",
    featured: true,
    hero: {
      name: "CombineHealth",
      tagline: "Frontend rebuild and technical AI-SEO at scale.",
      value: "1M+",
      label: "daily search impressions",
    },
    media: {
      src: "/combinehealth-ai-scroll.mp4",
    },
    problem: [
      "The old website was incomplete, lacking product sections and crucial pages requested by the design and marketing teams. PageSpeed Insights scores were languishing around 20–30%, severely restricting organic visibility.",
      "Animations were broken, client images were outdated, and there was a total absence of JSON-LD schema required for traditional search and AI search engines.",
    ],
    approach: [
      {
        title: "Frontend architecture & build",
        body: "Rebuilt the missing sections from Figma using Next.js, React, Tailwind, and custom CSS. Repaired broken animations with Framer Motion and refreshed client imagery.",
      },
      {
        title: "Aggressive performance optimization",
        body: "Refactored the codebase to eliminate render-blocking resources and optimize assets, driving PageSpeed from ~25% to 100% across all pages.",
      },
      {
        title: "Technical SEO & GEO (AI-SEO)",
        body: "Added comprehensive JSON-LD schema, configured robots.txt and dynamic sitemaps, and added an llm.txt file for generative engines (Perplexity, ChatGPT).",
      },
      {
        title: "Marketing collaboration",
        body: "Set up Google Search Console and Bing Webmaster Tools and supported the marketing team's programmatic content with regular SEO audits and technical fixes.",
      },
    ],
    results: [
      { value: "1M+", label: "Daily search impressions" },
      { value: "100%", label: "PageSpeed Insights score" },
      { value: "100%", label: "AI-SEO ready (llm.txt / schema)" },
    ],
    takeaways: [
      "Technical SEO blockers like 25% PageSpeed or missing schema act as a massive drag on a marketing team's content efforts — fixing them is a force multiplier.",
      "Anticipating AI-search (GEO) with tools like llm.txt is no longer optional for modern SaaS marketing sites.",
    ],
  },
  {
    slug: "seo-internal-linking-ai-agent",
    title: "AI SEO Agent: Internal Linking & Backlink Graph",
    industry: "Internal Tool / SEO",
    services: ["Applied AI", "SEO Services"],
    client: "Internal Tool",
    timeline: "4 weeks",
    summary:
      "A dual-agent LangGraph system using Firecrawl and Python to autonomously map, graph, and optimize internal linking and backlink quality for a 400+ page site.",
    result: "400-page audits automated · 20 hrs/week saved",
    featured: true,
    problem: [
      "The SEO team was managing a growing website with over 400 pages. Manually keeping track of context to create optimal internal links for new content became impossible, and orphan pages were accumulating.",
      "Outdated, irrelevant pages were mistakenly being indexed, dragging down domain authority, and evaluating backlinks from Search Console for relevance was a slow, 20-hour-per-week manual process.",
    ],
    approach: [
      {
        title: "Site ingestion & graphing",
        body: "Used Firecrawl to scrape all 400 pages in under 20 minutes; a custom Python script mapped inbound and outbound links and graphed the architecture to expose orphan pages.",
      },
      {
        title: "Internal linking agent",
        body: "A LangGraph agent reads page summaries and, when a new page is published, instantly recommends the most relevant existing pages to link to — with priority and rationale — and flags legacy pages to de-index.",
      },
      {
        title: "Backlink evaluation agent",
        body: "A secondary agent cross-references page summaries with Search Console backlink exports and grades referring domains 'good' or 'bad' to protect domain authority.",
      },
      {
        title: "Web dashboard",
        body: "Wrapped the Python logic in a clean dashboard so the SEO team can run audits and view link graphs effortlessly.",
      },
    ],
    results: [
      { value: "20 hrs", label: "Manual audit time saved / week" },
      { value: "20 mins", label: "To crawl & graph 400 pages" },
      { value: "Higher", label: "Domain authority via clean architecture" },
    ],
    takeaways: [
      "Humans cannot hold the contextual map of a 400-page site in their heads; agents armed with RAG and graph logic excel at systemic semantic linking.",
      "Crawling an entire site is only heavy once — an intelligent agent allows instant, delta-based updates whenever a new page drops.",
    ],
  },
  {
    slug: "autonomous-inbound-email-agent",
    title: "Autonomous Inbound Sales & Scheduling Agent",
    industry: "HealthTech",
    services: ["Applied AI"],
    client: "HealthTech Company (Confidential)",
    timeline: "3 weeks",
    summary:
      "An autonomous email agent using Gmail Pub/Sub, Perplexity, and OpenAI to research inbound leads, check calendars, and draft personalized replies instantly.",
    result: "15+ daily inquiries automated",
    featured: true,
    problem: [
      "The client received ~15 inbound sales inquiries daily from their website. The CEO and COO manually researched each prospect and cross-referenced calendars to draft a personalized reply with meeting times.",
      "Significant timezone differences between US clients and the local team caused delays, slowing the sales pipeline and taking a heavy toll on executive time.",
    ],
    approach: [
      {
        title: "Instant ingestion",
        body: "Integrated the Gmail API with Google Cloud Pub/Sub to push incoming contact-form emails to a Python backend via webhooks in real time.",
      },
      {
        title: "Agentic research",
        body: "An AI agent uses Perplexity to autonomously research the inquiring company's revenue, focus, and the person who filled out the form.",
      },
      {
        title: "Contextual generation",
        body: "OpenAI synthesizes the research and inquiry context into a highly personalized, context-aware email draft.",
      },
      {
        title: "Scheduling & human-in-the-loop",
        body: "The system checks CEO/COO calendar availability, appends time slots, and routes the draft to Slack for a quick approval before sending.",
      },
    ],
    results: [
      { value: "15+", label: "Inquiries handled daily" },
      { value: "Instant", label: "Response draft turnaround" },
      { value: "Eliminated", label: "Executive manual research time" },
    ],
    takeaways: [
      "Combining real-time web search with LLM generation turns generic auto-replies into personalized, high-converting outreach.",
      "Human-in-the-loop via Slack is the perfect transitional step for teams adopting autonomous agents.",
    ],
  },
  {
    slug: "photoshoprequest-ai-editor",
    title: "AI-Powered Photo Editor Pipeline",
    industry: "Consumer / AI SaaS",
    services: ["SaaS Development", "Applied AI"],
    client: "PhotoshopRequest (own product)",
    timeline: "Beta live",
    summary:
      "An AI photo-editing platform with an automated editor–validator agent loop, quality preservation, and PayPal checkout with a human fallback.",
    result: "Automated editor–validator loop",
    featured: false,
    problem: [
      "There was high demand on r/photoshoprequest for simple edits that could be mostly automated by AI, but users wanted high-quality edits without losing image resolution — something basic AI tools fail to provide.",
      "Explaining an edit to an AI and getting a good output is still highly manual and trial-and-error for the average user.",
    ],
    approach: [
      {
        title: "Agentic architecture",
        body: "A dual-agent system: an 'editor' agent turns the image and description into a detailed generation prompt; a 'validator' agent checks the output against the request and loops back if it fails.",
      },
      {
        title: "Quality preservation",
        body: "A pipeline that maintains core image quality and resolution through the edit process.",
      },
      {
        title: "Monetization & fallback",
        body: "Integrated PayPal for checkout when users are satisfied, with a fallback to human editors if the AI falls short.",
      },
      {
        title: "SEO optimization",
        body: "Targeted SEO to capture 'Photoshop request' search traffic, with a dashboard to track visibility.",
      },
    ],
    results: [
      { value: "Automated", label: "Editor–validator AI loop" },
      { value: "Next.js", label: "Full-stack frontend" },
      { value: "PayPal", label: "Integrated payments" },
    ],
    takeaways: [
      "Agentic validation loops significantly increase the success rate of generative AI tasks compared to zero-shot prompting.",
      "A hybrid approach — AI first, human fallback — builds trust and guarantees the user gets what they need.",
    ],
  },
];

// Display order for the homepage: CombineHealth leads, then the rest keep
// their source order.
const LEAD_SLUG = "combinehealth-seo-redesign";
const leadFirst = (a: CaseStudy, b: CaseStudy) =>
  (a.slug === LEAD_SLUG ? -1 : 0) - (b.slug === LEAD_SLUG ? -1 : 0);

// Kept in the /case-studies index and their own pages, but hidden from the
// homepage sections (Highlighted Projects + hero carousel).
const HIDE_FROM_HOME = new Set([
  "seo-internal-linking-ai-agent",
  "autonomous-inbound-email-agent",
]);

export const featuredCaseStudies = caseStudies
  .filter((c) => c.featured && !HIDE_FROM_HOME.has(c.slug))
  .sort(leadFirst);

// Rotating hero featured card (those with concise hero copy), CombineHealth first.
export const heroCaseStudies = caseStudies
  .filter((c) => c.hero && !HIDE_FROM_HOME.has(c.slug))
  .sort(leadFirst);

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
