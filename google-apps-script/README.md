# Contact form → Google Sheet → email

```
/contact form ──► Next.js server action ──► Apps Script web app ──► row in "Inquiries" sheet
 (browser)        app/(site)/contact/        google-apps-script/       + notification email
                  actions.ts                 Code.gs                     (reply-to = the visitor)
```

The browser never sees the script URL or the secret — the server action adds
the secret and forwards the inquiry. Apps Script checks the secret before
writing anything.

## One-time setup (≈10 minutes)

1. **Create the sheet.** In Google Drive (the account that should own the
   inquiries and send the emails), create a blank spreadsheet, e.g.
   "Apex Mind — Inquiries".
2. **Add the script.** In the sheet: **Extensions → Apps Script**. Delete the
   sample code, paste the whole of `Code.gs`, and save.
   - Optional: set `CONFIG.NOTIFY_EMAIL` to the address that should get the
     alerts (blank = the sheet owner's Gmail).
3. **Run `setup` once.** Pick `setup` in the function dropdown → **Run**.
   Approve the permission prompt (Sheets + send email as you). If Google shows
   "Google hasn't verified this app", choose *Advanced → Go to … (unsafe)* —
   it's your own script.
   - This creates the **Inquiries** tab with headers and generates a
     `SHARED_SECRET`. Copy the secret from the **Execution log**.
   - (It's stored under **Project Settings → Script properties** if you need
     it again.)
4. **Optional: run `sendTestEmail`** to check the email arrives.
5. **Deploy.** **Deploy → New deployment → ⚙ Select type → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, then copy the **Web app URL** (ends in `/exec`).
6. **Set the env vars** — locally in `.env.local`, and in Vercel under
   Project → Settings → Environment Variables (Production + Preview):
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/…/exec
   GOOGLE_SCRIPT_SECRET=<the SHARED_SECRET from step 3>
   ```
   Restart `pnpm dev` / redeploy so the new values are picked up.
7. **Test** by submitting `/contact`. A row should appear and the email arrive
   within a few seconds.

## Changing the script later

Editing `Code.gs` does **not** update the live web app. After pasting changes:
**Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy**.
This keeps the same URL, so no env change is needed.

## Notes

- **"Anyone" access is expected** — the endpoint rejects any request without the
  secret. Rotate by changing `SHARED_SECRET` in Script properties and
  `GOOGLE_SCRIPT_SECRET` in Vercel together.
- **Spam:** the form has a hidden honeypot field and a 3-second time trap; bots
  that trip them get a fake success and nothing is stored. If spam gets through,
  add Cloudflare Turnstile (keys already reserved in `.env.example`).
- **Quota:** Gmail accounts can send ~100 script emails/day (Workspace ~1,500).
- The sheet has a **Status** column (defaults to "New") for tracking follow-up.
- Values starting with `=`, `+`, `-`, `@` are stored as text so nobody can
  inject a formula into the sheet.
