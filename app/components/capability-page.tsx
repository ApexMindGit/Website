import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Arrow, CTABand } from "./ui";
import Button from "./button";
import FaqAccordion from "./faq-accordion";

export type CapabilityData = {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  /** Small text on the hero badge card (e.g. a proof point). */
  heroNote?: string;
  /** Four "why us / what you get" points shown as an icon row. */
  features?: { icon: LucideIcon; title: string; body: string }[];
  paragraphs: string[];
  bring: { label: string; title: string; body: string }[];
  /** Capability-specific FAQ. */
  faqs?: [string, string][];
  /** Real, related case studies (never fabricated logos). */
  cases?: { href: string; label: string; tag?: string }[];
  related?: { href: string; label: string }[];
  ctaTitle: React.ReactNode;
  ctaBody?: string;
};

export default function CapabilityPage({ data }: { data: CapabilityData }) {
  const hasFeatures = !!data.features && data.features.length > 0;
  const hasCases = !!data.cases && data.cases.length > 0;
  const hasFaqs = !!data.faqs && data.faqs.length > 0;

  return (
    <>
      {/* --- Hero panel (soft aurora, dual CTA, proof badge) --- */}
      <section className="cap-hero container">
        <div className="cap-hero-main">
          <p className="eyebrow">{data.eyebrow}</p>
          <h1 className="display-md">{data.title}</h1>
          <p className="cap-hero-intro">{data.intro}</p>
          <div className="cap-hero-actions">
            <Button href="/contact">Start a project</Button>
            <Button href="/case-studies" variant="secondary">
              See our work
            </Button>
          </div>
        </div>
        {data.heroNote ? (
          <aside className="cap-hero-badge">
            <span className="mono-label">Apex Mind</span>
            <p>{data.heroNote}</p>
            <span className="cap-hero-badge-foot">
              Lucknow, India · India + global clients
            </span>
          </aside>
        ) : null}
      </section>

      {/* --- Feature row --- */}
      {hasFeatures ? (
        <section className="section container">
          <div className="cap-features">
            {data.features!.map((f) => {
              const Icon = f.icon;
              return (
                <div className="cap-feature" key={f.title}>
                  <span className="cap-feature-icon">
                    <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* --- Selected work (real case studies) --- */}
      {hasCases ? (
        <section className="section container">
          <div className="subsection-title">
            <h3 className="h4">Selected work</h3>
            <span className="mono-sm">Related case studies</span>
          </div>
          <div className="cap-work">
            {data.cases!.map((c) => (
              <Link key={c.href} href={c.href} className="cap-work-item">
                <span className="cap-work-text">
                  {c.tag ? <span className="mono-label">{c.tag}</span> : null}
                  <span className="cap-work-label">{c.label}</span>
                </span>
                <Arrow diagonal />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* --- Deep content: prose + aside rail + "what helps us start" --- */}
      <section className="section container">
        <div className="content-columns">
          <div className="prose">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside>
            <div className="aside-block">
              <span className="mono-label">Where to start</span>
              <p>
                No specification needed. Describe the problem in plain language —
                scoping it properly is part of the work.
              </p>
            </div>
            {data.related ? (
              <div className="aside-block">
                <span className="mono-label">Related</span>
                <p>
                  {data.related.map((r, i) => (
                    <span key={r.href}>
                      {i > 0 ? <br /> : null}
                      <Link href={r.href}>{r.label}</Link>
                    </span>
                  ))}
                </p>
              </div>
            ) : null}
            <Link className="text-link" href="/contact">
              <Arrow />
              Discuss your requirement
            </Link>
          </aside>
        </div>

        <div className="subsection-title">
          <h3 className="h4">What helps us start</h3>
          <span className="mono-sm">Useful context, not a specification</span>
        </div>
        <div className="bring-list">
          {data.bring.map((item, i) => (
            <div key={item.title}>
              <span className="mono-label">0{i + 1}</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ --- */}
      {hasFaqs ? (
        <section className="faq-section">
          <div className="container faq-layout">
            <div className="faq-intro">
              <p className="eyebrow">FAQ</p>
              <h2>
                Questions,
                <br />
                answered.
              </h2>
              <p>
                Common questions about this capability and how an engagement
                starts. Ask us anything else directly.
              </p>
              <Button href="/contact">Start a conversation</Button>
            </div>
            <FaqAccordion items={data.faqs!} />
          </div>
        </section>
      ) : null}

      <CTABand title={data.ctaTitle} body={data.ctaBody} />
    </>
  );
}
