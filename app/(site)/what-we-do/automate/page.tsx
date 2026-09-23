import type { Metadata } from "next";
import CapabilityPage, {
  type CapabilityData,
} from "../../../components/capability-page";

export const metadata: Metadata = {
  title: "Automate — workflow automation & integrations",
  description:
    "Discuss workflow automation and system integrations with Apex Mind. Start with the repeated tasks, applications, and information in your current process.",
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
  paragraphs: [
    "Where does work begin? Which applications hold the information? What does someone copy, check, or pass to another person? Apex Mind provides workflow automation and system integrations for teams looking at these kinds of software requirements.",
    "Start by describing one process as it happens today. Include the tools involved, the repeated manual work, and any decisions that require a person. This gives the conversation a concrete basis and helps distinguish the overall problem from an individual task within it.",
    "Automation is one of our primary capabilities, alongside software development and AI consulting and implementation. A requirement may involve more than one of these areas — you do not need to choose the technical category before contacting us.",
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
  related: [
    { href: "/what-we-do/build", label: "Build" },
    { href: "/what-we-do/intelligence", label: "Intelligence" },
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
