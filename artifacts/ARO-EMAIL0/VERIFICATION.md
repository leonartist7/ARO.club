# ARO-EMAIL0 verification — 2026-09-26

## Baseline

- Resend `aro-club.app`: verified, sending enabled, receiving disabled; no webhooks. DKIM and `send` subdomain SPF/MX verified.
- Vercel nameservers: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`. Domain is connected to Vercel project `aro-club`; its website deployment state is separate from this email package.
- Before mailbox setup, public DNS had no apex MX, apex SPF, or `_dmarc` TXT. Existing visible Vercel records are Resend DKIM, `send` SPF, and `send` MX.
- Public DNS snapshot before Zoho changes (2026-09-25):

  | Host | Type | Value | Vercel TTL |
  |---|---|---|---:|
  | `resend._domainkey` | TXT | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMR7+CTmO6M1jQwXZMO9Dp+jDo37y7fimyiyqPinTbPZMmiypzkNfjQrG1TzFjWdzGOAIULgYpTY5/hMeAyiOVWDahXMZASJ6I6qwQvdl4PWMJv77y0w0EJtaM060hq6BbKK899K2UdArNL5z/NwyW9HoaSHo1/oVtFTvyhp1blQIDAQAB` | 3600 |
  | `send` | TXT | `v=spf1 include:amazonses.com ~all` | 3600 |
  | `send` | MX | `feedback-smtp.eu-west-1.amazonses.com.` priority 10 | 3600 |
- Supabase `ARO.club Staging` (`mibydnerayobemhnlfyl`): custom SMTP disabled. Default confirmation and reset templates are in use. Site URL is `https://aro-club-git-codex-nextjs-vercel-rollout-lionovart.vercel.app`; the allow list has exact signup and password-reset callback URLs at that host.
- No credentials or test-recipient details are recorded here.

## Implemented provider settings

- Resend sending-only key `ARO Staging Auth SMTP` is restricted to `aro-club.app`. The one-time value was entered into Supabase Staging without being written to Git or this evidence.
- Resend shows no tracking subdomain for `aro-club.app`; its tracking page offers creation of a new subdomain, which was not submitted. Open and click tracking remain unconfigured for this domain.
- Supabase Staging custom SMTP is enabled and persisted after a page reload: `smtp.resend.com:465`, username `resend`, sender `ARO <notifications@aro-club.app>`, 60-second interval per recipient. Supabase shows an Auth limit of 30 messages per hour.
- Confirmation and recovery templates now use ARO subjects, the built-in `{{ .ConfirmationURL }}` link, a clear unsolicited-request note, and `support@aro-club.app`. Both saves completed; delivery is not yet verified.
- The configured staging Site URL returns HTTP 410 because its Vercel deployment was removed under the retention policy. No callback change was made without a live N1 preview.
- A proposed disposable Auth signup to Resend's test inbox was rejected by automatic approval review because it would send a confirmation token to an external inbox. No request was sent and no test user was created. Use a founder-controlled inbox for Auth token testing.

## Zoho mailbox and DNS — 2026-09-26

- The founder's existing Zoho account reached the admin console. The organization shows **Mail Free**, one active user, and five total licenses. `hello@aro-club.app` is the sole mailbox and superadministrator address. No paid plan was purchased.
- Zoho lists `support@`, `notifications@`, `info@`, and `dmarc@` as aliases of that mailbox. The webmail composer exposes `support@` as a From identity; it was selected and used for a test message.
- Vercel now has the Zoho verification TXT, apex MX records `mx.zoho.com.` (10), `mx2.zoho.com.` (20), and `mx3.zoho.com.` (50), apex TXT `v=spf1 include:zohomail.com ~all`, and `zmail._domainkey` TXT with Zoho's account-specific key. Existing Resend records and Vercel-managed website records were preserved.
- `_dmarc` TXT is `v=DMARC1; p=none; rua=mailto:dmarc@aro-club.app`. The reporting alias was created before the record. Enforcement remains pending authentication checks from both senders.
- A public DNS query against `1.1.1.1` returned all three Zoho MX records, exactly one apex SPF record, Zoho DKIM, and DMARC. The same resolver still returned the original Resend DKIM and `send` SPF/MX records. Zoho's admin console reports MX and SPF for the domain and verified, enabled DKIM for selector `zmail`.
- An external message to `hello@` appeared in the Zoho inbox. A reply from `hello@` arrived in the founder-controlled external inbox. A message sent as `support@` also arrived there; its message details show `mailed-by: aro-club.app` and `signed-by: aro-club.app` over TLS. A reply addressed to `support@` appeared in the same Zoho inbox.
- A disposable signup request against the staging Supabase Auth endpoint targeted the founder-controlled Zoho mailbox. Resend listed the branded confirmation message as **delivered**, and Zoho showed it in the inbox. A recovery request for the same disposable user returned HTTP 200; Resend listed the branded reset email as **delivered**, and Zoho showed it. Neither token link was followed because the configured callback deployment returns HTTP 410. The unconfirmed test user remains in staging for cleanup or later end-to-end verification.
- External messages to `notifications@` and `info@` also reached the Zoho inbox.
- Zoho Accounts requires fresh identity verification before displaying account-security/MFA settings. No credential or MFA setting was changed.

## Acceptance status

| Criterion | Status | Evidence / remaining check |
|---|---|---|
| Zoho mailbox and aliases | IMPLEMENTED / VERIFIED FOR BUSINESS MAIL | One free mailbox plus four aliases; hello and support two-way tests passed, notifications and info inbound passed. DMARC report alias is configured but has not received a report yet. |
| Zoho DNS and DMARC | IMPLEMENTED / PARTIALLY VERIFIED | Public DNS and Zoho MX/SPF/DKIM verification passed; DMARC is monitoring-only. Message-level DMARC and Resend authentication checks remain. |
| Staging Resend SMTP | IMPLEMENTED / BOTH TEMPLATES DELIVERED | Restricted key and saved SMTP settings observed; Supabase signup and recovery messages reached Resend and Zoho. Link behavior remains untested. |
| Signup and reset end to end | BLOCKED | Current allow-listed N1 preview returns HTTP 410; needs a live deployment and disposable account |
| SPF/DKIM/DMARC and reply checks | PARTIAL | Zoho message shows aligned sending/signing domain and both reply directions passed; inspect full message authentication results for both providers. |

## Rollback

Preserve the baseline DNS records above. If Zoho delivery fails, inspect account-specific MX/SPF/DKIM and remove only newly added Zoho entries after recording them. If staging Auth fails, disable custom SMTP and restore the prior default templates. Keep production and Tonguee untouched.

## 2026-09-26 staging Auth follow-up

The founder created a staging account at `support@aro-club.app`. Supabase shows the email confirmed, the user signed in, and a profile row created. The original `{{ .ConfirmationURL }}` message confirmed the address but led to an app callback error, so the user could log in despite that message.

The staging confirmation and recovery templates now use `{{ .RedirectTo }}?token_hash={{ .TokenHash }}` with `type=email` and `type=recovery`, respectively. The N1 app's recovery request now uses `/auth/callback` with no pre-existing query. Resend delivered a new recovery email to the Zoho alias. Its first use opened the reset-password form, and reuse was rejected. The initial local verification attempt failed because the shell sandbox blocked outbound Node requests; the callback worked after the local staging server was restarted with network access. No password was changed during this test. Fresh signup confirmation, a password-change/login cycle, hosted deployment, and role-aware app behavior remain open; see `artifacts/ARO-N1/AUTH-SETUP-20260926.md` in the N1 checkout for the detailed checkpoint.
