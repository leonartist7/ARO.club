# ARO-P1 — Capability and Goal Foundation

## 0. Metadata

- **Status:** SPEC-READY
- **Spec version:** 1.0.0
- **Owner/director:** ARO Product and Technical Director
- **Specification branch:** docs/aro-p1-spec
- **Implementation branch:** not created; one implementation branch will be created only after the baseline gate passes
- **PR:** assigned when opened
- **Depends on:** P0/P0.1 VERIFIED; ARO-SEC0 VERIFIED
- **Blocks:** ARO-P2
- **Governing docs:** AGENTS.md, ARO_CURRENT_STATE.md, ARO_SPEC_INDEX.md, ARO_BUILD_PLAYBOOK.md, ARO_PRODUCT.md, ARO_ARCHITECTURE.md, ARO_DATA_MODEL.md, ARO_DESIGN_SYSTEM.md, ARO_TRUST_SAFETY.md, ARO_MIGRATION.md, DECISIONS.md
- **Required reviewers:** product/director, design/accessibility, security/privacy, data/RLS
- **Last updated:** 2026-08-26

## 1. Problem

Tonguee currently lets a learner select languages, interests, a daily-practice cadence and avatar during onboarding. Most of that state is persisted in a local Zustand player store and is best-effort mirrored into the broadly readable profiles table. The profile screen also reads primarily from local state. That is useful legacy behavior, but it is not a safe or durable foundation for ARO private intent and capability data.

ARO needs the smallest trustworthy profile foundation that lets an authenticated adult explicitly describe:

- one current language-learning outcome; and
- bounded, self-declared capabilities they may be able to offer.

The data must be editable, removable, private by default and clearly separated from verified teacher evidence. It must not expose private ARO inputs through Tonguee public-profile policies or reinterpret local gamification state as authoritative user intent.

## 2. User outcome

An authenticated adult can open a protected ARO foundation section, understand why the data is requested, save one language-learning goal, select zero or more language-related capabilities, edit them later, or delete them. The user can see that the information is private and self-declared. Existing Tonguee onboarding, public profiles, teacher verification, Passport, dark mode and gamification continue to work.

## 3. Why now

P2 requires a reliable boundary between private participant data and public opportunity presentation. P1 establishes that boundary without introducing demand, matching, AI, commitment or money. SEC0 is verified, Tonguee is the canonical Supabase backend, and the current code/data seams have been inspected. P1 is therefore the next governed package.

## 4. Goals

- Add a durable owner-private language-learning goal.
- Add durable owner-private, self-declared language capabilities.
- Make create, read, update and delete behavior explicit and retryable.
- Preserve existing Tonguee profile, Trust Engine, verification, admin, Passport, auth and gamification behavior.
- Establish append-only schema, least-privilege grants and tested RLS patterns that P2 can depend on.
- Provide honest privacy and provenance copy before the first save.

## 5. Explicit non-goals

- P2 intent lifecycle, demand aggregation, location, availability or budget.
- Public capability discovery, public ARO profiles or public demand.
- Opportunity generation, matching, recommendations or AI.
- Commitment, booking changes, Stripe, payment, pricing or entitlement work.
- Google sign-in configuration.
- Credential verification or changes to teacher applications.
- Admin browsing of private P1 data.
- New verticals, minors, precise location, AR, Seasons or broad rebranding.
- Mass-renaming teachers, learners, experiences or existing database entities.
- Migrating all local player/gamification state into Supabase.
- Redesigning the entire profile or onboarding experience.

Anything in the ARO master vision not named in Goals remains out of scope.

## 6. Locked decisions and invariants

- ARO is the master platform; Tonguee remains its first language vertical.
- This MVP is for adults. P1 does not collect date of birth or create minor accounts.
- Calgary remains the initial operating market, but P1 stores no location.
- Intent and Capability are separate concepts.
- P1 stores one learning goal, not a P2 intent record.
- Self-declared capability is never verified qualification.
- Private P1 records never become readable through the public profiles table.
- Existing profile languages_learning, goal and local player fields are legacy inputs, not authoritative P1 records.
- No automatic backfill may convert legacy/local values into durable P1 records without the user reviewing and saving them.
- RLS is the authorization boundary; UI hiding is not authorization.
- New tables are additive. Existing tables, policies and Trust triggers are not casually rewritten.
- Existing verified-only experience publishing remains intact.
- Existing admin authorization is preserved, but admin access to P1 private records is denied by default.
- No service-role client secret may enter browser code.
- No external analytics provider is introduced.
- No runtime/schema/UI work occurs on this specification branch.

