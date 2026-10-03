# ARO-CB1-F3 — Details, Review and local completion

## 0. Metadata
Status: SPEC-READY · version 1.0.0 · 2026-10-03 · owner: ARO founder.
Branch: codex/circle-builder-phase4-details-review-20261003. Depends on CB1-F1 v1.0.2, reviewed CB1-P and CB1-F2 v1.0.0, merged #103 at1f3d4038334c7d3f7b95e7a9dc389954fc121746/tree279ce458. Blocks CB1-F4/Phase5. Governing: AGENTS, master/build playbook, CB1-LOCAL-PREVIEW v1.0.0, docs/circle-builder SCREEN-CONTRACT/ARTWORK/PERFORMANCE/SOURCE-RECONCILIATION v1.0.0, architecture/data/design/experience/Trust. Reviews: privacy/Trust and product/design/accessibility. Founder explicitly requests Phase4 completion and phased main integration.

## 1. Problem
Choose/Shape are isolated; people cannot yet review undecided logistics or complete a truthful local sketch through the component flow.
## 2. Outcome
Enter optional People/Place/Time, see actual entered text, edit a named section, return to Review, finish and restart without a saved/published claim.
## 3. Why now
Phase3 verified and merged normally; exact-head five checks and identical tested tree observed. Phase4 completes modules before route connection.
## 4. Goals
SCREEN-CONTRACT exact fields, one active group, actual live summary, targeted edits, truthful ready, reset confirmation, localized accessible manual paths.
## 5. Non-goals
No app route/shell integration, owned-navigation guard, save/publish, new schema/auth/API/provider/dependency/telemetry/AI/money/location. Phase5 owns route/exit/reload/performance certification.
## 6. Invariants
Only category/title/outcome required; all optional omissions “To decide”. Group size1–4 excludes hosts and confers no capacity. Date/time/zone are a plan, never availability or a booked instant. No private address/contact; render text. Preserve compatible answers/touched edits and cancellation.
## 7. Permissions
All visitor roles use only their active in-memory sketch; no database/server entity or cross-user read/write. RLS unchanged.
## 8. Journeys
Choose→Shape→Details→Review→Ready; optional logistics empty/populated/partial. Review Edit Shape or People/Place/Time opens target only; valid submission returns directly to Review; Back to review retains current edits without undo. Ready Edit sketch→Review; Start another uses Keep editing/Start another confirmation. Category incompatible answers retain existing confirmation rules and return Choose after accepted change.
## 9. State machine
Add detailsGroup (people/place/time/null), reviewReturnTarget (shape or details:people/place/time/null), reviewFocusTarget (same/null). Allowlisted group toggle; pending category/reset locks navigation/mutation. NEXT validates required and supplied optionals, expands/focuses first invalid target; EDIT from Review/Ready sets return and focus target, BACK during targeted editing returns Review with current edits. Ordinary BACK retains previous step. Confirm reset creates empty state; repeated requests do not replace a pending category/reset dialog.
## 10. Data
Transient fields retain raw strings and trim validation/summary: audience/placeDescription max160; groupSize optional decimal1–4; public venue allowlist unchanged; duration optional decimal1–240; date actual calendar YYYY-MM-DD with year1–9999; time24h HH:mm; timeZone optional valid Intl IANA zone max80. Both date and time require explicit zone. No inferred zone, Date instant, DST/availability claim, migration, retention or export entity. Registry gains shared date/time/zone and group maps; summary filters destination category keys.
## 11. RLS
N/A: no operation or permission changes; existing Trust regression required.
## 12. Privacy
Memory-only/loss notice precedes editable inputs. No input in URL/storage/requests/console/analytics/serveractions/beacons; no automatic geolocation/timezone. Coarse public place helper excludes private address/contact. Component unmount loses state. Phase5 owns complete shell/unload audit.
## 13. Trust
Adult audience helper; only public venue options. No host eligibility/approved seats/bookings/attendee count/certification/income. Sketch guide groups are not live categories.
## 14. Money
N/A: no fees, payouts, prices or entitlements.
## 15. AI
N/A: existing static guide prompts only; no external inference or proposal expansion.
## 16. API
N/A: pure reducer and controlled components; no external operation.
## 17. UI
Details heading→People/Place/Time toggle groups→actions→guide and actual sketch. Form first/preview second; >=1024 side panel, smaller Show my sketch disclosure. Labels/helpers/limits/no truncation; errors associated and polite overall validation. Review summary/category/guide→title/outcome/category answers→People/Place/Time→reminder; Finish my sketch primary; named Edit secondary. Ready exact truthful unsaved/unpublished message, same actual summary, Edit sketch primary, Start another secondary confirmation. No artificial loading/wait; synchronous local validation/empty/populated/confirmation/ready and artwork fallback states. No remote retry/permission states because no remote operation.
## 18. Responsive
320/360/390/768/1440 widths, phone stack/disclosure, desktop readable aside; long entered values wrap; short viewport scrollable, no fixed new chrome. Full shell safe-area/keyboard certification Phase5.
## 19. Accessibility
44px controls,16px essentials, AA tokens and >=3:1 input borders. Button aria-expanded/controls for groups; fieldsets/legends, associated error/helper, visible focus. Explicit transitions focus headings; invalid closed group opens and focuses field after commit. Review returns focus edited summary. Native reset modal named/trapped/Escape cancel/non-destructive initial focus/trigger restoration. No looping motion; reduced-motion equivalent.
## 20. Performance
No active-route imports; existing Create335015 encodedJS/19JS/34resources baseline must remain unchanged, verify existing CI measurement. Existing optimized guide source and reserve geometry, active guide only; no originalPNG/dependencies/fonts. Whole-route paired budgets remain Phase5. Fixture metrics are not field WebVitals/INP.
## 21. Reliability
Invalid numeric/calendar/zone/overlong input stays intact and blocks Review; omitted optional values remain undecided. Target switches preserve text, cancellation retains current edits, pending confirms lock unrelated actions. Missing art retains guide text/manual operation. No network duplicate/retry/concurrency effect.
## 22. Analytics
N/A: no new tracking; synthetic canary only.
## 23. Tests
Preserve F1/F2 regression coverage; explicitly update historical F1 numeric50 expectations to new4 boundary and old Edit/BACK expectation to targeted-return contract. Add leap/calendar/time/zone/UTF16/injection/allowlist/pending/navigation/reset and component flow cases for3groups/3locales. Isolated production Vite browser fixture uses existing tooling, native dialog, widths/themes/locales, all groups/edit/partialplan/hideguide/fallback/canaries and actual captures. No test app route.
## 24. Acceptance
|ID|Requirement|Verification/evidence|Status|
|---|---|---|---|
|F3-01|Exact optional fields,1–4,calendar/time/zone|domain/component/browser; artifacts/ARO-CB1-F3|PENDING|
|F3-02|Single group/live actual sketch/undecided display|component/browser/captures|PENDING|
|F3-03|Targeted edit/direct return/focus/preservation|domain/component/native keyboard|PENDING|
|F3-04|Truthful ready/reset cancellation/confirmation|domain/component/native dialog|PENDING|
|F3-05|Locales/themes/responsive/art/manual/a11y|30browser cases and light/dark phone/desktop captures|PENDING|
|F3-06|No input I/O/Trust authority/route unchanged|canary/source/specialist/unchanged baseline|PENDING|
|F3-07|Quality/regressions/reviews/evidence|lint/types/tests/build/allfive exact-head jobs and reviews|PENDING|
## 25. Rollout
One branch/PR, isolated modules only. Commit this authority before runtime. Connect route only Phase5 accepted complete-flow package. Normal expected-head protected merge after gates; no bypass.
## 26. Recovery
Revert only this bounded UI/reducer package if needed; no data rollback. Preserve concurrent AUTH3/ORG1 and newer main. No recovery promise for memory-only input.
## 27. Privacy/Trust review
Required independent review before merge; findings/evidence recorded, no self-approval.
## 28. Product/design review
Required independent product/design/accessibility source/capture review before merge.
## 29. Verified gate
All acceptance rows evidenced; meaningful regressions/full quality pass, exact-head five jobs and independent reviews accepted, no blockers/unrelated scope; canonical records and durable receipts updated. No connected-app/full CB1 certification.
## 30. Delivery
Phase3 observed merge1f3d403/tree279ce458. Phase4 source/tests/captures/reviews/checks/main receipt recorded by its PR and artifacts/ARO-CB1-F3. NextPhase5 CB1-F4 route/shell/release verification; CB2/CB3/full-source packages remain separate.
