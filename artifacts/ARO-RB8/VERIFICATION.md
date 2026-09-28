# ARO-RB8 — Shared supporting states evidence

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb8-supporting-states-20260928`, stacked on RB7. Not merged or released.

## Changed

- Replaced the unstyled global route-loading text with a branded, screen-reader announced status in EN/FR/ES. Motion stops under reduced-motion preference.
- Replaced the unstyled global error boundary with a localized message, working boundary retry callback and public Home link. The language hook has a safe English fallback when the provider is unavailable.
- Reused the controlled SVG wordmark and brand tokens. No generated assets, account data writes or new runtime destinations were added.

## Evidence

Rendered in the production build through temporary visual fixture routes, removed before commit: [320px dark French loading](loading-state-320-dark-fr.png), [390px light Spanish error](error-state-390-light-es.png), [1440px dark English error](error-state-1440-dark-en.png). All returned 200 with no page exceptions or horizontal overflow; see [browser matrix](browser.json). The fixture routes are absent from the final build.

The component interaction test covers EN/FR/ES, retry callback, Home destination, loading announcement and context fallback. Final build, ESLint and `npm run type-check` pass after fixture removal. The full Vitest suite passes: 20 files, 179 tests, 3 skipped. The local full browser suite passes all 25 checks. Its route sweep now opens each route in a fresh page, waits for the exact Login destination on protected routes, and does not count a loading status as completed content; this resolves the `ERR_ABORTED` transition race without relaxing the access assertion. `git diff --check` passed.

## Limits

The screenshots verify rendering of the actual state components inside the app shell and providers. They do not demonstrate a real production exception, network outage or successful retry. Root HTML Suspense fallback remains an English boot message before stored language is available; live route loading uses the localized state. The inherited hosted platform check still fails at the teacher-onboarding language skip step; a local 360px reproduction of that choice/skip interaction passed, but no hosted root cause is established. Auth, privacy, payment, F7 and release boundaries are unchanged.

## 2026-09-28 cloud continuation

Inherited RB7's bounded layout/preference repair through normal merge ancestry; no RB8 loading/error behavior changed. The earlier Limits paragraph describes the original baseline: the hosted root cause is now established as fixed-height onboarding card overflow intercepted by the footer. RB7 platform runs 36406677640 and 36407355888 passed after the minimum-height repair. See [retained diagnosis and visual evidence](../ARO-RB7/VERIFICATION.md#retained-hosted-evidence-cloud-continuation). Exact descendant HEAD checks remain required before merge; this does not promote RB8 to VERIFIED/SHIPPED or close independent gates.

## Reviewed upstream reconciliation — 2026-09-28

Merged RB7 c7dfd8f (reviewed RB6 8799e78 plus preserved cloud preferences/layout work) without conflicts. RB8 supporting-state changes and historical evidence remain intact. New-head hosted checks are required; previous green runs do not certify this merge. RB2 independent privacy/security review and RB5 SPEC-REQUIRED contact-draft privacy review remain blocking; conversations are left open. No main merge or release.

Corrected handoff: inherited RB7 f7b88e5 with founder-specified RB6 95ec421 and the upstream navigation tests. Runtime unchanged by this correction; hosted rechecks and all previously recorded gates/blockers remain required.

Latest review-copy handoff: inherited RB7 1c9731c on exact RB6 5e22dcc. The incoming distinct formation-preview copy and refreshed RB3 evidence are preserved alongside RB8/cloud work. New-head checks remain required; RB5 stays SPEC-REQUIRED pending independent retention/deletion privacy review, and RB2's independent gate stays open.

Protected-route repair handoff: inherited RB7 573afa4 on exact RB6 1c4c2a1. Incoming reserved teacher-route exemptions preserve existing Auth guards; RB8/cloud work remains intact. New-head hosted checks and independent RB2/RB5 review gates remain required. No approval or release.

### RB6 2ea1fed / local Manrope stack reconciliation — 2026-09-28

Merged updated RB7 `2e3b03894cd15f586c33d172e396e9958af84a97` into prior RB8 `29e162df0c76f793f53faae6558e139bf1351b15` without conflicts, retaining RB8 state presentation and prior cloud fixes/evidence. Exact RB6 base is `2ea1fede95d9bf83a7ef14bca3a8f9bfc6a48bcd`, including main 721b2b7 / PR #83 local Manrope and lower-stack review repairs. No F7 evidence changed. Hosted checks on this new head are required; preceding green runs and screenshots are historical. Final integrated verification is recorded in the RB10 implementation ledger. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED draft retention/privacy, independent review and release gates remain open. No protected merge or release claim.

### Final RB6 8a8e5e2 reconciliation — 2026-09-28

Merged RB7 `0016b1f649435a46a4919ef1f3ed6c93c482ef58` without conflict, incorporating exact RB6 `8a8e5e2a9dbc325675f91f2466545f9955df4c2e`. Incoming differences from 2ea1fed are confined to two RB6 verifier waits and owner evidence/screenshots. Runtime and cloud work are unchanged; previous combined-source local tests remain applicable, while new-head hosted checks and all privacy/Trust/independent-review/release gates remain open. No F7 evidence changes.

### RB6 ff1c7b6 reconciliation — 2026-09-28

Merged RB7 `b4d8d9e01cbc96eba0c3ad510738c143022f4ab2` without conflict, preserving RB8 presentation and cloud evidence. Exact lower base is `ff1c7b65cc23958b66754f0d75faffae736a7e7d`; incoming runtime scope is the RB3 composition focus ring, with its capture assertions and RB1/RB2/RB6 contract repairs. Prior RB8 0494289 passed Quality 36451818787 and isolated 36451819101; this merge requires fresh hosted checks. Final local checks are recorded in the RB10 ledger. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED draft retention/deletion privacy, independent review and release gates remain open. No protected merge, F7 change or self-approval.

### RB6 13e2571 reconciliation — 2026-09-28

Merged RB7 `7c82ccf27e3836cead0c44f6f7c9367b59ef0551` without conflict, preserving RB8 supporting states and cloud work. Exact lower base is `13e257107b5726e911210a1eb8048ce3d42143ac`; localized shell/44px targets, dark-safe text, local font provenance and RB2 short-screen/host-boundary repairs are inherited. New-head checks remain required; prior source 860c33a passed Quality 36454753803 and isolated 36454753636. Final local verification is recorded in the RB10 ledger. RB2 privacy/Trust, RB4 Trust, RB5 SPEC-REQUIRED draft-retention/privacy, independent review and release gates stay open. No protected merge or F7 evidence change.

### Superseding RB6 327c681 selector repair — 2026-09-28

Verified exact remote RB6 `327c6812f390a726b885dfda06fc9524d66a6cb2`. Its only diff from 13e2571 is the AppReturn heading selector and final newline, already present in cloud. Merged updated parent `cc0a5ebda2657cc7ddbee28e031ddd8d3da0e4a6` without conflict; no additional runtime or test behavior change. Prior combined-source 187-test/build/lint/type evidence remains applicable; fresh hosted checks on this new ancestry remain required. Existing cloud work, PR ownership and all RB2 privacy/Trust, RB4 Trust, RB5 SPEC-REQUIRED contact privacy, independent-review and release gates are preserved. The separate platform chooser failure is not declared fixed.

### RB6 9eb4e15 review repair reconciliation — 2026-09-28

Verified exact remote RB6 `9eb4e15d2435eb08787a0b8db10ae601987f5053` and merged updated parent `362787a070fdd856dba8cbdd5530a5d17b41055f` without conflict. New adult public-room language-practice art and RB5 usage, early nonpersistence notice, preference CTA in normal flow, and required-CI six-path RB2 verifier are preserved alongside existing cloud work. Prior pottery originals/exports remain provenance only; no runtime reference to the superseded art remains in the reviewed consumers. Owner reports lint/type/pinned-export/six-browser-case passes, but its broad Windows dev E2E run stopped at /passport with OOM and is not a pass. Final cloud integrated checks and limits are recorded in RB10's ledger; this merge needs fresh hosted checks. RB2 privacy/Trust, RB4 Trust, RB5 SPEC-REQUIRED contact retention/privacy, independent review and release gates stay OPEN. No F7 evidence change, protected merge or self-approval.
