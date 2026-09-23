"use client";

import { useEffect, useRef } from "react";

type Line = { text: string; sub?: boolean };

/** Scroll-scrubbed "focus-pull" reveal: characters resolve from a blurred blue
    into crisp white as the block scrolls up, fully resolved when its centre
    reaches the middle of the viewport. Progress is published as a single CSS
    variable (--p) and the per-character math runs in CSS for performance. */
export default function ScrollReveal({ lines }: { lines: Line[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const denom = vh / 2 + r.height / 2;
      const p = Math.max(0, Math.min(1, (vh - r.top) / denom));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const total = lines.reduce((a, l) => a + l.text.replace(/\s/g, "").length, 0);
  let index = -1;

  return (
    <section className="scroll-reveal-section">
      <div
        className="scroll-reveal"
        ref={ref}
        style={{ ["--n" as string]: total }}
        aria-label={lines.map((l) => l.text).join(" ")}
      >
        {lines.map((line, li) => (
          <p
            key={li}
            className={line.sub ? "sr-line sr-sub" : "sr-line"}
            aria-hidden="true"
          >
            {line.text.split(" ").map((word, wi) => (
              <span className="sr-word" key={wi}>
                {word.split("").map((ch, ci) => {
                  index += 1;
                  return (
                    <span
                      className="sr-char"
                      style={{ ["--i" as string]: index }}
                      key={ci}
                    >
                      {ch}
                    </span>
                  );
                })}
                {" "}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
