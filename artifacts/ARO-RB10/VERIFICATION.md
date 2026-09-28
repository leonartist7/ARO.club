# ARO-RB10 — Account entry presentation evidence

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb10-account-entry-presentation-20260928`, stacked on RB9. Not merged or released.

## Changed

- Replaced English-only, Tonguee-specific introductions on Login, Signup and Forgot Password with the ARO promise and EN/FR/ES copy through the existing language context.
- Localized labels, validation, preview-disabled notices, pending and success guidance, with dark-theme text/links and reduced-motion handling. Removed the nonfunctional “Remember me” checkbox. Signup’s email field now shares the existing disabled preview boundary with its other form fields.
- Kept Auth calls, safe return path, provider-supplied errors, callback/recovery logic, link destinations and server gating unchanged. N1 Auth PR #70 remains separately owned.

## Evidence

Before: [320px dark French Login](before-login-320-dark-fr.png), [390px light Spanish Signup](before-signup-390-light-es.png). After: [320px dark French Login](login-320-dark-fr.png), [390px light Spanish Signup](signup-390-light-es.png), [320px dark French Signup](signup-320-dark-fr.png), [390px light Spanish Recovery](forgot-password-390-light-es.png). Additional [desktop Spanish Login](login-1440-light-es.png) and [768px dark English Recovery](forgot-password-768-dark-en.png) captures are included.

The [production-browser matrix](browser.json) covers six 320–1440px cases across EN/FR/ES and light/dark. All routes returned 200 with the expected translated heading and theme, no horizontal overflow, page exceptions or non-GET requests. In preview mode every form input and submit button stayed disabled. Login, Signup, Recovery and legal destinations remained in the DOM. Final build, ESLint, TypeScript and the full Vitest suite passed (20 files, 179 passed, 3 skipped). The full local E2E suite passed all 25 checks, including account fail-closed behavior and protected-route rejection.

## Limits

No backend account creation, sign-in or password email was exercised by this visual package. Live Auth, hosted signup/recovery, callback review, privacy/security review and release remain governed separately. GitHub static, browser-smoke and Vercel preview checks pass for PR #82; the hosted platform lane fails at the inherited `BROWSER_ONBOARDING_LANGUAGE_SKIP_360_LIGHT` step and is not waived by this package.


## 2026-09-28 cloud continuation

The original platform limitation above is superseded by the confirmed RB7 layout repair, inherited through RB8/RB9 without changes to RB10 Auth presentation or backend boundaries. Tested source `add2a418617e435d5a0a1a58085aa53940c1ce96` passes [Quality 36407547820](https://github.com/leonartist7/ARO.club/actions/runs/36407547820) and [platform 36407547856](https://github.com/leonartist7/ARO.club/actions/runs/36407547856). Local build/lint/type checks and 184 unit tests pass (3 existing browser-gated skips). Hosted browsers provide the visual/interaction evidence because this container cannot start Chromium. See [RB7 retained screenshots/results](../ARO-RB7/VERIFICATION.md#retained-hosted-evidence-cloud-continuation) and [updated ledger](../../docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md). The final evidence-only merge must still pass its own required checks; independent reviews, live eligibility specification and release remain open. No VERIFIED/SHIPPED claim.


## Reviewed upstream reconciliation — 2026-09-28

Merged reconciled RB9 f95ed1b in order, retaining original cloud RB10 e272fcc and reviewed RB6 8799e78 ancestry. Account-entry source and cloud evidence remain preserved. Updated ledger records conflict decisions, exact incoming heads, stale upstream test diagnosis, PR #84 ownership and both independent-review gates. New-head hosted checks are pending, and historical green runs must not be represented as current acceptance. No main merge, release or VERIFIED/SHIPPED claim.

Local reconciliation checks: production build, lint with zero warnings, type check and 185 unit tests pass (3 existing browser-gated skips). `git diff --check` passes. RB10's additional changelog conflict was resolved by retaining both cloud and reconciliation entries. No new visual acceptance is claimed from this integration-only task.

Post-publish hosted checkpoint: GitHub reports #79–#82 conflict-free. RB7 platform 36436884165 fails at BROWSER_ONBOARDING_DRAFT_CREATE_REQUEST_360_LIGHT; the incoming RB4 proxy guard collides with the reserved /teacher/application Auth route. Initial SQL/Auth/Trust checks and cleanup pass. See the implementation ledger for exact source diagnosis and RB4/Auth owner action. This is not a green integration acceptance; independent review gates remain.

Additional RB7 hosted result: 32 browser component checks and Preferences matrix pass; E2E has 22 passes and 3 failures (reserved /teacher/dashboard Login redirects, plus an ambiguous duplicate French provenance-text locator). These are recorded in the ledger for upstream owners; no protected-access assertion is weakened and no authenticated exposure is inferred from a missing redirect alone.


Corrected handoff: propagated RB9 b66368a, incorporating founder-specified RB6 95ec421 and upstream navigation tests exactly. Runtime is unchanged from reconciliation source 7f9eb6e; targeted tests pass (15 passed, 1 existing browser-gated skip). Prior test counts include the equivalent cloud assertion split into two tests; upstream combines them into one. Reserved-route/provenance failures and independent gates remain; new hosted checks are required.


### Latest RB6 5e22dcc handoff

Inherited RB9 3c991c7 with exact founder-specified RB6 5e22dcc. The RB3 distinct formation-preview copy and refreshed evidence are incorporated without conflicts. Account-entry source, cloud preference/layout repairs and retained evidence remain preserved. Hosted confirmation is pending; the teacher-route collision is unchanged. RB5 remains SPEC-REQUIRED pending independent retention/deletion privacy review, with RB2 independent review also open. No main merge or release.

Local verification of the integrated source: production build, lint with zero warnings, type check and 184 unit tests pass (3 existing browser-gated skips). Cloud Preferences, legacy onboarding height repair, diagnostics and committed cloud screenshots have no diff from prior RB10 6239274. Hosted new-head checks remain required.


### Latest RB6 1c4c2a1 protected-route handoff

Inherited RB9 a6ba481 with exact founder-specified RB6 1c4c2a1. The incoming proxy repair preserves reserved teacher-account routes and their existing Auth guards. Both prior integration defects now have source fixes; new-head hosted confirmation is still required. Cloud account-entry/preferences/layout work and historical evidence remain preserved. RB5 stays SPEC-REQUIRED pending independent retention/deletion privacy review, and RB2 independent review stays open. No protected merge or release.

Local integrated verification: build, lint with zero warnings, type check and 184 unit tests pass (3 existing browser-gated skips). Production HTTP inspection: /teacher/dashboard and /teacher/application return streamed HTML with Next's Login meta redirect and NEXT_REDIRECT marker, preserving their encoded next destinations; /teacher/not-a-teacher returns 404 and /teacher/t1 returns 200. The initial status-only redirect probe expected a 3xx and failed because Next streamed status 200; inspecting the redirect markup established the framework behavior. This response-level check is not authenticated browser acceptance; hosted browser/platform confirmation remains required. No diff to cloud Preferences, legacy-card height repairs, diagnostics or retained cloud screenshot hashes.


### Hosted source checkpoint — 2026-09-28

RB10 source `7b458017457d28b9019153dbd972f7d7756c15e1` passes Quality run 36441081849 and Isolated database run 36441081371. This confirms the combined source in hosted checks; it does not close RB7/RB9 intermediate failures, independent reviews or RB2/RB5 specialist gates. The ledger records the full current matrix and founder-reported fresh re-review requests. This follow-up changes documentation only; new-head CI is separate.


### 2026-09-28 — RB6 2ea1fed and local Manrope propagated

RB7–RB10 incorporate exact RB6 `2ea1fede95d9bf83a7ef14bca3a8f9bfc6a48bcd`, including main 721b2b7 / PR #83 local Manrope. Normal merge ancestry preserves cloud work and F7 evidence. The Header resolution retains compact real account destinations and RB7's future-only link omissions. Final local build/lint/types pass; 185 tests pass with 3 existing skips. Production font HTTP/hash checks pass; fresh visual recheck is blocked by invalid Chromium downloads and remains pending with new-head hosted CI. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED draft-retention/privacy, independent review and release gates remain open. PR #84 stays with its owner and needs reconciliation onto the latest RB10; its earlier green checks are not integration approval. Exact sources, checks and limits: docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md.

This merge preserves prior RB10 `601545c10a6aed2e938e0defe94d9aee5e8eb628` and incoming RB9 `af6796b3326f95892d2b32165cb1e17b528dffb3`. Font HTTP evidence: [reconciliation-2ea1fed/font-http.json](reconciliation-2ea1fed/font-http.json). No prior screenshots were regenerated or overwritten.

Post-publication source `2a50454a70480142fff90eab13ab7e00b84fe5f5` is remotely confirmed. Current RB7 Quality passes but isolated run 36450917657 fails `BROWSER_DOCUMENT_RETRY_CHOOSER_360_DARK`; cleanup passes. RB6 both workflows and RB8 isolated pass; remaining hosted checks are pending. See the implementation ledger checkpoint for exact sources and limitations. This is not release approval.


### 2026-09-28 — Final RB6 8a8e5e2 handoff

RB7–RB10 now incorporate exact RB6 `8a8e5e2a9dbc325675f91f2466545f9955df4c2e`, superseding 2ea1fed. Only RB6 verifier waits and owner screenshots/evidence changed; tested runtime, local Manrope and cloud work are preserved. Fresh hosted checks are running, not accepted. Prior teacher-document chooser failures are not declared fixed. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED retention/privacy, independent-review and release gates remain open; PR #84 needs owner reconciliation on latest RB10. Details and exact source/check provenance: docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md.


### 2026-09-28 — RB6 ff1c7b6 review repairs propagated

RB7–RB10 incorporate exact RB6 `ff1c7b65cc23958b66754f0d75faffae736a7e7d` with normal conflict-free ancestry. RB1/RB6 presentation contracts, corrected RB2 dependency wording and RB3 composition focus-ring/capture repairs are preserved; cloud work and branch ownership remain intact. All four previous cloud heads passed both hosted workflows; fresh merge-head CI remains required. RB5 stays SPEC-REQUIRED and unmerged pending independent on-device Contact draft retention/deletion privacy approval. RB2 privacy/eligibility, RB4 Trust, independent review and release gates remain open. No F7 evidence change or self-approval. See docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md for exact sources, test evidence and limitations.


Cloud combined-source verification for the ff1c7b6 reconciliation: production webpack build, lint, type-check and 185 unit tests pass (21 files; 3 existing browser-gated skips). The first build stopped on stale `.next` output with ENOTEMPTY; moving generated output aside allowed a clean successful build, without dependency/config changes. The incoming capture script passes syntax validation; no cloud browser run is claimed. New RB7 Quality 36454702561 / isolated 36454702546, RB8 36454753803 / 36454753636, RB9 36454799395 / 36454799423 are in progress; fresh RB10 runs are required after publishing this merge.