## 7. Personas and permissions

| Persona / role | Can read | Can create | Can update | Can delete | Special restrictions |
|---|---|---|---|---|---|
| Authenticated owner | Own goal and capabilities | Own records | Own records | Own records | Must see purpose/privacy copy before first save |
| Other ordinary user | No | No | No | No | Public profile access does not imply P1 access |
| Tonguee host/teacher | Own records only | Own records only | Own records only | Own records only | Teacher status grants no access to another user |
| Admin/reviewer | No by default | No | No | No | Support access requires a later audited server-side package |
| Unauthenticated/anon | No | No | No | No | No table privileges |
| Server/service role | Technical bypass only | Technical bypass only | Technical bypass only | Technical bypass only | No P1 product path uses it; never exposed to client |

## 8. User journeys

### Journey A — First save

1. Authenticated adult opens the protected profile.
2. The ARO foundation section explains that selections are private, editable and self-declared.
3. The user chooses one target language, a bounded outcome and optionally a current level/cadence.
4. The user optionally selects bounded capabilities and associated languages/levels.
5. Client validation runs.
6. The user explicitly saves.
7. Goal and capabilities are persisted atomically enough that partial failure is visible and recoverable.
8. The UI confirms success and reloads server state.

### Journey B — Edit

1. Owner opens the populated section.
2. Owner changes goal or capabilities.
3. Unsaved changes are indicated.
4. Save is disabled while an identical mutation is pending.
5. Success replaces cached state with returned server state.
6. On failure, edits remain available and retry is offered.

### Journey C — Remove capability

1. Owner removes a selected capability.
2. The UI identifies what will be removed.
3. Owner confirms through a clear action; a modal is unnecessary for one reversible chip removal before Save.
4. Save deletes the record.
5. Empty capability state remains valid.

### Journey D — Delete goal

1. Owner chooses Delete goal.
2. A confirmation explains that the private goal will be removed and no public profile data is affected.
3. Owner confirms.
4. The row is deleted and the empty state is shown.
5. Failure leaves the goal visible with retry.

### Journey E — Permission denial/session expiry

1. Request returns unauthorized or forbidden.
2. UI does not show cached private data as current.
3. User is asked to sign in again.
4. No mutation is retried automatically after identity changes.

### Journey F — Existing onboarding compatibility

1. Existing onboarding may prefill the P1 form from local choices.
2. Prefill is clearly unsaved.
3. No legacy value is written into P1 storage until the owner reviews and saves.
4. Failure to save P1 data does not erase existing local gamification state or corrupt onboarding completion.

## 9. State machine

P1 records intentionally have no public lifecycle.

Goal state:

ABSENT → SAVING → PRESENT → UPDATING → PRESENT  
PRESENT → DELETING → ABSENT

Capability collection state:

EMPTY → SAVING → POPULATED → UPDATING → POPULATED or EMPTY

For every mutation:

- actor: authenticated owner only;
- precondition: current auth user matches user_id;
- server validation: constraints plus RLS;
- side effects: only P1 table rows and updated timestamps;
- analytics: none sent externally in P1;
- idempotency: upsert by owner/natural uniqueness and delete by owner/key;
- result: returned canonical server state or a recoverable error.

No draft, public, active, inferred, verified or matched state is introduced.

## 10. Data specification

### New entity: aro_profile_goals

| Field | Type | Required | Public/private | Source/provenance | Retention | Notes |
|---|---|---:|---|---|---|---|
| id | uuid | yes | private | system | row lifetime | generated primary key |
| user_id | uuid | yes | private | auth | account/row lifetime | FK to auth.users, on delete cascade; unique for one P1 goal |
| vertical_key | text | yes | private | system | row lifetime | fixed to language_learning in P1 |
| target_language_code | text | yes | private | self-declared | row lifetime | approved supported-language code |
| outcome_key | text | yes | private | self-declared | row lifetime | bounded vocabulary |
| current_level_key | text | no | private | self-declared | row lifetime | bounded CEFR-like vocabulary plus unknown |
| cadence_key | text | no | private | self-declared | row lifetime | casual, regular, serious or intense; preserves meaning of legacy cadence without auto-import |
| provenance | text | yes | private | system | row lifetime | fixed to self_declared |
| created_at | timestamptz | yes | private | system | row lifetime | UTC |
| updated_at | timestamptz | yes | private | system | row lifetime | UTC |

P1 outcome keys:

