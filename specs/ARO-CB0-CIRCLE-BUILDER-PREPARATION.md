# ARO-CB0 — Circle Builder preparation

## 0. Metadata

- Status: **SPEC-REQUIRED — preparation only; runtime not implemented**.
- Spec version: 0.1.0, 2026-10-01.
- Owner/director: ARO founder.
- Preparation branch: `codex/circle-builder-preparation-20261001`.
- Reviewed baseline: `97d9086b1bfb6946653f6ee6baea481cbdc894c5`.
- Authority: founder's 2026-10-01 request to prepare implementation and explicit mascot mapping; ADR-CB-001 in `DECISIONS.md`.
- Governing documents: `AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`, `ARO_BUILD_PLAYBOOK.md`, `ARO_ARCHITECTURE.md`, `ARO_DATA_MODEL.md`, `ARO_DESIGN_SYSTEM.md`, `ARO_EXPERIENCE_SYSTEM.md`, `ARO_TRUST_SAFETY.md`, UX2 and RB17 specifications.
- Required review for the later local prototype: product/design, accessibility, privacy/Trust boundary.
- Deliverable now: product flow, mascot contract, implementation checklist, acceptance matrix.
- Proposed successor: CB1, a bounded local preview; CB2 private drafts and CB3 publishing each need their own specification and dependencies.
- Source limitation: the attachment titled "ARO Circle Builder MVP and Implementation Prompt.md" could not be read or downloaded. This document derives from the founder's written chat instructions and inspected source; it is not a transcription of that attachment.
- No approval, test, asset or release status is inferred from this preparation.

## 1. Problem

Create currently lets a visitor select Learn, Share or Gather and inspect static examples. It does not help someone turn an idea into a clear experience. The founder wants an easy, clear and beautiful Circle-building flow with approachable category mascots helping shape the experience.

## 2. User outcome

The proposed first milestone lets a visitor choose a category, use an example or write an idea, shape the experience with short guide prompts, and review an editable local sketch. The user understands the outcome, people, place and time without completing a long form or chatting through a transcript.

## 3. Why now

The existing Create route, central navigation action, localization, themes and local formation prototype provide presentation foundations. A scoped preview can validate the proposed experience while live account/draft/publishing dependencies are resolved elsewhere. It does not unlock P1-P5, new categories or publishing.

## 4. Goals

- Four primary screens: Choose, Shape, Details, Review.
- Three initial category guides; extensible registry for later guides.
- Examples and a manual start at the same level.
- Helpful contextual suggestions with explicit user acceptance.
- A live sketch that visibly develops as the user adds details.
- Indoor public venues supported in all three example sets.
- Mobile-first clarity, keyboard access, themes and existing localization.

## 5. Non-goals

CB0 changes documentation only. The proposed CB1 preview does not introduce remote AI, an account/profile write, browser-storage drafts, telemetry, geolocation, venue availability, publication, participant recruitment, booking, payments, earnings projections or a new dependency. It does not rename legacy Tonguee/Coco assets or migrate vertical identifiers. Live capabilities require later specifications.

## 6. Locked decisions and invariants

| Category | Guide name | Species | Guidance focus |
|---|---|---|---|
| Languages | Tonguee | Chameleon | Target language, practice level, activity, speaking outcome |
| Skills | Squilly | Squirrel | What people make/practice, prerequisites, materials, achievable outcome |
| Music | Rockatoo | White cockatoo | Instrument/voice, experience level, practice format, equipment and venue suitability |

Names and species come directly from the founder's 2026-10-01 request. Squilly is the spelling for this builder. The legacy Coco component remains unchanged; using or renaming its art requires an explicit asset decision.

Music has its own visible discovery pill and guide. This is a presentation distinction, not independent category eligibility. A mascot is a guide, never proof of a host's qualifications. Opportunity is the arrangement, Circle its cohort/operating group, and Experience a vertical format. "Build your Circle" may be friendly interface language without creating new backend entities.

## 7. Personas and permissions

For the proposed local preview, signed-out and signed-in visitors may change their own transient sketch. Host/admin status does not grant additional preview behavior. Nobody receives public content or another user's draft. There are no service-role operations. Later live drafts must use server-enforced owner access; later publication preserves verified-host/category gates.

## 8. User journeys

### Four-screen flow

