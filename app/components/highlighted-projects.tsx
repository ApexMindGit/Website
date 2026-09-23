import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MediaSlot } from "./ui";
import Button from "./button";
import { featuredCaseStudies } from "./case-studies-data";

/** "Works" section: centered header, then full-screen project panels that stack
    one over the next as you scroll, alternating white / light-grey backgrounds. */
export default function HighlightedProjects() {
  return (
    <section className="works-section">
      <div className="container">
        <div className="works-head">
          <p className="eyebrow">Works</p>
          <h2>
            Highlighted projects
            <br />
            that made a real impact.
          </h2>
          <p className="works-sub">
            From AI automation to SaaS products and technical SEO, we help teams
            design, build, and ship software that moves the numbers.
          </p>
          <Button href="/case-studies">All projects</Button>
        </div>
      </div>

      <div className="works-stack">
        {featuredCaseStudies.map((study, i) => {
          const name = study.hero?.name ?? study.title;
          const sub = (study.hero?.tagline ?? study.summary).replace(/\.$/, "");
          return (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="work-card"
            >
              <div className="container work-card-body">
                <div className="work-card-meta">
                  <div className="work-card-tags">
                    <span className="work-client">{name}</span>
                    <span className="work-badge">{study.industry}</span>
                  </div>
                  <h3 className="work-card-title">{sub}</h3>
                  <span className="work-pill">{study.result}</span>
                  <span className="work-card-cta">
                    <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
                    View case
                  </span>
                </div>
                <div className="work-card-visual">
                  <MediaSlot label={name} media={study.media} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
