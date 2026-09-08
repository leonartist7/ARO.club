# FV-1 — Truthful visual prototype and release evidence

Version: 0.1.0. Status: **PROPOSED / SPEC-REQUIRED**. Owner: ARO founder/product-design. This documentation edition packages the recovered cloud proposal for review; it does not authorize implementation.

## Authority, revisions and dependencies

Proposal/source base: `6495e67798ad14876f6c04815f9f5e13eaf52b83`.
Historical audit base: `06730c74b44d1a6ee1da24c4d1d1ed721313df5c`.
Corrected AUTO0 tooling: `6495e67798ad14876f6c04815f9f5e13eaf52b83`.

Read AGENTS.md and its prescribed authority chain at the source base: ARO_MASTER_DELIVERY_PLAN.md, ARO_CURRENT_STATE.md, ARO_INFRASTRUCTURE.md, ARO_SPEC_INDEX.md, ARO_IMPLEMENTATION_STATUS.md, ARO_AUTONOMOUS_WORKBOARD.md, ARO_BUILD_PLAYBOOK.md; then DECISIONS.md, ARO_FRONTEND_VISUAL_CONTINUATION_PLAN.md, ARO_EXPERIENCE_SYSTEM.md, ARO_DESIGN_SYSTEM.md, and the four specs/ARO-UX0 through ARO-UX3 package specifications. ARO_ARCHITECTURE.md, ARO_DATA_MODEL.md, ARO_TRUST_SAFETY.md and ARO_MONEY.md continue to constrain all proposed behavior. The package format follows specs/PACKAGE_TEMPLATE.md.

Inputs: recovered A1/A2/A3/A4/S1 at the identical H0 revision. [Recovery record](RECOVERY.md) distinguishes cloud validation from local documentation verification. Required future reviewers: founder/product-design, then independent reviewer of the finished implementation diff. No implementation approval exists.

Approval must identify this scope, local-preview semantics, navigation ownership, copy and budgets, and record an immutable approved spec commit at `specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md`. That authoritative file is not created here. Pin the first execution base and each accepted predecessor commit in a dispatch receipt. Future predecessor SHAs cannot be supplied before those commits exist.

## Problem, user outcome and why now

The static /app prototype has contradictory example state, misleading direct-entry claims, navigation defects, inaccessible layouts and expensive image delivery. A reviewer should understand each example and navigate its existing controls on phone and desktop without mistaking it for live capability. This is the bounded FV-1 evidence/correction wave; larger participant, creator and return narratives stay in FV-2 onward.

A1's contradictory 6/6 “Two more” and 7/6 “You joined” overlap with A4's first coherence recommendation. A2's Profile overlap, 32–40px controls and action-color contrast concern adopted visual requirements. A1's inert controls and fictional history concern uncovered scaffold. A3 measures Library images at 7,279,576 bytes and World at 3,235,450 bytes; this is local transfer evidence. S1 is a dated feasibility report and does not establish entrant/store eligibility.

## Proposed behavior and locked boundaries

- Preserve Home, World, Create, Insights and Library as the five destinations. World owns opportunity/detail/commit/Circle routes; Insights owns Passport. Profile, Express and Settings remain profile-context destinations. No sixth tab or generic redesign.
- Show a visible shell notice that these are fictional examples with no live accounts, reservations or payments. Qualify illustrative prices, earnings, history, proof and verification at the point where ambiguity remains. Explain unavailable search, notification, filter and settings previews as non-actionable; do not implement those services.
- Preserve three existing opportunity identities and base quantities, but separate numeric example count, minimum threshold and capacity. Derive displayed counts and remaining-count copy consistently. A minimum reached is not real event confirmation.
- Local commitment preview may add one example participant only below capacity. Provide reset and explicit reset-on-navigation/reload copy. Direct Circle entry shows the baseline example and never claims the visitor joined. Existing local chat remains explicitly unsent and resets; no new messaging.
- Unknown IDs return no fixture and a safe missing-example state for detail, commit and Circle room. Unknown /app paths recover inside the shell. Never silently substitute Shared Stories.
- Create Close and both World-return links lead to /app/world with matching accessible names. Preserve legacy routes, hash anchors and back/forward behavior.
- Library rows link only to the matching existing example with matching identity/text; unmatched rows are explicitly unavailable. Remove misleading self-links.
- Reserve separate space for Profile headline and all four active nodes. Retain the current Field composition. Express choices use labelled native button groups with aria-pressed, preserving existing local state.
- Change copy in English, French and Spanish using the existing language context and exclusively owned translation modules. No new language provider; unchanged copy translation is outside this package.
- Preserve all nine original images. Generate only F1's finite derivative set. Respect people and Express alpha, intrinsic dimensions, responsive selection, loading priority and error geometry. No new artwork or remote fallback.

