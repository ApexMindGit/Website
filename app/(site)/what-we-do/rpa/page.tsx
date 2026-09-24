import type { Metadata } from "next";
import { MousePointerClick, LogIn, Import, UserCheck } from "lucide-react";
import CapabilityPage, {
  type CapabilityData,
} from "../../../components/capability-page";

export const metadata: Metadata = {
  title: "RPA — Robotic Process Automation",
  description:
    "Robotic Process Automation with Apex Mind. When a system has no API, bots log in, extract, and enter data across legacy portals and desktop apps — with a person in the loop.",
};

const data: CapabilityData = {
  eyebrow: "What we do / RPA",
  title: (
    <>
      When there&rsquo;s no API,
      <br />
      we automate the clicks.
    </>
  ),
  intro:
    "Some systems have no integration point — just a login screen. RPA bots operate them the way a person does: log in, read, enter, and move data across legacy portals and desktop apps.",
  heroNote: "Bots that log in, extract, and enter — with a person in the loop.",
  features: [
    {
      icon: MousePointerClick,
      title: "UI & desktop bots",
      body: "Automate legacy portals and desktop apps that have no API to connect to.",
    },
    {
      icon: LogIn,
      title: "Legacy-portal automation",
      body: "Bots that log in, navigate, and pull or push data on your behalf.",
    },
    {
      icon: Import,
      title: "Data entry & migration",
      body: "Move records between systems accurately, without manual re-keying.",
    },
    {
      icon: UserCheck,
      title: "Human in the loop",
      body: "A person reviews and approves wherever judgment or an exception comes up.",
    },
  ],
  paragraphs: [
    "When a system has no API, integration isn't an option — but automation still is. RPA (Robotic Process Automation) uses software bots that operate an application's interface directly: clicking, typing, reading fields, and moving data exactly where a person would.",
    "It fits legacy portals, government systems, and desktop software that won't change to accommodate you. We map the steps a person takes today, then build a bot that repeats them reliably — with checks so it fails safely, not silently.",
    "RPA works best as part of a larger workflow. Where a modern integration is possible, we'll use it; where it isn't, a bot bridges the gap, and a person stays in the loop for anything that needs a decision.",
  ],
  bring: [
    {
      label: "01",
      title: "The system with no API",
      body: "Name the portal, desktop app, or legacy tool that can't be integrated directly.",
    },
    {
      label: "02",
      title: "The steps a person takes",
      body: "Walk through the clicks, logins, and screens involved in the task today.",
    },
    {
      label: "03",
      title: "Volume and exceptions",
      body: "How often it runs, and where a human needs to check or decide.",
    },
  ],
  faqs: [
    [
      "How is RPA different from automation or integrations?",
      "Integrations connect systems through APIs. RPA is for systems that have none — the bot uses the interface directly, like a person.",
    ],
    [
      "Which tools do you use?",
      "We work with UiPath and browser-automation tools like Selenium, chosen to fit the system and the volume.",
    ],
    [
      "Is RPA reliable when systems change?",
      "Bots need updates when a screen changes. We build in checks so failures are caught, and can maintain the bots under a retainer.",
    ],
    [
      "Can a person stay in control?",
      "Yes. We keep a human in the loop for approvals, exceptions, and anything that requires judgment.",
    ],
    [
      "Is it safe for sensitive systems?",
      "We scope access tightly and add logging and checkpoints. For regulated environments, we align with your security requirements.",
    ],
  ],
  related: [
    { href: "/what-we-do/build", label: "Software development" },
    { href: "/what-we-do/intelligence", label: "Applied AI" },
    { href: "/what-we-do/automate", label: "Automate" },
    { href: "/what-we-do/web-seo", label: "Web & SEO" },
  ],
  ctaTitle: (
    <>
      Show us the system
      <br />
      with no API.
    </>
  ),
};

export default function RpaPage() {
  return <CapabilityPage data={data} />;
}
