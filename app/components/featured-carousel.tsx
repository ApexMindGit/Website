"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Arrow } from "./ui";
import { heroCaseStudies } from "./case-studies-data";

/** Rotating hero featured card: cycles the top 3 case studies on the aurora
    background, auto-advancing every 6s (paused on hover, and disabled under
    reduced motion — dots still allow manual navigation). */
export default function FeaturedCarousel() {
  const items = heroCaseStudies;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((v) => (v + 1) % items.length),
      6000,
    );
    return () => clearInterval(id);
  }, [paused, items.length]);

  const study = items[active];
  const hero = study.hero!;

  return (
    <div
      className="studio-project aurora-card featured-rotator"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link
        href={`/case-studies/${study.slug}`}
        className="featured-slide"
        key={study.slug}
      >
        <span className="eyebrow">Featured work / Live</span>
        <h2>{hero.name}</h2>
        <p>{hero.tagline}</p>
        <div className="studio-metric">
          {hero.value}
          <span>{hero.label}</span>
        </div>
        <span className="studio-project-cta">
          <Arrow />
          Explore the project
        </span>
      </Link>
      <div className="featured-dots" aria-label="Featured case studies">
        {items.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            className={i === active ? "is-active" : ""}
            aria-label={c.hero!.name}
            aria-current={i === active}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
