import type { Metadata } from "next";
import Button from "../../../components/button";
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
          <Button href="/">Back to home</Button>
          <Button href={CONTACT.whatsappHref} variant="secondary">
            Message on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