## Personas, state, data and service implications

Any preview visitor can read fictional examples and change existing local preview selections. There is no authenticated role, stored identity or backend write in FV-1. Other-user/admin/service permissions are not introduced.

Commit preview state: BASELINE → LOCAL_PLUS_ONE only when below capacity; LOCAL_PLUS_ONE → BASELINE on reset, navigation or reload. A full example remains BASELINE. Circle direct entry always uses BASELINE. Invalid ID → MISSING_EXAMPLE with recovery link. Existing Learn/Share/Gather and Express transitions remain local and reversible.

No schema, RLS, API, Auth, analytics, retention, export/deletion, payment, entitlement, AI or notification changes. Existing protections remain untouched; no new sensitive data is collected. Prices and history are fictional presentation only. Privacy/Trust rules prohibit live membership, verified outcome or safety claims. Remote services, account/device acquisition, native wrappers, licensing decisions and store submission are non-goals. I0/P1 gates and P2–P5 remain unchanged, as do 3D/AR/Seasons/Beacons restrictions.

## UI states, accessibility and reliability

Cover baseline/populated examples, missing examples, unavailable controls, selected/unselected local states, full capacity, local reset and image loading/failure with preserved geometry. Async mutation pending/success/retry and permission-denied service states are N/A because no mutation or service is added. Do not invent success from a local preview.

Minimum interactive target: 44×44 CSS px. Essential body/instructional text: 16px minimum; metadata is not indiscriminately enlarged. Normal text contrast ≥4.5:1; large text ≥3:1; relevant control/focus contrast ≥3:1, measured on composited output. Reuse approved palette values, not global token redesign. Include skip/main focus, complete keyboard paths, visible focus, 200% text-zoom reflow and reduced/ordinary-motion equivalence. Test available theme controls; DOM-forced themes alone do not prove switching. A scoped manual screen-reader pass is mandatory; absent capability blocks that acceptance row.

Stale local state recovers by reset; invalid routes by safe links; media failure by same-geometry text fallback. Double activation cannot exceed one local increment or capacity. No network retry or concurrency service is proposed.

## Baseline and proposed budgets

H0 shared JS: 193,559 gzip bytes; CSS: 19,624 gzip bytes. These are measurements, not guarantees. All ceilings below require founder/design approval:

| Metric | Proposed ceiling |
|---|---:|
| Shared JS | 201,559 gzip bytes (+8,000 repair allowance) |
| Total reachable JS for each tested /app entry | 210,000 gzip bytes |
| CSS | 24,000 gzip bytes |
| Thumbnail / portrait | 20,000 / 40,000 bytes |
| Mobile / desktop hero (including persona) | 250,000 / 400,000 bytes |
| Mobile / desktop card | 80,000 / 120,000 bytes |
| Initial visible images, mobile / desktop | 400,000 / 600,000 bytes |

Image transfer conditions: cold cache, DPR 1, height 900, each named route/width; separately report DPR 2 resource choices. Report controlled mobile LCP/CLS over three samples with median and exact browser/version/emulation/throttling settings; proposed targets ≤2.5s / ≤0.10. Do not claim field INP from scripted interaction samples. Precise emulation/throttling profile must be frozen before comparing acceptance measurements. If bytes conflict with legibility, alpha or composition, stop for measured review.

## Ordered packets and interfaces

One FV-1 implementation branch/PR, one writer at a time. These are sequential slices, not seven independent releases:

1. [F1 media foundation](tasks/F1.md): freezes AppImage and the manifest.
2. [F2 shell/routes](tasks/F2.md): freezes shared missing-example/navigation primitives.
3. [F3 opportunity/Circle](tasks/F3.md): freezes numeric fixture interfaces and unknown-ID behavior.
4. [F4 discovery/Create](tasks/F4.md).
5. [F5 Profile/Express](tasks/F5.md).
6. [F6 return/Library/Settings](tasks/F6.md).
7. [F7 acceptance/evidence](tasks/F7.md): independent review after finished diff.

