"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { Mail, MessageCircle } from "lucide-react";
import Button from "./button";
import { CONTACT, capabilityChildren } from "./nav-data";
import { submitInquiry } from "../(site)/contact/actions";

type Mode = "project" | "call";

const modes: { value: Mode; title: string; sub: string }[] = [
  { value: "project", title: "Start a project", sub: "Scoped builds, AI, and automation" },
  { value: "call", title: "Request a call", sub: "Not sure yet? Talk it through first" },
];

const timelineOptions = [
  "As soon as possible",
  "Within a month",
  "1–3 months",
  "3–6 months",
  "Flexible / not sure",
];

const callTimeOptions = [
  "Any time",
  "Morning (your time)",
  "Afternoon (your time)",
  "Evening (your time)",
];

const currencies = [
  { code: "INR", symbol: "₹", example: "e.g. 5,00,000" },
  { code: "USD", symbol: "$", example: "e.g. 15,000" },
  { code: "EUR", symbol: "€", example: "e.g. 15,000" },
  { code: "GBP", symbol: "£", example: "e.g. 12,000" },
] as const;

type Currency = (typeof currencies)[number]["code"];

/** Best-guess currency from the browser's timezone. Only a default — the
    visitor can always change it. */
function guessCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") return "INR";
    if (tz === "Europe/London") return "GBP";
    if (tz.startsWith("Europe/")) return "EUR";
  } catch {
    // Fall through to the default.
  }
  return "USD";
}

