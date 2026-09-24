import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Arrow, CTABand } from "../components/ui";
import Button from "../components/button";
import { CONTACT } from "../components/nav-data";
import HighlightedProjects from "../components/highlighted-projects";
import FeaturedCarousel from "../components/featured-carousel";
import ScrollReveal from "../components/scroll-reveal";
import ServicesAccordion from "../components/services-accordion";
import FaqAccordion from "../components/faq-accordion";

export const metadata: Metadata = {
  description:
    "Founder-led software, AI & automation consultancy in Lucknow, India — custom software and MVPs, applied AI (document AI, agents, RAG), workflow automation, and RPA for startups and public-sector teams.",
  alternates: { canonical: "/" },
};

// Provisional homepage copy (copy-drafts.md). Final wording pending review.
const processes = [
  {
    title: "Understand the problem",
    body: "We map the goal, users, constraints, and what success should look like.",
  },
  {
    title: "Agree on scope",
    body: "We define deliverables, priorities, timelines, and the engagement model.",
  },
  {
    title: "Build and review",
    body: "Work moves in reviewable slices so decisions stay visible as the product takes shape.",
  },
  {
    title: "Test and hand over",
    body: "We verify the workflow, clean up the rough edges, and hand over what your team needs.",
  },
  {
    title: "Ongoing support",
    body: "If agreed, we keep improving, maintaining, or extending the system after launch.",
  },
];

