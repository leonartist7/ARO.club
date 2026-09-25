# ARO-EMAIL0 — Domain mailbox and staging Auth email

## 0. Metadata

- **Status:** IN-PROGRESS (founder-approved specification; staging SMTP configured, mailbox pending)
- **Spec version:** 1.0.0
- **Owner/director:** Founder; approved implementation request on 2026-09-25
- **Implementation branch:** `codex/email-setup`
- **Depends on:** I0 isolated staging; N1 staging email/password flow
- **Blocks:** Hosted N1 email and recovery verification
- **Governing docs:** `AGENTS.md`, `ARO_INFRASTRUCTURE.md`, `ARO_BUILD_PLAYBOOK.md`, `ARO-N1-NEXTJS-PLATFORM.md`
- **Required reviewers:** Founder for provider/account ownership; independent security review before merge
- **Last updated:** 2026-09-25

## 1. Problem and outcome

The new `aro-club.app` domain can send through Resend, but it has no incoming mailbox. ARO staging still uses Supabase's default Auth sender. The founder needs an ordinary inbox for business correspondence and reliable staging signup/recovery messages.

## 2. Locked scope and decisions

- Use Zoho Mail's free EU plan if available. Create one `hello@aro-club.app` mailbox with `support@` and `notifications@` aliases; enable sending as `support@`. Do not buy a plan without a new price approval.
- Use Zoho for incoming business mail and Resend for Supabase Auth sending. Resend receiving stays disabled. Do not add a public mail API, inbox UI, database schema, or marketing mail.
- Preserve the existing Resend DKIM and `send` subdomain SPF/MX records. Add Zoho's exact region/account-specific verification, MX, SPF, and DKIM records to Vercel DNS. Use one SPF record per hostname. Start DMARC at `p=none` with an aggregate-report alias, then enforce only after both sending paths pass authentication.
- Configure only the isolated `mibydnerayobemhnlfyl` staging Supabase project. Use `ARO <notifications@aro-club.app>` with Resend SMTP and a dedicated sending-only key restricted to `aro-club.app`. Keep the secret out of Git, browser bundles, evidence, and chat.
- Preserve the current exact staging Site URL and two callback allow-list entries unless the deployed N1 preview changes; match redirects to the actual deployed branch before end-to-end tests. Do not touch Tonguee or production Auth.
- The founder completes Zoho personal registration, password, terms acceptance, recovery setup, and MFA. Agents may finish domain/mail configuration after account access exists.

## 3. Interfaces and security

No application API or schema changes. The public email addresses are `hello@aro-club.app`, `support@aro-club.app`, and `notifications@aro-club.app`. Supabase remains the authority for Auth tokens and expiry. Email templates may use Supabase's `{{ .ConfirmationURL }}` link, with ARO branding and support contact, without exposing tokens in logs or evidence. No credentials are stored in the repository.

## 4. Verification and rollback

| Criterion | Evidence |
|---|---|
| Zoho receives mail at `hello@` and `support@`, and replies from both identities | External test messages and mailbox sent/received state, with personal content redacted |
| Zoho and Resend DNS coexist; SPF, DKIM, and DMARC pass for each sending route | DNS snapshot and message authentication results |
| Staging signup confirmation and password reset complete at the allow-listed callback | Disposable test account, browser flow, Supabase Auth and Resend delivery status |
| Replies to Auth email arrive in Zoho | Redacted reply test |
| Production and Tonguee configuration remain unchanged | Provider audit and Git diff |

If incoming delivery fails, restore the recorded prior apex MX/SPF state and correct Zoho records. If Auth delivery fails, disable staging custom SMTP and restore the prior template configuration; retain the domain mailbox. Remove/rotate the dedicated Resend key if exposed. Record actual provider state and outstanding checks in `artifacts/ARO-EMAIL0/VERIFICATION.md`.
