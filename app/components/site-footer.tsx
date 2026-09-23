import Link from "next/link";
import { footerColumns, CONTACT, credentials } from "./nav-data";
import { Arrow } from "./ui";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <Link className="wordmark" href="/" aria-label="Apex Mind, home">
              <span className="logo-mark logo-mark-on-dark" aria-hidden="true">
                <img src="/brand/apex-mind-mark.png" alt="" />
              </span>
              <span>
                APEX MIND<span className="wordmark-dot">.</span>
              </span>
            </Link>
            {/* Provisional footer tagline (copy-drafts.md §12A). */}
            <p className="site-footer-tagline">Software · AI · Automation</p>
            <p className="site-footer-response">{CONTACT.responseNote}</p>
            <div className="site-footer-contact">
              <a href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
                <Arrow diagonal />
              </a>
              <a href={CONTACT.whatsappHref}>
                WhatsApp {CONTACT.whatsappNumber}
                <Arrow diagonal />
              </a>
            </div>
          </div>

          <div className="site-footer-columns">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="mono-sm">{column.title}</p>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="site-footer-creds">
          <span className="mono-sm">Registered &amp; recognized</span>
          <ul>
            {credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="site-footer-meta mono-sm">
          <span>Apex Mind LLP · Lucknow, India · Est. 2026</span>
          <span>© {year} · Preview build · Not for publication</span>
        </div>
      </div>

      <div className="site-footer-brandmark" aria-hidden="true">
        apex mind
      </div>
    </footer>
  );
}
