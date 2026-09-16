# I0.2 R7 / UX0 authenticated-browser CI amendment — proposed

**Task ID:** B1B-I02-R7-authenticated-CI-mode  
**Status:** PROPOSED — a founder safety/product-boundary decision is required before implementation  
**Prepared:** 2026-09-16  
**Blocked task:** B1-I02-repair-within-contract, draft PR #51 at `998b39b7fc9af32d632882442a53dad47e8710ce`

## Problem reconciled

I0.2 requires real authenticated browser proof of the persisted applicant journey. The current source deliberately hard-codes UX0 prototype mode: `src/config/ux0.js` sets `UX0_PROTOTYPE_MODE = true`; `tools/ci/browser.mjs` returns after prototype-boundary checks when that value is true. Its compile consequently fails closed for Auth and protected onboarding.

The hosted CI result was successful but only preserved four prototype-boundary screenshots. Treating that as the required R7 journey would fabricate evidence. The B1 packet does not own the UX0 gate or a test-mode configuration path.

## Proposed decision

> Authorize a **disposable-CI-only authenticated browser compile mode** for I0.2 verification. It may disable UX0 prototype mode only when both (a) a dedicated CI compile marker is supplied by the owned disposable browser runner and (b) the app is executing at a loopback origin. In every other source/preview/production/deployed context, UX0 prototype mode remains true and Auth/protected routes remain fail-closed.
>
> The test mode may use only the local disposable Supabase instance. It may not be deployed, published, measured as F7, used with real accounts/providers/secrets, or treated as proof of hosted I0/Q0 readiness.

This is intentionally a narrow test-integration decision, not approval to turn on real authentication or change preview/production behavior.

## Exact proposed ownership and allowlist

One writer on a new branch after approval may change only:

1. `src/config/ux0.js` — fail-closed default plus the two-part disposable-CI/loopback condition;
2. `tools/ci/browser.mjs` — invoke the real authenticated applicant journey only under that condition, retain redacted synthetic evidence and negative-path proof;
3. `tools/ci/run.mjs` — pass the dedicated marker only to the local browser process and require named R7 evidence;
4. `tools/ci/supabase/tests/application.test.sql` — only if an additional R7 contract assertion is essential; otherwise unchanged.

No workflow, Vite config, dependency, provider setting, external environment, historic migration, F7 path, status registry or product route may change. The existing B1/PR #51 files are read-only until a new claim is recorded.

## Required implementation contract

- A build marker alone is insufficient: the client must also be on loopback. A preview/production host remains prototype-only even if an environment value is present.
- The runner may set the marker only in its disposable child process; it must never print a credential or configured local URL.
- Login and onboarding use synthetic local credentials only.
- The actual tested flow must prove: onboarding creates/updates a draft; the document surface appears before explicit submit; first document collection happens while editable; explicit submit persists status and a non-client server timestamp; a deliberately induced upload/metadata failure surfaces a visible failure and retry succeeds without false success.
- Retained artifact names must identify the authenticated synthetic journey and viewport/theme, not `prototype-boundary`.
- Existing UX0 prototype-boundary coverage, RLS/Auth/Storage, reset/cleanup and no-client-money checks remain mandatory.

## Acceptance, review and stop rules

- Run `node --test tools/ci/boundary.test.mjs`, the focused unit/component suite, full lint/test/build, and disposable hosted `node tools/ci/run.mjs` plus cleanup.
- The artifact must be independently retrieved, digest-verified and contain the named authenticated-journey evidence. Green CI without that evidence is not a pass.
- A separate non-writing security/privacy/Trust reviewer reviews the finished immutable B1/B1B diff only after all evidence is present. I02-08 remains NOT PASS unless that reviewer explicitly accepts it.
- Stop for any non-loopback enablement, unlisted file, workflow/provider/secret change, real account/data, missing redacted evidence, or a third B1 repair cycle.
