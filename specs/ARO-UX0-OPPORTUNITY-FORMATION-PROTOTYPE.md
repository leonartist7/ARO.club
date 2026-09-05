# ARO-UX0 — Opportunity Formation Frontend Prototype

## 0. Metadata

- **Status:** IMPLEMENTED / LOCAL VERIFIED / FOUNDER PREVIEW APPROVAL PENDING
- **Spec version:** 1.0.0
- **Owner/director:** ARO founder/director
- **Specification branch:** `spec/aro-ux0-opportunity-prototype`
- **Implementation branch:** `feat/aro-ux0-opportunity-prototype` after this spec reaches `main`
- **Specification PR:** #34
- **Depends on:** R1 SHIPPED; Q0 IMPLEMENTED / CI VERIFIED
- **Blocks:** no semantic package; informs the later X1 experience foundation
- **Governing docs:** `AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`, `ARO_CURRENT_STATE.md`, `ARO_EXPERIENCE_SYSTEM.md`, `ARO_DESIGN_SYSTEM.md`, `ARO_TRUST_SAFETY.md`
- **Required reviewers:** founder/product-design; accessibility/performance self-review
- **Last updated:** 2026-09-03

The founder authorized a frontend-first prototype while hosted Auth, recovery and
domain work remains deferred. This package does not waive I0, authorize P1
runtime, or change the P1 → P5 semantic sequence.

## 1. Problem

The deployed ARO shell is technically stable but presents as a generic editorial
marketplace. It describes a Human Opportunity Network without letting a person
experience opportunity forming. Stock-like listings, abstract orbit decoration
and competing ARO/Tonguee hierarchy obscure the product's distinctive thesis.

## 2. User outcome

A visitor can understand and interact with ARO's core idea in the first session:
three human signals combine in real time into one credible, explainable prototype
opportunity. The experience feels specific to ARO rather than interchangeable
with an events marketplace, social feed, dashboard or AI chat product.

## 3. Why now

Infrastructure is sufficient for a safe static prototype, while connected Auth
and private-data work remains blocked. A bounded synthetic frontend package can
validate product comprehension and visual language without inventing P1 data,
touching a protected backend or pretending the release infrastructure is ready.

## 4. Goals

- Establish an ownable ARO visual language rooted in a living field of human
  possibility rather than a generic card marketplace.
- Make the three-point model interactive: **what you want**, **what you can
  bring**, and **people · place · time**.
- Let those three points visibly form one synthetic opportunity through immediate,
  deterministic client-side response.
- Produce a compelling landing-to-formation journey for 360px and 1440px,
  light/dark, keyboard and reduced-motion states.
- Generate original imagery only where it improves comprehension, emotion or
  ownability; document, optimize and provide appropriate text alternatives.
- Preserve existing CI, routes, Trust language and honest prototype boundaries.

## 5. Explicit non-goals

- Supabase Auth configuration, real accounts or password recovery.
- P1 schema, RLS, goals/capabilities persistence or authenticated CRUD.
- Realtime subscriptions, live location, maps, demand aggregation or real people.
- AI providers, model calls, autonomous composition or chatbot behavior.
- Stripe, Google, payments, pricing, earnings, bookings or entitlements.
- AR, Beacons, Seasons, rewards, precise location or a production domain change.
- Next.js migration, dependency additions or a repository-wide redesign.

Anything in the master vision not named in Goals remains out of scope.

## 6. Locked decisions and invariants

1. The prototype is visibly synthetic and never presents fixtures as live demand,
   real participants or verified availability.
2. “Real time” means immediate client-side visual response to user-controlled
   prototype inputs. It does not mean Supabase Realtime, live tracking or AI.
3. The three anchors are want, contribution and context. The output is an
   explainable possibility, not a binding recommendation or commitment.
4. ARO is the platform; Tonguee may appear as the first language path but does
   not dominate the universal formation interaction.
5. No generic infinite feed, chatbot-first layout, decorative AI globe, crypto/
   cyberpunk visual language or card wall may become the primary experience.
6. Humans approve consequential actions. The prototype has no consequential
   external action to approve.
7. Missing Auth stays honest. Account actions may explain that connected access
   is not active; they must not simulate a successful account.
8. Tonguee and `aro-platform` remain untouched. No provider mutation belongs to
   this package.
9. Existing stack and dependencies remain unchanged.
10. Generated imagery may be used, but no stock-license ambiguity, human identity
    claim or unverifiable real-world proof may be introduced.
11. Until I0 verifies the masked Preview values, source-controlled UX0 prototype
    mode remains on by default. It must prevent Supabase client/AuthProvider
    initialization, keep every account action fail-closed and produce zero
    Supabase-domain requests across the UX0 and account-route browser audit.

