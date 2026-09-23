import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" className="centered-page container">
      <div className="inner">
        <Link className="wordmark" href="/" aria-label="Apex Mind, home">
          <span className="logo-mark logo-mark-on-dark" aria-hidden="true">
            <img src="/brand/apex-mind-mark.png" alt="" />
          </span>
          <span>
            APEX MIND<span className="wordmark-dot">.</span>
          </span>
        </Link>
        <p className="eyebrow">Error 404</p>
        <h1 className="display-md">This page took a wrong turn.</h1>
        <p>The page you are looking for does not exist or has moved.</p>
        <div className="actions">
          <Link className="button" href="/">
            <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
            Back to home
          </Link>
          <Link className="text-link" href="/what-we-do">
            <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
            Explore what we do
          </Link>
        </div>
      </div>
    </main>
  );
}