- conversation_confidence
- travel
- work
- study
- community_connection
- cultural_connection
- general_learning

P1 current-level keys:

- unknown
- beginner
- a1
- a2
- b1
- b2
- c1
- c2
- native_or_bilingual

Free-text goals are excluded from P1 to minimize sensitive data and moderation scope.

### New entity: aro_profile_capabilities

| Field | Type | Required | Public/private | Source/provenance | Retention | Notes |
|---|---|---:|---|---|---|---|
| id | uuid | yes | private | system | row lifetime | generated primary key |
| user_id | uuid | yes | private | auth | account/row lifetime | FK to auth.users, on delete cascade |
| vertical_key | text | yes | private | system | row lifetime | fixed to language in P1 |
| capability_kind | text | yes | private | self-declared | row lifetime | bounded vocabulary |
| language_code | text | yes | private | self-declared | row lifetime | approved supported-language code |
| proficiency_key | text | no | private | self-declared | row lifetime | same bounded level vocabulary |
| provenance | text | yes | private | system | row lifetime | fixed to self_declared |
| created_at | timestamptz | yes | private | system | row lifetime | UTC |
| updated_at | timestamptz | yes | private | system | row lifetime | UTC |

P1 capability kinds:

- conversation_partner
- learning_peer
- cultural_context
- language_support

These are deliberately modest self-descriptions. They do not imply teaching credentials, certification, employment eligibility or safety qualification.

### Constraints and indexes

- Primary keys use uuid defaults supported by the existing project.
- aro_profile_goals has UNIQUE(user_id).
- aro_profile_capabilities has UNIQUE(user_id, vertical_key, capability_kind, language_code).
- Check constraints enforce P1 vocabularies and fixed provenance.
- Index aro_profile_capabilities(user_id); the goal uniqueness index covers goal owner lookup.
- Foreign keys use ON DELETE CASCADE for account deletion.
- Table and column names remain lowercase snake_case.
- Timestamps are server-authored.
- A package-scoped updated_at trigger must use a fixed safe search_path or a schema-qualified existing function proven safe.

### Migration rules

- Add one new append-only migration; do not edit schema.sql, trust-engine.sql or historical SQL in place.
- Do not backfill from profiles or localStorage.
- Do not drop or rename existing fields.
- Re-running the migration in the intended migration system must be safe or fail clearly before partial deployment.
- Rollback for a bad release is forward-fix; do not destroy user data automatically.
- Before production rollout, verify that the repository migration history matches live Tonguee schema reality because the connected project currently reports no recorded migrations.
- Deletion is immediate from the active database; provider backup retention follows the configured Supabase backup policy and is documented in the release record.
- User export must include these records when a formal export feature exists. Until then, support must not claim automated export.

## 11. RLS and authorization matrix

Both new tables:

- enable RLS;
- revoke all table privileges from anon;
- grant only SELECT, INSERT, UPDATE and DELETE to authenticated;
- define explicit policies TO authenticated;
- compare owner using (select auth.uid()) = user_id;
- define both USING and WITH CHECK for UPDATE;
- do not add public or admin policies;
- do not rely on profiles public-read policy.

| Operation | Owner | Other user | Host | Admin | Service role | Expected policy/test |
|---|---:|---:|---:|---:|---:|---|
| SELECT | yes | no | own only | no by default | technical bypass | owner row returned; all others zero/denied |
| INSERT | yes | no | own only | no by default | technical bypass | WITH CHECK owner |
| UPDATE | yes | no | own only | no by default | technical bypass | USING owner and WITH CHECK owner |
| DELETE | yes | no | own only | no by default | technical bypass | USING owner |

Direct attempts to set another user_id must fail. Changing user_id during UPDATE must fail. Anon requests must have no privileges. Admin UI must not query these tables.

## 12. Privacy

- Purpose: personalize a future language opportunity experience from explicit user choices.
- Consent moment: explanatory copy appears before first Save.
- Boundary: all P1 fields are private and owner-only.
- Location: none collected.
- Availability, budget, identity documents and free text: none collected.
- Retention: until owner deletes the record or account.
- Deletion: owner can delete goal and capabilities; account deletion cascades.
- Export: included in the future account export; no unsupported promise in UI.
- Analytics: no P1 values or user identifiers are sent to a new external analytics provider.
- Withdrawal: deletion removes active rows immediately; cached client state is cleared.
- Inference: no inferred data. Every value is explicitly selected.
- Legacy prefill: local values may prefill but remain unsaved until explicit confirmation.

