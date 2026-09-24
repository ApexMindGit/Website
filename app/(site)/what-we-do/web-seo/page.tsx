import type { Metadata } from "next";
import { Gauge, Code2, Search, Sparkles } from "lucide-react";
import CapabilityPage, {
  type CapabilityData,
} from "../../../components/capability-page";

export const metadata: Metadata = {
  title: "Web development & SEO",
  description:
    "Web development and SEO with Apex Mind. High-performance Next.js sites built to ship and to be found — technical SEO, structured data, and AI-search readiness (GEO).",
};

const data: CapabilityData = {
  eyebrow: "What we do / Web & SEO",
  title: (
    <>
      Sites built to ship
      <br />
      and to be found.
    </>
  ),
  intro:
    "High-performance websites that load fast, read well, and surface in both traditional search and AI answers.",
  heroNote: "100% PageSpeed, structured data, and AI-search readiness.",
  features: [
    {
      icon: Gauge,
      title: "Performance",
      body: "Fast, modern builds — targeting 100% PageSpeed and a clean core-vitals profile.",
    },
    {
      icon: Code2,
      title: "Next.js builds",
      body: "Frontend builds and rebuilds on a modern stack, ready to grow with the product.",
    },
    {
      icon: Search,
      title: "Technical SEO",
      body: "Structured data, sitemaps, and clean markup so search engines read the site correctly.",
    },
    {
      icon: Sparkles,
      title: "AI-SEO (GEO)",
      body: "Content and schema tuned to appear in AI answers — ChatGPT, Perplexity, Gemini, and more.",
    },
  ],
  paragraphs: [
    "A website has two jobs: convince the people who arrive, and be found by the people who haven't yet. Apex Mind builds high-performance sites on a modern stack — fast to load, clear to read, and structured so search engines and AI assistants understand them.",
    "Performance and SEO aren't a phase at the end — they're built in. Clean markup, structured data, sitemaps, and strong core web vitals come as part of the build, not a retrofit.",
    "Search is changing: people ask AI assistants as often as they type queries. We optimize for both — traditional ranking (Google, Bing) and generative engines (ChatGPT, Perplexity, Gemini) — so the site shows up wherever the answer is formed.",
  ],
  bring: [
    {
      label: "01",
      title: "The audience",
      body: "Who you want to reach, and what should happen when they land.",
    },
    {
      label: "02",
      title: "The current site, if any",
      body: "What exists today, what works, and what needs to change.",
    },
    {
      label: "03",
      title: "The terms that matter",
      body: "The searches and questions you want to show up for.",
    },
  ],
  faqs: [
    [
      "What does '100% PageSpeed' mean?",
      "A top Lighthouse performance score. It reflects a fast, well-built site — which helps both users and ranking.",
    ],
    [
      "What is AI-SEO or GEO?",
      "Generative Engine Optimization — structuring content and markup so AI assistants cite your site when they answer questions.",
    ],
    [
      "Do you rebuild existing sites, or only new ones?",
      "Both. We build from scratch and also rebuild or improve sites that are slow, dated, or hard to find.",
    ],
    [
      "Will you handle content and schema too?",
      "We handle technical SEO and schema, and can advise on content structure. Ongoing content can run under a retainer.",
    ],
    [
      "How long until we see SEO results?",
      "Technical gains land immediately; ranking and AI visibility build over weeks to months. We'll set realistic expectations up front.",
    ],
  ],
  related: [
    { href: "/what-we-do/build", label: "Software development" },
    { href: "/what-we-do/intelligence", label: "Applied AI" },
    { href: "/what-we-do/automate", label: "Automate" },
    { href: "/what-we-do/rpa", label: "RPA" },
  ],
  ctaTitle: (
    <>
      Let&rsquo;s make your site
      <br />
      fast and findable.
    </>
  ),
};

export default function WebSeoPage() {
  return <CapabilityPage data={data} />;
}
