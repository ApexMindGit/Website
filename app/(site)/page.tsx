import Link from "next/link";
import { Arrow, CTABand } from "../components/ui";
import { CONTACT } from "../components/nav-data";
import HighlightedProjects from "../components/highlighted-projects";
import FeaturedCarousel from "../components/featured-carousel";
import ScrollReveal from "../components/scroll-reveal";
import ServicesAccordion from "../components/services-accordion";
import FaqAccordion from "../components/faq-accordion";

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
    "What happens after I send an inquiry?",
    "We review the problem, reply within one working day, and suggest a clear next step.",
  ],
  [
    "Do you work with startups and government teams?",
    "Yes. We work with startup founders and public-sector and procurement teams. Apex Mind is a registered LLP based in Lucknow, India.",
  ],
  [
    "Do you offer fixed-scope projects or retainers?",
    "Both. Fixed-scope projects come with agreed deliverables, price, and milestone payments; monthly retainers cover ongoing work and support for an agreed amount each month.",
  ],
  [
    "Do I need a specification before contacting you?",
    "No. You can bring the problem first — defining the requirement is part of the work.",
  ],
  [
    "Where are you based, and do you work remotely?",
    "We are based in Lucknow, India, and work with clients across India and globally.",
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
  knowsAbout: [
    "Software development",
    "AI consulting and implementation",
    "Workflow automation",
    "System integrations",
    "Government software",
  ],
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
              <Link className="button" href="/contact">
                <Arrow />
                Start a conversation
              </Link>
              <Link className="text-link" href="/case-studies">
                <Arrow />
                Explore our work
              </Link>
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
            <div className="studio-hero-bottom">
              <span>
                Based in Lucknow.
                <br />
                Working in India and globally.
              </span>
              <span>
                APEX MIND LLP
                <br />
                EST. 2026
              </span>
            </div>
          </div>
        </div>
        <aside className="studio-side">
          <FeaturedCarousel />
          <Link href="/how-we-work" className="studio-engagement">
            <span className="eyebrow">Two ways to work together</span>
            <h3>
              A defined project.
              <br />
              Or ongoing support.
            </h3>
            <span>
              <Arrow />
              Let&rsquo;s talk about it
            </span>
          </Link>
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
            <p className="eyebrow">How we work / Approved process</p>
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
          <div className="process-summary" aria-label="Project starting point">
            <span className="mono-label">Before code</span>
            <p>We agree what done means.</p>
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
              Everything you need to know about working with Apex Mind — from
              engagement models and process to where we work and how we start.
            </p>
            <Link className="button" href="/how-we-work">
              <Arrow />
              More on how we work
            </Link>
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
