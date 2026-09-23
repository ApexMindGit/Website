"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  X,
  Mail,
  MessageCircle,
} from "lucide-react";
import Button from "../app/components/button";

const sections = [
  ["direction", "Direction"],
  ["foundations", "Foundations"],
  ["components", "Components"],
  ["layouts", "Layouts"],
  ["inner-pages", "Inner pages"],
  ["motion", "Motion"],
] as const;
const colors = [
  ["Canvas", "#050505"],
  ["Graphite", "#232323"],
  ["White", "#FFFFFF"],
  ["Soft gray", "#F1F1EF"],
  ["Panel gray", "#DEDEDE"],
  ["Secondary", "#777777"],
  ["Strategic blue", "#39C8FF"],
];
const typeScale = [
  ["display-xl", "Display XL", "72 / 78"],
  ["display-lg", "Display LG", "60 / 65"],
  ["display-md", "Display MD", "48 / 53"],
  ["h1", "Heading 01", "48 / 56"],
  ["h2", "Heading 02", "40 / 48"],
  ["h3", "Heading 03", "32 / 40"],
  ["h4", "Heading 04", "24 / 32"],
  ["body-lg", "Body large", "19 / 32"],
  ["body", "Body", "17 / 28"],
  ["body-sm", "Body small", "15 / 24"],
  ["caption", "Caption", "13 / 20"],
  ["mono-label", "Mono label", "13 / 20"],
  ["mono-sm", "Mono small", "11 / 16"],
];
const spacing = [4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192];
const processes = [
  "Understand the problem",
  "Agree on scope",
  "Build and review",
  "Test and hand over",
  "Ongoing support",
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
  ) : (
    <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
  );
}
function SectionHeader({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="section-heading">
      <p className="eyebrow">
        {number} / {title}
      </p>
      {children}
    </header>
  );
}
function FocusPullReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else if (entry.boundingClientRect.top > 0) {
          // Re-arm only when the block scrolls back below the viewport,
          // so the reveal can play again on the next approach.
          setInView(false);
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  let index = -1;
  return (
    <p
      ref={ref}
      className={`focus-pull display-md${inView ? " is-in" : ""}`}
      aria-label={text}
    >
      {text.split(" ").map((word, w) => (
        <span className="focus-pull-word" aria-hidden="true" key={w}>
          {word.split("").map((char) => {
            index += 1;
            return (
              <span
                className="focus-pull-char"
                style={{ ["--char" as string]: index }}
                key={index}
              >
                {char}
              </span>
            );
          })}
          {" "}
        </span>
      ))}
    </p>
  );
}

function ImageSlot({
  label,
  ratio = "16:10",
}: {
  label: string;
  ratio?: string;
}) {
  return (
    <div
      className="image-slot"
      role="img"
      aria-label={`${label}, image to be supplied`}
    >
      <span className="crop-mark top-left" />
      <span className="crop-mark bottom-right" />
      <span>
        IMAGE / {label}
        <br />
        {ratio} / SOURCE: NEEDED
      </span>
    </div>
  );
}

