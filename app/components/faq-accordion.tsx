"use client";

import { useState } from "react";

type Item = readonly [string, string];

/** FAQ accordion (right column of the FAQ section): question rows with a +/−
    toggle that expand with a smooth grid-rows animation. Single-open. */
export default function FaqAccordion({
  items,
}: {
  items: readonly Item[];
}) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="faq-accordion">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div className={`faq-item${isOpen ? " is-open" : ""}`} key={q}>
            <button
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{q}</span>
              <span className="svc-plus" aria-hidden="true" />
            </button>
            <div className="faq-a" id={`faq-a-${i}`} data-open={isOpen}>
              <div className="faq-a-inner">
                <p>{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
