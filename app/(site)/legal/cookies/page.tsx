import type { Metadata } from "next";
import LegalPage from "../../../components/legal-page";

export const metadata: Metadata = {
  title: "Cookie policy (draft)",
  description:
    "Read about the Apex Mind website's analytics cookie choices and consent controls in this draft cookie policy. The document is pending legal review.",
};

export default function Cookies() {
  return (
    <LegalPage
      title="Cookie policy"
      intro="How the Apex Mind website uses cookies and how you can control them. This is a draft for review and is pending legal confirmation before launch."
      sections={[
        {
          heading: "Essential cookies",
          body: [
            "Some cookies are needed for the site to work. These do not require consent and are not used for tracking.",
          ],
        },
        {
          heading: "Analytics cookies",
          body: [
            "We use analytics cookies to understand how the site is used. These load only if you accept them. You can decline, and the site continues to work.",
          ],
        },
        {
          heading: "Your choice",
          body: [
            "You can accept or decline analytics cookies at any time. Declining does not affect essential functionality.",
          ],
        },
      ]}
    />
  );
}
