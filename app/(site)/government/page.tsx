import type { Metadata } from "next";
import { PageHero, CTABand } from "../../components/ui";

export const metadata: Metadata = {
  title: "Government",
  description:
    "Discuss government software project requirements with Apex Mind LLP in Lucknow, including development, AI implementation, automation, and integrations.",
};

const capabilities = [
  ["Software development", "Applications and internal tools built around a defined requirement."],
  ["Mobile applications", "Public-facing or departmental mobile products."],
  ["AI implementation", "AI applied to a specific, well-defined task."],
  ["Workflow automation", "Reduce repeated manual steps across existing systems."],
  ["Integrations", "Connect the systems a department already uses."],
  ["Modernization", "Improve or replace software that no longer fits requirements."],
];

// Registrations confirmed by the founder; marks and certificate details pending.
const registrations = [
  "Company registration",
  "GST",
  "MSME / Udyam",
  "Startup India",
  "ISO 27001:2022",
  "GeM",
];

export default function Government() {
  return (
    <>
      <PageHero
        eyebrow="Government & public sector"
        title={
          <>
            Software for public-
            <br />
            sector requirements.
          </>
        }
        intro="Discuss software development, AI implementation, automation, and integration requirements with Apex Mind LLP, a consultancy based in Lucknow, India."
        meta={
          <div>
            <span className="mono-label">Apex Mind LLP</span>
            <p>
              Lucknow, India
              <br />
              Est. 2026
            </p>
          </div>
        }
      />

      <section className="section container">
        <div className="section-lead-grid section-eyebrow">
          <h2>Start with the project requirement.</h2>
          <p>
            Bring your software requirement. We can explore development, mobile
            applications, integrations, modernization, AI implementation, and
            automation.
          </p>
        </div>
        <div className="card-grid" style={{ marginTop: "2.5rem" }}>
          {capabilities.map(([title, body], i) => (
            <div key={title} className="feature-card">
              <span className="eyebrow">0{i + 1}</span>
              <h3 style={{ fontSize: "22px" }}>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>

        <div className="subsection-title">
          <h3 className="h4">Registrations</h3>
          <span className="mono-sm">Details and marks pending verification</span>
        </div>
        <div className="card-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {registrations.map((r) => (
            <div
              key={r}
              className="engagement-card"
              style={{ minHeight: 0 }}
            >
              <span className="mono-label">{r}</span>
            </div>
          ))}
        </div>
        <p className="caption muted" style={{ marginTop: "1.5rem", maxWidth: "40rem" }}>
          Supporting certificate details and official marks will be published once
          confirmed. Nothing here implies prior government contracts, tender
          eligibility, or guaranteed compliance.
        </p>
      </section>

      <CTABand
        title={
          <>
            Discuss a public-
            <br />
            sector requirement.
          </>
        }
      />
    </>
  );
}
