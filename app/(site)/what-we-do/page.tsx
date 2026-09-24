import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABand, Arrow } from "../../components/ui";
import { capabilityChildren } from "../../components/nav-data";

export const metadata: Metadata = {
  title: "What we do",
  description:
    "Explore Apex Mind's capabilities: software development, applied AI, workflow automation, robotic process automation (RPA), and web development & SEO.",
};

const related = [
  ["System integrations", "Connect the applications you already use into a shared workflow."],
  ["Modernization", "Improve or replace software that no longer fits current requirements."],
  ["Data migration & entry", "Move records between systems accurately, without manual re-keying."],
  ["Maintenance & support", "Keep an existing application working through ongoing changes."],
];

export default function WhatWeDo() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Software, AI, and the
            <br />
            work between them.
          </>
        }
        intro="Five ways we help, one starting point: the problem you are trying to solve. Bring it before you have a specification."
        meta={
          <div>
            <span className="mono-label">Apex Mind / Lucknow</span>
            <p>
              Software consultancy
              <br />
              Est. 2026
              <br />
              India + global clients
            </p>
          </div>
        }
      />

      <section className="section container">
        <div className="card-grid">
          {capabilityChildren.map((c, i) => (
            <Link key={c.href} href={c.href} className="feature-card">
              <span className="eyebrow">0{i + 1}</span>
              <h3>{c.label}</h3>
              <p>{c.description}</p>
              <span className="card-cta">
                Explore <Arrow diagonal />
              </span>
            </Link>
          ))}
        </div>

        <div className="subsection-title">
          <h3 className="h4">Also part of the work</h3>
          <span className="mono-sm">Related capabilities</span>
        </div>
        <div className="bring-list">
          {related.map(([title, body], i) => (
            <div key={title}>
              <span className="mono-label">0{i + 1}</span>
              <div>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        title={
          <>
            Not sure which
            <br />
            one you need?
          </>
        }
        body="Describe the problem and we will suggest a starting point — a requirement may cross more than one capability."
      />
    </>
  );
}
