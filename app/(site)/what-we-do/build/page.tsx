import type { Metadata } from "next";
import { Compass, Rocket, Boxes, Wrench } from "lucide-react";
import CapabilityPage, {
  type CapabilityData,
} from "../../../components/capability-page";

export const metadata: Metadata = {
  title: "Software development",
  description:
    "Software development with Apex Mind — web apps, SaaS products, internal tools, integrations, and modernization, built around a defined problem and shipped in reviewable slices.",
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
  heroNote: "SpecLens — idea to a working MVP in 8 weeks.",
  features: [
    {
      icon: Compass,
      title: "Senior, founder-led",
      body: "You work directly with the people building it — no handoff to a junior team.",
    },
    {
      icon: Rocket,
      title: "Shipped in slices",
      body: "Work moves in reviewable increments, so you see progress and can steer early.",
    },
    {
      icon: Boxes,
      title: "Built to fit your stack",
      body: "New builds and integrations that sit cleanly alongside the systems you already run.",
    },
    {
      icon: Wrench,
      title: "Maintained, not abandoned",
      body: "Optimization, maintenance, and extension after launch — for as long as it's useful.",
    },
  ],
  paragraphs: [
    "Whether it's a first product, an internal tool, or an application that has outgrown its original design, the work starts the same way: getting clear on what the software actually has to do. From there, Apex Mind covers the full arc — build, integrations, modernization, optimization, and maintenance.",
    "For something new, three questions do most of the work: who uses it, which task matters most, and what belongs in the first version. For an existing system, we start from what's working and what has to change. Either way, the requirement gets concrete before any technical decision is made.",
    "Take SpecLens: version one accepted uploaded documents and returned a comparison matrix — shipped fast, then extended. Bring your own starting point through the inquiry form: the problem you're solving, and any system it has to live with.",
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
  faqs: [
    [
      "Can you start without a full specification?",
      "Yes. Defining the requirement is part of the work — bring the problem and we'll shape the scope with you.",
    ],
    [
      "Do you work on existing applications, or only new builds?",
      "Both. We build from scratch and also improve, integrate with, or modernize software you already run.",
    ],
    [
      "How quickly can we ship?",
      "It depends on scope, but we work toward a usable first version early — SpecLens went from idea to an 8-week MVP.",
    ],
    [
      "What does the engagement look like?",
      "Fixed-scope projects with agreed deliverables and milestone payments, or a monthly retainer for ongoing work. We recommend what fits.",
    ],
    [
      "Which technologies do you use?",
      "We choose the stack around the problem, not the reverse — typically modern web (Next.js / React), reliable backends, and proven integrations.",
    ],
  ],
  related: [
    { href: "/what-we-do/intelligence", label: "Applied AI" },
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
