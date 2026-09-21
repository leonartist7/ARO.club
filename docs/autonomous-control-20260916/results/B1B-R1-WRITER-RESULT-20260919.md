# B1B-R1 writer result — 2026-09-19

- Task ID: B1B-I02-R7-authenticated-CI-mode
- Claim: B1B-R1-20260919-001
- Immutable base: 6c65965758c7c695aecd343d84287e54b0e53d73
- Local candidate: f95c27cf0ced0b45e3dda14f5ab879b3de3744c4
- Published candidate: c502aa378b151bb2651a621628106834184df288
- Draft reviewable change: PR #52

## Changed file

Only tools/ci/browser.mjs changed.

The authenticated browser driver now waits for semantic language/experience/avatar/bio/ready transitions and scopes the two swipe controls to the currently animated screen. This fixes the stale-control race that caused BROWSER_ONBOARDING_DRAFT_360_LIGHT without relaxing any assertion.

## Retained contract

- two-part loopback/compile-marker guard;
- synthetic credentials only through private IPC;
- genuine login, editable draft, failed upload, retry, persisted server timestamp;
- named screenshot artifacts, viewport/theme evidence, error/page/budget assertions;
- no product/runtime source change, provider/live operation, workflow change, dependency change, or test weakening.

## Local verification

| Check | Result |
| --- | --- |
| node --test tools/ci/boundary.test.mjs | 11 passed |
| npm run lint | pass |
| focused Vitest | 6 passed |
| full Vitest | 136 passed, 3 skipped |
| npm run build | pass |
| git diff --check | pass |

Hosted disposable CI was not run locally. The only remaining validation is the hosted rerun plus artifact retrieval and independent review.
