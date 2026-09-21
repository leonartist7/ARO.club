# Production readiness — 2026-09-21

Production release is authorized; it has not been performed. N1 rollout v1.2 covers this preparation.

## Applied and verified
- Supabase dashboard session verified for lionovart's Org.
- Staging Site URL changed from localhost:3000 to the dedicated codex/nextjs-vercel-rollout Vercel branch alias.
- Saved two exact staging callback entries: `/auth/callback` and `/auth/callback?next=/auth/reset-password`. No wildcard redirect was added.
- Production account configuration now requires an explicit activation flag and a separately selected project ref matching the public backend URL. Known staging, quarantined and unrelated refs are rejected. Preview remains staging-only; missing or mismatched configuration denies access.
- Local lint, TypeScript, production build and eight focused account-boundary/callback tests pass.

## Provider gates observed directly
- Only ARO.club Staging is active. New isolated production project is not provisioned; the connector requires the user to select its organization and confirm the quoted cost. Organization selection was requested.
- Custom SMTP is disabled. The default Supabase sender is restricted to team addresses and is not production email delivery. No email provider appears among existing Vercel integration resources. A verified sending domain and SMTP provider must be connected before public signup/recovery can pass.
- Vercel AI Gateway still shows Get Started / Add a Card for identity verification. OIDC is enabled, but no generation or billing activation is claimed.
- Existing security repair PRs #51–53 remain draft and unmerged. Their Trust/RLS changes need reconciliation, regression evidence and the required independent review before live sensitive workflows.
- Production still serves the previous Vite deployment; PR #54 is the Next.js rollout candidate. Prior migration CI and hosted parity evidence is in VERIFICATION.md. Do not confuse those passes with a completed production cutover.

## Activation sequence
1. Select organization, quote/confirm project cost, create an isolated production backend.
2. Review and provision the authoritative schema/roles/RLS with append-only migration evidence; never copy staging accounts or fictional data.
3. Configure verified SMTP and exact production Site URL/callback URLs; test confirmation, recovery, expiry, login persistence and logout with synthetic accounts.
4. Configure Production-scoped public URL/key/ref and activation only after evidence passes. Build for Production; do not promote a staging-compiled preview.
5. Pass required CI and independent security review, release, and verify the public origin including direct `/app` loads and protected routes. Retain the previous deployment for rollback.

Reference: https://supabase.com/docs/guides/auth/auth-smtp
