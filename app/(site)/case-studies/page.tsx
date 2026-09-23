import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABand, Arrow } from "../../components/ui";
import { caseStudies } from "../../components/case-studies-data";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Real projects, specific problems, measurable results — AI automation, SaaS development, and technical SEO from Apex Mind.",
};

export default function CaseStudies() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Real problems.
            <br />
            Measurable results.
          </>
        }
        intro="Not theoretical — what actually happened. AI automation, SaaS products, and technical SEO across healthcare, procurement, and consumer teams."
      />

      <section className="section container">
        <div className="work-index-pattern">
          {caseStudies.map((study, i) => (
            <Link
              key={study.slug}
              className={`work-index-row${i === 0 ? " strategic-blue" : ""}`}
              href={`/case-studies/${study.slug}`}
            >
              <div>
                <span className="eyebrow">
                  {String(i + 1).padStart(2, "0")} / {study.industry}
                </span>
                <h4>{study.title}</h4>
              </div>
              <p>{study.summary}</p>
              <span className="work-index-arrow">
                <Arrow diagonal />
              </span>
            </Link>
          ))}
        </div>
        <p className="caption muted" style={{ marginTop: "2rem" }}>
          More case studies are published regularly. Some client work is under
          NDA.
        </p>
      </section>

      <CTABand
        title={
          <>
            Want a result
            <br />
            like these?
          </>
        }
        body="Tell us the problem you are trying to solve."
      />
    </>
  );
}
