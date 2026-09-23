import type { Metadata } from "next";
import LegalPage from "../../../components/legal-page";

export const metadata: Metadata = {
  title: "Terms (draft)",
  description:
    "Read the draft website terms for Apex Mind LLP, a software consultancy based in Lucknow, India. These terms remain pending legal review before launch.",
};

export default function Terms() {
  return (
    <LegalPage
      title="Website terms"
      intro="Terms for using the Apex Mind LLP website. This is a draft for review and is pending legal confirmation before launch."
      sections={[
        {
          heading: "Using this site",
          body: [
            "This website provides information about Apex Mind LLP and its services. Content is offered for general information and may change without notice.",
          ],
        },
        {
          heading: "Inquiries",
          body: [
            "Submitting an inquiry does not create a contract or a commitment to provide services. Any engagement is agreed separately in writing, including scope, deliverables, and price.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "The Apex Mind name, logo, and site content belong to Apex Mind LLP unless stated otherwise, and may not be reused without permission.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "For any question about these terms, contact us and we will respond within one working day.",
          ],
        },
      ]}
    />
  );
}
