import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABand, Arrow } from "../../components/ui";

export const metadata: Metadata = {
  title: "Find a starting point",
  description:
    "Find a starting point for your project with Apex Mind. Describe what you want to build, automate, improve, or connect, then continue to an inquiry.",
};

const starts = [
  ["Build a product", "A web app, mobile app, or first product version around a defined need."],
  ["Add useful AI", "An AI feature or system with a specific task and a clear intended use."],
  ["Reduce manual steps", "A repeated process where software could handle the routine work."],
  ["Connect tools", "Integrations so information moves through the workflow you need."],
  ["Improve software", "Fixes, modernization, or changes to an existing application."],
  ["Talk it through", "Start with the problem, the people affected, and what should change."],
];

export default function Start() {
  return (
    <>
      <PageHero
        eyebrow="Start"
        title={
          <>
            Find a starting
            <br />
            point.
          </>
        }
        intro="Pick what sounds closest to your situation, then continue to a short inquiry. You do not need a specification to begin."
      />

      <section className="section container">
        <div className="card-grid">
          {starts.map(([title, body], i) => (
            <Link key={title} href="/contact" className="feature-card">
              <span className="eyebrow">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="card-cta">
                Continue <Arrow diagonal />
              </span>
            </Link>
          ))}
        </div>
        <p className="caption muted" style={{ marginTop: "2rem" }}>
          Prefer to write it in your own words? Go straight to the{" "}
          <Link className="text-link" href="/contact" style={{ display: "inline" }}>
            inquiry form
          </Link>
          .
        </p>
      </section>

      <CTABand
        title={
          <>
            Ready when
            <br />
            you are.
          </>
        }
      />
    </>
  );
}
