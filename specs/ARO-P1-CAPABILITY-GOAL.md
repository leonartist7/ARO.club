# ARO-P1 — Capability + Goal Foundation

## 0. Metadata

- **Status:** SPEC-READY (runtime implementation blocked by ARO-SEC0)
- **Spec version:** 1.0.0
- **Owner/director:** ARO Director
- **Implementation branch:** `feat/aro-p1-capability-goal` after SEC0 closure
- **PR:** not yet created for runtime implementation
- **Depends on:** P0/P0.1 VERIFIED; ARO-SEC0 CLOSED or residual risk explicitly accepted
- **Blocks:** ARO-P2 Explicit Intent + Demand Signal
- **Governing docs:** `AGENTS.md`, `ARO_CURRENT_STATE.md`, `ARO_SPEC_INDEX.md`, `ARO_IMPLEMENTATION_STATUS.md`, `ARO_BUILD_PLAYBOOK.md`, `ARO_DATA_MODEL.md`, `ARO_TRUST_SAFETY.md`, `ARO_DESIGN_SYSTEM.md`, `ARO_EXPERIENCE_SYSTEM.md`
- **Required reviewers:** product/director, privacy/security, RLS/data, accessibility/responsive
- **Last updated:** 2026-08-25

> This spec authorizes P1 only after ARO-SEC0 closes. It does not authorize P2 intent, demand aggregation, AI matching, opportunity generation, commitment, payment, AR, Seasons, or broad visual redesign.

---

## 1. Problem

ARO cannot form legitimate opportunities until it has explicit, user-controlled facts about two different things:

1. **what the person wants to grow toward**; and
2. **what the person can contribute.**

The existing Tonguee profile is not a safe home for these inputs because the current legacy schema makes profile rows publicly readable. P1 therefore needs a private-by-default foundation that preserves Tonguee while introducing ARO's Goal and Capability primitives without pretending self-declaration is Trust verification.

---

## 2. User outcome

An authenticated adult can:

- define one current language-learning goal;
- select one or more language capabilities they can contribute;
- understand that the data is private and self-declared;
- edit or remove it at any time;
- return later and see the same state reliably.

The data becomes a safe input foundation for later ARO packages, but P1 itself does not expose it to other users or generate opportunities from it.

---

## 3. Why now

P2 requires explicit user-controlled intent and privacy-preserving demand. P3 requires legitimate supply/capability inputs. Those systems cannot be safely built on top of the public legacy profile JSON fields.

P1 creates the minimum private primitives first and deliberately avoids downstream behavior.

---

## 4. Goals

1. Introduce private, additive ARO records for a language-learning goal and self-declared language capability.
2. Preserve all existing Tonguee profile, teacher, Trust, Passport, booking, onboarding, dark-mode, i18n, and admin behavior.
3. Make privacy, provenance, editability, and deletion explicit in both schema and UI.
4. Use structured values suitable for later matching/aggregation without collecting unnecessary sensitive free text.
5. Provide complete RLS, validation, tests, accessibility states, and failure handling before P1 is called implemented.
6. Keep P1 visually simple and compatible with future ARO art direction; do not couple core data to Three.js or any final Home/World design decision.

---

## 5. Explicit non-goals

P1 does **not** implement:

- full Intent lifecycle;
- Demand Signals or public demand counts;
- AI inference or matching;
- Opportunity creation or recommendation;
- precise/coarse location;
- schedule or availability;
- budget, price, income target, or payment data;
- Commitment or booking changes;
- public capability profiles;
- verified qualification changes;
- new teacher verification;
- new category launch;
- AR, map, Beacons, Seasons, quests, rewards, XP, digital goods, character/shop work, or Three.js;
- broad ARO rebrand/redesign of existing pages;
- public leaderboards or gamification based on P1 data.

Anything not explicitly in Goals is out of scope.

---

## 6. Locked decisions and invariants