## 7. Personas and permissions

| Persona / role | Can read | Can create | Can update | Can delete | Special restrictions |
|---|---|---|---|---|---|
| Visitor | public prototype and synthetic scenario | temporary local input | temporary local input | temporary local input | no account or remote persistence |
| Returning visitor | same public prototype | same local session only | same local session only | reset local session | no identity inference |
| Host/teacher | same visitor prototype | nothing privileged | nothing privileged | nothing privileged | no simulated qualification |
| Admin/reviewer | public prototype and evidence | test fixtures in code | test fixtures in code | test fixtures in code | fixtures never become provider data |
| Service role | N/A | N/A | N/A | N/A | no server/service credential exists here |

## 8. User journeys

### Journey A — See possibility form

1. The visitor lands on a focused ARO introduction, not a listings wall.
2. The interface presents three understandable anchors: want, bring and context.
3. The visitor chooses or edits bounded synthetic inputs.
4. Relationships form visibly and produce one prototype opportunity.
5. The result explains why it formed and what would need to become true next.
6. The visitor can adjust one anchor and see the formation update immediately.

### Journey B — Explore the formed opportunity

1. The visitor opens the formed opportunity summary.
2. The page distinguishes confirmed facts, prototype assumptions and missing
   real-world validation.
3. A non-binding next action returns to shaping or explains that connected access
   comes after the infrastructure gate.

### Journey C — Reduced motion and failure

1. Reduced-motion users receive the same relationship and state changes without
   drifting, orbiting or large spatial transitions.
2. Invalid or incomplete input preserves prior selections and explains the next
   useful action.
3. A rendering failure falls back to semantic text and controls; no blank canvas.

## 9. State machine

```text
INTRO → SIGNALS_PARTIAL → READY_TO_FORM → FORMING → FORMED
  ↑                                      │
  └──────────── RESET ←────────────── EDITING
                    EDITING + valid change → FORMING → FORMED
                    EDITING + cleared signal → SIGNALS_PARTIAL
```

Selecting or changing the final required signal automatically enters `FORMING`;
there is no second submit action. Editing a valid signal recomputes the result
immediately through `FORMING`, while clearing one returns to `SIGNALS_PARTIAL`.
All transitions are visitor-controlled and local. `FORMING` is bounded visual
feedback, not network work. Reset removes only ephemeral client state.

## 10. Data specification

No persistent entity, migration or provider data is added. Inputs are bounded
fixture IDs and local presentation state. No name, email, precise location,
availability, free text, analytics identifier or user profile is stored.

### Fixture catalog

Fixture IDs are language-neutral. Every visible label and output clause must be
a translation key implemented for `en`, `fr` and `es`.

| Want ID | English review label | Output title | Need clause |
|---|---|---|---|
| `conversational-spanish` | Practice conversational Spanish | Spanish through shared stories | You want relaxed Spanish conversation rather than a formal lesson. |
| `confidence-speaking` | Feel confident speaking | A confidence-building conversation circle | You want a small setting where speaking feels easier. |
| `new-city-connections` | Meet people in a new city | A neighbourhood welcome circle | You want genuine local connection through a shared activity. |

| Bring ID | English review label | Contribution clause |
|---|---|---|
| `weeknight-energy` | Weeknight energy | You can bring steady weeknight momentum. |
| `cooking-stories` | A recipe and its story | You can bring a recipe and the story behind it. |
| `patient-practice` | Patient peer practice | You can bring patient, encouraging practice. |

| Context ID | English review label | People | Place | Time | Fit clause |
|---|---|---|---|---|---|
| `library-tuesday` | Library · Tuesday evening | 4–6 curious adults | Central Library commons | Tuesday, 18:30 | A small public-space circle is plausible on Tuesday evening. |
| `kitchen-saturday` | Community kitchen · Saturday | 6 neighbours | Community kitchen | Saturday, 11:00 | A shared table gives the group a natural activity and meeting point. |
| `riverside-sunday` | Riverside walk · Sunday | 4 peers | Public riverside route | Sunday, 10:00 | A short public walk keeps the first gathering light and social. |

### Deterministic mapping contract

- Exactly one ID from each table is required. The complete allowed set is their
  3 × 3 × 3 cross-product: 27 combinations; there are no hidden exclusions.
- The stable result ID is `{wantId}--{bringId}--{contextId}`.
- The title is the selected Want row's Output title. People, place and time copy
  comes exactly from the selected Context row.
- The rationale is the selected Need clause, Contribution clause and Fit clause,
  in that order. It must also label the result “Prototype possibility — not a
  live match” in the active locale.
- Example: `conversational-spanish--cooking-stories--kitchen-saturday` produces
  “Spanish through shared stories,” 6 neighbours, Community kitchen, Saturday
  at 11:00, followed by those three source clauses.
