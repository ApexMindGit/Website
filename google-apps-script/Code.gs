/**
 * Apex Mind — contact form handler (Google Apps Script).
 *
 * Paste into Extensions → Apps Script of the inquiries Google Sheet, then
 * deploy as a Web app. The website's server action (app/(site)/contact/actions.ts)
 * POSTs each inquiry here; this appends a row and emails a notification.
 * Setup steps: google-apps-script/README.md
 */

const CONFIG = {
  SHEET_NAME: "Inquiries",
  // Where new-inquiry notifications go. Defaults to the sheet owner if blank.
  NOTIFY_EMAIL: "",
  TIMEZONE: "Asia/Kolkata",
};

// [payload key, column header]. Add columns at the end to keep old rows aligned.
const COLUMNS = [
  ["receivedAt", "Received (IST)"],
  ["type", "Type"],
  ["name", "Name"],
  ["email", "Email"],
  ["company", "Company"],
  ["website", "Website"],
  ["capability", "Capability"],
  ["timeline", "Timeline"],
  ["currency", "Currency"],
  ["budget", "Budget"],
  ["contactVia", "Contact via"],
  ["phone", "Phone"],
  ["callTime", "Best time to call"],
  ["message", "Message"],
  ["status", "Status"],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const secret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
    if (!secret || data.secret !== secret) return json_({ ok: false, error: "unauthorized" });

    const row = COLUMNS.map(([key]) => {
      if (key === "receivedAt") return new Date();
      if (key === "status") return "New";
      return clean_(data[key]);
    });
    getSheet_().appendRow(row);

    // A failed email must not lose the inquiry — the row is already saved.
    try {
      notify_(data);
    } catch (err) {
      console.error("Notification email failed", err);
    }
    return json_({ ok: true });
  } catch (err) {
    console.error("doPost failed", err);
    return json_({ ok: false, error: "server" });
  } finally {
    lock.releaseLock();
  }
}

/** Run once from the editor: creates the sheet + header row and triggers the
    permission prompt for Sheets and Gmail. */
function setup() {
  getSheet_();
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty("SHARED_SECRET")) {
    props.setProperty("SHARED_SECRET", Utilities.getUuid() + Utilities.getUuid());
  }
  console.log("SHARED_SECRET (copy into GOOGLE_SCRIPT_SECRET): " + props.getProperty("SHARED_SECRET"));
  console.log("Notifications go to: " + notifyAddress_());
}

/** Run from the editor to check the email arrives and looks right. */
function sendTestEmail() {
  notify_({
    type: "project",
    name: "Test Person",
    email: notifyAddress_(),
    company: "Test Co",
    capability: "Applied AI",
    timeline: "1–3 months",
    currency: "INR",
    budget: "5,00,000",
    message: "This is a test inquiry sent from the Apps Script editor.",
  });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([, header]) => header));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
    sheet.getRange("A:A").setNumberFormat("dd mmm yyyy, hh:mm");
  }
  return sheet;
}

function notify_(d) {
  const isCall = d.type === "call";
  const subject = (isCall ? "Call request" : "New inquiry") + " — " + clip_(d.name, 60) +
    (d.company ? " (" + clip_(d.company, 60) + ")" : "");

  const rows = [
    ["Type", isCall ? "Request a call" : "Start a project"],
    ["Name", d.name],
    ["Email", d.email],
    ["Company", d.company],
    ["Website", d.website],
    ["Capability", d.capability],
    ["Timeline", d.timeline],
    ["Budget", d.budget ? (d.currency || "") + " " + d.budget : ""],
    ["Contact via", d.contactVia],
    ["Phone", d.phone],
    ["Best time to call", d.callTime],
    ["Message", d.message],
  ].filter(([, v]) => v);

  const sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  const html =
    '<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">' +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    rows.map(([k, v]) =>
      '<tr><td style="color:#777;vertical-align:top;white-space:nowrap">' + esc_(k) +
      '</td><td style="white-space:pre-wrap">' + esc_(v) + "</td></tr>").join("") +
    "</table>" +
    '<p style="margin-top:16px"><a href="' + sheetUrl + '">Open the inquiries sheet</a></p>' +
    '<p style="color:#999;font-size:12px">Reply to this email to answer ' + esc_(d.name) + " directly.</p></div>";
  const text = rows.map(([k, v]) => k + ": " + v).join("\n") + "\n\n" + sheetUrl;

  const options = { htmlBody: html, name: "Apex Mind website" };
  if (d.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) options.replyTo = d.email;
  MailApp.sendEmail(notifyAddress_(), subject, text, options);
}

function notifyAddress_() {
  return CONFIG.NOTIFY_EMAIL || Session.getEffectiveUser().getEmail();
}

/** Strip control chars and neutralise spreadsheet formulas (=, +, -, @). */
function clean_(value) {
  const s = String(value == null ? "" : value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").slice(0, 2000);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function clip_(value, n) {
  return String(value || "").replace(/[\r\n]+/g, " ").slice(0, n);
}

function esc_(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