| Screen | Main content | Guide behavior | Primary action |
|---|---|---|---|
| 1. Choose | "What would you like to bring to life?" Searchable Languages / Skills / Music pills; relevant examples; "Start with my own idea" | The selected guide introduces its role in one short sentence | Shape my idea |
| 2. Shape | Editable title and one outcome question; optional level/activity choices according to category | Offers a short example and one optional improvement | Add the details |
| 3. Details | Progressive groups for people, place and time; only the current group expanded | Helps with duration, group size, materials and indoor/public venue context | Review my Circle |
| 4. Review | Clear summary of outcome, audience, category, guide and entered logistics; Edit links return to the relevant group | Summarizes actual entered details and flags omissions | Finish my sketch |

Screen 1 uses examples or a manual idea without requiring a separate mascot-selection screen. Guide selection follows the category; visitors can minimize help or continue manually. Input focus remains under the user's control.

Example: Languages -> Tonguee -> "French over coffee" -> "Practice ordering and introducing yourself" -> beginner adults / indoor cafe / illustrative 45 minutes -> Review. These are example defaults the user accepts or edits, never actual inventory or a confirmed session.

Equivalent examples: Skills -> Squilly -> a drawing practice sketch in an indoor public studio; Music -> Rockatoo -> a beginner guitar practice sketch in a public rehearsal space. No home address or real availability is implied.

### Back, change, exit

- Back/Edit preserves in-memory input.
- Category change checks whether category-specific answers become incompatible. Explain affected answers and require confirmation before clearing them. Preserve shared title/outcome/logistics when meaningful.
- Removing help hides the guide panel, not validation or instructions.
- Exiting offers Keep editing / Discard sketch when there are meaningful edits; controls belong to the builder, including its shell exit.
- Reload resets the preview. Say "This sketch stays here while you build it. It isn't saved or published" before editable input.
- On finish: "Your sketch is ready. It hasn't been saved or published." Offer Edit sketch and Start another; no share link or fake saved-draft URL.

## 9. State machine

States: CHOOSE, SHAPE, DETAILS, REVIEW, SKETCH_READY. Back returns to the preceding editable stage. REVIEW edit targets return to Shape or the requested Details group, with an explicit return to review. RESET requires confirmation when meaningful edits exist.

A local reducer controls transitions and validation. REVIEW requires a category, trimmed title and outcome. Date/venue may remain "To decide" in a sketch; do not invent a schedule, availability, attendance or booking. The Details screen distinguishes undecided logistics from explicitly entered ones.

Every transition is visitor-initiated, synchronous, local, reversible and without an external side effect. Invalid transitions preserve input and point to the relevant field. There is no fake saving spinner or publication state.

## 10. Data specification

Proposed transient state:
- categoryId: languages | skills | music.
- ideaSource: example | own.
- guideId: tonguee | squilly | rockatoo, derived from category.
- title: trimmed text, 1-80 characters on review.
- outcome: trimmed text, 1-240 characters on review.
- categoryAnswers: allowlisted fields defined by that category's local registry.
- logistics: optional adult audience/level, group-size sketch, duration, explicitly entered date/time/timezone, public venue type and coarse place description.
- guideMinimized, step, editedFields, validationErrors: UI state.

Validate reasonable field lengths and finite whole-number sketch values. Render user text as text, never HTML. Client state is not an authoritative capacity, date, price or eligibility record.

No new entity, migration, index, backfill or persisted record in CB1. No private home address, contact details, identity document, live location, participant names or monetary fields. The future live specification must define exact field types and limits, retention and export/deletion, schema reuse and account-deletion integration.

## 11. RLS and authorization

N/A for CB0 and the proposed transient preview: no database/API operation. This is not an RLS bypass or authorization design for live drafts. CB2 must specify hostile owner/other-user/anonymous/admin tests and preserve the current Trust boundaries.

## 12. Privacy

Editable inputs are transient and may contain personal text despite guidance. A privacy review must accept the CB1 field set and memory-only handling before SPEC-READY. No values in URL/search params, localStorage, sessionStorage, logs, crash reporting or analytics. No network request may contain builder input. Route changes discard component state after the exit decision. Preview copy distinguishes memory-only editing from saving.

Existing theme/language preferences keep their own authorized persistence; the builder must not store its inputs through those contexts.

## 13. Trust and safety

Use adult example formats and public venue types. Category pills are preview choices, not live launch approvals. Restricted services are not examples or publishable custom categories. "My own idea" remains within the selected preview category and cannot create a public taxonomy entry.

No guide gives legal, medical, financial or safety certification. The proposed curated suggestion library uses harmless examples and manual editing. Live host eligibility, moderation, reporting, jurisdiction, venue suitability and category policy remain separate prerequisites.

## 14. Money and entitlements

N/A: no price, payout, earning estimate, subscription gate, credits or payment action. Real-world marketplace money remains separately governed.

