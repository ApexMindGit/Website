import Link from "next/link";
import { Arrow, ImageSlot } from "./ui";
import { heroCaseStudies } from "./case-studies-data";

/** "Works" section: centered header + alternating project showcases for the top
    3 case studies (meta on one side, visual on the other). */
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
          <Link className="button" href="/case-studies">
            <Arrow />
            All projects
          </Link>
        </div>

        <div className="works-list">
          {heroCaseStudies.map((study, i) => {
            const hero = study.hero!;
            return (
              <article
                key={study.slug}
                className={`work-item${i % 2 ? " reverse" : ""}`}
              >
                <div className="work-meta">
                  <div className="work-tags">
                    <span className="work-client">{hero.name}</span>
                    <span className="work-badge">{study.industry}</span>
                  </div>
                  <h3 className="work-title">
                    {hero.tagline.replace(/\.$/, "")}
                  </h3>
                  <span className="work-pill">{study.result}</span>
                  <Link className="button" href={`/case-studies/${study.slug}`}>
                    <Arrow />
                    View case
                  </Link>
                </div>
                <div className="work-visual">
                  <ImageSlot label={hero.name} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
