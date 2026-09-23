import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABand, Arrow, ImageSlot } from "../../components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Apex Mind LLP, a software consultancy founded in 2026 in Lucknow, India, and learn about founder Aryan Rawther's software and AI systems background.",
};

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About / Founder-led"
        title={
          <>
            A small consultancy
            <br />
            for ambitious teams.
          </>
        }
        intro="Apex Mind LLP is a software consultancy based in Lucknow, India, serving clients in India and globally."
        meta={
          <div>
            <span className="mono-label">Apex Mind LLP</span>
            <p>
              Founded 2026
              <br />
              Lucknow, India
              <br />
              India + global clients
            </p>
          </div>
        }
      />

      <section className="section container">
        <div className="content-columns">
          <div className="prose">
            <p>
              Founded in 2026 by Aryan Rawther, the company works across software
              development, AI consulting and implementation, and workflow
              automation. Its capabilities also include system integrations,
              software modernization, optimization, maintenance, mobile app
              development, and government software projects. The starting point is
              the problem a client brings: something they need to build, a
              workflow they want to change, or existing software that needs
              attention.
            </p>
            <p>
              SpecLens provides a concrete example of the work behind Apex Mind.
              Built by Aryan, the product addresses the manual comparison of
              product specification sheets across vendors. Its AI pipeline reads
              vendor documents and produces a structured comparison matrix with
              citations back to source pages. The first version focused on that
              single flow, from uploaded documents to a comparison. SpecLens is
              now live in production, with 300+ signed-up users, and is used by
              procurement teams across multiple industries.
            </p>
            <Link className="text-link" href="/case-studies/speclens">
              <Arrow />
              Read the SpecLens case study
            </Link>
          </div>
          <aside>
            <div className="aside-block">
              <span className="mono-label">01 / Founder</span>
              <p>Aryan Rawther</p>
            </div>
            <div className="aside-block">
              <span className="mono-label">02 / Based in</span>
              <p>Lucknow, India</p>
            </div>
            <div className="aside-block">
              <span className="mono-label">03 / Focus</span>
              <p>Software · AI · Automation</p>
            </div>
          </aside>
        </div>

        <div className="subsection-title">
          <h3 className="h4">The founder</h3>
          <span className="mono-sm">Aryan Rawther / Founder</span>
        </div>
        <div className="content-columns">
          <div className="prose">
            <p>
              Aryan Rawther is the Founder of Apex Mind LLP, based in Lucknow,
              India. A full-stack developer and AI systems specialist, he built
              SpecLens, an AI-powered procurement specification comparison
              product. His prior experience includes CombineHealth (YC W23) and
              Egnyte, with earlier work at PESU Venture Labs, Growthspree, and
              UpTrain. He graduated from PES University with a computer science
              degree in 2024.
            </p>
            <p>
              His technical background includes Next.js, TypeScript, Python,
              FastAPI, PostgreSQL, LangGraph, and retrieval-augmented generation.
              More about his background is available at aryanrawther.com.
            </p>
            <a className="text-link" href="https://www.aryanrawther.com">
              <Arrow diagonal />
              aryanrawther.com
            </a>
          </div>
          <div>
            <ImageSlot label="Founder portrait" ratio="4:3" />
          </div>
        </div>
      </section>

      <CTABand
        title={
          <>
            Work with a
            <br />
            founder directly.
          </>
        }
      />
    </>
  );
}
