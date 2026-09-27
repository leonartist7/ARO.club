# ARO email handoff

Status: business mailbox and DNS configured on 2026-09-26; app Auth delivery and end-to-end redirects remain unverified. Consult `VERIFICATION.md` for test results.

## Access and ownership

- Domain and DNS: Vercel team `lionovart`, domain `aro-club.app` in the Domains dashboard. Vercel nameservers are authoritative.
- Business mailbox: Zoho Mail at `mail.zoho.com`. The organization uses Mail Free with one mailbox, `hello@aro-club.app`; `support@`, `notifications@`, `info@`, and `dmarc@` are aliases to that mailbox. The founder owns the Zoho administrator sign-in, recovery method, and MFA. Check account-level MFA enrollment separately; it was not changed in this package.
- App Auth mail: Supabase project `ARO.club Staging` (`mibydnerayobemhnlfyl`), Authentication → Emails → SMTP Settings and Templates. Only staging was changed.
- SMTP delivery: Resend domain `aro-club.app` and sending-only API key `ARO Staging Auth SMTP`, restricted to that domain. Resend receives no mail for this domain. The one-time key value is stored only in Supabase's encrypted SMTP setting; rotate it in Resend and replace it in Supabase if access is lost or exposed.
- Delivery investigation: Resend → Emails for message status and Resend → Logs for sending errors. Supabase → Authentication → Logs and Users for Auth failures. Do not paste confirmation or recovery links into issue trackers or logs.

## DNS

The pre-Zoho snapshot in `VERIFICATION.md` records all three existing Resend records. Preserve `resend._domainkey` TXT and the `send` SPF/MX records. The current Zoho apex MX priorities are 10/20/50 for `mx.zoho.com.`, `mx2.zoho.com.`, and `mx3.zoho.com.`. Apex SPF is `v=spf1 include:zohomail.com ~all`; `zmail._domainkey` is Zoho's verified account-specific DKIM selector. `_dmarc` is `v=DMARC1; p=none; rua=mailto:dmarc@aro-club.app`. Keep one SPF TXT per hostname and move DMARC to enforcement only after both sending paths pass message-level checks.

## Remaining verification

- Inspect message-level SPF/DKIM/DMARC results. Zoho already verified MX/SPF/DKIM; hello and support two-way mail plus notifications and info inbound passed. The DMARC reporting alias has not yet received a report.
- Review the Zoho administrator's MFA enrollment and recovery details with the founder. Zoho Accounts requires fresh identity verification for the security page; this package did not alter credentials or security methods.
- Provide a live N1 staging deployment, then update Supabase's Site URL and exact callback allow list together. The current allow-listed deployment returns HTTP 410.
- Signup and recovery templates were delivered through Supabase Staging → Resend → the founder-controlled Zoho inbox. The links were not followed because the configured callback deployment returns HTTP 410. One unconfirmed disposable Auth user remains in staging; remove it or use it for later end-to-end checks when N1 has a live callback.
- Keep production Supabase Auth and the website launch outside this package. Repeat the Auth configuration and checks for production only under its own release approval.

## Rollback

If Zoho incoming delivery fails, compare its new apex MX/SPF/DKIM against the Zoho admin instructions. Remove only the new Zoho entries if a rollback is necessary; the baseline had no apex MX/SPF/DMARC, and the Resend `send` records must stay. If staging Auth delivery fails, disable custom SMTP in Supabase Staging and restore the previous default confirmation/reset templates; rotate or remove the dedicated Resend key if compromised. This does not affect production.