1. **Goal and Capability are separate concepts.** Do not merge them into one JSON profile object.
2. P1 records a **Goal**, not the P2 Intent lifecycle.
3. P1 capabilities are **self-declared** and must never be presented as verified expertise or legal qualification.
4. P1 records are **private by default and owner-readable only** through ordinary client credentials.
5. Do not add P1 data to the existing publicly readable `profiles` table or to its public JSON fields.
6. RLS is the authorization boundary; client filtering is not security.
7. No exact location, coarse location, availability, financial data, identity documents, safety reports, or raw AI input is collected.
8. No AI is used in P1.
9. No money/entitlement behavior is introduced.
10. Existing verified teacher data remains authoritative for teacher verification. P1 cannot grant host eligibility.
11. Existing `teachers`, `experiences`, `profiles`, Trust Engine, verified-publish gates, auth triggers, and admin authorization remain intact.
12. Migration is append-only; do not replace or reset the database schema.
13. Removal of a P1 record is a real deletion, not a hidden client-only state.
14. Analytics may record workflow events/counts only; never raw goal/capability values.
15. P1 UI must remain useful without animation and must not depend on the future 3D world.

---

## 7. Personas and permissions

| Persona / role | Can read P1 records | Can create | Can update | Can delete | Special restrictions |
|---|---:|---:|---:|---:|---|
| Owner/user | Yes | Yes | Yes | Yes | Only rows where `user_id = auth.uid()` |
| Other ordinary user | No | No | No | No | No direct row visibility |
| Host/teacher acting as another user | No | No | No | No | Existing public teacher data is separate |
| Admin through ordinary browser client | No by default | No | No | No | P1 does not add these records to admin UI |
| Service role/server maintenance | Technically bypasses RLS | Only approved maintenance | Only approved maintenance | Only approved maintenance | Never expose service credentials to browser; no routine P1 product use |

No new admin support access is justified in P1. If support access later becomes necessary, it requires a separate audited least-privilege spec.

---

## 8. User journeys

### Journey A — First-time goal setup

1. Authenticated adult enters the existing student onboarding flow or the ARO foundation section of their profile.
2. UI explains: **"Only you can see these answers right now. ARO uses them to personalize your experience. They are not public and they are not verified qualifications."**
3. User selects one target language from the existing supported-language source.
4. User optionally selects their current level.
5. User selects one desired outcome from the P1 controlled list.
6. User saves.
7. Client validates before mutation; database constraints/RLS validate again.
8. Success state confirms saved private goal.
9. User can leave without configuring capabilities.

### Journey B — Add capabilities

1. User opens **What I can offer**.
2. User selects a language they can speak/use.
3. User selects a self-declared level.
4. User optionally selects one or more allowed contribution modes.
5. UI clearly labels the entry **Self-declared**.
6. Save creates or updates the owner's private capability record.
7. Duplicate language capability is updated rather than duplicated.

### Journey C — Edit

1. User returns to profile/Foundation.
2. Current records load.
3. User edits structured selections.
4. Mutation shows pending state and prevents duplicate submission.
5. On success UI reflects server-confirmed data.
6. On retryable error, form values remain in memory and Retry is available.

### Journey D — Remove

1. User chooses Remove on a capability or goal.
2. UI explains the record will be deleted and no longer used by future ARO personalization.
3. User confirms destructive action.
4. Owner-authorized DELETE executes.
5. UI returns to the empty state.
6. If deletion fails, record remains visible and Retry is available; never show false success.

### Journey E — Skip

P1 setup is optional. A user may skip during onboarding and return from Profile later. Existing Tonguee use must remain available.

### Journey F — Unauthorized access

An unauthenticated or different authenticated user attempting to read/mutate P1 rows receives no data / authorization failure from RLS. UI routing does not substitute for this enforcement.

---

## 9. State model

P1 intentionally avoids a complex lifecycle.

### Goal

```text
ABSENT → SAVED ↔ UPDATED
  ↑         |
  └─ DELETE┘
```

There is at most **one P1 learning-goal row per user**. Full multi-intent lifecycle belongs to P2.

### Capability

```text
ABSENT → SAVED ↔ UPDATED
  ↑         |
  └─ DELETE┘
```

There is at most one capability row per `(user_id, domain, subject_key)` in P1.

### Mutation behavior

- Owner only.
- Saves are deterministic upserts using unique constraints or equivalent safe mutation logic.
- Client disables the active submit action during a mutation.
- Duplicate taps must not create duplicate rows.
- DELETE is idempotent from the user's perspective: already-absent means final state remains absent.

---

## 10. Data specification

### 10.1 New entity — `aro_learning_goals`

