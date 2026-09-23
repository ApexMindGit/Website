import type { Metadata } from "next";
import { PageHero, CTABand } from "../../components/ui";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "Start a project conversation with Apex Mind by describing your problem, existing software, and intended outcome. Discuss what you need to build or change.",
};

const stages = [
  ["Understand the problem", "Start with what needs to change and who it affects."],
  ["Agree on scope", "Define the deliverables, price, and milestones before work begins."],
  ["Build and review", "Develop in reviewable steps, with regular checkpoints."],
  ["Test and hand over", "Verify the work and hand it over with what you need to run it."],
  ["Ongoing support", "Continue with improvements or maintenance — if agreed."],
];

const engagements = [
  [
    "01 / Defined project",
    "Fixed-scope project",
    "For a defined piece of work. We agree on the deliverables and price, with payments tied to project milestones.",
  ],
  [
    "02 / Ongoing support",
    "Monthly retainer",
    "For ongoing development, improvements, or support. We agree on the work or support covered by a monthly fee.",
  ],
];

const faqs = [
  [
    "What happens after I send an inquiry?",
    "We review the problem, reply within one working day, and suggest a clear next step.",
  ],
  [
    "Do you offer fixed-scope projects?",
    "Yes. We agree the scope, deliverables, price, and milestone payments before work begins.",
  ],
  [
    "Do you offer monthly retainers?",
    "Yes. Retainers can cover ongoing improvements, maintenance, and support when agreed.",
  ],
  [
    "Do I need a specification first?",
    "No. You can bring the problem before a specification. Our starting point is understanding what you are trying to solve.",
  ],
];

export default function HowWeWork() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title={
          <>
            A clear path. Room
            <br />
            for conversation.
          </>
        }
        intro="You can bring us a problem before you have a specification. Our starting point is understanding what you are trying to solve."
      />

      <section className="process-band">
        <div className="container">
          <p className="eyebrow">Approved process / Five stages</p>
          <h2 className="display-md">
            From problem
            <br />
            to working software.
          </h2>
          <div className="process-grid">
            {stages.map(([title, body], i) => (
              <div key={title}>
                <span className="mono-label">0{i + 1}</span>
                <h3 className="h4">{title}</h3>
                <p className="caption">{i === 4 ? "If agreed." : body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="subsection-title">
          <h3 className="h4">Two ways to work together</h3>
          <span className="mono-sm">Approved engagement models</span>
        </div>
        <div className="engagement-grid">
          {engagements.map(([label, title, body]) => (
            <div key={title} className="engagement-card">
              <span className="mono-label">{label}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>

        <div className="subsection-title">
          <h3 className="h4">Answers before the first call</h3>
          <span className="mono-sm">FAQ</span>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>
                <span>{q}</span>
                <span className="service-toggle" aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <CTABand
        title={
          <>
            Ready to describe
            <br />
            the problem?
          </>
        }
      />
    </>
  );
}