- An unknown/missing ID produces no result, keeps recognized selections, returns
  to `SIGNALS_PARTIAL` and names the anchor that must be selected again. Never
  reuse the previous formed result as a fallback.

## 11. RLS and authorization matrix

N/A. This package performs no database access or mutation. Existing RLS remains
untouched and authoritative for later connected packages.

## 12. Privacy

- Use curated synthetic choices, not personal free text, in the initial package.
- Do not request location permission or infer precise/coarse location.
- Do not persist inputs beyond the current client session.
- Do not add analytics events in this prototype package.
- Label fixture people, counts, places and times as prototype scenario content.

## 13. Trust & safety

The prototype uses a low-risk language/community scenario. It must not imply that
a host is verified, a person is attending, capacity is scarce, or an opportunity
is safe merely because the visual formation completes. No minors, regulated
categories, intimate data or high-risk qualification claims are included.

## 14. Money / entitlement implications

N/A. No price, earning estimate, payment, discount, booking, entitlement or
financial commitment appears in the formation journey.

## 15. AI specification

N/A. Formation is deterministic fixture mapping. Copy must not imply that an AI
provider evaluated the visitor or independently discovered live demand.

## 16. API / server contract

N/A. No new endpoint, RPC, function, remote write or realtime channel.

## 17. UI / UX specification

The first viewport establishes one primary interaction and a strong authored
composition. The ARO Field must encode relationships and changing state, not act
as ornamental background. Editorial language supplies meaning; system typography
supports controls, provenance and next steps.

Required surfaces:

- ARO introduction and formation invitation;
- three-point signal controls;
- living field / relationship visualization;
- formed-opportunity reveal with plain-language rationale;
- prototype provenance and honest connected-access boundary;
- edit/reset path.

Required states: intro, partial, ready, forming, formed, editing, validation,
fallback/error and reduced motion. There is no fake loading, pending server write,
permission state or synthetic success toast.

## 18. Responsive requirements

- 360px: one-handed controls, ordered narrative and no clipped field labels.
- 390–430px: formation remains legible without shrinking text below baseline.
- Tablet: field and controls may share space only when reading order remains clear.
- 1440px: use spatial relationships and editorial pacing; do not stretch a mobile
  card stack across the viewport.
- New controls, validation, provenance and formed-result copy must use the
  existing language system and be complete in English, French and Spanish.

## 19. Accessibility

- 44x44 minimum targets and body text at least 16px.
- WCAG AA contrast in light and dark themes.
- Full keyboard journey with visible focus and logical order.
- Semantic text equivalent for every visual relationship.
- Formation result announced through an appropriate live region.
- No information conveyed only by color, motion or spatial position.
- `prefers-reduced-motion` removes nonessential interpolation and looping motion.
- Generated meaningful imagery receives concise alt text; decorative assets use
  empty alternatives and cannot carry required information.

## 20. Performance budget

- Measure current home-route JS/CSS and request baseline before implementation.
- New initial-route JavaScript: maximum +35 kB gzip unless founder approves a
  measured exception; no new runtime dependency.
- Initial critical generated imagery: maximum 250 kB total at target viewport,
  responsive formats and dimensions required.
- Below-fold media lazy-loads; no autoplay video.
- Formation input response begins within 100 ms on the reference desktop and
  remains usable under mobile CPU throttling.
- CLS target ≤0.10; decorative animation must not monopolize the main thread.

## 21. Reliability and failure analysis

| Failure | User impact | Detection | Recovery | Data consistency |
|---|---|---|---|---|
| visual field fails | formation meaning hidden | browser test + semantic fallback assertion | show text relationship summary | local state retained |
| incomplete signals | unclear next action | state-machine unit test | identify missing anchor | no write |
| stale fixture mapping | contradictory output | deterministic fixture tests | fail to bounded fallback | no provider data |
| reduced-motion regression | inaccessible motion | media-emulation E2E | static transition path | same result |
| image load failure | emotional context missing | browser request/error test | resilient layout and alt/fallback | no data effect |

## 22. Analytics / measurement

No telemetry ships in UX0. Product review uses local moderated observation and
captured evidence only. Any later analytics requires a separate minimized event
contract and privacy review.

## 23. Test matrix

### Unit

- [ ] three-point state transitions and fixture mapping
- [ ] reset/edit behavior
- [ ] incomplete and fallback states

### Data / RLS

- [ ] assert no new data client, migration or remote mutation is introduced

### Integration

- [ ] public route renders with Supabase unavailable
- [ ] no new provider/API dependency
- [ ] source-controlled prototype mode blocks Supabase/Auth initialization
- [ ] UX0 flow and account routes make zero requests to Supabase domains
- [ ] all UX0 translation keys exist and render in `en`, `fr` and `es`