| Field | Type | Required | Public/private | Provenance | Retention | Notes |
|---|---|---:|---|---|---|---|
| `id` | UUID | Yes | Private | System | Until delete/account delete | PK |
| `user_id` | UUID FK `profiles(id)` | Yes | Private | Auth | Until delete/account delete | `ON DELETE CASCADE`; unique in P1 |
| `goal_type` | TEXT | Yes | Private | System-controlled | Same | P1 fixed to `language_learning` |
| `target_language` | TEXT | Yes | Private | Self-declared | Same | Controlled supported language key/code |
| `current_level` | TEXT nullable | No | Private | Self-declared | Same | Controlled P1 level set |
| `desired_outcome` | TEXT | Yes | Private | Self-declared | Same | Controlled set below |
| `provenance` | TEXT | Yes | Private | System | Same | Fixed `self_declared` |
| `created_at` | timestamptz | Yes | Private | System | Same | DB default |
| `updated_at` | timestamptz | Yes | Private | System | Same | DB trigger or explicit server timestamp |

**Allowed `desired_outcome` values for P1:**

- `conversation`
- `travel`
- `work`
- `culture`
- `confidence`

No free-text goal notes in P1. This is intentional data minimization and improves future safe aggregation.

### 10.2 New entity — `aro_capabilities`

| Field | Type | Required | Public/private | Provenance | Retention | Notes |
|---|---|---:|---|---|---|---|
| `id` | UUID | Yes | Private | System | Until delete/account delete | PK |
| `user_id` | UUID FK `profiles(id)` | Yes | Private | Auth | Same | `ON DELETE CASCADE` |
| `domain` | TEXT | Yes | Private | System-controlled | Same | P1 fixed to `language` |
| `subject_key` | TEXT | Yes | Private | Self-declared selection | Same | Language key/code |
| `level_key` | TEXT | Yes | Private | Self-declared | Same | Controlled set below |
| `offer_modes` | TEXT[] | Yes | Private | Self-declared | Same | Only P1 allowed values |
| `provenance` | TEXT | Yes | Private | System | Same | Fixed `self_declared` |
| `created_at` | timestamptz | Yes | Private | System | Same | DB default |
| `updated_at` | timestamptz | Yes | Private | System | Same | DB-managed |

**Allowed `level_key` values:**

- `basic`
- `conversational`
- `advanced`
- `native_or_bilingual`

**Allowed `offer_modes` values:**

- `conversation`
- `practice_partner`
- `cultural_exchange`

P1 deliberately does **not** include a `teacher`, `expert`, `certified`, or `professional` self-declared mode. Verified instructional eligibility remains in the Trust/teacher system.

### 10.3 Constraints/indexes

The implementation migration should include the equivalent of:

- unique `aro_learning_goals(user_id)` for the single P1 goal;
- unique `aro_capabilities(user_id, domain, subject_key)`;
- check constraints for all controlled values;
- non-empty `offer_modes` constrained to the allowed set;
- indexes supporting owner reads (`user_id`), although unique indexes may already cover them;
- foreign keys to `profiles(id)` with account-delete cascade;
- `updated_at` behavior consistent with existing database patterns.

Do not use the destructive legacy `clean-schema.sql` as the production migration. P1 requires a new append-only migration file.

### 10.4 Migration/backfill

- No legacy profile JSON is silently copied into P1.
- No teacher capability is inferred from `teachers` into self-declared P1 data.
- Existing users start with P1 empty unless they explicitly save.
- No destructive changes to `profiles`, `teachers`, `experiences`, bookings, reviews or Passport.

### 10.5 Deletion/export

- Owner can hard-delete the P1 goal and each capability.
- Account deletion cascades P1 records.
- Export tooling later must include P1 records when the application supports user data export; until then, schema naming/documentation must make the records discoverable for manual compliant export operations.
- No hidden historical copy of the deleted value is created by P1 analytics.

---

## 11. RLS and authorization matrix

RLS must be enabled on both new tables before any client integration ships.

