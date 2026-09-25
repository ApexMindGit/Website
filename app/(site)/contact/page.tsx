import type { Metadata } from "next";
import InquiryForm from "../../components/inquiry-form";
import { CTABand } from "../../components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Apex Mind to discuss software development, AI, or automation. Send an inquiry, request a call, or use WhatsApp. Response within one working day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Apex Mind",
    description:
      "Tell us what you're building. Send an inquiry or request a call — we respond within one working day.",
    url: "/contact",
  },
};

// The inquiry server action runs on this route; Apps Script can take a few
// seconds on a cold start, so allow more than the default function timeout.
export const maxDuration = 30;

export default function Contact() {
  return (
    <>
      <section id="contact-form" className="contact-page container">
        <header className="contact-head">
          <p className="eyebrow">Contact</p>
          <h1 className="display-md">Tell us what you&rsquo;re building.</h1>
          <p className="contact-intro">
            Whether it&rsquo;s a defined project or you&rsquo;d rather talk it
            through first, share the problem and where things stand today.
            We&rsquo;ll reply within one working day with a suggested next step.
          </p>
        </header>

        <InquiryForm />
      </section>

      <CTABand
        eyebrow="Ready when you are"
        title={
          <>
            Have a problem
            <br />
            worth solving?
          </>
        }
        body="Tell us what you're building or where your current workflow gets in the way. Share as much or as little as you have today."
        ctaHref="#contact-form"
        ctaLabel="Start your inquiry"
      />
    </>
  );
}
