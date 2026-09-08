# FV-1 — Truthful visual prototype and release evidence

## 0. Metadata and authority

- Status: **SPEC-REQUIRED — final approval candidate; implementation NOT authorized**.
- Version: **0.2.0**, dated 2026-09-08. Owner/director: ARO founder/product-design.
- Authoritative FV-1 specification: this file. The recovered v0.1.0 proposal and cloud handoff are historical inputs; this edition supersedes their open choices and execution-base instructions.
- Product source baseline: `6495e67798ad14876f6c04815f9f5e13eaf52b83`; historical audit revision: `06730c74b44d1a6ee1da24c4d1d1ed721313df5c`. All five saved audit bundles have already been recovered and validated. Do not rerun them.
- Documentation PR: [#40](https://github.com/leonartist7/ARO.club/pull/40). Proposed sole implementation branch: `codex/fv1-visual-release-evidence`; implementation PR not created. F1–F7 are sequential slices in that ONE branch/PR, with one writer at a time.
- Depends on existing UX0–UX3 static prototype and recovered A1/A2/A3/A4/S1 evidence. Blocks FV-1 implementation until explicit approval; does not unlock I0/P1 or later runtime packages.
- Governing chain: AGENTS.md, ARO_MASTER_DELIVERY_PLAN.md, ARO_CURRENT_STATE.md, ARO_INFRASTRUCTURE.md, ARO_SPEC_INDEX.md, ARO_IMPLEMENTATION_STATUS.md, ARO_AUTONOMOUS_WORKBOARD.md, ARO_BUILD_PLAYBOOK.md, DECISIONS.md, this package, and applicable UX0–UX3 specifications. ARO_FRONTEND_VISUAL_CONTINUATION_PLAN.md, ARO_EXPERIENCE_SYSTEM.md, ARO_DESIGN_SYSTEM.md, ARO_ARCHITECTURE.md, ARO_DATA_MODEL.md, ARO_TRUST_SAFETY.md and ARO_MONEY.md continue to constrain it.
- Required reviewers: founder for scope/design/release; independent nonwriting implementation reviewer for final diff/evidence; competent human screen-reader tester for the scoped accessibility pass.

## 1. Problem

The /app static prototype contains contradictory example counts, live-sounding claims, broken or inert navigation, Profile overlap and oversized image delivery. Recovery validated the existing reports; it did not independently verify a future implementation.

## 2. User outcome

A visitor can understand that the content is fictional, follow the existing examples, try a reversible local participation preview, and read and operate the phone/desktop interface without mistaking it for a booking or live service.

## 3. Why now

The five compatible H0 bundles identify a bounded correction wave. A3 recorded Library image transfer of 7,279,576 bytes and World 3,235,450 bytes. A1/A4 identified contradictory formation claims; A2 identified layout, target and contrast defects. Wider experience expansion remains FV-2 onward.

## 4. Goals

Correct example truthfulness and state, navigation/recovery, responsive media, Profile/Express accessibility and focused release evidence for existing /app surfaces. Preserve the visual identity, five destinations, nine original images and current example identities.

## 5. Explicit non-goals

No new artwork, destinations, generic redesign, backend, Auth, persistence, actual messaging, notifications, analytics, payments, AI, location collection, schema/RLS, dependencies/providers, native wrappers, store submission, 3D/AR, Seasons or Beacons. No repeat audits, new coordinator, schedules, dispatch infrastructure or seven implementation PRs. No release authorization. Existing I0/P1 and later package gates remain unchanged.

## 6. Selected defaults and invariants

These are exact recommendations for approval as one package, not options left for workers to choose.

| User-visible decision | Default and brief before → after example |
|---|---|
| Navigation | Keep Home, World, Create, Insights, Library. World remains selected for opportunities, detail, commit and Circles; Insights for Passport. Profile/Express/Settings use profile context, with no sixth tab. Detail with no parent indication → World selected. |
| Preview disclosure | Persistent visible shell text: “Fictional preview. No live accounts, reservations or payments.” Add “Example” beside ambiguous money, history, proof and verification; remove unsupported “verified” badges. “You earned $…” → “Example earnings: $…”. |
| Unavailable controls | Render existing unavailable search, notification, filter and settings affordances as non-actionable labelled previews, with visible explanation “Not available in this preview.” Keep working theme/language and existing local controls operable. A clickable search that does nothing → an explained search preview. Library shows all six rows; its nonworking category filters are previews, not pretend tabs. |
| Formation | Preserve counts/minimum/capacity: shared-stories **6/6/8**, river-photo-walk **3/6/10**, repair-table **8/6/8**. Show count of capacity separately from minimum. Remaining = max(0, minimum − displayed count). “6/6 — Two more” → “6 of 8 example places; example minimum reached.” Below minimum: “3 more example participants to reach the minimum.” Full: “Example full.” Minimum reached never means a real event is confirmed. |
| Commitment | Button “Try joining this example”; at most one local +1 below capacity. Result “Added to this example only. Nothing booked.” Reset button “Reset example”. Visible notice “This preview resets when you leave this page or reload.” Repeated activation cannot add again. Full examples cannot add. “You joined” on direct Circle entry → “Example Circle — nothing booked.” |
| Missing links | Unknown detail/commit/Circle ID returns “Example unavailable” and “Back to World” to /app/world. Unknown /app path recovers inside the shell. A bad ID opening Shared Stories → honest missing-example recovery. |
| Create exits | Close and both World-return links go to /app/world; accessible names describe that destination. Close going elsewhere → Back to World. Preserve other legacy/hash and browser-back behavior. |
| Library identity | Row 1 becomes “River light photo walk”, with its existing example time, linking /app/opportunities/river-photo-walk. Row 4 becomes “Spanish through shared stories”, with its existing example time, linking /app/opportunities/shared-stories. Creative Minds Circle, Lisbon Trip, Memories and Your Items stay visible as unavailable fictional examples without links. A row linking back to itself → matching example or explicit unavailability. |
| Profile/Express | Keep Field composition; reserve nonoverlapping space for headline and all four nodes at every required width. Native labelled button groups and aria-pressed expose Express selection. Headline covered by a node → readable headline and independently reachable nodes. |
| Languages | All changed copy supplied in English, French and Spanish through existing language context; tests require the same meaning/state in all three. Existing unrelated translation gaps remain outside FV-1. |
| Images | Retain originals and people/crops; add only F1's 23 named responsive WebP derivatives. Preserve persona transparency. Heavy originals on a phone → appropriately sized images with unchanged subjects and stable loading/failure space. |

## 7. Personas and permissions

Any visitor can read fictional examples and change local preview selections. There are no authenticated participant/host/admin/service operations. No permission is implied by a simulated button or displayed fixture. Database authorization changes are N/A because no database operation is added.

## 8. User journeys

World → valid detail → commitment preview → try +1 → reset. Leaving the commitment page or reloading resets its state; entering a Circle always shows baseline, even following the preview. World/detail/Circle counts share baseline numeric fixtures and never infer membership. Invalid links → missing-example recovery → World. Library → matching example or explained unavailable row. Profile → Express → labelled reversible selections; Create Close → World. Existing unsent local chat is explicitly a preview and resets on leaving/reload; no actual send is added.

## 9. State machine

BASELINE → LOCAL_PLUS_ONE only for a visitor on the commitment page when exampleCount < capacity. Displayed count is exampleCount + 1, bounded by capacity. Further activation is idempotent. Reset, leaving page or reload → BASELINE. Full stays BASELINE with unavailable join preview. Unknown ID → MISSING_EXAMPLE, never fallback fixture. No server validation, network side effect or analytics event occurs. Existing Learn/Share/Gather and Express transitions stay local and reversible.

## 10. Data specification

F3 owns numeric exampleCount, minimum and capacity and their derived presentation in src/data/aroApp.js. Preserve existing opportunity IDs, text identity and quantities in section 6; eliminate duplicated authoritative count strings and contradictory Circle claims. Unknown lookup returns no fixture. F1 owns a static media manifest with source/derivative SHA-256, dimensions, bytes and encoder parameters. No migration, stored user entity, retention/backfill or deletion/export changes.

## 11. RLS and authorization

N/A: no server/database operations; existing guards remain. Verification must show no new service requests or forbidden write paths.

## 12. Privacy

No collected data, consent flow, location access, telemetry, persistence or transmission. Existing local input remains unsent; fixture names/history do not describe the visitor. Reset is disclosed before interaction.

## 13. Trust and safety

No real qualification, host verification, booking, safety certification or completed-outcome claim. Fictional labels accompany ambiguous proof/history. Reporting, moderation and eligibility systems are not introduced. Stop if a correction needs a new real-world permission or claim.

## 14. Money and entitlement

All existing amounts are illustrative, labelled examples. No balance, earnings, reservation, charge, refund, entitlement, subscription or payout exists. There are no provider calls or monetary side effects.

## 15. AI specification

N/A: no product AI use, generation or AI service call. Existing images are preserved, not regenerated.

## 16. API and component contracts

No API/server contract is added. F1 AppImage accepts the existing original src as manifest key, variant hero/card/thumbnail/portrait/persona, caller-supplied alt (empty for decoration), loading priority and crop class. It supplies intrinsic geometry, sizes/srcset and same-geometry error fallback. F2 freezes recovery/navigation primitives. F3 freezes fixture interfaces. Consumers may not edit another slice's owned files; corrections return to that owner serially on the same branch.

## 17. UI states and failure recovery

Cover populated baseline, unavailable controls, missing example, selected/unselected controls, full capacity, +1/reset, loading and failed media. Keep layout space while images load/fail. Async pending/success/retry, expired service sessions, permission denial and offline mutation are N/A because no service/mutation exists. Do not invent successful operations. Failed source images show a useful text fallback with retained geometry; no remote fallback.

## 18. Responsive requirements

Required viewport widths 360, 390, 430, 768 and 1440 CSS px, height 900, both light and dark; test controls through the actual theme UI. Phone widths are ≤430; tablet/desktop widths are ≥768 for budget classification. No horizontal overflow, covered heading, inaccessible node or cropped meaningful text; desktop adds existing context rather than stretching phone cards. Verify text zoom 200% and DPR 2 selections separately.

## 19. Accessibility

Targets ≥44×44 CSS px; essential body/instruction text ≥16px; normal text contrast ≥4.5:1, large text ≥3:1, relevant controls/focus ≥3:1 on composited output. Reuse palette values; no global token redesign. Verify skip/main focus, labels, logical reading order, full keyboard paths, visible focus, 200% text zoom and equivalent ordinary/reduced motion. No state communicated by color alone. Section 27 identifies the mandatory human screen-reader evidence.

## 20. Selected technical budgets and reproducible profile

H0 measured shared JS 193,559 gzip bytes and CSS 19,624 gzip bytes. The selected ceilings below apply without silent exceptions. Historical audit measurements are context, not a fresh controlled performance baseline.

| Metric | Ceiling |
|---|---:|
| Shared JS, union of eager shared chunks | 201,559 gzip bytes |
| JS required by each direct /app route, shared included once | 210,000 gzip bytes |
| CSS required by each direct route | 24,000 gzip bytes |
| Each thumbnail / portrait derivative | 20,000 / 40,000 bytes |
| Each phone / larger hero or persona derivative | 250,000 / 400,000 bytes |
| Each phone / larger card derivative | 80,000 / 120,000 bytes |
| All initially requested images, phone / larger viewport | 400,000 / 600,000 bytes |
| Cold-navigation static requests (HTML, JS, CSS, font, image) | 30 per route |
| Controlled phone LCP / CLS | median LCP ≤2,500 ms; maximum CLS ≤0.10 across three runs |
| Scripted local interaction response | maximum ≤200 ms across three runs, input to next painted state |

Gzip measurement: Node zlib.gzipSync with level 9 over built file bytes, each reachable static/dynamic chunk needed for initial route once; report shared and route-specific sets. Do not count unrelated future dynamic imports; do not omit prefetched initial requests from the request table. Images use encoded file bytes, not decoded size; the initial transfer total includes every image requested before the 10-second observation ends, including eager/lazy overscan. DPR 2 is reported with selected resource/bytes and assessed for composition but the transfer ceilings are DPR 1. No API/AI latency, pagination or realtime budget applies to these fixed fixtures. Retain existing static cache semantics; no service worker or caching dependency. No added continuous animation; ordinary/reduced-motion interaction must reach the same state.

Freeze this lab profile before implementation measurement:

- Use the inventoried existing cloud environment: Linux x86_64, Ubuntu **24.04.3 LTS**, Intel Xeon Platinum **8573C**, cgroup quota **8 CPU equivalents**, **20 GiB** memory limit (9 visible/affinity CPUs), no concurrent task; Node **24.19.0**, npm **11.9.0**. Repository lockfile unchanged; use its Playwright **1.62.0**, not the runtime's 1.62.1. Bundled Chromium **151.0.7922.34**, revision **1234**, as verified from installed package metadata; no arbitrary system-Chrome fallback. Capture OS/kernel, CPU affinity/quota/model, memory, lockfile hash, browser executable hash and complete versions in evidence. On environment drift, stop for a recorded profile amendment; do not silently compare hosts. No new workflow infrastructure is required.
- Capability inventory on 2026-09-08 in existing cloud task `6a9fbdd1-0584-83e8-89e5-27bb2d3e32db`, turn `70c70f6d-4305-4154-aaf3-6a8b9989081f`, found repository Playwright installed but its Chromium executable absent. **Browser performance verification is not currently runnable there.** Selected remedy after implementation approval: provision only that existing lockfile-managed Chromium via `node node_modules/playwright/cli.js install chromium` into its external browser cache. This is test-runtime setup, no new package/lockfile dependency or infrastructure. It is included in the proposed implementation scope but has NOT been performed. If download/launch fails, F7 stops; this is an execution capability gap, not a human-only test. F1's in-memory encoder and component unit acceptance do not require that browser.
- Build using npm ci then npm run build. Serve the built artifact at http://127.0.0.1:4173 using npm run preview -- --host 127.0.0.1 --port 4173 --strictPort. Never profile the dev server or hosted production.
- Chromium headless, 390×900 CSS px, DPR 1, touch enabled, isMobile true, browser's bundled default user agent recorded, locale en-US, timezone America/Edmonton, light and dark separately, reducedMotion no-preference. Functional screenshots use all five widths; desktop contexts use isMobile false and touch false. Repeat functional motion cases with reducedMotion reduce.
- CDP CPU throttle 4; network latency 150 ms, download 200,000 bytes/s, upload 93,750 bytes/s, no packet loss; cache disabled, service workers blocked. Fresh browser context for every sample; no prewarming browser asset cache, font cache or route navigation. Use local static content only; unexpected external requests fail the scope check.
- Three cold navigations per route/theme, sequentially. Install buffered PerformanceObservers before page scripts. Observe for exactly 10 seconds after navigation start with no clicks/scrolls; record last LCP entry and CLS using the largest session window (1-second gap/5-second maximum), excluding recent-input shifts. A missing metric, unfinished navigation or page error fails, not zero. Store every sample, median LCP and maximum CLS. Lab interaction measurements run separately after content settles and cover navigation, Express selection and commitment/reset; do not label them field INP.
- Apply phone LCP/CLS ceilings to every valid section-23 route in both themes. Invalid recovery routes retain byte, layout and functional checks. Performance captures after implementation are new acceptance tests, not reruns of the completed audits. Do not claim a like-for-like timing improvement against H0's differently configured collector.

Encoding default: use the preflight-proven cloud Python/Pillow/libwebp stack recorded in F1. Preserve aspect ratios, resize with LANCZOS to each named width, round derived height to the nearest integer (minimum 1), strip metadata, use WebP method 6; opaque images try quality 82, 76, 70 in that order and take the first meeting the applicable byte ceiling. Persona uses lossless=True, quality=100, exact=True; never trade transparency for size. For a derivative used by multiple variants, apply the strictest applicable byte ceiling. Width 160 is thumbnail; profile 256/384 is portrait; persona 480 is phone and 960 is larger; other widths 640/1440 are phone/larger respectively. Fix encoder/version and selected parameters in the manifest; repeat generation must reproduce hashes. If all candidates fail bytes or subject readability, stop with measured comparisons rather than lowering quality further. Decode/crop/alpha checks on real derivatives remain F1 acceptance, not preflight claims.

## 21. Reliability

Duplicate click: bounded one-increment state and disabled selected action. Navigation/reload: disclosed reset. Invalid identifier: no fallback data and safe recovery link. Missing image: stable geometry/text fallback. Dependency mismatch or broken predecessor interface: stop and return correction to owner. No service concurrency, retry or provider failure behavior is introduced.

## 22. Analytics and measurement

No production events or telemetry. Only synthetic test traces, resource tables, screenshots and local measurements, with tested revision and hashes. No personal data enters evidence.

## 23. Test matrix and ordered packets

The authoritative allowlists, focused commands, dependencies and stop rules are in [F1](../docs/fv1-recovery/tasks/F1.md) → [F2](../docs/fv1-recovery/tasks/F2.md) → [F3](../docs/fv1-recovery/tasks/F3.md) → [F4](../docs/fv1-recovery/tasks/F4.md) → [F5](../docs/fv1-recovery/tasks/F5.md) → [F6](../docs/fv1-recovery/tasks/F6.md) → [F7](../docs/fv1-recovery/tasks/F7.md). They form a single package. This spec prevails over historical wording. All product acceptance is **NOT RUN**.

Route set: /app, /app/world, /app/create, /app/insights, /app/library, /app/opportunities, /app/opportunities/shared-stories, /app/opportunities/shared-stories/commit, /app/circles, /app/circles/shared-stories, /app/passport, /app/profile, /app/express, /app/settings, /app/opportunities/invalid-audit-id. Each gets all five widths and both themes. Also test all three valid opportunity identities, invalid commit/room and unknown /app path; threshold-minus-one/at-threshold/full, double click, reset, leave/reload, direct Circle entry, six Library dispositions, actual language/theme controls, back/forward/hash, keyboard, reduced motion, 200% text zoom and failed images. Changed strings require EN/FR/ES key parity and meaning/state checks.

Run each named packet test, then npm run lint -- --max-warnings=0, npm test -- --run, npm run build and existing required CI on the finished diff. F7 implements node e2e/fv1.mjs --base http://127.0.0.1:4173 --out ABSOLUTE_EXTERNAL_EVIDENCE_ROOT using the profile above. The runner is a future deliverable, not a test claimed executed now. Data/RLS/migration/provider tests are N/A to this frontend-only delta; existing required CI remains required.

## 24. Acceptance and evidence

| ID | Owner and requirement | Required evidence | Status |
|---|---|---|---|
| FV1-01 | F1 finite reproducible media and stable accessible component | 9 unchanged source hashes, 23 derivative hashes/bytes/dimensions/parameters, repeat --check, component tests, alpha/crop comparisons | NOT RUN |
| FV1-02 | F2 shell ownership/exits/recovery/focus | route table, focused tests, keyboard/focus path, targets and screenshots | NOT RUN |
| FV1-03 | F3 numeric consistency and truthful preview | three fixtures, threshold/capacity/reset/double-click/direct/invalid cases, network observations | NOT RUN |
| FV1-04 | F4 truthful readable discovery/Create | exact link targets, composited contrast, cold media selections/crops | NOT RUN |
| FV1-05 | F5 Profile/Express accessibility | all nodes/choices, five widths/two themes, keyboard/200% zoom/contrast/target evidence | NOT RUN |
| FV1-06 | F6 truthful return/Library/Settings | six-row disposition, claims/copy, no self-links, media measurements | NOT RUN |
| FV1-07 | F7 integrated performance/visual/accessibility | profile fingerprint, every sample, traces/screenshots, manual screen-reader result | NOT RUN |
| FV1-08 | F7 quality/scope/independent review | command exits, required CI, full allowlist/network diff, independent reviewed SHA/verdict and closed findings | NOT RUN |

Each slice records full base/spec/tested commit, commands/exits and retrievable evidence references in the existing implementation PR. F7 consolidates artifacts/ARO-FV-1/VERIFICATION.md and acceptance.json. Large evidence is attached to the existing PR or its existing GitHub Actions artifact run, with hashes and retention/expiry; refresh expiring evidence before review/release. A local temporary path alone does not pass retrieval. Preserve original failure evidence. No new evidence service or planning system.

## 25. Approval, base reconciliation and rollout

**Three separate permissions:** documentation merge publishes the reviewed specification and recovery records; implementation approval authorizes F1–F7 coding within it; release approval authorizes the eventual product merge/deployment. None implies the others. Documentation merge alone leaves SPEC-REQUIRED and workers stopped. No implementation branch, product PR, audit or release is dispatched by this candidate.

After explicit founder implementation approval identifying the reviewed documentation revision, record approval and SPEC-READY in this spec plus the existing index/status/current-state/changelog. Commit that record through the documentation PR (or a documentation-only follow-up if #40 was already merged). Let **A** be the actual full main commit that contains that approved spec. Resolve A from GitHub only after the merge exists; APPROVED_SPEC_SHA = A and F1 TASK_BASE_SHA = A. Verify git show A:specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md has version 0.2.0, SPEC-READY and the explicit founder approval record. Verify A contains all seven packets. The old 6495... SHA is the product comparison baseline, NEVER an executable F1 base.

Start the ONE implementation branch from A only after that check. In its ONE PR record the full A and governing path/version before F1 writes. F2 uses the actual accepted F1 commit, F3 the accepted F2 commit, continuing through F7. For every handoff record the full predecessor SHA and fixed APPROVED_SPEC_SHA=A in that same PR, verify ancestry and a clean checkout, then allow the next writer. These future SHAs do not exist at proposal time; null in packets.json is a deliberate dispatch lock, not permission to use main/HEAD or guess a hash. Do not introduce a dispatch receipt subsystem. If main changed product files since 6495..., stop for a bounded compatibility diff/reconciliation, never repeat completed audits.

No deployment is part of these packets. Existing repository CI may create its normal documentation preview; that is not FV-1 release approval. Founder reviews the completed implementation and evidence before package merge, consistent with ADR-028. Preview/Production publication requires explicit named-environment approval. No runtime gates are waived.

## 26. Rollback and stopping

Revert eventual FV-1 product commits as one reviewed unit; no data rollback. Stop on missing approval/full base/spec SHA, dirty/unowned changes, wrong ancestry, changed source/report hashes, unavailable encoder or profile, dependency conflict, unlisted write, failed budget/mandatory test, unresolved review defect or new product decision. F7 may update factual delivery/evidence status only, never silently amend approved behavior or grant release. One transient retry; no audit reruns or recovery/synthesis loops.

## 27. Independent and human review plan

After F7 freezes the complete diff, use one independent nonwriting Codex review task/context that did not implement F1–F7, through the existing subscription/task capability. This is a targeted final implementation review, not a repeat of A1–S1. No paid API fallback or new automation. Reviewer reads A's approved spec, A..final-head diff, all eight acceptance rows, commands and artifacts; independently reproduces counts/reset/invalid links, six Library destinations, keyboard/focus, failed-image geometry and one cold performance route. Inspect sensitive claim/network boundaries and all allowlist deviations. Record reviewer identity/task ID, full reviewed SHA, method, findings and verdict in the same PR/evidence files. Require zero unresolved correctness/acceptance findings; track only explicitly out-of-scope observations as future work. Fixes return to the owning slice serially on the same branch/PR; reviewer verifies the changed diff and affected evidence again. Self-review or an automated PR summary does not satisfy this row.

Mandatory human capability: a person proficient with **NVDA and Chromium on Windows** must listen to the rendered announcements and judge whether reading order, names and state changes make sense. Cover shell skip/navigation, valid/invalid example, join/reset/full state, Profile's four nodes, Express choices, and Library unavailable rows; record NVDA/browser versions, human name, date, tested SHA and actual utterance/issue notes. DOM/axe/Playwright cannot certify this experiential result. The founder must also judge the finished visual composition, crop fidelity and motion comfort for release. Keyboard, geometry, contrast, text zoom, resource/performance and motion-state equivalence are tool-verifiable; no physical phone or store-account test is required for this web-only scope. Missing human evidence blocks VERIFIED/release, not already authorized earlier coding slices.

Security/privacy/Trust diff reviewer: the independent reviewer above. Approval/findings: **pending; no implementation exists**.

## 28. Product/design approval record

Founder: pending. Reviewed commit: pending. Decision/date: pending. Documentation merge: not approved by this file. Implementation: not approved. Release: not approved. All substantive defaults are selected in this candidate; the remaining decision is founder acceptance or requested changes, not delegation of technical choices back to the founder.

## 29. Definition of done

VERIFIED requires approved immutable spec, all eight rows passing, scoped tests/required CI, responsive/theme/keyboard/motion/human screen-reader evidence, every budget passing, independent review of the exact final product diff, no unrelated changes, and factual existing registry updates. Founder visual review and explicit merge/release permissions remain separate. Do not mark SHIPPED from documentation or CI alone.

## 30. Delivery record

Package FV-1; candidate 0.2.0; documentation PR #40; product branch/PR not created; product acceptance/unit/E2E/a11y/performance/independent review NOT RUN; release environment none; status SPEC-REQUIRED. Recovery provenance remains in [RECOVERY.md](../docs/fv1-recovery/RECOVERY.md). Encoder-only preflight evidence and its limits are recorded in [F1](../docs/fv1-recovery/tasks/F1.md).
