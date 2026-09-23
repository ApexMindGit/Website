"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import Button from "./button";

const engagementOptions = [
  "Fixed-scope project",
  "Monthly retainer",
  "Not sure yet",
];

export default function InquiryForm() {
  const router = useRouter();
  const [choice, setChoice] = useState(engagementOptions[0]);
  const [selectOpen, setSelectOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const selectBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectOpen) return;
    function close(e: PointerEvent) {
      if (!selectBox.current?.contains(e.target as Node)) setSelectOpen(false);
    }
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [selectOpen]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend is wired yet: nothing is sent or stored. Route to the
    // confirmation page so the flow is reviewable in the preview.
    setSubmitting(true);
    router.push("/contact/received");
  }

  return (
    <form className="sample-form inquiry-form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="inq-name">Name</label>
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
        <label htmlFor="inq-email">Email</label>
        <input
          id="inq-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
        />
      </div>

      <div className="field full" ref={selectBox}>
        <label id="inq-engagement-label">Engagement</label>
        <button
          type="button"
          className="select-trigger"
          aria-labelledby="inq-engagement-label inq-engagement-value"
          aria-expanded={selectOpen}
          aria-controls="inq-engagement-options"
          onClick={() => setSelectOpen(!selectOpen)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSelectOpen(false);
          }}
        >
          <span id="inq-engagement-value">{choice}</span>
          <ChevronDown size={16} />
        </button>
        {selectOpen && (
          <div id="inq-engagement-options" className="select-options">
            {engagementOptions.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => {
                  setChoice(option);
                  setSelectOpen(false);
                  selectBox.current?.querySelector("button")?.focus();
                }}
              >
                {option}
                {choice === option && <Check size={16} aria-label="Selected" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <fieldset className="full">
        <legend>Would you like to arrange a call?</legend>
        <div className="radio-group">
          <label>
            <input name="call" type="radio" value="yes" defaultChecked />
            <span>Yes</span>
          </label>
          <label>
            <input name="call" type="radio" value="no" />
            <span>No</span>
          </label>
        </div>
      </fieldset>

      <div className="field full">
        <label htmlFor="inq-message">What are you trying to solve?</label>
        <textarea
          id="inq-message"
          name="message"
          placeholder="Tell us about the problem, your idea, or your existing software."
          minLength={40}
          maxLength={2000}
          required
        />
        <span className="caption muted">40–2,000 characters</span>
      </div>

      <div className="full form-submit">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send inquiry"}
        </Button>
        <p className="caption muted" role="status">
          Preview form — nothing is sent or stored yet.
        </p>
      </div>
    </form>
  );
}