## 15. Mascot assistance and AI

CB1 uses deterministic, curated guidance; no inference provider. Do not label it AI chat, imply understanding of arbitrary text or pretend there is a conversation.

Each guidance item has categoryId, step/group, prompt, example, suggested field change and explicit eligibility predicate. Suggestion controls show proposed content before acceptance: "Use this idea", "Try another example", "I'll write it". A suggestion never overwrites a touched field automatically.

Guides share one behavior contract:
- greet when introduced; ask one relevant question;
- wait while the visitor types; no typewriter interruption;
- offer a brief, optional example;
- acknowledge an actual completed field calmly;
- explain the next useful decision;
- keep validation visible even when minimized.

Tone: Tonguee welcoming and conversation-focused; Squilly practical and resourceful; Rockatoo encouraging and rhythm-conscious. No baby talk, excessive jokes, nagging, fake praise or income promises.

Later AI assistance requires A1 and a dedicated package specifying consented inputs, structured output, moderation, hallucination handling, cost/latency, failure fallback and explicit approval. That package cannot publish, book or charge automatically.

## 16. API / server contract

N/A: no endpoint/RPC/server action for the preview. Existing route metadata/shell may request their authorized resources; builder inputs are never transmitted. Network acceptance compares against the same-route baseline rather than asserting that the entire app never contacts its own backend.

## 17. UI / UX

Use orange-led ARO tokens, ivory surfaces and existing licensed typography. One dominant action per screen. Category pills wrap naturally; search has a proper label and helpful empty result. Examples stay limited and varied, including indoor options.

The guide is adjacent to the current question, not an extra mandatory step or a floating overlay over controls. Default compact guide on phones; larger contextual illustration in the desktop side panel. No chat transcript. No mascot animation loop.

The Circle sketch develops through outcome, people, place and time. Any orbit shows **sketch completeness**, with text explaining its meaning. A closed illustration never claims collective commitment or "The Circle is real"; no fake participant dots/counts, demand or confirmed attendees. Real commitments belong to the later governed core loop.

Review presents "To decide" for absent optional logistics and useful Edit controls. Primary preview action is Finish my sketch, not Publish, Save or Invite.

Required states: category empty-search, selected example, manual idea, field validation, suggestion accepted/declined, guide minimized, incompatible category-change confirmation, exit confirmation, asset loading/failure, review with undecided details, local completion, reset. Remote saving/timeout/session-expiry states belong to CB2, not fake CB1 UI.

## 18. Responsive requirements

Verify 320, 360, 390, 768 and 1440 CSS-pixel widths, including short phone height and keyboard-open layout. Footer action respects safe areas and cannot overlap the shell bottom navigation or focused field. The existing central Create link currently becomes a World exit on Create; coordinate its discard behavior with the builder instead of adding a second competing primary button.

Desktop adds a persistent readable sketch beside the current form. Phone reveals the sketch through an accessible expandable preview and displays the compact guide before the question. Full character silhouettes use contain sizing; do not crop wings, tail or face.

## 19. Accessibility

44px minimum control targets; >=16px essential copy; AA contrast; semantic labels and field error associations; keyboard-complete step/edit/confirmation flow. Category pills announce selection. Focus moves to the next heading after explicit Next/Back, not after every pill or suggestion. Announce relevant validation and completion politely without reading decorative progress continuously. Dialogs restore focus. Reduced motion retains identical meaning with static poses.

## 20. Performance and assets

Record the existing Create route's JS transfer, rendered timings, asset requests and CLS before fixing the implementation budget. This remains a SPEC-READY prerequisite; no performance PASS is claimed now.

Reuse existing dependencies and tokens. Curated registry/guidance is local and small. Render only the active guide; reserve artwork dimensions; optimize reviewed source art and lazy-load inactive guides. No video, 3D, external font, remote avatar service or new animation runtime.

Reviewed production artwork for all three guides is not identified in the inspected tree. Existing Coco is an emoji-based component and is not evidence of approved Tonguee/Squilly/Rockatoo art. Obtain consistent original/licensed assets and record provenance, rights, dimensions, weight, alt treatment and approved poses before shipping. A development fallback must truthfully label the guide and render a stable static category icon; it is not final mascot artwork.

Suggested shared pose set: welcome, thinking, pointing, ready. Rockatoo remains recognizably a white cockatoo with contrast/outline on ivory. Future guides use the same rendering contract.

## 21. Reliability

