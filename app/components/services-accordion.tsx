"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./button";

type Service = {
  title: string;
  href?: string;
  hrefLabel?: string;
  colA: string[];
  colB: string[];
  desc: string;
};

const services: Service[] = [
  {
    title: "Software development",
    href: "/what-we-do/build",
    hrefLabel: "Explore software development",
    colA: ["Web applications", "SaaS products", "Internal tools"],
    colB: ["Integrations", "Modernization", "Maintenance & support"],
    desc: "Web apps, SaaS products, and internal tools — built around a defined problem and shipped in reviewable slices. We also modernize and extend the systems you already run.",
  },
  {
    title: "AI integration & agentic workflows",
    href: "/what-we-do/intelligence",
    hrefLabel: "Explore intelligence",
    colA: ["Document AI", "Agentic workflows", "RAG systems"],
    colB: ["LLM integration", "Extraction & parsing", "Confidence scoring"],
    desc: "We connect AI to a practical task — document processing, autonomous agents, and retrieval systems — with clear inputs, a defined job, and output someone can trust.",
  },
  {
    title: "Workflow automation",
    href: "/what-we-do/automate",
    hrefLabel: "Explore automate",
    colA: ["Process automation", "System integrations", "Data pipelines"],
    colB: ["Email & agent workflows", "Approvals & routing", "Dashboards"],
    desc: "Start with the work your team repeats. We automate the steps, connect the applications, and keep a person in the loop where it matters.",
  },
  {
    title: "Robotic Process Automation (RPA)",
    href: "/what-we-do/automate",
    hrefLabel: "Explore automate",
    colA: [
      "UI & desktop bots",
      "Legacy-portal automation",
      "Data entry & migration",
    ],
    colB: [
      "UiPath orchestration",
      "Selenium / browser bots",
      "Human-in-the-loop",
    ],
    desc: "When a system has no API, we automate the clicks — bots that log in, extract, and enter data across legacy portals and desktop apps, with a person in the loop where judgment is needed.",
  },
  {
    title: "Web development & SEO",
    href: "/case-studies",
    hrefLabel: "See the results",
    colA: ["Next.js builds", "Frontend rebuilds", "Performance"],
    colB: ["Technical SEO", "AI-SEO (GEO)", "Schema & sitemaps"],
    desc: "High-performance sites built to ship and to be found — 100% PageSpeed, structured data, and AI-search readiness.",
  },
];

export default function ServicesAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="services-list">
      {services.map((s, i) => {
        const isOpen = open === i;
        return (
          <div className={`svc-row${isOpen ? " is-open" : ""}`} key={s.title}>
            <button
              className="svc-head"
              aria-expanded={isOpen}
              aria-controls={`svc-body-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="svc-num">0{i + 1}</span>
              <span className="svc-title">{s.title}</span>
              <span className="svc-plus" aria-hidden="true" />
            </button>
            <div className="svc-body" id={`svc-body-${i}`} data-open={isOpen}>
              <div className="svc-body-inner">
                <ul>
                  {s.colA.map((x) => (
                    <li key={x}>
                      {s.href ? <Link href={s.href}>{x}</Link> : x}
                    </li>
                  ))}
                </ul>
                <ul>
                  {s.colB.map((x) => (
                    <li key={x}>
                      {s.href ? <Link href={s.href}>{x}</Link> : x}
                    </li>
                  ))}
                </ul>
                <div className="svc-desc">
                  <p>{s.desc}</p>
                  {s.href && (
                    <Button href={s.href} className="svc-cta">
                      {s.hrefLabel}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
