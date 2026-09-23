"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Arrow } from "./ui";
import { heroCaseStudies } from "./case-studies-data";

/** Rotating hero featured card: cycles the top 3 case studies on the aurora
    background. Each dot doubles as a progress bar — the active dot fills over the
    display window and, when it completes, advances to the next card. Hovering
    pauses the fill (and therefore the timer). Under reduced motion the fill is
    static and a plain interval drives the rotation. */
export default function FeaturedCarousel() {
  const items = heroCaseStudies;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Reduced-motion fallback: the fill doesn't animate, so advance on a timer.
  useEffect(() => {
    if (!reduce || paused || items.length < 2) return;
    const id = setInterval(
      () => setActive((v) => (v + 1) % items.length),
      6000,
    );
    return () => clearInterval(id);
  }, [reduce, paused, items.length]);

  const next = () => setActive((v) => (v + 1) % items.length);
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
        <span className="featured-cta">
          <span className="featured-cta-label">
            <span className="featured-cta-out">Explore the project</span>
            <span className="featured-cta-in" aria-hidden="true">
              Explore the project
            </span>
          </span>
          <span className="featured-cta-arrow" aria-hidden="true">
            <Arrow />
          </span>
        </span>
      </Link>
      <div className="featured-dots" aria-label="Featured case studies">
        {items.map((c, i) => {
          const isActive = i === active;
          return (
            <button
              key={c.slug}
              type="button"
              className={isActive ? "is-active" : ""}
              aria-label={c.hero!.name}
              aria-current={isActive}
              onClick={() => setActive(i)}
            >
              <span
                className="featured-dot-fill"
                key={isActive ? `run-${active}` : "idle"}
                style={
                  isActive ? { animationPlayState: paused ? "paused" : "running" } : undefined
                }
                onAnimationEnd={
                  isActive
                    ? (e) => {
                        if (e.animationName.includes("dot-progress")) next();
                      }
                    : undefined
                }
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
