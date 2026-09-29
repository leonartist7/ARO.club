# ARO-RB16 — English/light visual coherence

**Status:** SPEC-READY / IMPLEMENTED / PARTIAL VERIFICATION · version 1.0.0 · 2026-09-29.

## Authority and scope

Founder-directed visual continuation from exact latest RB15 integration branch, reviewed against `docs/rebrand/reference/ARO-approved.png`. RB0–RB15 and the preserved source plan govern identity, preview truth, accessibility and release gates. This package adjusts existing presentation and copy in onboarding, app Home, public Explore, app discovery, Create and opportunity detail, then samples public/account/host/support screens. It may use existing assets and semantic tokens. It does not change dependencies, data, Auth, persistence, Trust, F7, booking, payments or release configuration.

## Acceptance

1. The English/light first views share Manrope, the controlled ARO mark, orange/ivory hierarchy, purposeful existing imagery, readable copy and visible next actions at phone and desktop widths. Images remain fully legible in their intended frames.
2. Create is an ivory task surface with the existing local-only composition preview clearly separated from actions; selection and keyboard behavior remain intact. Opportunity detail labels example hosts and counts without claiming verification or real inventory.
3. Onboarding's short-phone actions and preview disclosure remain visible, with existing in-memory setup and theme/language controls preserved. Public, account, host and supporting screens receive a bounded visual spot check.
4. Capture before/after at mobile and desktop, inspect overflow, controls, image requests, and ordinary dark/FR/ES preference paths. Run lint, type-check, unit, both production build modes and relevant browser checks at final head. Record limitations and open independent reviews. The PR targets RB15 and remains unmerged.

## Rollback

Revert this presentation branch. There are no schema, environment or package changes. Review evidence lives in `artifacts/ARO-RB16/VERIFICATION.md`.