Required first-save copy, subject to i18n:

“Private to you. ARO uses these selections to shape your language experience. They are self-declared, editable, and are not shown as verified qualifications.”

## 13. Trust and safety

- Risk class: low-risk language profile input.
- Adult-only MVP remains in force; P1 collects no age or minor data.
- A capability is visually labeled self-declared.
- No capability grants hosting eligibility or bypasses teacher verification.
- No public discovery, direct contact, reporting surface or ranking is created.
- No precise place, schedule or vulnerability data is captured.
- Existing teacher application, document privacy, verified-publish trigger and admin audit systems must pass regression checks.
- Abuse risk is limited by bounded vocabularies and lack of free text.
- Stop conditions: any P1 record becomes publicly readable; teacher verification is bypassed; private values appear in logs/analytics; or cross-user RLS access succeeds.

## 14. Money / entitlement implications

N/A. P1 introduces no price, payment, balance, discount, refund, payout, subscription or entitlement. Stripe remains unconfigured and out of scope.

## 15. AI specification

N/A. P1 uses no model, embedding, inference, ranking or generated content.

## 16. API / server contract

P1 uses the authenticated Supabase client and RLS. No privileged Edge Function is required.

| Operation | Auth | Input | Output | Errors | Idempotency | Rate limit |
|---|---|---|---|---|---|---|
| Read foundation | authenticated | current session | owner goal plus capabilities | unauthenticated, timeout | safe repeat | provider/default |
| Save goal | authenticated | validated bounded goal | canonical saved goal | validation, conflict, forbidden, timeout | upsert by user_id | provider/default |
| Save capabilities | authenticated | validated bounded collection | canonical collection | validation, forbidden, timeout, partial failure | upsert natural key; delete explicit removals | provider/default |
| Delete goal | authenticated | owner goal id/current user | empty state | forbidden, not found, timeout | repeated delete succeeds as absent | provider/default |
| Delete all capabilities | authenticated | current user | empty collection | forbidden, timeout | repeated delete succeeds as empty | provider/default |

Implementation must avoid a misleading all-saved success when only one table mutation succeeded. Preferred behavior is one application operation with compensating reload and clear partial-failure recovery; an RPC may be proposed only if the implementation review proves client mutations cannot meet the consistency requirement safely.

## 17. UI / UX specification

Primary surface: a protected “ARO foundation” section within the existing participant profile. Do not replace the full profile.

Information order:

1. what this is;
2. privacy/provenance explanation;
3. learning goal;
4. capabilities;
5. Save action;
6. delete controls.

Requirements:

- Empty state invites a compact first setup.
- Populated state summarizes selections and allows Edit.
- Capability chips always include “Self-declared” context in the section, not a verified badge.
- Existing verified teacher badges keep their current semantics.
- Existing onboarding may link to or prefill this section but does not silently save P1 data.
- Save is explicit. No autosave.
- Destructive goal deletion requires confirmation.
- A capability can be removed before Save without a modal.
- Recoverable errors name the failed action and retain edits.
- Session expiry routes through existing auth behavior.
- All new strings use existing i18n conventions.
- Light and dark themes are first-class.

Required states:

- loading/skeleton;
- empty;
- populated;
- client validation;
- pending save/delete;
- success;
- recoverable error with retry;
- permission/session expired;
- stale response discarded after identity/session change;
- timeout/offline notice.

## 18. Responsive requirements

- 360px: single column, no horizontal scrolling, full-width primary action, 44px controls.
- Larger phone: comfortable chip wrapping and readable privacy copy.
- Tablet: field groups may use two columns only when reading order remains clear.
- 1440px: section stays within a readable content width and does not stretch into empty wide cards.
- Existing profile navigation and tabs must remain usable.
- Screenshots are required at 360px and 1440px in light and dark.

## 19. Accessibility

- Minimum 44x44 touch targets.
- Body text at least 16px unless an existing token is demonstrably equivalent and accessible.
- WCAG AA contrast.
- Native labels, fieldsets and legends for grouped choices.
- Keyboard complete with visible focus.
- Logical DOM and reading order.
- Save success/error announced with an aria-live region.
- Delete confirmation focus is trapped and restored.
- No status conveyed by color alone.
- Reduced-motion setting removes nonessential transitions.
- Error messages are associated with fields and explain correction.
- Capability chips expose selection state semantically.

## 20. Performance budget

A pre-implementation baseline must record the protected profile route and current build output.

Package budgets after baseline:

- initial application build must pass;
- affected profile route should add no more than 25 kB gzip JavaScript without director-approved evidence;
- primary P1 load uses at most two data requests unless a single RPC is approved;
- owner query target p95 under 500 ms in the staging region, excluding cold network setup;
- mutation target p95 under 800 ms;
- no realtime subscription;
- no unbounded lists; capability selection is bounded to 20 rows per user in P1;
- no new large image/media assets;
- no render-blocking third-party script.

If baseline tooling cannot measure a target reliably, record the gap before implementation instead of claiming a pass.

## 21. Reliability and failure analysis

| Failure | User impact | Detection | Recovery | Data consistency |
|---|---|---|---|---|
| Duplicate save | repeated request | unique constraint/pending guard | idempotent upsert and reload | one goal/natural capability row |
| Partial two-table save | goal/capabilities differ | inspect both results; never ignore errors | show exact retry and reload canonical state | no false all-saved message |
| Timeout | uncertain result | client timeout/error | reload before retry | server state wins |
| Stale response | wrong prior session shown | bind request to current user/session | discard and clear cache | no cross-session cache |
| Authorization change | request denied | 401/403/RLS result | sign in again | no mutation |
| Offline | cannot save | network state/error | retain unsaved form locally in memory and retry | do not claim persistence |
| Constraint mismatch | invalid vocabulary | database/client validation | show field error | no invalid row |
| Account deletion | stale cached UI | auth session removed | clear P1 cache | cascade deletes rows |
| Legacy prefill conflict | local choice differs from server | compare unsaved prefill/server | server state is canonical; ask before overwrite | no automatic migration |

## 22. Analytics / measurement

No external analytics is added in P1. Values such as language, outcome and proficiency must not be sent to analytics.

If an existing first-party event interface is already approved, only these value-free events may be emitted after privacy review:

| Event | Trigger | Properties | Privacy | Decision |
|---|---|---|---|---|
| aro_p1_foundation_opened | protected section shown | has_goal boolean, capability_count bucket | internal product | discoverability |
| aro_p1_foundation_saved | full save succeeds | changed_goal boolean, count bucket | internal product | completion/reliability |
| aro_p1_foundation_deleted | owner deletes data | record_type only | internal product | withdrawal usability |
| aro_p1_foundation_error | recoverable failure | operation and safe error class | operational | reliability |

No raw selections, free text, user id, email or precise timestamps beyond approved platform defaults.

## 23. Test matrix

### Unit

- validation of language, outcome, level and capability vocabularies;
- legacy-prefill mapping remains unsaved;
- duplicate capability normalization;
- mutation error and stale-session handling;
- self-declared display semantics.

### Data / RLS

- owner can select/insert/update/delete;
- another authenticated user cannot read or mutate;
- a host has only owner-equivalent access;
- admin has no default access;
- unauthenticated/anon has no privileges;
- changing user_id fails;
- account deletion cascades;
- uniqueness and bounded-row behavior pass;
- existing verified-publish gate still rejects unverified publication.

### Integration

- auth session to owner query;
- save/reload canonical state;
- partial failure does not show false success;
- repeated mutation is idempotent;
- migration applies to a clean compatible environment;
- no automatic backfill;
- existing public profile response does not contain P1 fields.

### E2E

- authenticated owner creates goal and capabilities;
- edit and remove;
- delete goal and all capabilities;
- validation;
- offline/timeout or controlled failure and retry;
- session-expiry denial;
- onboarding/profile regression;
- teacher application and verified-publish regression;
- Passport route regression.

### Visual / accessibility

- 360px light and dark: empty, populated, validation and error;
- 1440px light and dark: empty, populated, validation and error;
- keyboard completion;
- reduced motion;
- screen-reader semantics spot-check.

### Performance

- pre-code build and route baseline recorded;
- post-code build delta recorded;
- request count and query plan checked;
- package budgets passed or exception approved.

## 24. Acceptance criteria and evidence

