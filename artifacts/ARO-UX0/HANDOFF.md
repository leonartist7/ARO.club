# ARO-UX0 New-Task Handoff

> **Status:** implementation handoff completed; see `VERIFICATION.md` for current delivery evidence
>
> **Authority:** `specs/ARO-UX0-OPPORTUNITY-FORMATION-PROTOTYPE.md`
>
> **Prepared:** 2026-09-03

> **2026-09-04 update:** `feat/aro-ux0-opportunity-prototype` now contains the
> locally verified implementation. This file preserves the start conditions;
> it is no longer the current execution handoff. Founder Preview/Production
> release approval and hosted PR checks remain pending.

## Current truth

- UX0 implementation started from `main` at PR #34 merge commit `2e0a97f`;
  protected CI reset/replay/cleanup continues to satisfy I0-004 without making
  Docker a local prerequisite.
- `ARO.club Staging` is `mibydnerayobemhnlfyl`; approved migrations and hosted
  21+60 SQL assertions pass, with no retained synthetic users.
- Vercel contains exactly the two Supabase browser variables under Preview scope.
  Their literal values were not exposed or independently read back.
- The prior PR #33 Preview proved the public baseline could render; the UX0
  branch still requires its own green hosted checks and founder visual review.
- The founder intentionally deferred hosted Auth callbacks, recovery E2E and
  domain resolution while a synthetic frontend prototype is developed.
- Until the masked Preview values are verified, UX0 must ship a source-controlled,
  default-on prototype mode that prevents Supabase/Auth initialization and is
  proven by a zero-Supabase-network browser assertion.
- I0 remains IN-PROGRESS / GATES BLOCKED. P1 remains SPEC-READY / BASELINE
  BLOCKED. UX0 does not waive either gate.
- Tonguee stays untouched. `aro-platform` (`jjgccfrwjkwknyjtbtxa`) stays
  quarantined. No Stripe, Google, payments, paid resource, key rotation or
  history rewrite is authorized.

## Product direction

The current public shell is a technical baseline, not the creative benchmark.
It feels like a generic editorial marketplace and does not make ARO's innovation
visible. UX0 must center the real-time three-point formation model:

1. what you want;
2. what you can bring;
3. people · place · time.

Those signals must visibly form one synthetic, explainable opportunity. “Real
time” is deterministic client interaction, not live user data, Supabase Realtime
or AI. Original generated imagery is authorized when useful and must satisfy the
spec's accessibility, provenance and performance rules.

## Start condition

Create `feat/aro-ux0-opportunity-prototype` from current `main` only after the
UX0 specification PR has merged. Read the canonical documents in `AGENTS.md`
order, then the UX0 spec, `ARO_EXPERIENCE_SYSTEM.md` and `ARO_DESIGN_SYSTEM.md`.
Baseline before editing, keep one package/branch/PR, keep Auth fail-closed, and
do not enable a backend/account, add P1 schema, touch Tonguee or `aro-platform`,
or mutate payments, Google or Production configuration/data.

## Copy/paste starter prompt

Continue ARO.club from current `main` and implement only ARO-UX0 — Opportunity
Formation Prototype.

Read in this order before acting: `AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`,
`ARO_CURRENT_STATE.md`, `ARO_INFRASTRUCTURE.md`, `ARO_SPEC_INDEX.md`,
`ARO_IMPLEMENTATION_STATUS.md`, `ARO_BUILD_PLAYBOOK.md`, `ARO_CHANGELOG.md`,
`specs/ARO-UX0-OPPORTUNITY-FORMATION-PROTOTYPE.md`,
`ARO_EXPERIENCE_SYSTEM.md`, `ARO_DESIGN_SYSTEM.md`, and
`artifacts/ARO-UX0/HANDOFF.md`.

Current truth:

- UX0 is the next eligible package and is synthetic/frontend-only.
- Parent I0 remains gates-blocked; P1 is SPEC-READY but is not authorized to
  start. UX0 does not waive or satisfy those gates.
- Hosted Auth/callback/recovery and domain work is intentionally deferred during
  this prototype.
- Tonguee must remain untouched. Keep `aro-platform`
  (`jjgccfrwjkwknyjtbtxa`) quarantined.
- Do not add Stripe, Google, payments, paid resources, key rotation, history
  rewriting, Supabase Realtime, AI calls, backend semantics, P1 schema or new
  dependencies. Do not mutate Production configuration or data.
- Original generated imagery is authorized where it materially strengthens the
  experience, subject to provenance, accessibility and performance requirements.

Objective: replace the generic technical-baseline feeling with a distinctive ARO
visual language and a compelling real-time three-point formation interaction:

1. what you want;
2. what you can bring;
3. people · place · time.

Make those inputs visibly and immediately form one synthetic, explainable
opportunity. Here “real-time” means deterministic client-side response using
fixtures; it does not mean live users, provider Realtime or AI. Avoid a generic
SaaS dashboard, card marketplace, social feed or decorative sci-fi treatment.
The experience should feel humane, alive, spatial and specific to coordination
in the real world. Choose a strong art direction autonomously within the spec.

Execution requirements:

- First verify `main`, inspect the existing shell and establish the test/build
  and bundle-size baseline.
- Create exactly one implementation branch:
  `feat/aro-ux0-opportunity-prototype`.
- Implement only the UX0 acceptance criteria. Preserve truthful synthetic-state
  labels and fail-closed account behavior.
- If imagery is useful, use the image-generation skill and commit optimized,
  locally served assets with source prompts/provenance recorded in evidence.
- Keep input feedback perceptibly immediate, honor reduced motion, preserve
  keyboard access and focus, and verify 360px, 390px, 430px, 768x1024 tablet and
  1440px in light and dark modes.
- Preserve the existing `en`, `fr` and `es` locale contract: every control,
  validation, provenance and formed-result string must use tested translation
  keys.
- Add focused automated tests for formation logic and interaction states. Run
  lint, tests and production build with zero unexplained warnings.
- Capture visual/browser evidence, console status and performance/bundle evidence
  under `artifacts/ARO-UX0/`.
- Update the canonical status, plan, index, playbook and changelog documents in
  the same PR. Keep all claims exact; do not claim live matching or hosted Auth.
- Push through one GitHub PR, wait for required checks and resolve review threads.
  Stop for founder visual approval before merging. Because `main` deploys
  automatically, that merge approval is also the explicit Production release
  decision; leave the PR open if release is not approved.

Do not start P1. Do not broaden the package because infrastructure credentials
exist. If a genuine external/provider gate appears, stop and give one short,
exact founder action list; otherwise proceed autonomously through a reviewable
Preview.
