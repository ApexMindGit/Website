import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredCaseStudies, type CaseStudy } from "./case-studies-data";

function Card({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/case-studies/${study.slug}`} className="case-card">
      <div className="case-card-top">
        <span className="mono-sm">{study.industry}</span>
        <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <h3>{study.title}</h3>
      <p>{study.summary}</p>
      <div className="case-card-result">
        <span className="mono-sm">Result</span>
        <strong>{study.result}</strong>
      </div>
    </Link>
  );
}

/** Auto-scrolling marquee of featured case studies. The track is duplicated so
    the loop is seamless; it pauses on hover and holds still under reduced motion
    (where it becomes a normal horizontal scroller). */
export default function CaseCarousel() {
  const items = [...featuredCaseStudies, ...featuredCaseStudies];
  return (
    <div className="case-carousel" aria-label="Selected case studies">
      <div className="case-carousel-track">
        {items.map((study, i) => (
          <Card key={`${study.slug}-${i}`} study={study} />
        ))}
      </div>
    </div>
  );
}