AppImage proposal: existing original src identifies its manifest entry; variant is hero/card/thumbnail/portrait/persona; caller supplies alt, loading priority and crop class. Manifest records originals/derivatives, hashes, dimensions, encoder/version and bytes. Render intrinsic geometry and same-geometry failure fallback. F1 uses an already installed Pillow encoder or stops; no dependency installation is implied.

Each packet's finite allowlist is exclusive. Later consumers cannot modify another owner's interface files; route corrections back serially. F7 alone owns eventual package status updates. No status registry is changed by this proposal.

## Acceptance matrix and required evidence

All rows are NOT RUN for future product implementation. Recovery integrity is separate from acceptance.

| ID | Requirement | Owner / verification | Required evidence |
|---|---|---|---|
| FV1-01 | Reproducible finite media set, originals preserved, alpha/crops retained | F1 component tests and encoder --check | hashes, byte/dimension manifest, encoder/version, before/after crop/alpha comparison |
| FV1-02 | Correct shell ownership, exits, unknown route recovery and focus | F2 named tests; full keyboard/back/hash paths | route table, focus sequence, screenshots, tested SHA |
| FV1-03 | Consistent threshold/capacity, bounded local preview and invalid IDs | F3 unit cases below/at threshold/full/reset/direct-entry | state table, invalid detail/commit/room captures, network observations |
| FV1-04 | Honest discovery/Create and readable World | F4 named tests and measured composited contrast | exact destinations, targets, cold-cache media choices, mobile/desktop crops |
| FV1-05 | Profile/Express never overlap and remain accessible | F5 all four nodes/choices; five widths × two themes; 200% zoom | screenshots, keyboard sequence, target/contrast/reflow measurements |
| FV1-06 | All six Library rows and return/settings claims are truthful | F6 destination/identity and unavailable-state tests | six-row disposition, direct-entry copy, image transfer/crop evidence |
| FV1-07 | Integrated visual and interaction acceptance | F7 focused Playwright runner plus manual screen-reader/motion review | browser/version/settings, traces, resource/contrast tables, screen-reader reviewer/results |
| FV1-08 | No forbidden behavior; required quality gates and independent review | F7 scoped diff/network inspection, lint/unit/build/CI, separate reviewer | allowlist diff, command exits, exact reviewed SHA, reviewer identity/verdict, unresolved findings |

F7 covers the 15 H0 routes: /app, /app/world, /app/create, /app/insights, /app/library, /app/opportunities, /app/opportunities/shared-stories, /app/opportunities/shared-stories/commit, /app/circles, /app/circles/shared-stories, /app/passport, /app/profile, /app/express, /app/settings, /app/opportunities/invalid-audit-id. Widths: 360, 390, 430, 768, 1440; light/dark. Add invalid commit/room, unknown /app, retained selections, capacity/reset, back/forward and error states.

Each packet names focused tests. On the finished product diff run npm ci, npm run lint, npm test -- --run, npm run build, existing required CI, and the proposed F7 runner against the built preview. New script interfaces are future deliverables, not existing executed tests. Do not repeat completed audits. Save large captures outside tracked source; tracked acceptance files include hashes and retrievable references.

## Rollout, rollback, stopping and unresolved decisions

Local/approved preview verification only. No deployment, merge or production approval is supplied by this proposal. Future release requires founder/design review and required independent acceptance. Rollback reverts the eventual FV-1 package commits as one reviewed unit; no data/provider rollback is needed.

Stop on absent approval or exact execution/spec SHA, dirty/unowned changes, mismatched source/report hashes, dependency interface conflicts, unlisted writes, failed budgets, unavailable mandatory verification or new product decisions. One transient retry only. Do not reset a claimed recovery or repeat synthesis.

Unresolved before SPEC-READY: approve bounded scope and local reset semantics; navigation ownership/unavailable-control copy; numerical budgets and controlled performance profile; name independent reviewer and manual screen-reader capability; record approved spec SHA and first execution base. Subsequent task bases are pinned only after predecessors exist. Terra/high remains an executor preference requiring actual control verification; no paid API fallback.

The six H0 collector limitations remain in CLOUD_HANDOFF.md. Completed audits and compatible hashes do not certify full interactions, accessibility, lab/field performance, store eligibility or production readiness.
