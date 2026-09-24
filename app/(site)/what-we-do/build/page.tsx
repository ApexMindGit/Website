import type { Metadata } from "next";
import CapabilityPage, {
  type CapabilityData,
} from "../../../components/capability-page";

export const metadata: Metadata = {
  title: "Software development",
  description:
    "Discuss software development with Apex Mind, from a first product version to web apps, SaaS products, internal tools, integrations, modernization, and existing software.",
};

const data: CapabilityData = {
  eyebrow: "What we do / Software development",
  title: (
    <>
      Software that
      <br />
      earns its place.
    </>
  ),
  intro:
    "Start with the problem the software needs to solve — a first product, an internal tool, or an existing application that needs attention. We turn that into something your team can ship.",
  paragraphs: [
    "You might be planning a first product, standing up an internal tool, or wrestling with an application that no longer fits. Apex Mind covers the full arc — development, integrations, modernization, optimization, and maintenance — and starts by getting clear on what the software actually has to do.",
    "For something new, the useful questions are who uses it, which task matters most, and what belongs in the first version. For an existing system, we start from what works today and what has to change. Either way, the requirement gets concrete before a single technical decision is made.",
    "SpecLens is one example: its first version accepted uploaded documents and produced a comparison matrix — shipped, then extended. Bring your starting point through the inquiry form, including any existing system and the problem you want to move.",
  ],
  bring: [
    {
      label: "01",
      title: "A new product idea",
      body: "Describe who will use it and the task that matters most in a first version.",
    },
    {
      label: "02",
      title: "An existing application",
      body: "Explain what works today, what falls short, and what you want to keep.",
    },
    {
      label: "03",
      title: "A modernization need",
      body: "Talk through the system that no longer fits the way your team works.",
    },
  ],
  related: [
    { href: "/what-we-do/intelligence", label: "Intelligence" },
    { href: "/what-we-do/automate", label: "Automate" },
    { href: "/what-we-do/rpa", label: "RPA" },
    { href: "/what-we-do/web-seo", label: "Web & SEO" },
  ],
  ctaTitle: (
    <>
      Tell us what you
      <br />
      want to build.
    </>
  ),
};

export default function BuildPage() {
  return <CapabilityPage data={data} />;
}
