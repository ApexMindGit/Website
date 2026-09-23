import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABand, Arrow } from "../../components/ui";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Start with the problem you want to solve. Explore Apex Mind's capabilities in building software, applying AI, automating work, and connecting systems.",
};

// Problem cards — Set A (copy-drafts.md §4). Provisional.
const problems = [
  ["01", "Build something new", "Turn a product idea into a defined software project, starting with what the first version needs.", "/what-we-do/build"],
  ["02", "Apply AI", "Explore how AI could support a specific task in your product or internal operations.", "/what-we-do/intelligence"],
  ["03", "Automate repetitive work", "Identify manual steps in a workflow and discuss which ones software could take over.", "/what-we-do/automate"],
  ["04", "Connect your systems", "Bring separate applications into a shared workflow through integrations suited to how your team works.", "/what-we-do/automate"],
  ["05", "Improve existing software", "Address software that needs fixes, modernization, maintenance, or changes to support the way you work.", "/what-we-do/build"],
  ["06", "Find a starting point", "Describe the problem you are facing, even if you do not yet know what to build.", "/start"],
] as const;

export default function Solutions() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Start with the
            <br />
            problem, not the tech.
          </>
        }
        intro="You can bring us a problem before you have a specification. Pick the one that sounds closest — each leads to a starting point."
      />

      <section className="section container">
        <div className="problem-grid">
          {problems.map(([num, title, body, href], i) => (
            <Link
              key={title}
              href={href}
              className={`problem-card${i === 5 ? " inverted" : ""}`}
            >
              <span className="eyebrow">{num}</span>
              <Arrow diagonal />
              <div>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTABand
        title={
          <>
            Still working out
            <br />
            the requirement?
          </>
        }
        body="Describe what is getting in the way. We will help turn it into a software requirement worth discussing."
      />
    </>
  );
}
