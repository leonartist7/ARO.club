# ARO-SEC0 — Repository Secret Hygiene

## Status

**Active-tree remediation refreshed from current `main`; live Supabase audit completed; founder history decision and selected provider hardening remain before SEC0 can close.**

This package removes the tracked local `.env` file from the active Git tree without intentionally printing, copying, or recommitting its contents. It deliberately does **not** rewrite Git history.

A live Supabase security review was also performed against the connected Tonguee project using metadata/advisory queries only.

---

## Changes in this package

- `.env` removed from Git tracking on a branch created from current `main`.
- `.gitignore` now ignores `.env` and all `.env.*` variants while explicitly preserving `.env.example`.
- `.env.example` remains the onboarding template; real values must remain outside Git.
- No runtime, schema, RLS, route, payment, dependency, UI, or product behavior changed by this Git package.

---

## Credential classification from live provider review

The currently active Supabase client credential is a **legacy anonymous/publishable client key**, not a server/service-role secret. Client publishable keys are intentionally distributable to browsers, but their safety depends on correct RLS, grants, Auth, Storage and API configuration.

No server/service-role credential is authorized to live in Vite/browser configuration.

A future maintenance step should migrate the application to Supabase's modern publishable-key format when convenient, but that is not by itself a reason to block P1 if the data boundary is correct.

Do not record actual credential values in this report, commits, issues, PRs or chat.

---

## Live Supabase audit findings

### Confirmed protections

- RLS policies exist on key legacy tables.
- Anonymous queries against `bookings`, `notifications`, and `contact_messages` returned no rows under the current policies during the audit.
- Existing owner checks use `auth.uid()` for several private-user paths.

### Security warnings requiring hardening / explicit review

1. **Legacy public profile boundary is too broad for new ARO private data.**
   - Anonymous clients can currently read existing `profiles` rows.
   - The legacy profile row contains fields beyond a minimal public identity surface, including account/contact and product-state fields.
   - **Decision:** P1 must never store goals, capabilities, intent, availability, financial information or future private Opportunity Graph inputs in `profiles`.
   - P1 uses dedicated owner-only private tables instead.
   - A separate legacy-profile public/private boundary hardening package should be scheduled before broader platform launch.

2. **Trigger/signup function API exposure.**
   - `public.handle_new_user()` is `SECURITY DEFINER` and Supabase reports it as executable through exposed API roles.
   - Direct RPC execution should be revoked from public browser roles while preserving its auth trigger behavior.

3. **Mutable function search paths.**
   - Supabase flags `handle_new_user`, `handle_updated_at`, and `update_updated_at_column` because their function search paths are not pinned.
   - These should receive explicit safe `search_path` settings in a reviewed database hardening migration.

4. **Broad GraphQL/API table discoverability.**
   - Supabase reports several public-schema tables as discoverable to `anon` / `authenticated` roles because of broad table grants.
   - RLS blocks rows for some private tables, but unnecessary grants/discoverability should be reduced in a dedicated compatibility-reviewed hardening package rather than changed casually.
   - Public marketplace data such as published experiences, teachers and reviews may intentionally remain readable; private tables should be reviewed separately.

5. **Leaked-password protection is disabled.**
   - Enable Supabase Auth leaked-password protection in provider settings before production-scale onboarding.

### Why these findings do not change the P1 data design

They reinforce it. P1's Goal and Capability records must be new private tables with explicit owner-only RLS and must not inherit the legacy `profiles` public-read model.

---

## Security rules

1. Never paste environment values into GitHub issues, PR bodies, commits, docs, or chat.
2. Any server secret found historically must be rotated immediately and moved to provider/deployment secret storage.
3. Client-visible identifiers/keys still require correct RLS, grants, Auth/Storage policy and origin configuration.
4. Git-history rewriting is a separate coordinated decision because it changes commit IDs and affects every clone/branch.
5. Never weaken RLS to compensate for a UI/data-access bug.

---

## Remaining founder/provider decisions

### A. Git history

Choose one and record it without secret values:

- **Accept history risk** — recommended when historical values are client-publishable identifiers/keys and live provider security is hardened; old commits remain.
- **Coordinated history cleanup** — only if a true server secret or unrestricted sensitive credential was historically committed, or policy requires removal; requires explicit founder approval and a clone/branch recovery plan.

No history rewrite is performed by this package.

### B. Auth provider setting

Enable leaked-password protection in the Supabase Auth dashboard before production-scale onboarding.

### C. Legacy public-profile boundary

Approve a follow-up security package to separate public profile presentation from private account/product state instead of attempting a risky ad-hoc policy change during SEC0.

---

## Verification checklist

- [x] `.env` removed from active branch tracking without intentionally exposing its values in documentation.
- [x] `.gitignore` covers `.env` and `.env.*` while preserving `.env.example`.
- [x] Historical Supabase credential classified as client-publishable rather than service-role/server authority.
- [x] Live Supabase security advisors reviewed.
- [x] Anonymous row visibility checked for core private legacy tables without reading private row contents.
- [x] P1 private-table architecture confirmed necessary.
- [x] No application runtime/schema changes included in this Git PR.
- [ ] Git-history decision recorded by founder.
- [ ] Leaked-password protection enabled or explicitly accepted as a temporary blocker/risk.
- [ ] Security gate explicitly closed or residual risk explicitly accepted.

---

## Gate

**ARO-P1 runtime implementation remains blocked until the three unchecked items above are resolved.**

P1 specification/audit work may proceed because it does not require environment values or runtime schema changes.

After SEC0 closes, P1 should still run a live pre-migration schema/RLS check and create only private owner-scoped tables according to `specs/ARO-P1-CAPABILITY-GOAL.md`.
