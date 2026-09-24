import type { Metadata } from "next";
import { ScanText, Workflow, Database, ShieldCheck } from "lucide-react";
import CapabilityPage, {
  type CapabilityData,
} from "../../../components/capability-page";

export const metadata: Metadata = {
  title: "Applied AI",
  description:
    "Applied AI with Apex Mind — document processing, agentic workflows, and retrieval (RAG), built around a defined task with clear inputs and output you can trust.",
};

const data: CapabilityData = {
  eyebrow: "What we do / Applied AI",
  title: (
    <>
      AI wired to
      <br />
      real work.
    </>
  ),
  intro:
    "The useful question isn't which model — it's the task: what information the system uses, what it produces, and who checks the result.",
  heroNote: "SpecLens — AI that reads vendor docs into a comparison matrix.",
  features: [
    {
      icon: ScanText,
      title: "Document AI",
      body: "Read messy documents — PDFs, scans, spreadsheets — and turn them into structured, checkable data.",
    },
    {
      icon: Workflow,
      title: "Agentic workflows",
      body: "Autonomous agents that carry out multi-step tasks and hand off to a person when judgment is needed.",
    },
    {
      icon: Database,
      title: "Retrieval (RAG)",
      body: "Answers grounded in your own content, with citations back to the source.",
    },
    {
      icon: ShieldCheck,
      title: "Output you can trust",
      body: "Confidence scoring and human review built in, so results are verified, not assumed.",
    },
  ],
  paragraphs: [
    "What does the system need to read? What should it produce? Who uses that output, and how do they verify it? Apex Mind builds AI into real workflows — document processing, autonomous agents, and retrieval — starting from the job to be done, not the technology.",
    "SpecLens is a live example. Its pipeline reads vendor documents, extracts product specifications, normalizes units, aligns information across vendors, and returns a comparison matrix with citations to source pages — plus confidence scoring and executive summaries.",
    "That's one architecture for one problem, not a template for every task. Bring the problem, the information you have, and where the system would sit — a customer-facing product or an internal workflow — and we'll define what AI should actually do.",
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
  faqs: [
    [
      "Do we need our own data to use AI?",
      "Usually some. The strongest results come from your documents, records, or workflows — we'll tell you early what's needed and what's optional.",
    ],
    [
      "How do you keep AI output reliable?",
      "We design for verification: clear inputs, confidence scoring, citations to sources, and a person in the loop wherever a mistake would matter.",
    ],
    [
      "Is this just wrapping ChatGPT?",
      "No. We use the right model for the task, but the value is in the pipeline around it — retrieval, extraction, checks, and integration with your systems.",
    ],
    [
      "Can you add AI to our existing product?",
      "Yes. We integrate AI into software you already run, or build a new product around it — whichever fits the problem.",
    ],
    [
      "What can AI realistically do for us?",
      "It's strongest on repetitive reading, extraction, drafting, and routing. We'll be direct about where it helps and where it won't.",
    ],
  ],
  related: [
    { href: "/what-we-do/build", label: "Software development" },
    { href: "/what-we-do/automate", label: "Automate" },
    { href: "/what-we-do/rpa", label: "RPA" },
    { href: "/what-we-do/web-seo", label: "Web & SEO" },
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
