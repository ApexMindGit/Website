import Link from "next/link";
import { PageHero, CTABand, Arrow } from "./ui";

export type CapabilityData = {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  paragraphs: string[];
  bring: { label: string; title: string; body: string }[];
  related?: { href: string; label: string }[];
  ctaTitle: React.ReactNode;
};

export default function CapabilityPage({ data }: { data: CapabilityData }) {
  return (
    <>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        intro={data.intro}
        meta={
          <>
            <div>
              <span className="mono-label">Apex Mind / Capability</span>
              <p>
                Lucknow, India
                <br />
                India + global clients
              </p>
            </div>
            {data.related && (
              <div>
                <span className="mono-label">Related</span>
                <p>
                  {data.related.map((r, i) => (
                    <span key={r.href}>
                      {i > 0 && <br />}
                      <Link href={r.href}>{r.label}</Link>
                    </span>
                  ))}
                </p>
              </div>
            )}
          </>
        }
      />

      <section className="section container">
        <div className="content-columns">
          <div className="prose">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside>
            <div className="aside-block">
              <span className="mono-label">Where to start</span>
              <p>
                Bring the problem you are facing, even without a specification.
                We&rsquo;ll begin from there.
              </p>
            </div>
            <Link className="text-link" href="/contact">
              <Arrow />
              Discuss your requirement
            </Link>
          </aside>
        </div>

        <div className="subsection-title">
          <h3 className="h4">What helps us start</h3>
          <span className="mono-sm">Useful context, not a specification</span>
        </div>
        <div className="bring-list">
          {data.bring.map((item, i) => (
            <div key={item.title}>
              <span className="mono-label">0{i + 1}</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABand title={data.ctaTitle} />
    </>
  );
}
