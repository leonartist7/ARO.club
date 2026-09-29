# ARO-RB13 — Integrated English/light visual candidate

## Authority and status

**Status:** IMPLEMENTED / PARTIAL VERIFICATION · version 1.0.0 · 2026-09-29. Founder-approved orange identity and English/light first-release priority. Branch `codex/rb13-integrated-visual-release-20260929`, based on the latest PR #84 source with RB11/RB12 merged by normal ancestry. Depends on RB0–RB12. Required before merge: independent product/design and accessibility review, all upstream specialist reviews, final-head CI and protected branch rules.

Governing: `AGENTS.md`, `ARO_BUILD_PLAYBOOK.md`, `ARO_DESIGN_SYSTEM.md`, `ARO_EXPERIENCE_SYSTEM.md`, RB0–RB12 specifications, `docs/rebrand/BASELINE-20260927.md`, `docs/rebrand/reference/ARO-approved.png`, and the implementation ledger. This package is a presentation integration and visual correction. It cannot approve a release, live onboarding, Auth, host publishing, native packaging or any specialist gate.

## User outcome and implementation scope

A visitor can move from Home through illustrated onboarding, Explore, Create and a truthful opportunity preview without encountering conflicting logos, typography, color hierarchy, imagery or calls to action. Public story/help/account entry and app shells use the same orange-led visual language. Keep the existing controlled open-O mark, local licensed Manrope faces, orange `#F05A28`, accessible action `#C94320`, yellow `#FFD447`, ivory `#FFF8EE`, charcoal `#252420` and approved green. Polymath remains absent; Manrope 700 is the heading fallback. Use accepted art already in `public/brand` and `public/fv1` where it contributes context. Do not make illustrations look like real hosts or inventory.

The package may adjust shared presentation primitives and existing route compositions in the baseline inventory: public Home, Explore, story/help, auth entry; onboarding preview; app Home, World, opportunities/detail/commit, Create, Circles, messages, saved/library, profile/settings; and existing host/admin shells and safe supporting states. Preserve all existing destinations, responsive interactions, short-phone actions, loading/empty/error/retry text and preview/live disclosures. Future-only routes receive no speculative features. Tonguee and Coco keep their vertical identity.

RB11's opt-in `NEXT_PUBLIC_ARO_RELEASE_SCOPE=english-light` controls the first-release visual candidate. The ordinary build must retain working theme and locale architecture, including stored preferences. No additional release flag is introduced.

## Hard boundaries and recovery

No new dependency; schema, RLS, provider config, Auth logic, account/profile/age persistence, consent/retention, eligibility, Trust verification, real availability, commitment, payment, analytics, messaging send, AI or location behavior is changed. Existing permissions and server gates remain authoritative. All examples stay labelled synthetic or preview. A broken image leaves meaningful live text/actions; no UI label implies actual booking, verified supply or earnings. No new data state machine, migration, privacy collection, money or AI operation is created by this package.

Rollback reverts the visual integration branch without changing data. If a reviewed source branch advances, reconcile by normal merge and rerun affected tests and screenshots; never overwrite its evidence or force-push an owner branch.

## Acceptance evidence

1. Retain a route-by-route visual inventory of actual destinations and capture before/after on the integrated branch. Review 320, 360/390, 768 and 1440 widths in English/light, including short phone height, nav, first action, representative empty/error and host entry. Check the ordinary dark and FR/ES paths for functional regression, while their visual polish remains later scope.
2. Compare rendered screens against the approved image for logo, type, orange/ivory hierarchy, purposeful adult imagery, crop, spacing and next-action clarity. Fix concrete mismatches in the shared component or route. Check image and font requests, dimensions and mobile transfer against existing package budgets; record exceptions rather than asserting improvement without measurement.
3. Verify keyboard order, visible focus, 44px controls, contrast, reduced motion, no horizontal overflow, deep links and truthful preview labels. No non-GET requests arise from visual walkthroughs.
4. Run production build, lint, type-check, unit tests and relevant required browser/E2E checks on the exact integrated source. Record screenshots, commands, source SHA, unresolved defects and independent review status in `artifacts/ARO-RB13/VERIFICATION.md`. Report IMPLEMENTED / PARTIAL VERIFICATION until all required review and release gates pass.
