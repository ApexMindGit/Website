import type { Metadata } from "next";
import CapabilityPage, {
  type CapabilityData,
} from "../../../components/capability-page";

export const metadata: Metadata = {
  title: "Intelligence — AI consulting & implementation",
  description:
    "Explore AI consulting and implementation with Apex Mind. See how SpecLens applies AI to vendor documents, specification extraction, and comparison.",
};

const data: CapabilityData = {
  eyebrow: "What we do / Intelligence",
  title: (
    <>
      AI with a
      <br />
      practical purpose.
    </>
  ),
  intro:
    "AI is most useful to discuss in the context of a specific task — the information it uses, the output it produces, and who will check it.",
  paragraphs: [
    "What information does the system need to work with? What output should it produce? Who will use that output, and how will they check it? Apex Mind provides AI consulting and implementation for teams exploring these questions.",
    "SpecLens is a live example of this work. Its pipeline reads vendor documents, extracts product specifications, normalizes units, aligns information across vendors, and produces a comparison matrix with citations to source pages. The product also includes confidence scoring and executive-summary generation.",
    "That example describes one application of AI, rather than a promise that every task needs the same architecture. Bring us the problem you want to address, the information available, and where the proposed system would fit — whether it concerns a product or an internal workflow.",
  ],
  bring: [
    {
      label: "01",
      title: "A task, not a technology",
      body: "Name the job the system should do and the result someone needs to use.",
    },
    {
      label: "02",
      title: "Sample inputs",
      body: "Share the documents, formats, or data the system would work with.",
    },
    {
      label: "03",
      title: "The intended reader",
      body: "Explain who relies on the output and how they will verify it.",
    },
  ],
  related: [
    { href: "/case-studies/speclens", label: "SpecLens case study" },
    { href: "/what-we-do/automate", label: "Automate" },
  ],
  ctaTitle: (
    <>
      Define a job
      <br />
      for AI to do.
    </>
  ),
};

export default function IntelligencePage() {
  return <CapabilityPage data={data} />;
}
