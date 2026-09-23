import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, CTABand } from "../../../components/ui";
import {
  caseStudies,
  getCaseStudy,
} from "../../../components/case-studies-data";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: `${study.summary} ${study.result}.`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const related = caseStudies
    .filter((c) => c.slug !== study.slug)
    .slice(0, 2);

  return (
    <>
      <section className="page-hero container">
        <div className="page-hero-main">
          <p className="eyebrow">
            {study.industry} / {study.services[0]}
          </p>
          <h1 className="display-md">{study.title}</h1>
          <p className="page-hero-intro">{study.result}</p>
          {study.externalUrl && (
            <a className="text-link" href={study.externalUrl.href}>
              <Arrow />
              {study.externalUrl.label}
            </a>
          )}
        </div>
        <div className="page-hero-meta">
          <div>
            <span className="mono-label">Client</span>
            <p>{study.client}</p>
          </div>
          <div>
            <span className="mono-label">Service</span>
            <p>{study.services.join(", ")}</p>
          </div>
          <div>
            <span className="mono-label">Timeline</span>
            <p>{study.timeline}</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="content-columns">
          <div className="prose">
            <div className="case-section">
              <h2>The problem</h2>
              {study.problem.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="case-section">
              <h2>The approach</h2>
              <div className="pipeline-list">
                {study.approach.map((step, i) => (
                  <div key={step.title}>
                    <span className="mono-label">0{i + 1}</span>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div className="aside-block">
              <span className="mono-label">Result</span>
              <p>{study.result}</p>
            </div>
            {study.takeaways.length > 0 && (
              <div className="aside-block">
                <span className="mono-label">Key takeaways</span>
                {study.takeaways.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            )}
          </aside>
        </div>

        <div className="subsection-title">
          <h3 className="h4">The results</h3>
          <span className="mono-sm">Outcomes</span>
        </div>
        <div className="results-grid">
          {study.results.map((r) => (
            <div key={r.label} className="result-tile">
              <strong>{r.value}</strong>
              <span>{r.label}</span>
            </div>
          ))}
        </div>

        <div className="subsection-title">
          <h3 className="h4">Related case studies</h3>
          <Link className="mono-sm" href="/case-studies">
            All work →
          </Link>
        </div>
        <div className="card-grid two">
          {related.map((r) => (
            <Link key={r.slug} href={`/case-studies/${r.slug}`} className="feature-card">
              <span className="eyebrow">{r.industry}</span>
              <h3 style={{ fontSize: "22px" }}>{r.title}</h3>
              <p>{r.result}</p>
              <span className="card-cta">
                Read case study <Arrow diagonal />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTABand
        title={
          <>
            Want results
            <br />
            like this?
          </>
        }
        body="Tell us what you are trying to build, automate, or improve."
      />
    </>
  );
}