| ID | Requirement | Verification | Evidence location | Status |
|---|---|---|---|---|
| P1-001 | Owner creates, edits and removes goal/capabilities | E2E + integration | implementation PR evidence | TODO |
| P1-002 | Privacy/purpose copy precedes first save | visual/E2E | screenshots + test | TODO |
| P1-003 | Self-declared differs from verified evidence | visual/semantic regression | screenshots + unit | TODO |
| P1-004 | Other user cannot access records | RLS role test | SQL test output | TODO |
| P1-005 | Anon and admin have no default P1 access | grants/RLS tests | SQL test output | TODO |
| P1-006 | Existing Trust, auth, onboarding, Passport and profiles do not regress | regression suite | CI/evidence | TODO |
| P1-007 | All required UI/failure states work | unit/E2E/visual | evidence bundle | TODO |
| P1-008 | Light/dark, phone/desktop and accessibility pass | visual/a11y | evidence bundle | TODO |
| P1-009 | Append-only migration and deletion behavior pass | migration/data tests | SQL/evidence | TODO |
| P1-010 | No public profile exposure, location, money, AI or matching added | hostile diff/data review | review record | TODO |
| P1-011 | Baseline and performance budgets are recorded | build/browser/query evidence | baseline + delivery record | TODO |
| P1-012 | Main/production remains unchanged until release gate | Git/Vercel review | PR/release record | TODO |

## 25. Rollout

1. Merge this specification into feat/aro-p0-director-reset after documentation review.
2. Capture P1 baseline evidence before runtime edits.
3. Create one implementation branch from the current governed ARO branch.
4. Develop against a safe local/staging database or approved Supabase branch; never experiment destructively on production.
5. Apply the append-only migration before UI requiring it.
6. Verify grants/RLS with multiple identities.
7. Deploy a Vercel preview from the P1 implementation PR.
8. Run required tests, screenshots, accessibility and performance checks.
9. Merge into the ARO branch only after director/security/privacy review.
10. Keep main and the current production Tonguee deployment unchanged until a separate founder-approved release gate.

No percentage rollout or feature flag is required for the private additive profile section unless implementation reveals a production compatibility risk. If it does, add a simple server/config-controlled exposure gate without inventing a broader flags platform.

## 26. Rollback / forward recovery

- Bad UI: revert/disable the P1 surface while leaving private rows intact.
- Migration issue: stop rollout and apply an additive forward fix.
- RLS issue: fail closed immediately, remove UI access if needed, patch policies through a reviewed migration and run cross-user tests.
- Incorrect analytics: disable emission; P1 has no required external provider.
- Unexpected Trust/privacy issue: stop data collection, hide the surface, preserve evidence privately and escalate to director/security.
- Do not drop tables automatically during rollback.
- Do not edit historical migrations already applied.

## 27. Security / privacy / Trust review

- **Reviewer:** ARO Director security/privacy review with Supabase live-metadata audit
- **Date:** 2026-08-26
- **Findings:** profiles is publicly readable; legacy grants/policies are broad; new private data must use dedicated tables, explicit authenticated policies, owner checks and no admin/public policy. Existing Trust publish enforcement must remain untouched.
- **Resolution:** dedicated owner-private tables, no backfill, no public/admin access, bounded vocabularies, strict RLS/grants and regression tests are locked in this spec.
- **Approved:** yes, for implementation after the separate baseline gate passes.

## 28. Product / design review

- **Reviewer:** ARO Product/Technical Director
- **Date:** 2026-08-26
- **Findings:** the current onboarding cadence is not a full ARO intent; the existing profile is local-state heavy; P1 should be a compact protected section, not a redesign or public rebrand.
- **Resolution:** one explicit learning goal plus bounded capabilities, private copy, separate verified semantics, additive profile UI and no silent legacy import.
- **Approved:** yes, for implementation after baseline evidence is captured.

## 29. Definition of Done

P1 is VERIFIED only when:

- spec is merged and versioned;
- baseline evidence exists from before runtime changes;
- all P1 acceptance criteria pass;
- package-relevant unit/integration/E2E tests pass;
- grants/RLS matrix passes for owner, other, host, admin and anon;
- Trust Engine and verified-publish gate regression tests pass;
- mobile/desktop and light/dark evidence exists;
- accessibility requirements pass;
- performance budget passes or an exception is approved;
- no unresolved critical/high review finding exists;
- diff contains no unrelated product work;
- migration, rollout and recovery notes are complete;
- ARO_IMPLEMENTATION_STATUS.md, ARO_SPEC_INDEX.md, ARO_CURRENT_STATE.md and ARO_CHANGELOG.md are updated;
- implementation PR records deviations and follow-ups honestly;
- main/production deployment changes only through a separate approved release gate.

## 30. Delivery record

To be completed by the implementation package:

Package: ARO-P1  
Spec version: 1.0.0  
Branch:  
PR:  
Commit:  
Acceptance:  
Unit:  
Integration:  
E2E:  
RLS/security:  
A11y:  
Performance:  
Screenshots/evidence:  
Reviewers:  
Known follow-ups:  
Release environment:  
Status:
