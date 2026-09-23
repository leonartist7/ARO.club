# Bounded execution packages

All new feature packages below are **PROPOSED v1.0**, not SPEC-READY. Owner/reviewer assignment and exact reconciled source SHA are adoption prerequisites. [SHARED-CONTRACT](SHARED-CONTRACT.md) supplies template sections 6–7 and 10–30 except where a package narrows them. No package changes backend, persistence, money, Trust, real progression or analytics.

## EF-Q — Baseline reconciliation and verification closure

**Problem:** EF1 has successful CI and partial browser evidence, while main has moved and independent acceptance is incomplete. A new implementer could overwrite newer work or mistake a preview for a released product.

**Outcome:** A pinned, reviewable integration plan and honest evidence ledger. Read-only reconciliation is eligible now. Runtime repair requires its applicable approved PV1/EF1 scope; otherwise prepare a narrow amendment.

1. Fetch main, PR60, PR61 and controller refs; record SHAs and changed paths. Identify merged/superseded work before choosing a parent. Inspect current F7 proposal/adoption state rather than relying on dated status prose.
2. Compare main changes since the preview base against preview changes. Classify conflicts by owner. Preserve newer platform/reset diagnostics. Produce `BASELINE.md` with a merge/rebase recommendation and exact overlap list; no automatic merge or release.
3. Recheck current-head CI and deployed runtime SHA. Use the approved preview/evidence environment only. Keep F7's controlled performance lane unoccupied unless its owner authorizes use.
4. Close EF1 changed-route gaps: Home, World, Create, Messages, Saved and all five personalization routes. Exercise direct entry, forward/back navigation, theme/locale, selection/dialog dismissal and reload behavior.
5. Record unresolved physical-device, assistive-tech and independent-review work explicitly. Repair a defect only when its spec and branch ownership authorize the repair.

**Files:** Proposed evidence output `docs/experience-foundation/follow-up/`; historical verification files read-only. Runtime allowlist is the selected approved package's existing allowlist, not this document. Controller ledger and F7 artifacts read-only.

**Acceptance:** Q01 all refs/current checks pinned; Q02 overlap classification complete; Q03 every EF1 changed route has evidence or precise blocker; Q04 regression and preview/network boundary checks mapped; Q05 receiving source SHA selected through normal review. Status can be VERIFIED only for the bounded reconciliation/evidence task, not the whole product.

## EF-P — Participant journey cohesion

**Problem:** Individual visual screens exist, but the sequence should clearly answer “What is this, what do I do next, and what happens afterward?” This is a refinement of the earlier FV2 direction; reconcile its proposed specification before adoption.

**Outcome:** One coherent synthetic journey from a finite Home selection to an honest Circle preview, with deterministic exits and no real commitment.

**Own existing files:** `src/views/AppHomePage.jsx`, `AppWorldPage.jsx`, `AppOpportunityDetailPage.jsx`, `AppCommitPage.jsx`, `AppCircleRoomPage.jsx`; package-specific tests. Existing `src/data/aroApp` fixtures and shared shell stay read-only.

**Proposed new files:** `src/components/experience/ParticipantJourney.jsx`, `participant-journey.css`, `ParticipantJourney.test.jsx`, `src/i18n/experience/participant.js`. Route wrappers may only be changed if required by an explicitly adopted routing decision. Existing FV1 test assertions must be preserved or justified by requirement changes.

**Screen hierarchy:**

| Screen | First viewport | Rest of page | Primary action |
|---|---|---|---|
| Home | Greeting, one possibility, short reason it fits the fictional scenario | 2–4 fixture opportunities maximum, one Season invitation | Explore this idea |
| Explore | Clear World/List switch, scope label, selected possibility | Existing fixture list with truthful count and empty recovery | View opportunity |
| Detail | Title, fixture notice, format, time/place assumptions | What happens, what to bring, accessibility/safety information where source supports it, host context | Preview joining |
| Commit preview | Summary, existing fictional seats/threshold, explicit no-reservation notice | One acknowledgment if the approved existing contract requires it | Continue to Circle preview |
| Circle | “Circle preview”, event summary and next-step explanation | Sample people, preparation, fictional conversation notice | Explore another opportunity |

On desktop the detail/commit summary may occupy a 340px side panel; on phone it precedes the action. The collective Orbit visual uses actual fixture counts, never a fabricated urgency percentage. The Circle closes visually only as an illustration of the preview state, not a booking confirmation.

**Transitions:** Browse → detail uses a valid existing fixture ID; detail → commit preserves that ID; commit → Circle follows existing fixture mapping. Reload/direct entry reconstructs the fixture from the URL and displays the preview notice. Invalid IDs show the existing invalid state with “Back to Explore.” Full/unavailable fixtures explain the state and offer another idea; they never increment capacity. Reset returns the relevant local preview state to its documented default. Double-clicking a local action has no additional side effect.

**Copy:** “Explore this idea”; “Preview joining”; “This is an example. No place is reserved.”; “See how a Circle comes together.” Translate through package EN/FR/ES copy. Preserve narrower approved truth/safety wording if it differs.

**Acceptance:** P01 full path/back works with stable fixture IDs; P02 invalid/full/direct-entry/reset verified; P03 counts match fixtures; P04 no reservation, message, server call or storage write; P05 mobile hierarchy and complete theme/locale matrix; P06 keyboard, reduced motion and performance contract satisfied. Record an integration dependency if improving a shared fixture is unavoidable; do not edit it inside this package.

## EF-C — Creator Seed Studio

**Problem:** Create currently changes illustrative Learn/Share/Gather scenes, but the user needs a legible proposal they can inspect. This extends the FV3 proposal direction without suggesting live AI or publishing.

**Outcome:** Deterministic local composition with useful review, edit, reset and exit behavior.

**Own existing files:** `src/views/AppCreatePage.jsx` and a dedicated test. Preserve the existing Back to World behavior and Create navigation label. Shared shell, participant fixtures and all provider code are read-only.

**Proposed new files:** `src/components/experience/SeedStudio.jsx`, `SeedStudio.test.jsx`, `seed-studio.css`, `src/i18n/experience/creator.js`.

**Layout:** Heading “Bring something to life.” One sentence explaining the local preview. Three labeled mode buttons. Five structured ingredients: purpose, format, place mood, timing shape, next action. Below: “Preview proposal.” Desktop places inputs left and a live readable preview right. Phone keeps controls before the preview and avoids a 620px decorative field pushing action below several screens.

**Initial proposal fixtures:**

| Mode | Purpose | Format | Place mood | Timing shape | Next action |
|---|---|---|---|---|---|
| Learn | Practice everyday French | Conversation circle | Quiet café | A short afternoon session | Review the example |
| Share | Share a useful skill | Small workshop | Welcoming community room | A relaxed weekend session | Review the example |
| Gather | Meet around a shared interest | Neighborhood gathering | Accessible public setting | An unhurried daytime session | Review the example |

These are illustrative descriptions, not verified places or availability. Use controlled choices for all five fields in this first package; free text is deferred to avoid creating an implied intent collection feature. Changing mode loads that mode's local draft. Drafts survive mode switches while mounted, but not reload or unmount. The UI says “Preview changes stay here until you leave.”

**State machine:** Initial editing → ingredient change updates draft and preview; Preview proposal → review panel; Edit → editing with values retained; Reset → confirmation only when changed → mode defaults; Cancel reset → unchanged draft; Back to World → existing route, no save promise. No “Publish”, “AI generated”, “Saved” or invented waiting animation. Review panel's primary action is “Edit this idea”; secondary action is “Back to Explore.” Do not route the custom proposal into a real opportunity ID.

**Validation:** Controlled options eliminate empty required fields. Unknown selection values fall back to mode defaults without rendering raw data. If a source fixture is missing, show an unavailable-preview message and navigation recovery, not a fake generation error.

