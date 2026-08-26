# ARO-SEC0 — Repository Secret Hygiene

## Status

**Active-tree remediation refreshed from current `main`; founder/provider review still required before SEC0 can close.**

This package removes the tracked local `.env` file from the active Git tree without reading, printing, copying, or recommitting its contents. It deliberately does **not** rewrite Git history.

Because environment values existed in Git history, provider-side review is still required before ARO-P1 runtime work begins.

---

## Changes in this package

- `.env` removed from Git tracking on a branch created from current `main`.
- `.gitignore` now ignores `.env` and all `.env.*` variants while explicitly preserving `.env.example`.
- `.env.example` remains the onboarding template; real values must remain outside Git.
- No runtime, schema, RLS, route, payment, dependency, UI, or product behavior changed.

---

## Security rules

1. Never paste environment values into GitHub issues, PR bodies, commits, docs, or chat.
2. Any server secret found historically must be rotated immediately and moved to provider/deployment secret storage.
3. Client-visible identifiers/keys still require provider restrictions, quotas, and correct RLS/origin configuration.
4. Git-history rewriting is a separate coordinated decision because it changes commit IDs and affects every clone/branch.

---

## Founder/provider checks required

Without recording any value, confirm the historical environment configuration against the owning provider dashboards:

- Supabase: intended project, Auth redirects, RLS and Storage policies; rotate/restrict anything that is not intentionally client-visible.
- Stripe: confirm no secret key was ever client-exposed; verify test/live mode and restrictions.
- Google Maps / browser APIs: restrict allowed APIs, HTTP origins and quotas; rotate if exposure is broader than intended.
- OAuth providers: confirm authorized origins/redirects; ensure no client secret was present in browser-exposed configuration.
- Any other provider: classify each historical variable as public identifier, client-visible restricted credential, or server secret.

If any server secret or unrestricted billable credential was historically committed, rotate it before broad agent access or production financial work.

---

## History decision

Choose one and record it without secret values:

- **Accept history risk after provider rotation/restriction** — simplest operationally; old commits remain but credentials are invalid/restricted.
- **Coordinated history cleanup** — only if required by the exposure assessment; requires explicit founder approval and a clone/branch recovery plan.

No history rewrite is performed by this package.

---

## Verification checklist

- [x] `.env` removed from active branch tracking without reading its contents.
- [x] `.gitignore` covers `.env` and `.env.*` while preserving `.env.example`.
- [x] No application/runtime/schema changes included.
- [x] Historical exposure risk documented without secret values.
- [ ] Provider rotation/restriction decision completed by founder.
- [ ] History-cleanup decision completed by founder.
- [ ] Security gate explicitly closed or residual risk explicitly accepted.

---

## Gate

**ARO-P1 runtime implementation remains blocked until the three unchecked items above are resolved.**

P1 specification/audit work may proceed because it does not require environment values or runtime schema changes.
