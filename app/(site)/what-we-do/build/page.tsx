import type { Metadata } from "next";
import CapabilityPage, {
  type CapabilityData,
} from "../../../components/capability-page";

export const metadata: Metadata = {
  title: "Build — software development",
  description:
    "Discuss software development with Apex Mind, from a first product version to mobile applications, integrations, modernization, and existing software.",
};

const data: CapabilityData = {
  eyebrow: "What we do / Build",
  title: (
    <>
      Software that
      <br />
      earns its place.
    </>
  ),
  intro:
    "Start with the problem the software needs to solve — a first product, a mobile app, or an existing application that needs attention.",
  paragraphs: [
    "You might be planning a first product, developing a mobile app, or working with an existing application that needs attention. Apex Mind provides software development, integrations, modernization, optimization, and maintenance. The starting point is understanding what you need the software to do.",
    "For a new product, useful questions include who will use it, what task matters most, and what belongs in the first version. For an existing system, the discussion starts with what works today and what needs to change. These questions help make the requirement concrete before choosing a technical direction.",
    "SpecLens provides one example: its first version accepted uploaded documents and produced a comparison matrix. Share your starting point through the inquiry form, including any existing system and the problem you want to address.",
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
