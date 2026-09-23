import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { PageHero } from "../../components/ui";
import { Arrow } from "../../components/ui";
import InquiryForm from "../../components/inquiry-form";
import { CONTACT } from "../../components/nav-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Apex Mind to discuss software development, AI, or automation. Send an inquiry, request a call, or use WhatsApp. Response within one working day.",
};

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            A conversation
            <br />
            starts here.
          </>
        }
        intro="Tell us what you are trying to solve. Send an inquiry, request a call, or reach us on WhatsApp."
      />

      <section className="section container">
        <div className="contact-layout">
          <InquiryForm />
          <div className="contact-aside">
            <a className="contact-affordance" href={`mailto:${CONTACT.email}`}>
              <Mail size={20} strokeWidth={1.5} />
              <span>
                <span className="mono-sm">Email</span>
                <br />
                {CONTACT.email}
              </span>
              <Arrow diagonal />
            </a>
            <a className="contact-affordance" href={CONTACT.whatsappHref}>
              <MessageCircle size={20} strokeWidth={1.5} />
              <span>
                <span className="mono-sm">WhatsApp</span>
                <br />
                {CONTACT.whatsappNumber}
              </span>
              <Arrow diagonal />
            </a>
            <p className="contact-note">
              {CONTACT.responseNote} A call request does not represent a
              scheduled appointment — we will follow up to arrange a time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
