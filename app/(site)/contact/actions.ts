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

/** Env values pasted into a dashboard often pick up quotes or whitespace. */
function env(name: string): string {
  return (process.env[name] ?? "").trim().replace(/^(["'])(.*)\1$/, "$2").trim();
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

  const url = env("GOOGLE_SCRIPT_URL");
  const secret = env("GOOGLE_SCRIPT_SECRET");
  if (!url || !secret) {
    console.error(
      `[contact] Missing env: ${[!url && "GOOGLE_SCRIPT_URL", !secret && "GOOGLE_SCRIPT_SECRET"]
        .filter(Boolean)
        .join(", ")}. Set it for this environment in Vercel and redeploy.`,
    );
    return { ok: false, error: GENERIC_ERROR };
  }
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(url)) {
    console.error("[contact] GOOGLE_SCRIPT_URL doesn't look like an Apps Script /exec URL.");
    return { ok: false, error: GENERIC_ERROR };
  }

  // Apps Script runs doPost, then answers with a 302 to a one-time
  // googleusercontent.com URL holding the JSON result. We follow it by hand so
  // each leg gets its own timeout and log line.
  const t0 = Date.now();
  let stage = "POST to script.google.com";
  try {
    const post = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, ...inquiry }),
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(20000),
    });

    let res = post;
    const location = post.status >= 300 && post.status < 400 ? post.headers.get("location") : null;
    if (location) {
      // The script has already run (row saved, email sent) by the time it
      // redirects. If only fetching the result fails, the inquiry is safe.
      stage = "GET result from googleusercontent.com";
      try {
        res = await fetch(location, { cache: "no-store", signal: AbortSignal.timeout(8000) });
      } catch (err) {
        console.warn(
          `[contact] Inquiry processed, but reading the result failed after ${Date.now() - t0}ms:`,
          err,
        );
        return { ok: true };
      }
    }
    const text = await res.text();
    let body: { ok?: boolean; error?: string } | null = null;
    try {
      body = JSON.parse(text);
    } catch {
      // Non-JSON usually means a Google sign-in/error page: the deployment
      // isn't shared with "Anyone", or the URL points at an old deployment.
    }
    if (!res.ok || !body?.ok) {
      const reason =
        body?.error === "unauthorized"
          ? "secret mismatch — GOOGLE_SCRIPT_SECRET must equal the SHARED_SECRET script property"
          : body?.error ?? `non-JSON response: ${text.slice(0, 120)}`;
      console.error(`[contact] Apps Script rejected the inquiry (HTTP ${res.status}): ${reason}`);
      return { ok: false, error: GENERIC_ERROR };
    }
    return { ok: true };
  } catch (err) {
    const e = err as Error & { cause?: unknown };
    console.error(
      `[contact] Failed during "${stage}" after ${Date.now() - t0}ms: ${e.name}: ${e.message}`,
      e.cause ?? "",
    );
    return { ok: false, error: GENERIC_ERROR };
  }
}
