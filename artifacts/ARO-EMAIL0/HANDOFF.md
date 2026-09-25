# ARO email handoff

Status: partial setup on 2026-09-25. Consult `VERIFICATION.md` before treating any address as operational.

## Access and ownership

- Domain and DNS: Vercel team `lionovart`, domain `aro-club.app` in the Domains dashboard. Vercel nameservers are authoritative.
- Business mailbox: Zoho Mail, pending recovery-mobile verification and organization/domain setup. No `@aro-club.app` inbox or alias is live yet. The founder owns the Zoho administrator sign-in, recovery method, and MFA.
- App Auth mail: Supabase project `ARO.club Staging` (`mibydnerayobemhnlfyl`), Authentication → Emails → SMTP Settings and Templates. Only staging was changed.
- SMTP delivery: Resend domain `aro-club.app` and sending-only API key `ARO Staging Auth SMTP`, restricted to that domain. Resend receives no mail for this domain. The one-time key value is stored only in Supabase's encrypted SMTP setting; rotate it in Resend and replace it in Supabase if access is lost or exposed.
- Delivery investigation: Resend → Emails for message status and Resend → Logs for sending errors. Supabase → Authentication → Logs and Users for Auth failures. Do not paste confirmation or recovery links into issue trackers or logs.

## DNS

The pre-Zoho snapshot in `VERIFICATION.md` records all three existing Resend records. Preserve `resend._domainkey` TXT and the `send` SPF/MX records. No apex MX, apex SPF, or DMARC record existed before Zoho setup. Add only Zoho's exact account-region records after Zoho displays them; avoid a second SPF TXT at the same hostname. DMARC starts at `p=none` with reports to a working alias, then moves to enforcement after authenticated messages from both providers have been checked.

## Remaining verification

- Finish Zoho administrator recovery and MFA, select a free plan if offered, create `hello@` plus `support@`, `notifications@`, and DMARC-report aliases, and enable send-as for `support@`.
- Verify domain ownership and Zoho MX/SPF/DKIM in Vercel and Zoho. Record exact new DNS values and public propagation results in `VERIFICATION.md`.
- Send and receive mail at `hello@` and `support@`, reply as each identity, and inspect SPF/DKIM/DMARC results. Check replies to `notifications@` reach Zoho.
- Provide a live N1 staging deployment, then update Supabase's Site URL and exact callback allow list together. The current allow-listed deployment returns HTTP 410.
- Use a founder-controlled inbox for disposable signup and recovery tests. Confirm delivery in Resend, valid and expired links, and redirects. The current SMTP settings and templates have been saved but not delivery-tested.
- Keep production Supabase Auth and the website launch outside this package. Repeat the Auth configuration and checks for production only under its own release approval.

## Rollback

If Zoho incoming delivery fails, compare its new apex MX/SPF/DKIM against the Zoho admin instructions. Remove only the new Zoho entries if a rollback is necessary; the baseline had no apex MX/SPF/DMARC, and the Resend `send` records must stay. If staging Auth delivery fails, disable custom SMTP in Supabase Staging and restore the previous default confirmation/reset templates; rotate or remove the dedicated Resend key if compromised. This does not affect production.
