import Link from "next/link";
import { Arrow } from "./ui";

export type LegalSection = { heading: string; body: string[] };

export default function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="legal-page container">
      <span className="draft-note">Draft — pending legal review</span>
      <h1 className="h2">{title}</h1>
      <p>{intro}</p>
      {sections.map((section) => (
        <div key={section.heading}>
          <h2>{section.heading}</h2>
          {section.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ))}
      <p className="updated">
        This document is a placeholder for review and does not yet constitute the
        final policy. Final wording will be confirmed with legal review before
        launch.
      </p>
      <div style={{ marginTop: "2rem" }}>
        <Link className="text-link" href="/contact" style={{ color: "#111" }}>
          <Arrow />
          Questions? Contact us
        </Link>
      </div>
    </section>
  );
}