### E2E

- [ ] intro → three signals → formed result
- [ ] edit one signal and observe deterministic change
- [ ] reset and validation/fallback

### Visual / accessibility

- [ ] 360px light and dark
- [ ] 390px and 430px light and dark
- [ ] 768x1024 tablet light and dark
- [ ] 1440px light and dark
- [ ] keyboard complete
- [ ] reduced motion
- [ ] semantic relationship and live-region spot check

### Performance

- [ ] baseline recorded
- [ ] package budgets passed

## 24. Acceptance criteria and evidence

| ID | Requirement | Verification | Evidence location | Status |
|---|---|---|---|---|
| UX0-001 | first viewport communicates the ARO thesis and three anchors | founder review + visual captures | `artifacts/ARO-UX0/VERIFICATION.md` | PENDING FOUNDER |
| UX0-002 | user-controlled signals form one deterministic, explainable result | unit + E2E | same | PASS |
| UX0-003 | prototype content is visibly synthetic and non-binding | copy assertion + review | same | PASS |
| UX0-004 | source-controlled prototype mode keeps Supabase/Auth fail-closed with zero Supabase-domain requests; no backend, P1, payment, Google, AI or live-location behavior is added | diff/route/network audit | same | PASS |
| UX0-005 | 360px, 390px, 430px, 768x1024 and 1440px light/dark experience passes | visual matrix | same | PASS |
| UX0-006 | keyboard, semantics, contrast and reduced motion pass | accessibility matrix | same | PASS |
| UX0-007 | bundle, image, responsiveness and CLS budgets pass | build + browser measurement | same | PASS |
| UX0-008 | generated assets are original, optimized and correctly labelled | asset manifest + review | same | PASS |
| UX0-009 | existing required CI and public-route smoke remain green | CI | PR #35 | PENDING CI |
| UX0-010 | founder approves the distinct creative direction before merge | founder review | PR #35 | PENDING FOUNDER |
| UX0-011 | all new UX0 copy and states render through translation keys in English, French and Spanish | locale test + E2E spot check | same | PASS |

## 25. Rollout

Implement in one dedicated branch and PR. The PR Preview is the review
environment. Because merging to `main` automatically creates a Vercel Production
deployment, founder approval to merge the implementation PR is also the explicit
Production release decision. If the founder approves the design but not release,
leave the PR open; do not merge or mutate the deployment integration.

## 26. Rollback / forward recovery

The package is frontend-only. Roll back through a normal revert PR or redeploy the
prior verified artifact. No database, Auth, domain or provider rollback is needed.

## 27. Security / privacy / Trust review

- **Reviewer:** required self-review; specialist only if implementation expands scope
- **Date:** 2026-09-04
- **Findings:** no backend/schema/provider/AI/location/money expansion; compiled route audit produced zero Supabase-domain requests
- **Resolution:** source-controlled prototype mode mounts a static account boundary and prevents Supabase client/Auth initialization
- **Approved:** no

## 28. Product / design review

- **Reviewer:** ARO founder/director
- **Date:** pending Preview review
- **Findings:** current baseline is generic and does not demonstrate opportunity formation
- **Resolution:** implemented community-table / living-field direction; Preview review pending
- **Approved:** spec direction yes; implementation no

## 29. Definition of Done

UX0 is VERIFIED only when all UX0 acceptance rows pass, CI is green, responsive
and accessibility evidence exists, performance budgets pass, generated assets are
documented, the founder approves the Preview, and status documents match truth.

## 30. Delivery record

```text
Package: ARO-UX0
Spec version: 1.0.0
Branch: feat/aro-ux0-opportunity-prototype
Specification PR: #34
Delivery PR: #35 (open; merge commit pending)
Acceptance: 8/11 passed; UX0-001/009/010 pending founder/CI
Unit: 73/73 PASS
Integration: prototype/provider/locale boundary PASS
E2E: focused UX0 9/9 PASS; complete suite 25/25 PASS
RLS/security: no data change; zero Supabase-domain requests across UX0/account audit
A11y: keyboard, semantics, live region, 44px targets, reduced motion and token contrast PASS
Performance: +3.36 kB home gzip, total named initial JS/CSS -36.73 kB; response 2.3 ms; max CLS 0.000753
Screenshots/evidence: artifacts/ARO-UX0/VERIFICATION.md
Reviewers: founder/product-design required
Known follow-ups: I0 Auth/recovery/domain; P1 runtime remains blocked
Release environment: Preview only
Status: IMPLEMENTED / LOCAL VERIFIED / FOUNDER PREVIEW APPROVAL PENDING
```
