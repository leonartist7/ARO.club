# ARO-RB12 — Public website redesign

**Status:** IMPLEMENTED / PARTIAL VERIFICATION on the RB13 integrated source; version 1.0.0 · 2026-09-29
**Owner:** ARO founder direction · **Branch:** `codex/rb12-public-website-redesign-20260928` · **Base:** RB11 `80ed9bf` · **Review:** product/design and required stack reviews before merge.

## Problem and outcome

The public Home and story pages contain the right approved imagery and honest paths, but the first screen is cream and card-led. It does not reflect the founder-approved orange, ivory wordmark, open portal and human warmth. A visitor should immediately recognize ARO and reach a useful next step on a short phone or desktop.

## Governing authority and scope

AGENTS.md, ARO_BUILD_PLAYBOOK.md, ARO_DESIGN_SYSTEM.md, ARO_EXPERIENCE_SYSTEM.md, RB0/RB1/RB3/RB5/RB11 specs, `docs/rebrand/reference/ARO-approved.png`, and the implementation ledger govern this presentation-only package. Redesign `/`, `/about`, `/how-it-works`, `/for-teachers`, `/faq` through their existing components. Preserve route slugs, localized copy, links, preview disclosures, legal meaning, official mark, dark/theme architecture and Tonguee/Coco identity. The first release focus is English/light; later theme and language polish remains separately scheduled.

No account, age/profile, host publishing, Trust, availability, booking, payment, backend, native packaging, new dependency, analytics or schema change. No invented host or testimonial. Existing public contact and utility routes remain functional and outside this visual package.

## Design and interaction

- The approved orange field and ivory open-O/dot wordmark lead the Home desktop hero, with the existing four-person/portal asset integrated as the human half. Mobile prioritizes promise, introduction, action and visible human art in a 320×620 first viewport.
- Three existing task destinations remain clearly differentiated: `/explore`, `/for-teachers`, `/onboarding/preview`. The hero's primary preview action and formation anchor stay functional. The copy continues to label illustrated examples as preview, without implying live supply.
- About, How, For Teachers and FAQ share the orange-led hierarchy and existing activity imagery. Their information remains scannable as open numbered rows or accessible disclosure rows instead of interchangeable cards.
- Keep semantic heading order, keyboard focus, 44px touch targets, readable contrast, responsive crops, reduced-motion stability, and no horizontal overflow.

## Data, Trust and release boundary

No state transition, new entity, persistence, API, RLS, privacy collection, AI, entitlement or money operation. Public users can read and navigate existing routes only. Existing backend and review gates remain authoritative; this branch is not a store or production release.

## Acceptance and evidence

1. Compare actual 320×620, 360×640, 768×900 and 1440×900 Home and representative story pages with the reference; retain screenshots and observed gaps.
2. Verify hero and story links, formation anchor, FAQ disclosure, no overflow/page exceptions, loaded images, and English/light release-scope behavior in hosted Chromium. Preserve RB11 short-phone image condition and RB7 preference regression.
3. Run lint, type-check, unit suite, production build and relevant E2E/hosted CI. Record measured image transfer and any budget exception.
4. Self-review the scoped diff and update ledger/status. PR remains draft and stacked on RB11; RB0 conversations, RB2 independent privacy/security review and final-head CI precede merges in stack order.

Rollback is a revert of this presentation branch. No data migration or release flag changes are required.
