import type { Metadata } from "next";
import LegalPage from "../../../components/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy (draft)",
  description:
    "Read Apex Mind LLP's draft privacy policy for this website and its inquiry process. This document is pending legal review before the site launches.",
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="How Apex Mind LLP handles information submitted through this website. This is a draft for review and is pending legal confirmation before launch."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "When you contact us through the inquiry form, we collect the details you choose to provide — your name and email address, and optionally your company, website, phone or WhatsApp number, the capability you need, timeline, approximate budget, preferred call time, and the message you send. We collect this to respond to your inquiry.",
            "Inquiries are stored in a Google Sheet in Apex Mind's Google account, and a notification is sent to us by email. Google processes this data on our behalf; access within Apex Mind is limited to the people who respond to inquiries.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use the information you submit only to respond to your inquiry and to follow up about the requirement you describe. We do not sell your information.",
          ],
        },
        {
          heading: "Analytics",
          body: [
            "If analytics are enabled, they are loaded only with your consent. You can accept or decline analytics cookies, and your choice is respected. See the cookie policy for detail.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "For any question about this policy or the information you have shared, contact us and we will respond within one working day.",
          ],
        },
      ]}
    />
  );
}
