"use server";

// Receives the contact form, validates it, and forwards it to the Google Apps
// Script web app (google-apps-script/Code.gs), which appends a row to the
// inquiries sheet and emails a notification. Runs on the server so the script
// URL and shared secret never reach the browser.

export type InquiryResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR =
  "Something went wrong sending your inquiry. Please try again, or email us directly.";

// Anything submitted faster than this is almost certainly a bot.
const MIN_FILL_MS = 3000;

function field(data: FormData, name: string, max: number): string {
  const value = data.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+0-9][0-9 ()-]{6,19}$/;

export async function submitInquiry(data: FormData): Promise<InquiryResult> {
  // Honeypot + time trap: pretend success so bots don't learn to adapt.
  const startedAt = Number(field(data, "startedAt", 20));
  if (field(data, "fax", 200) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { ok: true };
  }

  const type = field(data, "type", 10);
  if (type !== "project" && type !== "call") return { ok: false, error: GENERIC_ERROR };

  const inquiry = {
    type,
    name: field(data, "name", 80),
    email: field(data, "email", 160),
    company: field(data, "company", 120),
    website: field(data, "website", 200),
    capability: field(data, "capability", 60),
    timeline: field(data, "timeline", 60),
    currency: field(data, "currency", 3),
    budget: field(data, "budget", 20),
    contactVia: field(data, "contactVia", 10),
    phone: field(data, "phone", 20),
    callTime: field(data, "callTime", 40),
    message: field(data, "message", 2000),
  };

  if (inquiry.name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(inquiry.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (type === "project" && inquiry.message.length < 40) {
    return { ok: false, error: "Please tell us a little more about the project (40+ characters)." };
  }
  if (type === "call" && inquiry.contactVia === "whatsapp" && !inquiry.phone) {
    return { ok: false, error: "Please add your WhatsApp number so we can reach you." };
  }
  if (inquiry.phone && !PHONE_RE.test(inquiry.phone)) {
    return { ok: false, error: "Please enter a valid phone number with country code." };
  }

  const url = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.GOOGLE_SCRIPT_SECRET;
  if (!url || !secret) {
    console.error("[contact] GOOGLE_SCRIPT_URL / GOOGLE_SCRIPT_SECRET are not set.");
    return { ok: false, error: GENERIC_ERROR };
  }

  try {
    // Apps Script answers POSTs with a 302 to googleusercontent.com; fetch
    // follows it and returns the script's JSON body.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, ...inquiry }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !body?.ok) {
      console.error("[contact] Apps Script rejected the inquiry:", res.status, body?.error);
      return { ok: false, error: GENERIC_ERROR };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] Failed to reach Apps Script:", err);
    return { ok: false, error: GENERIC_ERROR };
  }
}