| Operation | Owner | Other user | Host | Admin browser role | Service role | Expected enforcement |
|---|---:|---:|---:|---:|---:|---|
| SELECT goal | Yes | No | No | No | Privileged | `auth.uid() = user_id` |
| INSERT goal | Yes | No | No | No | Privileged | `WITH CHECK auth.uid() = user_id` |
| UPDATE goal | Yes | No | No | No | Privileged | `USING` + `WITH CHECK auth.uid() = user_id` |
| DELETE goal | Yes | No | No | No | Privileged | `USING auth.uid() = user_id` |
| SELECT capability | Yes | No | No | No | Privileged | `auth.uid() = user_id` |
| INSERT capability | Yes | No | No | No | Privileged | owner check |
| UPDATE capability | Yes | No | No | No | Privileged | owner `USING` + `WITH CHECK` |
| DELETE capability | Yes | No | No | No | Privileged | owner check |

### Mandatory RLS tests

For both tables test:

1. owner can create/read/update/delete own row;
2. authenticated User B cannot read User A row;
3. User B cannot insert with User A `user_id`;
4. User B cannot update/delete User A row;
5. unauthenticated client gets no private rows and cannot mutate;
6. owner cannot mutate `user_id` to another user;
7. unique constraints prevent duplicate goal/capability state.

Do not use public views that expose raw P1 rows.

---

## 12. Privacy

### Purpose

P1 data exists to personalize ARO and establish explicit Goal/Capability primitives for later packages.

### Consent / notice

Before first save show concise copy:

> **Private by default.** Only you can see these answers right now. ARO uses them to personalize your experience. They are not public and self-declared capabilities are not verified qualifications. You can edit or delete them anytime.

### Boundaries

- No location.
- No schedule/availability.
- No budget/income.
- No free-text profile mining.
- No inference from messages, behavior, contacts, or other apps.
- No public display.
- No demand aggregation in P1.

### Withdrawal

Deleting the record withdraws its future use. P1 does not retain a shadow copy in analytics.

### Analytics minimization

Analytics may include:

- `aro_p1_opened`
- `aro_p1_goal_saved`
- `aro_p1_goal_deleted`
- `aro_p1_capability_saved`
- `aro_p1_capability_deleted`
- `aro_p1_setup_completed`

Allowed properties: anonymous/product session identifiers according to existing analytics policy, count of selected capabilities, surface name, success/failure category, latency bucket.

Prohibited analytics properties: language value, level, outcome value, offer modes, raw user text, auth token, exact user location.

---

## 13. Trust & safety

- P1 is limited to adult language-learning foundation data.
- Self-declared capability is never verification.
- Existing teacher verification remains unchanged and required for verified publishing/host claims.
- P1 cannot unlock hosting, ranking, Trust badges, payments, or public expertise.
- No minors flow is added.
- No new moderate/high-risk category is enabled.
- Abuse risk is primarily misrepresentation; mitigation is private-only data plus explicit self-declared labeling.
- If future packages expose capability publicly or use it to authorize hosting, that requires a new Trust/package decision.

---

## 14. Money / entitlement implications

**N/A.**

P1 has no price, payment, subscription, balance, payout, discount, reward value, entitlement, XP, or monetized unlock.

---

## 15. AI specification

**N/A. No AI in P1.**

P1 may not infer goals/capabilities from profile text, teacher records, messages, browsing behavior, voice, images, or model output.

---

## 16. API / data access contract

Prefer the existing Supabase client/data-library pattern. No new external API/vendor is authorized.

Minimum operations:

| Operation | Auth | Input | Output | Failure behavior | Idempotency |
|---|---|---|---|---|---|
| Load foundation | Required | current auth user | goal + capability array | explicit loading/error/retry | read-only |
| Save goal | Required | validated controlled fields | server-confirmed goal | preserve local form on error | unique owner goal/upsert-safe |
| Delete goal | Required | owner record | success/absent | explicit retry | final state absent |
| Save capability | Required | controlled fields | server-confirmed capability | preserve local form on error | unique owner/domain/subject |
| Delete capability | Required | owner record | success/absent | explicit retry | final state absent |

Do not trust a client-provided `user_id`; derive/verify owner identity at the RLS/server boundary.

---

## 17. UI / UX specification

P1 intentionally uses the current application UI system. It does **not** attempt to settle the final ARO 3D art direction.

### Surfaces

1. **Student onboarding:** add an optional/skippable compact ARO foundation step or equivalent integration after current auth/student setup.
2. **Student profile:** add a clearly accessible **What I want / What I can offer** section for later edits/removal.
3. **Teacher users:** may access the same private P1 section as a person; verified teacher presentation remains separate.

