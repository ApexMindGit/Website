import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CONTACT } from "./nav-data";
import Button from "./button";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
  ) : (
    <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/** Labeled placeholder for founder-supplied imagery (no stock/generated assets). */
export function ImageSlot({
  label,
  ratio = "16:10",
}: {
  label: string;
  ratio?: string;
}) {
  return (
    <div
      className="image-slot"
      role="img"
      aria-label={`${label}, image to be supplied`}
    >
      <span className="crop-mark top-left" />
      <span className="crop-mark bottom-right" />
      <span>
        IMAGE / {label}
        <br />
        {ratio} / SOURCE: NEEDED
      </span>
    </div>
  );
}

/** Looping, muted demo video (autoplays, no controls). Falls back to the
    labeled ImageSlot placeholder when no source is supplied. */
export function MediaSlot({
  label,
  media,
  ratio = "16:10",
}: {
  label: string;
  media?: { src: string; poster?: string };
  ratio?: string;
}) {
  if (!media) return <ImageSlot label={label} ratio={ratio} />;
  return (
    <div className="media-slot">
      <video
        className="media-slot-video"
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${label} — product demo`}
      />
    </div>
  );
}

export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="studio-metric">
      {value}
      <span>{label}</span>
    </div>
  );
}

/** Inner-page hero: eyebrow + title + intro, with an optional metadata rail. */
export function PageHero({
  eyebrow,
  title,
  intro,
  meta,
  action,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  meta?: React.ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <section className="page-hero container">
      <div className="page-hero-main">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-md">{title}</h1>
        {intro && <p className="page-hero-intro">{intro}</p>}
        {action && (
          <Link className="text-link" href={action.href}>
            <Arrow />
            {action.label}
          </Link>
        )}
      </div>
      {meta && <div className="page-hero-meta">{meta}</div>}
    </section>
  );
}

/** Closing call-to-action band reused at the foot of most pages. */
export function CTABand({
  eyebrow = "Start a conversation",
  title,
  body,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
}) {
  const tickerItems = [
    "Software development",
    "AI implementation",
    "Workflow automation",
    "Robotic Process Automation",
    "System integrations",
    "Government software",
    "Monthly retainers",
  ];

  return (
    <section className="cta-band aurora-card">
      <div className="container cta-band-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display-md">{title}</h2>
        {body && <p className="cta-band-body">{body}</p>}
        <div className="actions">
          <Button href="/contact" variant="light">
            Get a Custom Quote
          </Button>
          <a className="text-link" href={CONTACT.whatsappHref}>
            <Arrow diagonal />
            Message on WhatsApp
          </a>
        </div>
        <p className="caption muted cta-band-note">{CONTACT.responseNote}</p>
      </div>
      <div className="cta-band-ticker" aria-label="Apex Mind services">
        <div className="cta-band-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