**Acceptance:** C01 three modes have distinct valid proposals; C02 edits/mode-switch/reset semantics tested; C03 no claim of creation/publishing/matching; C04 keyboard and phone virtual viewport access; C05 three locales complete; C06 no persistence/API/AI request; C07 performance comparison. Participant-preview integration is a separate interface proposal, not silently added here.

## EF-I — Identity, Your World and Passport

**Problem:** Profile, Your World and Passport can feel like overlapping dashboards. Clarify identity, expression and lived memories while retaining Tonguee and existing profile boundaries.

**Outcome:** Users understand where to express themselves, see personal context and inspect example memories.

**Own existing files:** `src/views/AppProfilePage.jsx`, `src/views/AppPassportPage.jsx`; `src/components/personalization/PersonalizationPage.jsx` only its Your World section; `src/i18n/fv1/personal.js` only profile keys and `src/i18n/fv1/return.js` only Passport keys if dedicated copy cannot be used. Never rewrite another feature's translations.

**Proposed new files:** `src/components/experience/MemoryDetail.jsx`, `MemoryDetail.test.jsx`, `src/i18n/experience/identity.js`. Existing Passport data read-only.

**Hierarchy:** Your World begins with character/room vignette and “Make this feel like you.” Show Customize character and Decorate space as the two expression actions. Then Collection, Passport and Personal Field links, each with a one-line purpose. Avoid social follower/wealth/Trust metrics. Personal Field retains existing wants, contributions, context and boundaries; explain the illustrative/private-preview boundary. Passport begins “Your life, becoming visible,” followed by World/List controls, a labeled example-memory constellation and accessible list.

**Memory detail:** Use existing fictional entries, labeled Example. Show title, narrative, format and source-supported date/location only. “Explore a similar idea” navigates to a known route. No sharing, public visibility toggle, proof upload or synthetic verified badge. Clicking a constellation marker opens the same content as its list item. Escape restores the initiating marker/list button. View changes preserve selected entry. An empty-fixture scenario explains “Your story can begin with one small experience” and provides Explore; it is a test state, not a new actual account record.

**Acceptance:** I01 route purpose and navigation clear; I02 World/List parity and focus; I03 no duplicate page-level h1; I04 example labels on direct entry and detail; I05 no public identity/history or proof claims; I06 no lost existing profile/Tonguee affordances; I07 responsive/a11y/performance contract. EF-I must land before EF-S/X touch the same personalization view.

## EF-S — Season flagship and archive preview

**Problem:** The Season needs a coherent world, meaningful chapter invitations and lasting value beyond a generic reward track.

**Outcome:** An attractive, comprehensible Season experience with chapter detail and a clearly illustrative archive. No earned progress, reward claim, countdown or entitlement.

**Own existing files:** `src/components/personalization/SeasonExplorer.jsx`, relevant Season portion of `PersonalizationPage.jsx`, `personalization.css`, Season keys in `src/i18n/personalization/copy.js`, existing personalization tests. `src/data/personalization/catalog.js` chapter data is read-only unless an explicit catalog extension is adopted. Preserve stable chapter IDs.

**Proposed new files:** `src/components/personalization/SeasonArchive.jsx`, `SeasonArchive.test.jsx`. Keep archive as an in-page view in the current Season route for this package; a permanent public archive route requires a separate routing decision.

**Composition:** Editorial title and one quiet scene; concise premise “A new chapter of real life.” Primary “Explore chapters.” World/List control. Four chapter stops with equivalent text controls. Selected chapter detail. Small object collection. Free/Season+ explanation last, visually subordinate to participation. “At your pace” replaces urgency. Desktop uses a scene beside a 360px detail rail; phone places short scene, controls and detail in reading order, with no text baked into art.