Do not add a new top-level navigation destination solely for P1.

### Information hierarchy

1. Privacy/purpose.
2. **What I want** — target language + desired outcome.
3. **What I can offer** — language capability selections.
4. Self-declared notice.
5. Save/remove actions.

### Required states

For each P1 surface:

- auth resolving;
- loading;
- empty;
- partially configured;
- populated;
- validation error;
- mutation pending;
- success;
- retryable server/network error;
- permission/expired-session error;
- delete confirmation;
- deleted/empty result.

Never show saved success until the server confirms the mutation.

### Destructive actions

Delete confirmation must name what is being removed and explain that future ARO personalization will stop using it.

### Visual direction

- Follow existing design tokens and light/dark behavior for P1.
- No Three.js, WebGL, character renderer, portal effect, map, AR, particle system, or cinematic media is required.
- Components should be structurally compatible with future ARO shells: clear semantic hierarchy, progressive disclosure, minimal clutter.

---

## 18. Accessibility and responsive requirements

Must pass WCAG 2.2 AA expectations for the affected journey:

- all fields and segmented/select controls have programmatic labels;
- validation error is associated with the relevant control;
- status messages use appropriate live-region semantics when useful;
- keyboard-only completion/removal is possible;
- visible focus indicators;
- no color-only distinction between self-declared/verified concepts;
- minimum practical mobile touch targets around 44×44 CSS px;
- no horizontal page overflow at 320/360px;
- usable at 200% zoom;
- reduced-motion path with no required animation;
- light and dark theme contrast passes existing project standards.

Target visual evidence: 360px and 1440px, light/dark, empty/populated/error states.

---

## 19. Performance budgets

P1 is intentionally lightweight.

- Add **no new heavy UI/3D dependency**.
- Do not block initial application boot on P1 data when the user is not on a P1 surface.
- Lazy-load any new dedicated surface/component through existing route/component patterns where applicable.
- Foundation load should require at most one logical goal query and one capability query, preferably issued together/parallel or through a single safe data-library operation.
- Do not poll.
- Do not subscribe to realtime updates for P1.
- Mutation payloads remain small structured records; no media uploads.
- Prevent duplicate network mutations from repeated taps.
- Target no noticeable layout shift from async state.
- Record development/preview query latency in verification; investigate p95 > 750 ms before declaring VERIFIED.
- Do not introduce a client bundle increase above ~30 KB gzip for P1-specific application code without director justification.

Exact production latency may vary by region/network; correctness and safe retry beat optimistic fake UI.

---

## 20. Analytics / success measurement

P1 success is not screen time.

Primary measures:

- percentage of authenticated adults who successfully save a goal;
- percentage who add at least one capability;
- completion-to-error ratio;
- edit/delete success rate;
- median time to complete the compact setup;
- P1 query/mutation failure rate.

Do not optimize completion using coercive streaks, rewards, or blocking access to the existing app.

---

## 21. Threat and failure-mode analysis

| Failure / threat | Required mitigation |
|---|---|
| Private data leaks through public `profiles` | Dedicated private tables; no P1 columns/JSON in `profiles` |
| IDOR / querying another user's rows | Owner-only RLS + hostile role tests |
| Client changes `user_id` | `WITH CHECK auth.uid() = user_id`; never rely on hidden field |
| Self-declared skill appears verified | Explicit provenance copy; no Trust badge/host unlock |
| Duplicate records from double tap | Unique constraints + pending submit + safe upsert |
| Unsupported/malformed controlled value | client schema validation + DB check constraints |
| Stale session | explicit auth/permission error; no false save |
| Network failure after edit | retain unsaved component form state and offer Retry |
| Deletion falsely appears complete | update UI only after confirmed server result |
| Analytics leak private values | event allowlist excludes content fields |
| Legacy journey regression | targeted teacher/profile/onboarding/Passport regression tests |
| Destructive schema use | append-only migration; never run `clean-schema.sql` for P1 |

---

## 22. Test matrix

### Unit

- goal input validation;
- capability input validation;
- controlled value mapping;
- duplicate prevention/update mapping;
- analytics property allowlist excludes private values;
- self-declared presentation label.

### Data / RLS

