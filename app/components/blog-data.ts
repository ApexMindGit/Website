// Blog posts. Single source for /blog, /blog/[slug], the sitemap, and JSON-LD.
// Topic selection and keyword targets are tracked in blog-plan.md.
//
// Metric discipline (same as case studies): only use authorized case-study
// numbers from case-studies-data.ts. Any external statistic must be listed in
// the post's `sources` and linked inline.
//
// Inline markup inside text: [label](href) for links, **text** for bold.

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; label: string; text: string }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description, ~150–160 chars. */
  description: string;
  /** Card blurb on /blog. */
  excerpt: string;
  category: string;
  capabilityHref: string;
  keywords: string[];
  published: string; // ISO date
  updated: string; // ISO date
  /** Answer-first summary shown at the top of the article. */
  tldr: string[];
  body: BlogBlock[];
  faq: { q: string; a: string }[];
  sources: { label: string; href: string }[];
  relatedCaseStudies: string[]; // case study slugs
};

export const BLOG_AUTHOR = {
  name: "Aryan Rawther",
  role: "Founder, Apex Mind",
  url: "https://www.aryanrawther.com",
} as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "rpa-vs-api-vs-ai-agents",
    title: "RPA vs API integration vs AI agents: how to choose the right automation",
    description:
      "When to use APIs, RPA bots, or AI agents to automate a business process — a practical decision guide with a comparison table and a real hybrid example.",
    excerpt:
      "APIs move data, RPA clicks through screens, AI agents handle judgement. Most real workflows need a mix — here is how to decide which layer does what.",
    category: "Automate",
    capabilityHref: "/what-we-do/automate",
    keywords: [
      "RPA vs API",
      "RPA vs AI agents",
      "workflow automation",
      "intelligent automation",
      "hybrid automation",
    ],
    published: "2026-09-25",
    updated: "2026-09-25",
    tldr: [
      "Use an **API integration** whenever the systems involved expose one — it is the fastest, most reliable, and cheapest to maintain.",
      "Use **RPA** only for the steps where there is no API: legacy desktop apps, government or payer portals, and old ERPs.",
      "Use an **AI agent** for the steps that need judgement — reading emails and PDFs, classifying, extracting messy data, or handling exceptions.",
      "Most production workflows are **hybrid**: AI decides, APIs and bots execute, and a human reviews the edge cases.",
    ],
    body: [
      {
        type: "p",
        text: "\"Should we use RPA or AI?\" is one of the most common questions we hear from operations teams. It is usually the wrong question. APIs, RPA bots, and AI agents solve different problems, and a well-designed automation uses each one only where it is the best fit.",
      },
      { type: "h2", text: "The short definitions" },
      {
        type: "ul",
        items: [
          "**API integration** — two systems exchange data directly through a documented interface. No screens, no clicking. Example: pushing a new order from your website into your accounting software.",
          "**Robotic Process Automation (RPA)** — a software bot operates a user interface the way a person would: logging in, clicking, typing, and copying values. Tools include UiPath, Power Automate, and Selenium.",
          "**AI agent** — a system built around a large language model (LLM) that can read unstructured input, decide what to do next, call tools (including APIs and bots), and return structured output.",
        ],
      },
      { type: "h2", text: "Side-by-side comparison" },
      {
        type: "table",
        caption: "How the three approaches compare in practice.",
        head: ["", "API integration", "RPA", "AI agent"],
        rows: [
          ["Best at", "Moving structured data between systems", "Operating screens that have no API", "Reading, deciding, handling variation"],
          ["Input type", "Structured", "Structured, fixed layout", "Unstructured: email, PDF, free text"],
          ["Breaks when", "The API version changes", "The UI layout changes", "Instructions or data drift; needs evaluation"],
          ["Speed & volume", "Very high", "Moderate — runs at UI speed", "Moderate — bounded by model latency and cost"],
          ["Maintenance", "Low", "Medium to high", "Medium — prompts, evals, monitoring"],
          ["Typical use", "CRM ↔ ERP sync, webhooks", "Legacy portals, desktop apps", "Triage, extraction, drafting, exceptions"],
        ],
      },
      { type: "h2", text: "A simple decision order" },
      {
        type: "p",
        text: "For every step in the workflow, walk down this list and stop at the first option that works:",
      },
      {
        type: "ol",
        items: [
          "**Can the step be removed?** Automating a step nobody needs is the most expensive mistake in automation.",
          "**Is there an API or export?** If yes, integrate directly. It will outlive any bot.",
          "**Is the input structured and the rule fixed?** A plain script or workflow tool (n8n, Make, Zapier, a cron job) is enough.",
          "**Does the step need reading or judgement?** Use an AI agent with a strict output schema and a confidence threshold.",
          "**Is the only way in through a screen?** Use RPA — ideally triggered and supervised by the layer above it.",
          "**Is the cost of a wrong answer high?** Keep a human-in-the-loop review step, and route low-confidence cases there.",
        ],
      },
      { type: "h2", text: "What hybrid looks like in a real project" },
      {
        type: "p",
        text: "Our [healthcare insurance verification project](/case-studies/healthcare-rcm-automation) is a good example of why the answer is rarely one tool. A US billing and RCM company had a large team manually checking whether each patient's insurance was active, and extracting copay, coinsurance, and deductible details from payer portals.",
      },
      {
        type: "ul",
        items: [
          "**API** — daily appointment schedules and patient data were pulled from eClinicalWorks automatically, instead of from manual reports.",
          "**RPA and web automation** — payer portals without APIs were accessed with Selenium, HTML parsing, and browser extensions, choosing the most reliable route per portal.",
          "**AI agent** — an LLM with structured JSON output parsed each portal's irregular layout into the same set of fields, instead of a brittle parser per portal.",
          "**RPA + API write-back** — verified results were written back into patient records via UiPath and APIs, closing the loop.",
        ],
      },
      {
        type: "callout",
        label: "Result",
        text: "300+ patients verified automatically per day, and 7 FTEs — more than half the team — reassigned to new clients. Built in 4 weeks.",
      },
      { type: "h2", text: "Where AI agents are not the right answer" },
      {
        type: "p",
        text: "Agents are powerful but they are not free. Every call has latency and a per-token cost, and outputs need evaluation. If a step is deterministic — the same input should always produce the same output — a script or an API call is cheaper, faster, and easier to audit. Reach for an agent when the input varies in ways rules cannot anticipate.",
      },
      { type: "h2", text: "Where RPA is still the right answer" },
      {
        type: "p",
        text: "RPA gets criticised for being brittle, and it is when it is used everywhere. But many important systems — government portals, insurance payer sites, and older desktop software — will never have a public API. For those steps, a bot is often the only practical option. The key is to keep bots thin: let them execute, and keep the decision-making in a layer that is easier to change.",
      },
      { type: "h2", text: "How to start" },
      {
        type: "ol",
        items: [
          "Pick one workflow that is high-volume, repetitive, and measurable (time per item, error rate, backlog).",
          "Map every step and label it: remove, API, script, AI, RPA, or human.",
          "Build the smallest end-to-end version first, with logging and a human review queue.",
          "Measure against the baseline, then widen coverage.",
        ],
      },
      {
        type: "p",
        text: "If you want a second opinion on a workflow, [send us a short description](/contact) — we will tell you which layer each step belongs in, even if the answer is \"don't automate this yet\".",
      },
    ],
    faq: [
      {
        q: "Is RPA being replaced by AI agents?",
        a: "Not entirely. AI agents are replacing RPA for steps that involve reading unstructured input or making decisions. RPA remains the practical choice for operating systems that have no API, such as legacy desktop apps and many portals. Most modern automations combine both.",
      },
      {
        q: "Which is cheaper to maintain: RPA or API integration?",
        a: "API integrations are generally cheaper to maintain because they do not depend on screen layouts. RPA bots can break when a user interface changes, so they need monitoring and periodic fixes.",
      },
      {
        q: "Can an AI agent control an RPA bot?",
        a: "Yes. A common hybrid pattern is for the AI agent to decide what needs to happen and then trigger an RPA bot or API call to perform the exact action in the target system, with low-confidence cases routed to a human.",
      },
      {
        q: "What is the first process I should automate?",
        a: "Start with a process that is high-volume, repetitive, and already measured — for example insurance verification, invoice entry, or lead triage — so you can prove the result against a clear baseline.",
      },
    ],
    sources: [],
    relatedCaseStudies: ["healthcare-rcm-automation", "autonomous-inbound-email-agent"],
  },
  {
    slug: "generative-engine-optimization-guide",
    title: "Generative engine optimization (GEO): how to get your site cited by ChatGPT, Perplexity, and Google AI Overviews",
    description:
      "A practical GEO checklist: crawler access, structured data, answer-first content, and freshness signals that help AI search engines cite your website.",
    excerpt:
      "AI search engines don't rank pages — they cite sources. A technical and editorial checklist for becoming one of them.",
    category: "Web & SEO",
    capabilityHref: "/what-we-do/web-seo",
    keywords: [
      "generative engine optimization",
      "GEO",
      "AI search optimization",
      "get cited by ChatGPT",
      "Google AI Overviews SEO",
      "llms.txt",
    ],
    published: "2026-09-25",
    updated: "2026-09-25",
    tldr: [
      "**GEO** is the practice of making your content easy for AI search engines to find, understand, and cite in their answers.",
      "The technical foundation is ordinary SEO done well: crawlable pages, a sitemap, fast load times, and **JSON-LD structured data**.",
      "Make sure AI crawlers are **not blocked** in robots.txt, and that you are indexed by **Bing** as well as Google.",
      "Write **answer-first**: a direct answer at the top, clear headings, lists and tables, specific numbers with sources, and a visible author and date.",
    ],
    body: [
      {
        type: "p",
        text: "Search is no longer only ten blue links. ChatGPT, Perplexity, Gemini, Copilot, Claude, and Google's AI Overviews now answer many questions directly, and they cite a small number of sources when they do. Generative engine optimization (GEO) is about being one of those sources.",
      },
      {
        type: "p",
        text: "The term comes from a 2023 research paper by Aggarwal et al. at Princeton and collaborators, which tested content changes against generative search and found that adding citations, quotations, and statistics could increase a source's visibility in AI answers by [up to around 40%](https://arxiv.org/abs/2311.09735). Keyword stuffing, by contrast, did not help.",
      },
      { type: "h2", text: "GEO vs SEO: what actually changes" },
      {
        type: "table",
        head: ["", "Traditional SEO", "GEO"],
        rows: [
          ["Goal", "Rank a page in search results", "Be cited inside an AI-generated answer"],
          ["Unit of success", "Click-through", "Citation and brand mention"],
          ["Content shape", "Full page targeting a keyword", "Extractable passages that answer a specific question"],
          ["Signals", "Links, relevance, page experience", "The same, plus clarity, factual density, and freshness"],
        ],
      },
      {
        type: "p",
        text: "The important point: GEO builds on SEO, it doesn't replace it. AI search products retrieve pages from search indexes before they summarise them. If your site is slow, blocked, or poorly indexed, no amount of rewriting will get it cited.",
      },
      { type: "h2", text: "The technical checklist" },
      {
        type: "ol",
        items: [
          "**Allow AI crawlers.** Check robots.txt for rules that block GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, or Google-Extended. Decide deliberately which you allow.",
          "**Publish a sitemap** at /sitemap.xml with accurate last-modified dates, and reference it from robots.txt.",
          "**Get indexed by Bing.** Several AI assistants rely on Bing's index. Submit your sitemap in Bing Webmaster Tools, not only Google Search Console.",
          "**Add JSON-LD structured data.** At minimum: Organization, WebSite, Article on posts, FAQPage where you have real FAQs, and BreadcrumbList.",
          "**Render content on the server.** Many crawlers do not run JavaScript. Static or server-rendered HTML is the safest option.",
          "**Make pages fast.** Core Web Vitals still matter for the retrieval step, and slow pages get crawled less.",
          "**Consider an llms.txt file.** It is a proposed convention that gives language models a curated map of your site. Adoption by AI providers is still uneven, so treat it as low-cost insurance, not a ranking lever.",
        ],
      },
      { type: "h2", text: "The content checklist" },
      {
        type: "ul",
        items: [
          "**Lead with the answer.** Put a direct, quotable answer in the first two or three sentences, then expand.",
          "**One question per section.** Use headings that match the way people ask — \"How much does X cost?\", \"X vs Y\".",
          "**Be specific.** Replace \"significantly faster\" with the actual number, and say where it came from.",
          "**Cite sources.** Link to primary research, official documentation, and standards.",
          "**Use lists and tables** for steps and comparisons — they are easy for models to extract accurately.",
          "**Show who wrote it and when.** A named author with real experience, a published date, and an updated date.",
          "**Keep it fresh.** Revisit high-value pages regularly and update the date only when the content actually changes.",
        ],
      },
      { type: "h2", text: "What this looks like on a real site" },
      {
        type: "p",
        text: "When we [rebuilt the CombineHealth frontend](/case-studies/combinehealth-seo-redesign), the site had PageSpeed scores around 20–30% and no JSON-LD schema at all. We rebuilt the missing sections in Next.js, took PageSpeed to 100% across all pages, added comprehensive structured data, configured robots.txt and dynamic sitemaps, added an llm.txt file, and set up both Google Search Console and Bing Webmaster Tools.",
      },
      {
        type: "callout",
        label: "Result",
        text: "More than 1 million daily search impressions, with the marketing team's content now sitting on a technically sound foundation.",
      },
      {
        type: "p",
        text: "At a larger scale, internal linking becomes the bottleneck. For a 400+ page site we built an [AI agent that maps and recommends internal links](/case-studies/seo-internal-linking-ai-agent) whenever a new page is published — a job that is impossible to do well by hand.",
      },
      { type: "h2", text: "How to measure GEO" },
      {
        type: "ol",
        items: [
          "List 20–30 questions your buyers actually ask.",
          "Run them through ChatGPT, Perplexity, Gemini, Copilot, and Claude. Record whether you are cited, and who is cited instead.",
          "Track AI referrals in analytics (referrers such as chatgpt.com and perplexity.ai).",
          "Repeat monthly after each round of changes.",
        ],
      },
      {
        type: "p",
        text: "If you want an audit of your site's SEO and AI-search readiness, [get in touch](/contact). We will send back a prioritised list of fixes.",
      },
    ],
    faq: [
      {
        q: "What is generative engine optimization (GEO)?",
        a: "Generative engine optimization is the practice of structuring a website and its content so that AI search engines such as ChatGPT, Perplexity, Gemini, and Google AI Overviews can find it, understand it, and cite it in their generated answers.",
      },
      {
        q: "Is GEO different from SEO?",
        a: "GEO builds on SEO rather than replacing it. AI search engines retrieve pages from search indexes, so crawlability, speed, and structured data still matter. GEO adds a focus on clear, specific, well-sourced passages that a model can quote accurately.",
      },
      {
        q: "Does llms.txt help with AI search?",
        a: "llms.txt is a proposed convention for giving language models a curated overview of a site. It is cheap to add, but support among AI providers is uneven, so it should not replace structured data, sitemaps, and good content.",
      },
      {
        q: "How do I know if AI search engines cite my website?",
        a: "Run the questions your customers ask through ChatGPT, Perplexity, Gemini, Copilot, and Claude, and record which sources are cited. Also track referral traffic from AI assistants in your analytics.",
      },
    ],
    sources: [
      {
        label: "Aggarwal et al., \"GEO: Generative Engine Optimization\" (arXiv, 2023)",
        href: "https://arxiv.org/abs/2311.09735",
      },
      {
        label: "Google Search Central — Introduction to structured data",
        href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
      },
      { label: "The llms.txt proposal", href: "https://llmstxt.org/" },
    ],
    relatedCaseStudies: ["combinehealth-seo-redesign", "seo-internal-linking-ai-agent"],
  },
  {
    slug: "how-to-scope-an-ai-mvp",
    title: "How to scope an AI MVP you can ship in 8 weeks",
    description:
      "A founder's guide to scoping an AI-powered MVP: pick one workflow, design for wrong answers, and build the pipeline before the polish — with a real 8-week example.",
    excerpt:
      "Most AI MVPs stall because the scope is too wide, not because the model is too weak. A practical way to cut an idea down to something you can launch.",
    category: "Software development",
    capabilityHref: "/what-we-do/build",
    keywords: [
      "AI MVP development",
      "MVP scoping",
      "build an AI product",
      "SaaS MVP",
      "startup MVP India",
    ],
    published: "2026-09-25",
    updated: "2026-09-25",
    tldr: [
      "Scope the MVP around **one input and one output** — the smallest loop that delivers value on its own.",
      "Treat the AI model as one component. The hard part is the **production pipeline** around it: ingestion, normalisation, validation, and error handling.",
      "Design for wrong answers from day one: **citations, confidence scores, and an easy way to correct** the output.",
      "Ship to real users early, and let usage decide what goes into version two.",
    ],
    body: [
      {
        type: "p",
        text: "An AI demo can be built in an afternoon. An AI product that people trust with real work takes longer — but not as long as most founders fear, if the scope is right. Here is the approach we use, with our own product SpecLens as the worked example.",
      },
      { type: "h2", text: "1. Find the one painful loop" },
      {
        type: "p",
        text: "Write down the job your user does today, step by step, and circle the step that costs them the most time or the most mistakes. That step is your MVP. Everything else is version two.",
      },
      {
        type: "p",
        text: "For [SpecLens](/case-studies/speclens), the job was comparing product specification sheets from multiple vendors. Procurement teams copied specs out of PDFs into spreadsheets, reconciled units, and chased missing fields. The first version did exactly one thing: **take uploaded vendor documents and produce a comparison matrix.**",
      },
      { type: "h2", text: "2. Write the scope as input → output" },
      {
        type: "table",
        head: ["In scope for v1", "Deliberately out of scope"],
        rows: [
          ["Upload vendor documents (PDF, Word, Excel, PowerPoint, HTML)", "Integrations with procurement suites"],
          ["Extract and normalise specifications", "Team workspaces and permissions"],
          ["Align fields across vendors into one matrix", "Negotiation and pricing workflows"],
          ["Citations back to the source page", "Custom report templates"],
        ],
      },
      {
        type: "p",
        text: "If a feature does not change whether the output is correct and useful, it goes in the right-hand column.",
      },
      { type: "h2", text: "3. Build the pipeline, not just the prompt" },
      {
        type: "p",
        text: "The prompt is rarely the bottleneck. In SpecLens, the hardest problem was turning research prototypes into a reliable production pipeline. A typical AI MVP pipeline has five stages:",
      },
      {
        type: "ol",
        items: [
          "**Ingestion** — accept messy real-world files and convert them to a common structure.",
          "**Extraction** — use the model with a strict output schema, not free text.",
          "**Normalisation** — convert units, names, and formats so like is compared with like.",
          "**Validation** — check the output against rules and flag anything missing or inconsistent.",
          "**Presentation** — show results with enough context for the user to trust or correct them.",
        ],
      },
      { type: "h2", text: "4. Design for wrong answers" },
      {
        type: "p",
        text: "Every AI system is sometimes wrong. The products that succeed make errors cheap to spot and cheap to fix:",
      },
      {
        type: "ul",
        items: [
          "**Citations** — link every extracted value to the page it came from.",
          "**Confidence scores** — highlight low-confidence values instead of hiding them.",
          "**Editable output** — let users correct a value in one click, and log the correction.",
          "**An evaluation set** — keep 20–50 real examples with known answers and re-run them whenever you change the model or prompt.",
        ],
      },
      { type: "h2", text: "5. Pick boring technology around the model" },
      {
        type: "p",
        text: "Use a mainstream web stack, a managed database, and hosted model APIs. Keep the model behind an interface so you can switch providers as prices and capabilities change. Novel infrastructure is a cost you pay before you have learned anything from users.",
      },
      { type: "h2", text: "6. A realistic 8-week plan" },
      {
        type: "table",
        head: ["Weeks", "Focus"],
        rows: [
          ["1", "Workflow mapping, sample data, evaluation set, architecture"],
          ["2–3", "Ingestion and extraction pipeline, tested against the evaluation set"],
          ["4–5", "Normalisation, validation, and the core user interface"],
          ["6", "Accounts, billing or waitlist, analytics, error monitoring"],
          ["7", "Private beta with real users; fix what breaks"],
          ["8", "Public launch"],
        ],
      },
      {
        type: "callout",
        label: "Result",
        text: "SpecLens went from idea to working MVP in 8 weeks and reached 300+ signed-up users in its first month.",
      },
      { type: "h2", text: "Common scoping mistakes" },
      {
        type: "ul",
        items: [
          "Building an admin panel, roles, and settings before anyone has used the core feature.",
          "Promising \"works with any document\" instead of naming the formats you support.",
          "Skipping the evaluation set, then being unable to tell whether a change made things better or worse.",
          "Treating a chat interface as the product when users actually want a finished output.",
        ],
      },
      {
        type: "p",
        text: "Have an AI product idea you want to pressure-test? [Tell us about it](/contact) — we will help you cut it down to a version you can ship.",
      },
    ],
    faq: [
      {
        q: "How long does it take to build an AI MVP?",
        a: "A focused AI MVP that solves one workflow can typically be built in 6 to 10 weeks. Apex Mind's SpecLens went from idea to working MVP in 8 weeks. Timelines grow with the number of integrations, document types, and compliance requirements.",
      },
      {
        q: "What should an AI MVP include?",
        a: "One complete loop from input to useful output, with the pipeline around the model — ingestion, extraction, normalisation, validation — plus ways for users to verify and correct results, such as citations and confidence scores.",
      },
      {
        q: "Should I fine-tune a model for my MVP?",
        a: "Usually not. Hosted models with a strict output schema and good retrieval are enough for most MVPs. Fine-tuning becomes worth considering once you have real usage data and a clear accuracy gap.",
      },
      {
        q: "How do I know if my AI MVP is accurate enough?",
        a: "Build an evaluation set of real examples with known correct answers and measure against it on every change. Decide in advance what accuracy level is acceptable for the task, and route low-confidence results to a human.",
      },
    ],
    sources: [],
    relatedCaseStudies: ["speclens", "photoshoprequest-ai-editor"],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

/** Newest first. */
export const sortedBlogPosts = [...blogPosts].sort((a, b) =>
  b.published.localeCompare(a.published),
);

/** Rough reading time from the text content of a post. */
export function readingMinutes(post: BlogPost) {
  const text = [
    ...post.tldr,
    ...post.body.flatMap((b) => {
      if (b.type === "ul" || b.type === "ol") return b.items;
      if (b.type === "table") return [...b.head, ...b.rows.flat()];
      return [b.text];
    }),
    ...post.faq.flatMap((f) => [f.q, f.a]),
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
