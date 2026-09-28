# ARO-RB7 — Preferences and navigation evidence

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb7-preferences-navigation-20260928`, stacked on RB6. This branch is not merged or released.

## Changed

- Replaced persistent public and onboarding language/theme buttons with one Preferences control. Phone public controls are inside the scrollable menu; keyboard Escape returns focus.
- Added full language names, Light/Dark/System choice, stored preference recovery and device-theme changes. Existing `theme` and `conversa-language` storage keys remain.
- Made app Settings language/appearance controls functional and translated shared app navigation and semantic labels.
- Removed the duplicate public bottom navigation and future-only Games/Leaderboard account-menu entries. Direct URLs remain intact.

## Evidence

Before: [RB5 public About at desktop width](../ARO-RB5/about-1440-dark-fr.png). After: [desktop Preferences](about-preferences-1440-dark-es.png), [phone Home](home-320-light-en.png), [phone menu](menu-320-dark-fr.png), [onboarding](onboarding-preferences-390-light-es.png), [app Settings](app-settings-768-dark-fr.png).

Production-build browser checks: `node scripts/verify-rb7.mjs` on 320×620 EN/light → FR/dark and reload; 1440×900 ES/dark → System/light; 390×844 onboarding EN → ES; 768×900 app Settings FR/light → dark. All four routes returned 200, with no horizontal overflow, page exceptions or non-GET requests. Public bottom tabs were absent. Focus returned after Escape and language/theme values persisted. See [machine results](browser.json).

Build, ESLint and `npm run type-check` passed. The full Vitest suite passed: 19 files, 175 tests, 3 skipped. Focused Header/AppShell/AppReturn tests passed after the shell-label update. `git diff --check` passed. No new raster assets or font license claims were introduced. This visual sample is bounded; it does not certify every route, all accessibility criteria, Auth, privacy or a production release.

## Remaining

- Independent RB0 review threads and RB2 privacy/security review gate the stacked rebrand merge. Live onboarding data/eligibility integration and the wider rebrand route matrix remain separate work.
- Full-route localization and accessibility acceptance, responsive polish beyond these sampled screens, production release and Vercel confirmation remain open.

## Cloud continuation — hosted failure diagnosis (2026-09-28)

The continuation first verified RB10 remote HEAD and clean checkout at
`31118262783728db55a21c9e138537b52f7aebf1`, then isolated RB7's owning branch at
`eb2d51bae1cf6d20164ed18bd9109bb1df168ed8`. PR #82 platform run
[36404033802](https://github.com/leonartist7/ARO.club/actions/runs/36404033802)
passes 91 SQL assertions and initial Auth/Trust checks before failing at
`BROWSER_ONBOARDING_LANGUAGE_SKIP_360_LIGHT`. This is legacy teacher onboarding,
not RB2 preview or the preference language selector.

A bounded failure diagnostic records only button/main/footer geometry and
pointer interception, plus a synthetic screenshot after credential-input
absence is asserted. Original click, failure propagation, Auth, SQL, cleanup,
journey and performance assertions are unchanged. Suspected cause is footer
interception after removal of public bottom-tab padding; not yet established.

Baseline RB10 build/lint and 179 unit tests passed (3 skipped). Local browser
verification is blocked: Playwright CDN returned an invalid archive; the official
Chrome for Testing 151.0.7922.34 download succeeded, but startup failed with
`socket() failed: Operation not permitted`. No browser flag, security gate or F7
lab requirement was changed. Hosted evidence is required before claiming a fix.

### Cause established; repair candidate

Diagnostic commit `c39d0f77cd680bc5980915a71b94b4f2af009515` / run
[36406063605](https://github.com/leonartist7/ARO.club/actions/runs/36406063605)
reproduced the failure. At the click attempt, the button occupied y=756–800 and
the footer began at y=736; `receivesPointer=false`,
`interceptedByFooter=true`. Artifact `10961693842` retains the synthetic failure
screenshot. The card's fixed 600px wrapper lets its selected-state action escape
normal layout. RB7's removal of bottom-tab padding exposed that overflow.

The repair changes only the two selection-card wrappers in each existing
student/teacher onboarding view from fixed height to minimum height. They can
grow with text and selected-state controls. No fields, values, eligibility,
Auth, application persistence, submission, categories or verification changed.
The diagnostic remains on failure; original CI assertions and budgets remain.

Preferences additionally uses unique panel IDs, focuses the selected language,
closes when keyboard focus leaves, provides a 44px close target, and scrolls
within a short viewport. Five focused real-provider interaction tests pass,
covering language/theme persistence, device-theme changes, unavailable storage,
Escape, outside pointer and keyboard dismissal. Hosted browser regression now
runs the portable existing RB7 script against a production build, retaining
public/onboarding/settings and 320–1440px short-height/200% text evidence in
`rb7-preferences`. No F7 script, lab, budget or immutable evidence is modified.

Candidate local verification: build, lint, type check and 180 unit tests PASS
(3 existing browser-gated tests skipped). Hosted visual and authenticated
acceptance remains pending on the repair commit; local browser startup remains
blocked by the container. The temporary local presentation fixture was removed.

### Hosted continuation result and test readiness correction

- Candidate `a7334b1`: platform run [36406677640](https://github.com/leonartist7/ARO.club/actions/runs/36406677640), job 108876975355 **passed**. The full authenticated browser matrix, Auth/Trust boundaries, 91/91 pgTAP twice, recovery/logout, reset and cleanup all passed. The original language-skip failure is repaired without weakening its assertion.
- Quality run 36406677636: static passed; the added preferences matrix stopped at Settings because its readiness selector incorrectly required an h1. Settings uses the existing AppSectionHeading h2. Corrected readiness to the first accessible heading, retaining every scenario/assertion, and write partial results in finally for diagnostics. Re-run pending; this is not a VERIFIED/SHIPPED claim.

### Retained hosted evidence (cloud continuation)

Tested source `bbd1b2b1ec458690bddc03fcb9786badeb25bdb0`:
- Quality run [36407355886](https://github.com/leonartist7/ARO.club/actions/runs/36407355886): static and the added preferences step pass. Ordinary E2E is still running at this evidence checkpoint; do not infer final job success.
- Platform run [36407355888](https://github.com/leonartist7/ARO.club/actions/runs/36407355888): passed again on the corrected test source.
- [Machine results](cloud-continuation/browser.json): all 16 scenarios return 200, without page errors, horizontal overflow or non-GET requests. All twelve short-height cases keep the panel inside the viewport, reach System by keyboard and restore focus with Escape. The 2x cases enlarge root text to 200%; this is text scaling, not a claim of native browser-zoom certification.
- Visually inspected and retained: [320px dark, 200% text, scrolled to System](cloud-continuation/onboarding-preferences-320-dark-en-2x.png), [1440px light Spanish](cloud-continuation/onboarding-preferences-1440-light-es-1x.png), [desktop dark Spanish](cloud-continuation/about-preferences-1440-dark-es.png), [768px French Settings](cloud-continuation/app-settings-768-dark-fr.png). Labels, selected states and preview disclosures remain clear in these samples.
- Hosted layout evidence: [before, footer intercepts language skip](cloud-continuation/before-language-skip-360-light.png) from diagnostic run 36406063605; [after, subsequent ready step reachable](cloud-continuation/after-onboarding-ready-360-light.png) from passing platform run 36406677640. The after image is a later journey step, not the identical selection state. Existing synthetic account fields are test evidence only.
- Export provenance: preferences artifact 10962574585, SHA-256 `85ad56a898dc01d6e8de6474cf02e342f7355070aa7ee4f695ce2fdc5bbb481b`; platform artifact 10963080391; diagnostic artifact 10961693842. Selected originals and machine results are committed with [file hashes](cloud-continuation/SHA256.json). Hosted ZIPs expire 2026-10-05.

Self-review: only layout sizing, preference accessibility, bounded diagnostics, portable regression execution and evidence changed. No dependency, Auth handler, schema, RLS, privacy/eligibility flow, Trust, payment or F7 evidence changed. Manrope and approved brand direction remain. Performance budgets and original assertions were not relaxed; no new performance improvement claim is made. Full-route accessibility/localization and independent review/release gates remain open.

## Local review-fix stack reconciliation — 2026-09-28

Merged reviewed RB6 `8799e785b523c178eee7c1596bf9be0d3fe568a2` into cloud RB7 `1960c797b67bc78a5ee9e2ffb612a4d5800832c4` using normal two-parent ancestry. Header conflicts retain the incoming xl breakpoint together with quiet Preferences and the scrollable menu. AppShell keeps localized labels and the incoming orange central action / Back to World exit. Changelog entries from both parents are preserved. Existing onboarding minimum-height repair, preference accessibility, diagnostics and retained cloud evidence remain intact.

Incoming RB6 Quality run 36436067479 failed two stale Create-destination assertions. Reconciled tests now assert the reviewed World exit inside Create and retain an explicit Create entry check outside it; no test was skipped or disabled. Local build, lint, type checks and 181 unit tests pass (3 existing browser-gated skips). Hosted checks on this new merge commit are pending; previous screenshots remain historical evidence, not new visual acceptance.

RB2 independent privacy/security review remains required. RB5 is SPEC-REQUIRED pending independent privacy review of browser-local contact-draft retention/deletion. Existing review conversations remain open. No main merge, release, gate closure, Auth/Trust/payment/F7 change or VERIFIED/SHIPPED claim. PR #84 source-plan head was confirmed at 7e3f9568202b37b7aeb420f9b642efb80121b1a2 and left with its owner.

### Corrected local handoff incorporated

The founder superseded RB6 8799e78 with `95ec42139f83ac171bc5362527ce21ebec652426`. The only incoming changes are the two navigation test files. Adopted the upstream owner's versions exactly: both Create entry and World exit remain asserted. This replaces the equivalent temporary cloud assertion repair; runtime and cloud evidence are unchanged. Targeted shell/discovery tests pass (15 passed, 1 existing browser-gated skip). New-head hosted checks are required. The reserved teacher-route proxy collision and French provenance E2E ambiguity recorded in the descendant ledger remain unresolved, as do RB2/RB5 independent gates.

### RB6 5e22dcc review-copy handoff — 2026-09-28

Confirmed and merged exact RB6 `5e22dccb0fd268a9212e874a11e27d321efad493` into RB7 f7b88e5 without conflicts. Incoming RB3 changes give the formation section a distinct truthful preview disclosure in EN/FR/ES, adjust its capture assertion and refresh owner evidence. Cloud preferences, layout repair, diagnostics and historical evidence are preserved. Local unit suite: 180 pass, 3 existing browser-gated skips. Hosted checks on this new source are required before calling the former strict-text failure resolved in integration. The reserved teacher-route collision is not changed by this incoming diff. RB2 independent privacy/security review and RB5 SPEC-REQUIRED retention/deletion privacy review remain blocking; no release or protected merge.

### Protected-route repair handoff — 2026-09-28

Confirmed exact RB6 `1c4c2a192710a5be6d99d82caeb9873b232f7b3b` and merged without conflicts. Incoming RB4 proxy change exempts the reserved application/dashboard route names from legacy fixture-ID rejection; existing Auth refresh and route-level requireUser guards remain unchanged. Cloud preference/layout repairs and evidence are preserved. This incorporates the candidate fix for the recorded collision; new-head hosted verification is pending. RB5 remains SPEC-REQUIRED pending independent contact-draft retention/deletion privacy review, and RB2 independent privacy/security review remains open. No protected merge, release or gate closure.

### RB6 52295e9 review-fix handoff — 2026-09-28

Merged exact RB6 `52295e9b5091749c6cf02f2c0442d3fb1a87bf64` into prior cloud RB7 `573afa4881634fec31cb9c37dfcaffc61ba6ea8c`. The Header conflict retains compact Favorites, Passport and role-gated Admin destinations from RB5 while preserving RB7's governed omission of future-only Games/Leaderboard entries. Quiet preferences, onboarding minimum-height repair, keyboard behavior and retained cloud evidence remain intact. Added a compact-account navigation regression assertion; existing unit suite passed 180 tests with 3 existing skips before that assertion. New-head hosted and visual acceptance remain pending; previous captures are historical evidence.

RB6 hosted Quality 36450019952 and Isolated database 36450019837 both passed. RB5 likewise passed 36449981649 / 36449981824. RB4 Quality 36449928091 passed but isolated run 36449927999 failed `BROWSER_DOCUMENT_INITIAL_CHOOSER_360_DARK`; cleanup passed. Do not infer RB4 success from descendant success. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED contact-draft retention/privacy, independent review and release gates remain open. No main merge or release. PR #84 remains with its owner and must be reconciled on the latest RB10 before any mergeability claim.

### Superseding local Manrope handoff — 2026-09-28

The founder superseded 52295e9 with RB6 `2ea1fede95d9bf83a7ef14bca3a8f9bfc6a48bcd`, confirmed remotely. It contains main `721b2b7fdd3dda0072d189e43d717ef00c7723b2` (PR #83). This normal merge preserves the preceding RB7 reconciliation and adds the upstream local Manrope WOFF2/OFL assets, font-face rules and corrected RB0/RB1 baseline evidence without conflict. No F7 evidence changed. The new compact navigation regression passes all 3 Header tests. Final-stack build, font/network and browser checks will be recorded in the RB10 ledger; earlier screenshots are not acceptance evidence for this new typography source. Latest-base Quality 36450742796 and isolated 36450743091 were in progress when inspected. All specialist/review/release gates above remain open; old-head green results do not certify these new merge heads.

### Final RB6 verifier/evidence handoff — 2026-09-28

Confirmed remote RB6 `8a8e5e2a9dbc325675f91f2466545f9955df4c2e` and merged it without conflict. Compared with 2ea1fed, only the RB6 verifier's two destination-heading waits, six owner screenshots and RB6 evidence change; runtime is identical. Existing cloud work and current teacher-document retry-chooser failure record remain preserved. Prior combined-source build/lint/types and 185 passing tests still cover the unchanged runtime; fresh hosted checks are required on this new merge head. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED retention/privacy, independent review and release gates remain open.

### RB6 ff1c7b6 review repair reconciliation — 2026-09-28

Verified remote RB6 `ff1c7b65cc23958b66754f0d75faffae736a7e7d` and clean cloud heads before merging into RB7 `0016b1f649435a46a4919ef1f3ed6c93c482ef58`. Incoming scope is five files: completed RB1/RB6 presentation contracts, corrected RB2 dependency wording, RB3 composition focus ring and its capture assertions. Governance outside those specs is unchanged. Merge is conflict-free; cloud preferences/navigation/layout fixes remain intact. Existing RB7 source 0016b1f passed Quality 36451753931 and isolated 36451753914 before this merge; new-head checks remain required. Final integrated local verification will be recorded in the RB10 ledger. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED on-device contact-draft retention/deletion privacy approval, independent review and release gates remain OPEN. No F7 evidence change, protected merge or self-approval.

### RB6 13e2571 reconciliation — 2026-09-28

Verified exact remote RB6 `13e257107b5726e911210a1eb8048ce3d42143ac` and clean matching cloud heads. AppShell was the only conflict: adopted the incoming equivalent EN/FR/ES key structure and 44px wordmark target, consolidating the duplicate shell keys rather than losing translation or Create→World behavior. Six focused AppShell tests pass, including new French/Spanish navigation, status and skip-link regressions. Quiet Preferences, public account navigation and the prior onboarding layout repair remain intact. Incoming sticky setup action, host publishing-boundary copy, local Manrope provenance and dark foreground fixes are preserved. New-head hosted/visual acceptance remains required; final integrated local checks are in the RB10 ledger. RB2 independent privacy/Trust, RB4 Trust, RB5 SPEC-REQUIRED on-device draft privacy, independent review and release gates remain open. No F7 evidence change or protected merge.