All owner/other-user/anonymous cases in section 11.

### Integration

- load empty state;
- save/reload goal;
- edit/reload goal;
- add/edit/remove capability;
- delete goal;
- network/server error and retry;
- expired/unauthorized session.

### E2E

1. Existing user logs in → opens profile → adds goal/capability → refreshes → data persists.
2. User edits both → refresh confirms server state.
3. User deletes capability and goal → refresh confirms absence.
4. New student onboarding can skip P1 and continue.
5. New student onboarding can configure P1 and continue.
6. Existing teacher application/publishing journey still functions.
7. Existing Passport page still loads.
8. Existing profile auth protection still works.

### Visual evidence

- mobile 360 light empty/populated/error;
- mobile 360 dark populated;
- desktop 1440 light populated;
- desktop 1440 dark error/retry;
- keyboard focus sequence evidence;
- reduced-motion check.

---

## 23. Traceability

| Requirement | Planned implementation | Verification | Status before runtime |
|---|---|---|---|
| `P1-REQ-001` private goal storage | append-only Supabase migration | RLS/data tests | SPECIFIED |
| `P1-REQ-002` private capabilities | append-only Supabase migration | RLS/data tests | SPECIFIED |
| `P1-REQ-003` owner edit/remove | data library + profile/onboarding UI | E2E | SPECIFIED |
| `P1-REQ-004` privacy/provenance copy | semantic UI component | visual + accessibility test | SPECIFIED |
| `P1-REQ-005` no public leakage | no `profiles` field + RLS | hostile query tests | SPECIFIED |
| `P1-REQ-006` no verified conflation | presentation rules | unit + visual | SPECIFIED |
| `P1-REQ-007` no legacy regression | additive integration | targeted E2E | SPECIFIED |
| `P1-REQ-008` accessible/responsive | existing primitives + new fields | 360/1440 + a11y | SPECIFIED |
| `P1-REQ-009` bounded performance | lazy/no polling/small payload | bundle/query evidence | SPECIFIED |

---

## 24. Rollout / migration / rollback

### Rollout

1. SEC0 closes.
2. Create runtime branch from current `main`.
3. Audit live Supabase schema/policies against repository SQL before migration.
4. Add append-only P1 migration and automated RLS checks.
5. Add data library/hooks.
6. Add profile/onboarding UI behind normal authenticated access.
7. Run full P1 + targeted regression matrix.
8. Preview deploy and evidence review.
9. Merge only after privacy/security/RLS review.

### Rollback

If UI fails but schema is safe, disable/revert P1 UI while leaving unused private tables in place pending forward fix. Avoid destructive down-migrations in production unless explicitly reviewed.

If RLS is incorrect, **stop rollout immediately** and deny access by default before attempting UX fixes.

### Observability

Track mutation/query failures and product analytics events without private values. No public dashboard of P1 content.

---

## 25. Acceptance criteria

P1 may move to **IMPLEMENTED** only when:

- [ ] ARO-SEC0 is closed or residual risk explicitly accepted/documented.
- [ ] Live/current schema audit completed before migration.
- [ ] Append-only migration creates private goal/capability entities.
- [ ] RLS hostile-role matrix passes.
- [ ] Authenticated adult can add/edit/delete the P1 goal.
- [ ] Authenticated adult can add/edit/delete capabilities.
- [ ] Privacy/purpose copy appears before first save.
- [ ] Self-declared capability is clearly not verified.
- [ ] No P1 data is added to publicly readable legacy profile fields.
- [ ] Existing teacher application/publishing, profile, auth, Passport and onboarding regressions pass.
- [ ] All loading/empty/validation/pending/success/error/retry/delete states exist.
- [ ] Accessibility/responsive/theme requirements pass.
- [ ] Performance/bundle/query evidence is recorded.
- [ ] Analytics contain no P1 content values.
- [ ] Security/privacy/data reviewer signs off.

P1 moves to **VERIFIED** only after acceptance evidence is attached/recorded and the canonical status files are updated.

---

## 26. Definition of Done

`approved P1 spec + SEC0 closed + additive migration + owner-only RLS + minimal profile/onboarding UX + tests + hostile security verification + responsive/a11y evidence + performance evidence + no legacy regressions + status/changelog synchronization`

Only then may the director open ARO-P2 implementation.