export default function InquiryForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("project");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [currencyTouched, setCurrencyTouched] = useState(false);
  const [contactVia, setContactVia] = useState<"email" | "whatsapp">("email");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Resolve the currency after hydration so server and client markup match.
  useEffect(() => {
    if (!currencyTouched) setCurrency(guessCurrency());
  }, [currencyTouched]);

  // Time trap for bots, stamped on the client after hydration.
  useEffect(() => setStartedAt(String(Date.now())), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const data = new FormData(e.currentTarget);
      const result = await submitInquiry(data);
      if (result.ok) {
        // Conversion event only — no personal data is sent to analytics.
        track("inquiry_submitted", { type: String(data.get("type")) });
        router.push(data.get("type") === "call" ? "/contact/received?type=call" : "/contact/received");
        return;
      }
      setError(result.error);
    } catch {
      setError("We couldn't send your inquiry. Please check your connection and try again.");
    }
    setSubmitting(false);
  }

  // Move focus to the error so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const activeCurrency = currencies.find((c) => c.code === currency)!;

  return (
    // method="post": if JS hasn't loaded, a native submit must never put
    // personal details in the URL.
    <form className="contact-card" method="post" onSubmit={onSubmit} aria-busy={submitting}>
      <input type="hidden" name="startedAt" value={startedAt} />
      {/* Honeypot: hidden from people, filled in by naive bots. */}
      <div className="contact-hp" aria-hidden="true">
        <label htmlFor="inq-fax">Fax</label>
        <input id="inq-fax" name="fax" tabIndex={-1} autoComplete="off" />
      </div>
      <fieldset className="contact-tabs">
        <legend className="sr-only">How would you like to start?</legend>
        {modes.map((m) => (
          <label key={m.value} className="contact-tab" data-active={mode === m.value}>
            <input
              type="radio"
              name="type"
              value={m.value}
              checked={mode === m.value}
              onChange={() => setMode(m.value)}
            />
            <span>
              <span className="contact-tab-title">{m.title}</span>
              <span className="contact-tab-sub">{m.sub}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="contact-fields">
        <div className="field">
          <label className="sr-only" htmlFor="inq-name">Name</label>
          <input
            id="inq-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
            minLength={2}
            maxLength={80}
          />
        </div>
        <div className="field">
          <label className="sr-only" htmlFor="inq-email">Email</label>
          <input
            id="inq-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
          />
        </div>

        {mode === "project" ? (
          <>
            <div className="field">
              <label className="sr-only" htmlFor="inq-company">Company (optional)</label>
              <input
                id="inq-company"
                name="company"
                autoComplete="organization"
                placeholder="Company (optional)"
                maxLength={120}
              />
            </div>
            <div className="field">
              <label className="sr-only" htmlFor="inq-website">Website (optional)</label>
              <input
                id="inq-website"
                type="url"
                name="website"
                autoComplete="url"
                placeholder="https://yourcompany.com (optional)"
              />
            </div>

            <div className="contact-row-3">
              <div className="field">
                <label className="sr-only" htmlFor="inq-capability">What do you need?</label>
                <select id="inq-capability" name="capability" defaultValue="">
                  <option value="" disabled>
                    What do you need?
                  </option>
                  {capabilityChildren.map((c) => (
                    <option key={c.href} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
              <div className="field">
                <label className="sr-only" htmlFor="inq-timeline">Timeline</label>
                <select id="inq-timeline" name="timeline" defaultValue="">
                  <option value="" disabled>
                    Timeline
                  </option>
                  {timelineOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="sr-only" htmlFor="inq-budget">
                  Approximate budget in {currency} (optional)
                </label>
                <div className="budget-input">
                  <label className="sr-only" htmlFor="inq-currency">Currency</label>
                  <select
                    id="inq-currency"
                    name="currency"
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value as Currency);
                      setCurrencyTouched(true);
                    }}
                  >
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.symbol} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    id="inq-budget"
                    name="budget"
                    inputMode="numeric"
                    pattern="[0-9][0-9,. ]*"
                    title="Numbers only, e.g. 15,000"
                    placeholder={`Budget — ${activeCurrency.example}`}
                    maxLength={20}
                  />
                </div>
              </div>
            </div>

            <div className="field full">
              <label className="sr-only" htmlFor="inq-message">What are you trying to build or solve?</label>
              <textarea
                id="inq-message"
                name="message"
                placeholder="What are you trying to build or solve? Share the problem, your idea, or your existing software."
                minLength={40}
                maxLength={2000}
                required
              />
            </div>
          </>
        ) : (
          <>
            <fieldset className="field contact-via">
              <legend className="sr-only">How should we reach you?</legend>
              <span className="contact-via-label" aria-hidden="true">Reach me via</span>
              <div className="contact-segment">
                {(["email", "whatsapp"] as const).map((v) => (
                  <label key={v} data-active={contactVia === v}>
                    <input
                      type="radio"
                      name="contactVia"
                      value={v}
                      checked={contactVia === v}
                      onChange={() => setContactVia(v)}
                    />
                    {v === "email" ? "Email" : "WhatsApp"}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label className="sr-only" htmlFor="inq-phone">
                Phone{contactVia === "whatsapp" ? "" : " (optional)"}
              </label>
              <input
                id="inq-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder={
                  contactVia === "whatsapp"
                    ? "WhatsApp no. (+country code)"
                    : "Phone (optional)"
                }
                required={contactVia === "whatsapp"}
                pattern="[+0-9][0-9 ()-]{6,19}"
                title="Include your country code, e.g. +91 98765 43210"
              />
            </div>

            <div className="field full">
              <label className="sr-only" htmlFor="inq-call-time">Best time to reach you (your local time)</label>
              <select id="inq-call-time" name="callTime" defaultValue="">
                <option value="" disabled>
                  Best time to call
                </option>
                {callTimeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="field full">
              <label className="sr-only" htmlFor="inq-topic">What would you like to discuss? (optional)</label>
              <textarea
                id="inq-topic"
                name="message"
                className="short"
                placeholder="What would you like to discuss? (optional)"
                maxLength={1000}
              />
            </div>
          </>
        )}
      </div>

      <div className="contact-card-foot">
        <div className="contact-direct">
          <p>Prefer not to fill in a form?</p>
          <div className="contact-direct-links">
            <a href={`mailto:${CONTACT.email}`}>
              <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
              {CONTACT.email}
            </a>
            <a href={CONTACT.whatsappHref}>
              <MessageCircle size={16} strokeWidth={1.75} aria-hidden="true" />
              WhatsApp {CONTACT.whatsappNumber}
            </a>
          </div>
        </div>
        <div className="contact-submit">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Sending…" : mode === "call" ? "Request a call" : "Send inquiry"}
          </Button>
          <p className="contact-submit-note" role="status">
            {mode === "call"
              ? "We'll follow up to agree a time — a request isn't a booked slot."
              : CONTACT.responseNote}
          </p>
          {error && (
            <p className="contact-error" role="alert" tabIndex={-1} ref={errorRef}>
              {error}
            </p>
          )}
          <p className="contact-privacy">
            By sending this you agree to our{" "}
            <Link href="/legal/privacy">privacy policy</Link>.
          </p>
        </div>
      </div>
    </form>
  );
}
