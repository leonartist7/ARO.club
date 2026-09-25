# ARO-EMAIL0 verification — 2026-09-25

## Baseline

- Resend `aro-club.app`: verified, sending enabled, receiving disabled; no webhooks. DKIM and `send` subdomain SPF/MX verified.
- Vercel nameservers: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`. Domain is connected to Vercel project `aro-club`; its website deployment state is separate from this email package.
- Before mailbox setup, public DNS had no apex MX, apex SPF, or `_dmarc` TXT. Existing visible Vercel records are Resend DKIM, `send` SPF, and `send` MX.
- Supabase `ARO.club Staging` (`mibydnerayobemhnlfyl`): custom SMTP disabled. Default confirmation and reset templates are in use. Site URL is `https://aro-club-git-codex-nextjs-vercel-rollout-lionovart.vercel.app`; the allow list has exact signup and password-reset callback URLs at that host.
- No credentials or test-recipient details are recorded here.

## Implemented provider settings

- Resend sending-only key `ARO Staging Auth SMTP` is restricted to `aro-club.app`. The one-time value was entered into Supabase Staging without being written to Git or this evidence.
- Supabase Staging custom SMTP is enabled and persisted after a page reload: `smtp.resend.com:465`, username `resend`, sender `ARO <notifications@aro-club.app>`, 60-second interval per recipient. Supabase shows an Auth limit of 30 messages per hour.
- Confirmation and recovery templates now use ARO subjects, the built-in `{{ .ConfirmationURL }}` link, a clear unsolicited-request note, and `support@aro-club.app`. Both saves completed; delivery is not yet verified.
- The configured staging Site URL returns HTTP 410 because its Vercel deployment was removed under the retention policy. No callback change was made without a live N1 preview.

## Acceptance status

| Criterion | Status | Evidence / remaining check |
|---|---|---|
| Zoho mailbox and aliases | BLOCKED | Existing Zoho account reached through Google sign-in; Zoho requires a recovery mobile number and code before mail onboarding can continue. User input is pending. |
| Zoho DNS and DMARC | BLOCKED | Await Zoho account-specific verification and DKIM records |
| Staging Resend SMTP | IMPLEMENTED / NOT VERIFIED | Restricted key, saved SMTP settings, and branded templates observed; delivery test remains |
| Signup and reset end to end | BLOCKED | Current allow-listed N1 preview returns HTTP 410; needs a live deployment and disposable account |
| SPF/DKIM/DMARC and reply checks | PENDING | Needs live sending and receiving |

## Rollback

Preserve the baseline DNS records above. If Zoho delivery fails, inspect account-specific MX/SPF/DKIM and remove only newly added Zoho entries after recording them. If staging Auth fails, disable custom SMTP and restore the prior default templates. Keep production and Tonguee untouched.
