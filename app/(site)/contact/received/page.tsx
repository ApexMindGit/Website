import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import Button from "../../../components/button";
import { CONTACT } from "../../../components/nav-data";

export const metadata: Metadata = {
  title: "Inquiry received",
  description:
    "Your inquiry has reached Apex Mind. We will respond within one working day. If you requested a call, we will follow up with you to arrange a suitable time.",
  robots: { index: false, follow: true },
};

const nextSteps = {
  project: [
    {
      title: "We read your brief",
      body: "The founder reviews every inquiry personally — no sales queue.",
    },
    {
      title: "You hear back within one working day",
      body: "With any questions we have, or a suggested next step.",
    },
    {
      title: "We shape the scope together",
      body: "A short call to agree what to build, the timeline, and the budget.",
    },
  ],
  call: [
    {
      title: "We check your preferred time",
      body: "We look at the time window you picked, in your time zone.",
    },
    {
      title: "We confirm within one working day",
      body: "On the channel you chose — email or WhatsApp.",
    },
    {
      title: "We talk it through",
      body: "No preparation needed. Bring the problem; we'll help find the right starting point.",
    },
  ],
};

export default async function Received({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const isCall = type === "call";
  const steps = isCall ? nextSteps.call : nextSteps.project;

  return (
    <section className="received-page container">
      <div className="received-card">
        <div className="received-head">
          <span className="received-check" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <p className="eyebrow">{isCall ? "Call requested" : "Inquiry received"}</p>
          <h1 className="display-md">
            {isCall ? "We'll be in touch to set a time." : "Thanks — we've got it."}
          </h1>
          <p className="received-lead">
            {isCall
              ? "Your call request has reached Apex Mind. A request isn't a booked slot yet — we'll confirm a time with you first."
              : "Your message has reached Apex Mind. We'll get back to you within one working day."}
          </p>
        </div>

        <div className="received-steps">
          <p className="received-steps-label">What happens next</p>
          <ol>
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="received-step-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="received-foot">
          <div className="received-direct">
            <p>Something to add?</p>
            <div className="contact-direct-links">
              <a href={`mailto:${CONTACT.email}`}>
                <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
                {CONTACT.email}
              </a>
              <a href={CONTACT.whatsappHref}>
                <MessageCircle size={16} strokeWidth={1.75} aria-hidden="true" />
                WhatsApp {CONTACT.whatsappNumber}
              </a>
            </div>
          </div>
          <div className="received-actions">
            <Button href="/case-studies" variant="secondary">
              See our work
            </Button>
            <Button href="/">Back to home</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