// Single source for the FAQ section and the FAQPage structured data.
const faqs = [
  [
    "How much does it cost to build an MVP or custom software?",
    "It depends on scope, but MVPs typically run $15k–$150k over 8–18 weeks industry-wide. As a Lucknow, India–based team, we deliver comparable quality at lower cost than US/EU agencies, and scope fixed-price or retainer work to your budget. We share a quote once the requirement is clear.",
  ],
  [
    "How long does it take to build a SaaS MVP?",
    "Usually 8–18 weeks, depending on complexity. We ship in reviewable slices and aim for a usable first version early — SpecLens went from idea to a working MVP in 8 weeks.",
  ],
  [
    "Can you automate a workflow or system that has no API?",
    "Yes — that is what RPA is for. Software bots operate the interface like a person: logging into legacy portals, reading screens, and moving data between systems. It suits legacy software, invoice processing, and data entry, with a person kept in the loop for exceptions.",
  ],
  [
    "How do you add AI to an existing product or workflow?",
    "We start with one high-value task — document processing, an autonomous agent, or retrieval (RAG) — prototype it quickly, and verify it helps before scaling. AI is wired into your real workflow with clear inputs, confidence scoring, and human review, so the output can be trusted.",
  ],
  [
    "Do you work with startups and government teams?",
    "Yes. We work with startup founders, growing companies, and public-sector and procurement teams. Apex Mind is a registered LLP in Lucknow, India, serving clients across India and globally.",
  ],
  [
    "Do I need a technical specification to start?",
    "No. Bring the problem in plain language — turning it into a clear requirement is part of the work.",
  ],
  [
    "What happens after I send an inquiry?",
    "We reply within one working day with a clear next step — usually a short call or a scoped proposal.",
  ],
] as const;

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Apex Mind LLP",
  url: "https://apexminds.in",
  logo: "https://apexminds.in/icon.png",
  description:
    "Founder-led software consultancy in Lucknow, India, helping startups and public-sector teams build software, apply AI, and automate workflows.",
  foundingDate: "2026",
  areaServed: ["IN", "Worldwide"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  founder: {
    "@type": "Person",
    name: "Aryan Rawther",
    jobTitle: "Founder",
    sameAs: "https://www.aryanrawther.com",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: CONTACT.email,
    telephone: "+918052799799",
    availableLanguage: ["English", "Hindi"],
  },
  slogan: "Your senior software team, without the headcount.",
  knowsAbout: [
    "Software development",
    "MVP development",
    "SaaS development",
    "Applied AI",
    "Document AI",
    "AI agents and agentic workflows",
    "Retrieval-Augmented Generation (RAG)",
    "Workflow automation",
    "Robotic Process Automation (RPA)",
    "System integrations",
    "Web development and technical SEO",
    "Government software",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Software development",
          url: "https://apexminds.in/what-we-do/build",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Applied AI",
          url: "https://apexminds.in/what-we-do/intelligence",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Workflow automation",
          url: "https://apexminds.in/what-we-do/automate",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Robotic Process Automation (RPA)",
          url: "https://apexminds.in/what-we-do/rpa",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web development & SEO",
          url: "https://apexminds.in/what-we-do/web-seo",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="studio-opening">
        <div className="studio-hero">
          <div className="hero-lead">
            <p className="eyebrow">
              Founder-led software consultancy / Lucknow, India
            </p>
            <h1>
              Software, AI, and automation.
              <br />
              <span>Built around your problem.</span>
            </h1>
            <div className="actions">
              <Button href="/contact">Start a conversation</Button>
              <Button href="/case-studies" variant="secondary">
                Explore our work
              </Button>
            </div>
          </div>
          <div className="hero-foot">
            <p className="studio-description">
              Apex Mind is a founder-led software consultancy in Lucknow, India —
              helping startups and public-sector teams build software, apply AI,
              and automate workflows.
            </p>
            <div className="studio-disciplines">
              <span>Software development</span>
              <span>AI implementation</span>
              <span>Workflow automation</span>
            </div>
          </div>
        </div>
        <aside className="studio-side">
          <FeaturedCarousel />
          <div className="studio-engagement">
            <span className="eyebrow">Built to ship</span>
            <h3>
              Idea to live product —
              <br />
              in weeks, not quarters.
            </h3>
            <span className="studio-engagement-note">
              SpecLens: MVP in 8 weeks
            </span>
            <Button href="/how-we-work" variant="light" className="engagement-cta">
              How we work
            </Button>
          </div>
        </aside>
      </section>

      <ScrollReveal
        lines={[
          { text: "Think of us as" },
          { text: "your senior software team." },
          { text: "Without the headcount." },
          { text: "You bring the problem.", sub: true },
          { text: "We bring the engineering to ship it.", sub: true },
        ]}
      />

      <section className="services-section">
        <div className="container">
          <div className="services-banner aurora-card">
            <div className="services-banner-head">
              <p className="eyebrow">Services</p>
              <h2>
                Everything your team
                <br />
                needs to build and ship.
              </h2>
            </div>
            <p className="services-banner-tagline">
              You bring the priorities.
              <br />
              We bring the thinking, craft, and execution.
            </p>
          </div>
          <ServicesAccordion />
        </div>
      </section>

      <section className="process-band">
        <div className="container process-band-inner">
          <div className="process-copy">
            <p className="eyebrow">How we work / Our process</p>
            <h2 className="display-md">
              A clear path.
              <br />
              Room for conversation.
            </h2>
            <p>
              You do not need a finished specification to begin. We start by
              understanding the problem, then turn the useful parts into a
              scope your team can actually act on.
            </p>
            <Link className="text-link" href="/how-we-work">
              <Arrow />
              See how we work
            </Link>
          </div>
          <div className="process-summary" aria-label="How we start">
            <span className="mono-label">Before we build</span>
            <p>We agree what &ldquo;done&rdquo; looks like.</p>
          </div>
          <div className="process-grid">
            {processes.map((p, i) => (
              <div
                className="process-step"
                style={{ ["--step" as string]: i }}
                key={p.title}
              >
                <span className="mono-label">0{i + 1}</span>
                <h3 className="h4">{p.title}</h3>
                <p className="caption">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HighlightedProjects />

      <section className="faq-section">
        <div className="container faq-layout">
          <div className="faq-intro">
            <p className="eyebrow">FAQ</p>
            <h2>
              Frequently
              <br />
              Asked
              <br />
              Questions
            </h2>
            <p>
              Straight answers on cost, timelines, and how we work — building
              software, applying AI, and automating workflows for startups and
              public-sector teams.
            </p>
            <div className="faq-contact">
              <span className="faq-contact-title">
                Have a different question?
              </span>
              <div className="faq-contact-chips">
                <a className="faq-chip" href={`mailto:${CONTACT.email}`}>
                  <Mail size={15} strokeWidth={1.75} aria-hidden="true" />
                  {CONTACT.email}
                </a>
                <a
                  className="faq-chip"
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={15} strokeWidth={1.75} aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <CTABand
        title={
          <>
            Your software backlog
            <br />
            isn&rsquo;t getting any shorter.
          </>
        }
        body="Product, AI, automation, and internal tools. One founder-led software partner, scoped around the problem your team needs to move."
      />
    </>
  );
}
