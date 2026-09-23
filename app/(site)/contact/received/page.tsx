import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "../../../components/ui";
import { CONTACT } from "../../../components/nav-data";

export const metadata: Metadata = {
  title: "Inquiry received",
  description:
    "Your inquiry has reached Apex Mind. We will respond within one working day. If you requested a call, we will follow up with you to arrange a suitable time.",
};

export default function Received() {
  return (
    <section className="centered-page container">
      <div className="inner">
        <p className="eyebrow">Inquiry received</p>
        <h1 className="display-md">Thanks — we&rsquo;ve got it.</h1>
        <p>
          Your message has reached Apex Mind. We will respond within one working
          day. If you requested a call, we will follow up to arrange a suitable
          time.
        </p>
        <p className="caption muted">
          This is a preview build — no inquiry was actually sent or stored yet.
        </p>
        <div className="actions">
          <Link className="button" href="/">
            <Arrow />
            Back to home
          </Link>
          <a className="text-link" href={CONTACT.whatsappHref}>
            <Arrow diagonal />
            Message on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
