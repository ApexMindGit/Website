import type { Metadata } from "next";
import { Repeat, Cable, Split, UserCheck } from "lucide-react";
import CapabilityPage, {
  type CapabilityData,
} from "../../../components/capability-page";

export const metadata: Metadata = {
  title: "Automate — workflow automation & integrations",
  description:
    "Workflow automation and system integrations with Apex Mind. Start with the repeated tasks, the applications involved, and the decisions that still need a person.",
};

const data: CapabilityData = {
  eyebrow: "What we do / Automate",
  title: (
    <>
      Less repeated
      <br />
      manual work.
    </>
  ),
  intro:
    "A workflow is easier to discuss when its steps are visible: where work begins, which applications hold the information, and what a person passes along.",
  heroNote: "Healthcare RCM — automation supporting 300+ patients a day.",
  features: [
    {
      icon: Repeat,
      title: "Process automation",
      body: "Automate the steps your team repeats, from what triggers the work to what completes it.",
    },
    {
      icon: Cable,
      title: "System integrations",
      body: "Connect the applications you already use so information moves without copy-paste.",
    },
    {
      icon: Split,
      title: "Approvals & routing",
      body: "Send work to the right person, with checks and sign-off where they matter.",
    },
    {
      icon: UserCheck,
      title: "Human in the loop",
      body: "Keep a person on the decisions that need judgment — automation handles the rest.",
    },
  ],
  paragraphs: [
    "Where does work begin? Which applications hold the information? What does someone copy, check, or pass to another person? Apex Mind provides workflow automation and system integrations for teams looking at these kinds of software requirements.",
    "Start by describing one process as it happens today. Include the tools involved, the repeated manual work, and any decisions that require a person. This gives the conversation a concrete basis and helps distinguish the overall problem from an individual task within it.",
    "Automation is one of our primary capabilities, alongside software development and applied AI. A requirement may involve more than one of these areas — you do not need to choose the technical category before contacting us.",
  ],
  bring: [
    {
      label: "01",
      title: "One process, end to end",
      body: "Describe the sequence from what triggers the work to what completes it.",
    },
    {
      label: "02",
      title: "The applications involved",
      body: "List the tools information moves between, and where it gets copied or checked.",
    },
    {
      label: "03",
      title: "The exceptions",
      body: "Point out where a person needs to review information or make a decision.",
    },
  ],
  faqs: [
    [
      "Where should we start with automation?",
      "With one process you repeat often. Describe it end to end and we'll find the steps worth automating first.",
    ],
    [
      "Will automation replace our team?",
      "No — it removes the repetitive parts so your team spends time on the work that actually needs people.",
    ],
    [
      "What if our tools don't have an API?",
      "We can still automate them. Where there's no API, we use RPA — bots that operate the interface like a person would.",
    ],
    [
      "How do you handle exceptions?",
      "We design for them: clear rules for the common cases, and a person in the loop for anything unusual.",
    ],
    [
      "Do you maintain the automations?",
      "Yes, if you want. Automations need occasional care as tools change — we can cover that under a retainer.",
    ],
  ],
  related: [
    { href: "/what-we-do/build", label: "Software development" },
    { href: "/what-we-do/intelligence", label: "Applied AI" },
    { href: "/what-we-do/rpa", label: "RPA" },
    { href: "/what-we-do/web-seo", label: "Web & SEO" },
  ],
  ctaTitle: (
    <>
      Show us the work
      <br />
      that repeats.
    </>
  ),
};

export default function AutomatePage() {
  return <CapabilityPage data={data} />;
}