export default function DesignReference() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("direction");
  const [replay, setReplay] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [choice, setChoice] = useState("Fixed-scope project");
  const [selectOpen, setSelectOpen] = useState(false);
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  const selectBox = useRef<HTMLDivElement>(null);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    sections.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      if (loadingTimer.current) clearTimeout(loadingTimer.current);
    };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuPanel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const links =
          menuPanel.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (!links?.length) return;
        if (event.shiftKey && document.activeElement === links[0]) {
          event.preventDefault();
          menuButton.current?.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === links[links.length - 1]
        ) {
          event.preventDefault();
          menuButton.current?.focus();
        } else if (document.activeElement === menuButton.current) {
          event.preventDefault();
          links[event.shiftKey ? links.length - 1 : 0].focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);
  useEffect(() => {
    if (!selectOpen) return;
    function close(e: PointerEvent) {
      if (!selectBox.current?.contains(e.target as Node)) setSelectOpen(false);
    }
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [selectOpen]);

  return (
    <>
      <div className="review-banner">
        <span>DESIGN REVIEW / 07</span>
        <span>Provisional copy. Final wording comes later.</span>
      </div>
      <header className="site-header">
        <div className="container nav-inner">
          <a
            className="wordmark"
            href="#direction"
            aria-label="Apex Mind, back to top"
          >
            <span className="logo-mark logo-mark-on-dark" aria-hidden="true">
              <img src="/brand/apex-mind-mark.png" alt="" />
            </span>
            <span>
              APEX MIND<span className="wordmark-dot">.</span>
            </span>
          </a>
          <nav aria-label="Design reference" className="desktop-nav">
            {sections.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <a className="nav-end" href="#review">
            Review notes <Arrow diagonal />
          </a>
          <button
            className="menu-toggle"
            ref={menuButton}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div id="mobile-menu" ref={menuPanel} className="mobile-menu">
            <nav aria-label="Mobile design reference">
              {sections.map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                  {label}
                  <Arrow />
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
      <main id="main">
        <section id="direction" className="studio-opening">
          <div className="studio-hero">
            <p className="eyebrow">
              Founder-led software consultancy / Lucknow, India
            </p>
            <h1>
              From business problem
              <br />
              to <span>working software.</span>
            </h1>
            <div className="actions">
              <Button href="#sample-form">Start a conversation</Button>
              <Button href="#selected-work" variant="secondary">
                Explore our work
              </Button>
            </div>
            <p className="studio-description">
              Apex Mind is a software consultancy helping teams build software,
              apply AI, and automate workflows.
            </p>
            <div className="studio-disciplines">
              <span>Software development</span>
              <span>AI implementation</span>
              <span>Workflow automation</span>
            </div>
            <div className="studio-hero-bottom">
              <span>
                Based in Lucknow.
                <br />
                Working in India and globally.
              </span>
              <span>
                APEX MIND LLP
                <br />
                EST. 2026
              </span>
            </div>
          </div>
          <aside className="studio-side">
            <a href="#selected-work" className="studio-project strategic-blue">
              <span className="eyebrow">Featured product / Live</span>
              <h2>SpecLens</h2>
              <p>
                AI-powered procurement
                <br />
                specification comparison.
              </p>
              <div className="studio-metric">
                300+<span>signed-up users in first month</span>
              </div>
              <span className="studio-project-cta">
                <Arrow />
                Explore the project
              </span>
            </a>
            <a href="#sample-form" className="studio-engagement">
              <span className="eyebrow">Two ways to work together</span>
              <h3>
                A defined project.
                <br />
                Or ongoing support.
              </h3>
              <span>
                <Arrow />
                Let’s talk about it
              </span>
            </a>
          </aside>
        </section>
        <section id="selected-work" className="studio-work">
          <div className="studio-work-heading">
            <span className="eyebrow">Selected work</span>
            <h2>
              One problem.
              <br />
              <span>A working product.</span>
            </h2>
            <p>
              SpecLens turns vendor documents into structured specification
              comparisons, with citations back to source pages.
            </p>
          </div>
          <div className="studio-work-grid">
            <div>
              <ImageSlot label="SpecLens comparison matrix" />
              <div className="studio-work-caption">
                <h3>SpecLens</h3>
                <span>AI / PROCUREMENT</span>
              </div>
            </div>
            <div>
              <ImageSlot label="SpecLens workflow selection" />
              <div className="studio-work-caption">
                <h3>Documents to decisions</h3>
                <span>SOFTWARE / AUTOMATION</span>
              </div>
            </div>
          </div>
        </section>
        <section className="studio-services">
          <header>
            <p className="eyebrow">What we do</p>
            <h2>
              Software, AI, <br />
              and the work <br />
              <span>between them.</span>
            </h2>
            <p>
              Bring the problem you are facing.
              <br />
              We’ll start there.
            </p>
          </header>
          <div>
            {[
              [
                "Software development",
                "Develop software around a defined problem, from a first product version to a web application, mobile app, or internal tool for your team.",
              ],
              [
                "AI consulting & implementation",
                "Connect AI to a practical task. Explore systems that work with your documents, products, and internal workflows.",
              ],
              [
                "Workflow automation",
                "Start with the work your team repeats. Discuss the steps, applications, and information involved in your process.",
              ],
              [
                "Integrations & modernization",
                "Connect existing systems, improve applications, or discuss what needs to change in the software you already use.",
              ],
            ].map(([title, description], index) => (
              <details key={title}>
                <summary>
                  <span className="service-number">0{index + 1}</span>
                  <h3>{title}</h3>
                  <span className="service-toggle" aria-hidden="true" />
                </summary>
                <div className="service-body">
                  <p>{description}</p>
                  <a className="text-link" href="#sample-form">
                    <Arrow />
                    Discuss your requirement
                  </a>
                </div>
              </details>
            ))}
          </div>
        </section>
        <section id="foundations" className="section container">
          <SectionHeader number="01" title="Foundations" />
          <div className="editorial-heading">
            <h2 className="display-md">
              Less decoration.
              <br />
              More intention.
            </h2>
            <p>
              A black frame, white surfaces, graphite panels, and muted gray
              text. The visual direction follows Beew Studio, with Apex Mind’s
              own content.
            </p>
          </div>
          <div className="subsection-title">
            <h3 className="h4">The palette</h3>
            <span className="mono-sm">
              07 Beew palette tokens / revised layout
            </span>
          </div>
          <div className="swatches">
            {colors.map(([name, value]) => (
              <div className="swatch" key={name}>
                <div style={{ background: value }} aria-hidden="true" />
                <p>{name}</p>
                <span className="mono-sm">{value}</span>
              </div>
            ))}
          </div>
          <div className="semantic-tokens">
            <div>
              <span className="mono-sm">Text primary</span>
              <p>#0A0A0A</p>
            </div>
            <div>
              <span className="mono-sm">Text secondary</span>
              <p className="muted">Black / 68%</p>
            </div>
            <div>
              <span className="mono-sm">Mono labels</span>
              <p className="muted">#777777</p>
            </div>
            <div>
              <span className="mono-sm">Borders</span>
              <p>Black / 12% · 32%</p>
            </div>
            <div>
              <span className="mono-sm">Selection</span>
              <p className="selection-sample">Black / 12%</p>
            </div>
          </div>
          <div className="subsection-title">
            <h3 className="h4">Type does the talking.</h3>
            <span className="mono-sm">Inter / JetBrains Mono</span>
          </div>
          <div className="type-table">
            {typeScale.map(([token, label, size]) => (
              <div className="type-row" key={token}>
                <div className="type-meta mono-sm">
                  {label}
                  <span>{size} PX</span>
                </div>
                <div className={token}>
                  {token.startsWith("mono")
                    ? "Software / AI / Automation"
                    : token.startsWith("display")
                      ? "Built with intent."
                      : "Clear thinking. Working software."}
                </div>
              </div>
            ))}
          </div>
          <div className="subsection-title">
            <h3 className="h4">Space to think.</h3>
            <span className="mono-sm">Spacing / px</span>
          </div>
          <div className="spacing-scale">
            {spacing.map((value) => (
              <div key={value}>
                <span className="mono-sm">{value}</span>
                <div style={{ height: `${value / 16}rem` }} />
              </div>
            ))}
          </div>
          <div className="grid-demo" aria-label="12-column desktop grid">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i}>
                <span className="mono-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
          <p className="caption muted">
            12 columns desktop · 8 tablet · 4 mobile. Maximum width 1440px.
          </p>
        </section>
        <section id="components" className="section components-section">
          <div className="container">
            <SectionHeader number="02" title="Components" />
            <div className="editorial-heading">
              <h2 className="display-md">
                Familiar to use.
                <br />
                Distinct in detail.
              </h2>
              <p>
                Rounded surfaces, fine rules, and arrow-led interactions. Every
                control works with a keyboard, with focus kept visible.
              </p>
            </div>
            <div className="component-row">
              <div>
                <h3 className="h4">Actions</h3>
                <p className="caption muted">
                  Primary and secondary share one animated interaction — hover
                  to see it. Disabled shown for reference.
                </p>
              </div>
              <div className="component-examples">
                <Button href="#sample-form">Start a conversation</Button>
                <Button href="#selected-work" variant="secondary">
                  Explore our work
                </Button>
                <Button disabled>Unavailable</Button>
              </div>
            </div>
            <div className="component-row">
              <div>
                <h3 className="h4">Labels & metrics</h3>
                <p className="caption muted">
                  A quiet hierarchy. Numbers stay still.
                </p>
              </div>
              <div className="component-examples">
                <span className="eyebrow">Selected work</span>
                <span className="tag">Live in production</span>
                <div className="metric">
                  <span>300+</span>
                  <p className="mono-sm">Signed-up users in first month / SpecLens</p>
                </div>
              </div>
            </div>
            <div className="component-row">
              <div>
                <h3 className="h4">Problem cards</h3>
                <p className="caption muted">
                  No decorative icons. The problem leads.
                </p>
              </div>
              <div className="problem-grid">
                <a className="problem-card" href="#sample-form">
                  <span className="eyebrow">01</span>
                  <Arrow diagonal />
                  <div>
                    <h4>Build something new</h4>
                    <p>
                      Turn a product idea into a defined software project,
                      starting with what the first version needs.
                    </p>
                  </div>
                </a>
                <a className="problem-card inverted" href="#sample-form">
                  <span className="eyebrow">06</span>
                  <Arrow diagonal />
                  <div>
                    <h4>Find a starting point</h4>
                    <p>
                      Describe the problem you are facing, even if you do not
                      yet know what to build.
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div className="component-row" id="sample-form">
              <div>
                <h3 className="h4">
                  A conversation
                  <br />
                  starts here.
                </h3>
                <p className="caption muted">
                  Interactive form specimen.
                  <br />
                  Nothing is sent or stored.
                </p>
              </div>
              <form
                className="sample-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="field">
                  <label htmlFor="sample-name">Name</label>
                  <input
                    id="sample-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    minLength={2}
                    maxLength={80}
                  />
                </div>
                <div className="field">
                  <label htmlFor="sample-email">Email</label>
                  <input
                    id="sample-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div className="field full" ref={selectBox}>
                  <label id="engagement-label">Engagement</label>
                  <button
                    type="button"
                    className="select-trigger"
                    aria-labelledby="engagement-label selected-engagement"
                    aria-expanded={selectOpen}
                    aria-controls="engagement-options"
                    onClick={() => setSelectOpen(!selectOpen)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setSelectOpen(false);
                    }}
                  >
                    <span id="selected-engagement">{choice}</span>
                    <ChevronDown size={16} />
                  </button>
                  {selectOpen && (
                    <div
                      id="engagement-options"
                      className="select-options"
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setSelectOpen(false);
                          selectBox.current?.querySelector("button")?.focus();
                        }
                      }}
                    >
                      {[
                        "Fixed-scope project",
                        "Monthly retainer",
                        "Not sure yet",
                      ].map((option) => (
                        <button
                          type="button"
                          key={option}
                          onClick={() => {
                            setChoice(option);
                            setSelectOpen(false);
                            selectBox.current?.querySelector("button")?.focus();
                          }}
                        >
                          {option}
                          {choice === option && (
                            <Check size={16} aria-label="Selected" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <fieldset className="full">
                  <legend>Would you like to arrange a call?</legend>
                  <div className="radio-group">
                    <label>
                      <input
                        name="call"
                        type="radio"
                        value="yes"
                        defaultChecked
                      />
                      <span>Yes</span>
                    </label>
                    <label>
                      <input name="call" type="radio" value="no" />
                      <span>No</span>
                    </label>
                  </div>
                </fieldset>
                <div className="field full">
                  <label htmlFor="sample-message">
                    What are you trying to solve?
                  </label>
                  <textarea
                    id="sample-message"
                    placeholder="Tell us about the problem, your idea, or your existing software."
                    minLength={40}
                    maxLength={2000}
                    required
                  />
                  <span className="caption muted">40–2,000 characters</span>
                </div>
                <div className="field">
                  <label htmlFor="error-example">Error state</label>
                  <input
                    id="error-example"
                    defaultValue="not-an-email"
                    aria-invalid="true"
                    aria-describedby="email-error"
                  />
                  <span id="email-error" className="error-message">
                    Enter a valid email address.
                  </span>
                </div>
                <div className="field">
                  <label htmlFor="disabled-example">Disabled state</label>
                  <input
                    id="disabled-example"
                    placeholder="Unavailable"
                    disabled
                  />
                </div>
                <div className="full form-submit">
                  <button className="button" type="submit">
                    Test form states <Arrow />
                  </button>
                  <p className="caption" role="status">
                    {sent
                      ? "Demo complete. No inquiry was sent."
                      : "We respond within one working day."}
                  </p>
                </div>
              </form>
            </div>
            <div className="component-row">
              <div>
                <h3 className="h4">Contact & consent</h3>
                <p className="caption muted">
                  Clear choices, without interruption.
                </p>
              </div>
              <div className="contact-demo">
                <a
                  className="contact-affordance"
                  href="mailto:aryan@apexminds.in"
                >
                  <Mail size={20} strokeWidth={1.5} />
                  <span>
                    <span className="mono-sm">Email</span>
                    <br />
                    aryan@apexminds.in
                  </span>
                  <Arrow diagonal />
                </a>
                <a
                  className="contact-affordance"
                  href="https://wa.me/918052799799?text=Hi%20Aryan%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20Apex%20Mind."
                >
                  <MessageCircle size={20} strokeWidth={1.5} />
                  <span>
                    <span className="mono-sm">WhatsApp</span>
                    <br />
                    +91 8052799799
                  </span>
                  <Arrow diagonal />
                </a>
                <div className="consent-demo">
                  <p className="body-sm" role="status">
                    {consent
                      ? `Demo choice: ${consent}. No analytics loaded.`
                      : "We use analytics cookies to understand how the site is used. Accept or decline?"}
                  </p>
                  <div className="actions">
                    {consent ? (
                      <button
                        className="text-link"
                        onClick={() => setConsent(null)}
                      >
                        Reset demo
                      </button>
                    ) : (
                      <>
                        <button
                          className="button"
                          onClick={() => setConsent("accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="text-link"
                          onClick={() => setConsent("declined")}
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="layouts" className="section container">
          <SectionHeader number="03" title="Signature layouts" />
          <div className="layout-example offset-layout">
            <p className="eyebrow">A / Offset headline</p>
            <h2 className="display-lg">The problem comes first.</h2>
            <p className="body-lg">
              You can bring us a problem before you have a specification. Our
              starting point is understanding what you are trying to solve.
            </p>
          </div>
          <div className="layout-example rule-layout">
            <div className="neutral-rule" />
            <div>
              <p className="eyebrow">B / Rule-anchored</p>
              <h2 className="display-md">
                Software development.
                <br />
                With a clear purpose.
              </h2>
              <p>
                Build something new, connect your systems, or improve what is
                already there.
              </p>
            </div>
          </div>
          <div className="layout-example metadata-layout">
            <aside>
              <p className="eyebrow">C / Metadata gutter</p>
              <p className="mono-sm">
                Selected work
                <br />
                Case study 01
                <br />
                <br />
                AI / Procurement
                <br />
                Live in production
              </p>
            </aside>
            <div>
              <a href="https://speclens.ai" className="case-study">
                <ImageSlot label="SpecLens comparison matrix" />
                <div className="case-caption">
                  <div>
                    <h3 className="h2">SpecLens</h3>
                    <p>From vendor documents to a structured comparison.</p>
                  </div>
                  <Arrow diagonal />
                </div>
              </a>
              <div className="case-details">
                <p>
                  AI-powered procurement specification comparison, with
                  citations back to source pages.
                </p>
                <div className="metric">
                  <span>300+</span>
                  <p className="mono-sm">Signed-up users in first month</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="inner-pages"
          className="section container inner-pages-section"
        >
          <SectionHeader number="04" title="Inner page patterns" />
          <div className="editorial-heading inner-page-intro">
            <h2 className="display-md">
              A system for the
              <br />
              pages people visit next.
            </h2>
            <p>
              Beew keeps its inner pages editorial, useful, and easy to scan.
              These structures translate that rhythm into Apex Mind pages while
              keeping the content grounded in what we can actually promise.
            </p>
          </div>
          <div className="inner-page-hero-pattern">
            <div>
              <p className="eyebrow">Inner page / Hero</p>
              <h3 className="display-md">Software that earns its place.</h3>
              <p>
                A breadcrumb or short eyebrow, one clear promise, and a quiet
                metadata rail create a useful first screen for Work, About, or
                Contact.
              </p>
              <a className="text-link" href="#inquiry-preview">
                Start an inquiry <Arrow />
              </a>
            </div>
            <div className="inner-page-meta">
              <span className="mono-label">APEX MIND / LUCKNOW</span>
              <span className="mono-sm">
                Software consultancy
                <br />
                Est. 2026
                <br />
                India + global clients
              </span>
            </div>
          </div>
          <div className="work-index-pattern">
            <div className="inner-pattern-heading">
              <div>
                <p className="eyebrow">Work page / Selected work</p>
                <h3 className="h2">A small index of useful outcomes.</h3>
              </div>
              <p className="caption muted">
                Filters and tags can grow as more approved case studies are
                ready.
              </p>
            </div>
            <div className="work-filters" aria-label="Work categories">
              <span className="filter-pill is-active">All work</span>
              <span className="filter-pill">AI</span>
              <span className="filter-pill">Procurement</span>
              <span className="filter-pill">Automation</span>
            </div>
            <a
              className="work-index-row strategic-blue"
              href="https://speclens.ai"
            >
              <div>
                <span className="eyebrow">01 / Live in production</span>
                <h4>SpecLens</h4>
              </div>
              <p>
                AI-powered procurement specification comparison for teams
                working across complex vendor documents.
              </p>
              <span className="work-index-arrow">
                <Arrow diagonal />
              </span>
            </a>
            <div className="work-index-row work-index-placeholder">
              <div>
                <span className="eyebrow">02 / Future case study</span>
                <h4>Next approved project</h4>
              </div>
              <p>
                Reserved for another launch-ready story once its outcomes and
                permissions are confirmed.
              </p>
              <span className="work-index-arrow">
                <Arrow diagonal />
              </span>
            </div>
          </div>
          <div className="inner-page-columns">
            <div className="about-pattern">
              <p className="eyebrow">About page / Founder-led</p>
              <h3 className="h2">A small consultancy for ambitious teams.</h3>
              <ImageSlot label="Working setup / founder portrait" ratio="4:3" />
              <div className="about-facts">
                <span>
                  <b>01</b> Aryan Rawther / Founder
                </span>
                <span>
                  <b>02</b> Lucknow, India
                </span>
                <span>
                  <b>03</b> Software · AI · Automation
                </span>
              </div>
            </div>
            <div className="engagement-pattern" id="inquiry-preview">
              <p className="eyebrow">Start page / Engagement</p>
              <h3 className="h2">Choose the shape that fits.</h3>
              <div className="engagement-options">
                <div className="engagement-option is-selected">
                  <span className="mono-label">01 / Defined project</span>
                  <h4>Fixed-scope project</h4>
                  <p>
                    Agree the deliverables and price, with payments tied to
                    milestones.
                  </p>
                </div>
                <div className="engagement-option">
                  <span className="mono-label">02 / Ongoing support</span>
                  <h4>Monthly retainer</h4>
                  <p>
                    A steady partnership for improvements, support, and new
                    work.
                  </p>
                </div>
              </div>
              <a className="button" href="#components">
                Open inquiry form <Arrow />
              </a>
            </div>
          </div>
          <div className="faq-pattern">
            <div className="inner-pattern-heading">
              <div>
                <p className="eyebrow">FAQ page / Accordion</p>
                <h3 className="h2">Answers before the first call.</h3>
              </div>
              <p className="caption muted">
                Short, direct answers keep the page useful without adding a
                sales layer.
              </p>
            </div>
            <div className="faq-list">
              <details open>
                <summary>
                  <span>What happens after I send an inquiry?</span>
                  <ChevronDown size={18} />
                </summary>
                <p>
                  We review the problem, reply within one working day, and
                  suggest a clear next step.
                </p>
              </details>
              <details>
                <summary>
                  <span>Do you offer fixed-scope projects?</span>
                  <ChevronDown size={18} />
                </summary>
                <p>
                  Yes. We agree the scope, deliverables, price, and milestone
                  payments before work begins.
                </p>
              </details>
              <details>
                <summary>
                  <span>Do you offer monthly retainers?</span>
                  <ChevronDown size={18} />
                </summary>
                <p>
                  Yes. Retainers can cover ongoing improvements, maintenance,
                  and support when agreed.
                </p>
              </details>
            </div>
          </div>
        </section>
        <section className="process-band">
          <div className="container">
            <p className="eyebrow">How we work / Approved process</p>
            <h2 className="display-md">
              A clear path.
              <br />
              Room for conversation.
            </h2>
            <div className="process-grid">
              {processes.map((p, i) => (
                <div key={p}>
                  <span className="mono-label">0{i + 1}</span>
                  <h3 className="h4">{p}</h3>
                  {i === 4 && <p className="caption">If agreed.</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="motion" className="section container">
          <SectionHeader number="05" title="Motion" />
          <div className="editorial-heading">
            <h2 className="display-md">
              Just enough
              <br />
              to guide the eye.
            </h2>
            <p>
              Movement supports hierarchy. Reduced-motion preferences take
              priority over every animation.
            </p>
          </div>
          <div className="motion-stage">
            <p className="eyebrow">Hero / 900ms maximum / 60ms stagger</p>
            <div
              className="display-md motion-words"
              key={replay}
              aria-label="From business problem to working software."
            >
              {"From business problem to working software."
                .split(" ")
                .map((word, i) => (
                  <span
                    aria-hidden="true"
                    style={{ animationDelay: `${i * 60}ms` }}
                    key={i}
                  >
                    {word}{" "}
                  </span>
                ))}
            </div>
            <button className="text-link" onClick={() => setReplay(replay + 1)}>
              Replay word reveal <Arrow />
            </button>
          </div>
          <div className="motion-specs">
            <div>
              <span className="eyebrow">180ms / Micro</span>
              <p>Buttons, links, and borders.</p>
              <code>cubic-bezier(.32,.72,0,1)</code>
            </div>
            <div>
              <span className="eyebrow">320ms / Standard</span>
              <p>Standard interface transitions.</p>
              <code>cubic-bezier(.32,.72,0,1)</code>
            </div>
            <div>
              <span className="eyebrow">600ms / Large</span>
              <p>Large transition token.</p>
              <code>cubic-bezier(.22,1,0,.36,1)</code>
            </div>
          </div>
          <div className="button-motion-demo">
            <div>
              <p className="eyebrow">Button / hover + press</p>
              <h3 className="h2">A small response for a clear action.</h3>
              <p className="caption muted">
                Hover lifts the control and moves the arrow. Pressing it settles
                the surface back down.
              </p>
            </div>
            <button className="button" type="button">
              Test the interaction <Arrow />
            </button>
          </div>
          <div className="motion-samples" key={`samples-${replay}`}>
            <div>
              <p className="eyebrow">Page fade / 240ms</p>
              <div className="motion-tile page-fade-demo">A new page.</div>
            </div>
            <div>
              <p className="eyebrow">Section reveal / 480ms</p>
              <div className="motion-tile reveal-demo">The next step.</div>
            </div>
            <div>
              <p className="eyebrow">Menu / 240ms</p>
              <div className="motion-tile menu-demo">A clear way through.</div>
            </div>
            <div>
              <p className="eyebrow">Panel hover / 180ms</p>
              <div className="motion-tile panel-hover-demo">
                Move over this panel.
              </div>
            </div>
            <div>
              <p className="eyebrow">Blue drift / 14s</p>
              <div className="motion-tile blue-drift-demo">Featured work.</div>
            </div>
            <div>
              <p className="eyebrow">Image lift / 400ms</p>
              <div className="motion-tile image-lift-demo">
                Move over the image.
              </div>
            </div>
          </div>
          <p className="caption muted motion-note">
            Replay also restarts these samples. Hover effects use Beew-inspired
            restraint. Reduced motion removes movement while preserving color
            and focus states.
          </p>
          <div className="subsection-title beew-motion-title">
            <h3 className="h4">Beew signature motion</h3>
            <span className="mono-sm">
              Studied from beew.studio / adapted, not copied
            </span>
          </div>
          <div className="beew-specimen focus-pull-stage">
            <div className="beew-specimen-meta">
              <p className="eyebrow">A / Focus-pull reveal</p>
              <p className="caption muted">
                Beew&rsquo;s hero line resolves letter by letter as it enters
                view: each character lifts out of a blue blur into crisp white,
                left to right. Scroll it out and back to replay.
              </p>
              <code>filter: blur(10 → 0) · color · 26ms per character</code>
            </div>
            <FocusPullReveal text="From business problem to working software." />
          </div>
          <div className="beew-specimen">
            <div className="beew-specimen-meta">
              <p className="eyebrow">B / Aurora mesh panel</p>
              <p className="caption muted">
                The featured surface drifts through a soft blue mesh, the way
                Beew animates its Design Club card. Strategic blue only; the
                gradient moves slowly enough to stay in the background.
              </p>
              <code>
                background-position drift · 18s · ease-in-out alternate
              </code>
            </div>
            <div className="aurora-panel" aria-hidden="true">
              <span className="mono-label">Featured work</span>
            </div>
          </div>
          <div className="beew-specimen beew-specimen-wide">
            <div className="beew-specimen-meta">
              <p className="eyebrow">C / Trust marquee</p>
              <p className="caption muted">
                A continuous, low-speed logo ticker like Beew&rsquo;s client
                strip. It pauses on hover and holds still under reduced motion.
              </p>
              <code>transform marquee · 28s linear · pause on hover</code>
            </div>
            <div
              className="marquee-specimen"
              aria-label="Placeholder client marquee"
            >
              <div className="marquee-track">
                {[...Array(2)].flatMap((_, copy) =>
                  [
                    "CLIENT 01",
                    "CLIENT 02",
                    "CLIENT 03",
                    "CLIENT 04",
                    "CLIENT 05",
                  ].map((name) => (
                    <span className="marquee-item" key={`${copy}-${name}`}>
                      {name}
                    </span>
                  )),
                )}
              </div>
            </div>
          </div>
          <div className="float-specimen">
            <a
              className="whatsapp-float"
              href="https://wa.me/918052799799"
              aria-label="Contact Apex Mind on WhatsApp"
            >
              <MessageCircle size={24} strokeWidth={1.5} />
            </a>
            <p className="caption muted">
              WhatsApp control specimen. In the full site, this appears after
              the hero.
            </p>
          </div>
        </section>
        <section className="cta-band aurora-card">
          <div className="container cta-band-inner">
            <p className="eyebrow">Start a conversation</p>
            <h2 className="display-md">
              Your software backlog
              <br />
              isn&rsquo;t getting any shorter.
            </h2>
            <p className="cta-band-body">
              Product, AI, automation, and internal tools. One founder-led
              software partner, scoped around the problem your team needs to
              move.
            </p>
            <div className="actions">
              <a className="button" href="#sample-form">
                <Arrow />
                Get a Custom Quote
              </a>
              <a
                className="text-link"
                href="https://wa.me/918052799799?text=Hi%20Aryan%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20Apex%20Mind."
              >
                <Arrow diagonal />
                Message on WhatsApp
              </a>
            </div>
            <p className="caption muted cta-band-note mb-20">
              We respond within one working day.
            </p>
          </div>
          <div className="cta-band-ticker" aria-label="Apex Mind services">
            <div className="cta-band-track">
              {[
                "Software development",
                "AI implementation",
                "Workflow automation",
                "System integrations",
                "Government software",
                "Monthly retainers",
                "Software development",
                "AI implementation",
                "Workflow automation",
                "System integrations",
                "Government software",
                "Monthly retainers",
              ].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </section>
        <footer id="review" className="review-footer">
          <div className="container">
            <p className="eyebrow">End of design reference / Your review</p>
            <h2 className="display-lg">
              The foundation.
              <br />
              Before the full site.
            </h2>
            <div className="footer-bottom">
              <p>
                Review typography, spacing, color, and interaction.
                <br />
                All marketing copy is provisional.
              </p>
              <a className="wordmark" href="#direction">
                <span
                  className="logo-mark logo-mark-on-dark"
                  aria-hidden="true"
                >
                  <img src="/brand/apex-mind-mark.png" alt="" />
                </span>
                <span>
                  APEX MIND<span className="wordmark-dot">.</span>
                </span>
              </a>
            </div>
            <div className="footer-meta mono-sm">
              <span>Lucknow, India / Est. 2026</span>
              <span>Private development page / Not for publication</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