| Chapter | Invitation | Object storytelling | Action |
|---|---|---|---|
| Step Outside | Notice a new possibility nearby in the fictional city | Lantern: a first step into the world | Existing exploration route |
| Connect | Share a small conversation | Woven bag: something brought together | Existing relevant opportunity example |
| Contribute | Bring something useful to others | Plant: care that grows | Existing contribution example if valid; otherwise Explore |
| Create | Help a new idea take shape | Ceramic Spark: a moment worth remembering | Create |

Objects are preview art associations, not promised rewards or earned ownership. Do not alter existing approved object association copy silently; adopt any changed mapping explicitly.

**States:** current chapter selected; chapter dialog open; World/List; archive preview; archive empty; image unavailable. View change retains chapter ID. Archive action opens “What a past Season could look like” with the same fictional Season, not fabricated prior participation. Return restores chapter/view. All chapters are browsable in this preview. No locked progression animation or clickable claim button. Completion, expiry, grace period, entitlement expiry and reward fulfillment remain future contracts in SCREEN-MAP.

**Season+ comparison:** Free: explore chapters and invitations. Proposed Plus: additional cosmetic expression, pending approved entitlement spec. Explicit “Concept preview. Nothing to purchase here.” Primary action on an object is “Preview object.” No prices, renewals, upgrade checkout or guaranteed free permanent entitlements.

**Acceptance:** S01 chapter world/list/detail parity; S02 all action destinations valid; S03 archive notice and return state; S04 no purchase/progress/earned claim; S05 phone no overflow in long FR/ES strings; S06 reduced-motion equivalent; S07 lazy imagery/performance; S08 keyboard and fallback screenshot evidence.

## EF-X — Collection, character and room

**Problem:** Objects should feel desirable and personal, with predictable editing and a clear distinction between trying an item and owning it.

**Outcome:** A small polished expression system using the existing five objects, hat/bag choices and five room zones.

**Own existing files:** `src/components/personalization/PersonalizationPage.jsx`, `PreviewContext.jsx`, `personalization.css`, `src/data/personalization/catalog.js`, their existing tests and personalization copy. Catalog extension is limited to descriptive/display metadata; keep IDs and placement rules. Runs after EF-S.

**Layout:** Shop/Collection uses a calm feature vignette and Wear / Decorate / Memories filters, clear names and short descriptions. Existing five-object catalog stays deliberately small. Character shows a large anchored figure, options with clear selected states, and Save preview / Cancel. Space shows the room, object selection and explicit zone selector; no precision drag required. Desktop controls sit beside the scene; phone controls sit immediately below the scene.

**Object detail:** Name, category, tactile image, short meaning, compatible destination and “Try in character preview” or “Try in room preview.” Memory object detail explains memory symbolism without claiming a real achievement. Incompatible objects cannot enter a destination. A bag remains a separate kit element until a properly composited wearable layer exists; do not place it inaccurately on the character.

**Editing model:** Maintain committed preview and draft separately. Entry copies current local preview to draft. Select changes draft. Save preview commits only to the in-memory context and announces “Preview updated for this visit.” Cancel discards draft. Remove affects draft; Undo restores the preceding draft snapshot, one operation at a time if a bounded history is implemented. Move transfers the one existing object instance between compatible zones; replacing an occupied zone makes that previous object unplaced, not deleted from the catalog. No duplication or inventory mutation. Reload resets defaults and the notice must say so.

**Transitions:** filter changes do not clear selected object; if selected object falls outside filter, close its detail or visibly retain it outside the filtered grid according to one documented choice—adopt closing for this proposal. Empty filter shows a truthful empty state and Clear filters. Closing dirty editing prompts Keep editing / Discard changes; explicit Cancel already means discard. No purchase success, owned badge or permanent save toast.

**Acceptance:** X01 draft/save/cancel/reload lifecycle; X02 placement compatibility/one-instance invariant; X03 remove/undo/replacement; X04 category/detail/destination correctness; X05 non-drag keyboard workflow; X06 truthful ownership copy; X07 alpha/anchoring asset checks; X08 phone/themes/locales/performance. Checkout and inventory persistence remain separate packages.