| Failure | Recovery |
|---|---|
| Artwork fails | Stable labelled category icon and all guidance/actions remain usable |
| Search finds no category | Clear search; keep the three available categories visible |
| Suggestion is irrelevant | Decline it and keep manual input unchanged |
| Category change invalidates answers | Confirm affected fields; preserve compatible shared fields |
| Browser reload | Reset as disclosed; never claim recovery of an unsaved sketch |
| Network unavailable after initial load | Local interaction continues with available assets; no save promise |
| Invalid field/step | Preserve input, show a specific error and focus the affected field |

## 22. Analytics

No new analytics in CB1. Evaluate through synthetic usability sessions and test evidence without collecting real builder input. Future events require a purpose, property/retention/privacy contract.

## 23. Test matrix

Meaningful unit tests: category-to-guide mapping; reducer transitions; trimmed validation; preserved edits; incompatible-field confirmation; suggestions cannot overwrite touched fields; unknown category/guide fails to the available manual path.

Component/browser tests: example and own-idea path for all three categories; minimized guidance; keyboard/focus/error recovery; edit from review; undecided logistics; cancel/discard; legacy mode query compatibility; safe-area/shell overlap; artwork failure; no user input in URLs/storage/network; static reduced-motion equivalent; EN/FR/ES and theme regression.

Run repository build/lint/types/tests and focused production browser checks. Existing auth/Trust fixtures remain regression coverage, not proof of new live category eligibility.

## 24. Acceptance and evidence

| ID | Requirement | Verification | Status |
|---|---|---|---|
| CB-01 | Three founder-specified names/species and category mapping | Registry + asset/product review | NOT RUN |
| CB-02 | Four-screen example and manual path in all three categories | Reducer/component/browser tests | NOT RUN |
| CB-03 | Help is optional; accepted suggestions preserve user control | Component tests + keyboard walk | NOT RUN |
| CB-04 | Input/edit/category-change behavior is loss-aware | Transition + browser cases | NOT RUN |
| CB-05 | Indoor examples and undecided logistics remain truthful | Copy/Trust review + browser | NOT RUN |
| CB-06 | Preview never claims persistence, publication, demand or commitment | Copy + URL/storage/network audit | NOT RUN |
| CB-07 | Full mascot rendering, mobile shell/keyboard fit and accessible states | Phone/desktop/theme captures | NOT RUN |
| CB-08 | Build/lint/types/relevant tests and exact-head CI pass | Command logs + hosted checks | NOT RUN |
| CB-09 | Baseline and approved performance budget pass | Same-route before/after metrics | NOT RUN |
| CB-10 | New docs/registries record exact state and reviewed boundaries | Diff/documentation review | NOT RUN |

Evidence for CB1 belongs under `artifacts/ARO-CB1/`. All current rows describe future implementation, not work verified in CB0.

## 25. Rollout

CB0 is documentation preparation on an isolated branch/draft PR. No production mutation. CB1 stays a truthful local preview until its spec/reviews/evidence permit release. CB2/CB3 need separate runtime authority. Recheck main and open owner branches before starting CB1; the pinned baseline is historical once new work lands.

## 26. Recovery

A future UI revert restores existing Create while preserving unrelated auth/rebrand work. No database rollback is needed for CB1. No legacy route, fixture, evidence or mascot asset is deleted.

## 27. Security / privacy / Trust review

Not performed for the proposed implementation. Required before CB1 becomes SPEC-READY: memory-only input/privacy boundary, truthful category/host semantics, and no remote data or new eligibility. CB2/CB3 require their respective deeper reviews.

## 28. Product / design review and remaining preparation

Founder supplied the three names/species and easy/clear/pretty goal; this is direction, not approval of unseen artwork or a rendered interface. Complete attachment reconciliation if available, reviewed assets, measurable performance budget and required boundary/design review before marking CB1 SPEC-READY. CB0 makes those prerequisites explicit without requesting repeated approval of the stated mascot choices.

## 29. Definition of verified implementation

CB1 is VERIFIED only with approved/versioned spec, each CB acceptance row passed, relevant tests/CI, responsive/theme/a11y evidence, baseline/budget comparison, no unresolved high findings and synchronized project ledgers. Verified preview does not imply live saving/publishing or store readiness.

## 30. Preparation delivery record

Package: ARO-CB0.
Scope: documentation only.
Runtime/schema/provider changes: none.
Baseline: exact main SHA in metadata.
Source review: Create, AppShell, CocoMascot, UX2, current package scripts and governing documents.
Implementation tests: not run; no runtime edited; local exec workspace provisioning failed.
Attachment: unreadable; written founder requirements captured with source limitation.
Status: SPEC-REQUIRED, preparation draft.
