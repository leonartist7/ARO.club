# ARO-CB1-F1 — Unconnected Circle Builder logic foundation

> Delivery: Phase 1 continuation is IMPLEMENTATION-IN-PROGRESS. The recovered head `550bb95` passes all five main CI jobs; the v1.0.1 correction needs fresh exact-head verification. See `artifacts/ARO-CB1-F1/VERIFICATION.md` and `docs/circle-builder/EXECUTION-PLAN.md`.

## Authority and scope
Version 1.0.1, 2026-10-01. Status: **SPEC-READY for pure, unconnected foundation code only** under the founder's explicit "Can you start building it up?" request. This specification is written before repository source edits. User-facing CB1 remains SPEC-REQUIRED; CB0's asset/privacy/design/performance prerequisites are preserved.

Preparation parent: PR #99, `e9b61701d64db052684f853c99cb739c2c397fae`, based on main `97d9086b1bfb6946653f6ee6baea481cbdc894c5`. Implementation branch: `codex/circle-builder-foundation-20261001`. Governing: AGENTS.md, ARO master delivery plan/playbook, architecture/data/design/Trust documents, ADR-CB-001 and CB0 sections 6, 8-15, 23-24. Durable scope record: ADR-CB-F1 in DECISIONS.md.

This first slice supplies reusable JavaScript values/functions and their tests. No application screen, route or provider consumes these files. It adds no dependency and changes no legacy fixture/state machine. Runtime connections are not authorized by this narrower specification.

The founder's 2026-10-01 continuation requests one phase at a time, durable updates and accepted main integration. ADR-CB-PHASES authorizes Phase 1 foundation correction and dependency-ordered main integration after required checks. It supersedes this package's earlier no-main-delivery instruction only for the accepted unconnected foundation. It does not waive CB1 screen or live gates. This amendment is committed before v1.0.1 source edits.

Version 1.0.1 corrects the existing unknown-step contract: getGuidance must accept only string step names that are own keys of the selected category's prompt dictionary. Inherited names (including constructor, __proto__, toString, valueOf and hasOwnProperty), non-string values and object-coercion attempts return null without conversion or mutation. Add focused regressions across all three categories; preserve valid localized prompts and English fallback.

## Problem and output
Create has no reusable category-to-guide mapping or editable builder transition model. Add:
- a frozen category/guide registry with Languages/Tonguee/chameleon, Skills/Squilly/squirrel, Music/Rockatoo/white-cockatoo;
- EN/FR/ES labels, safe curated prompts and indoor public-place examples;
- accent-tolerant localized category search and English fallback;
- a pure reducer for Choose -> Shape -> Details -> Review -> local sketch ready;
- validation, edit/back/reset confirmation and incompatible-category confirmation;
- explicit example acceptance that never overwrites touched fields;
- a normalized local sketch summary with null undecided logistics.

Music is a presentation category, not launch eligibility. Guide identity derives from category and cannot authorize an action.

## State and contract
Caller constructs ephemeral state via createBuilderState; reducer takes current state plus an allowlisted action and returns a new state. It does not read browser/user/profile data. States are choose, shape, details, review, ready. Actions: SELECT_CATEGORY, CONFIRM_CATEGORY, CANCEL_CATEGORY, SET_FIELD, SET_ANSWER, USE_EXAMPLE, NEXT, BACK, EDIT, MINIMIZE_GUIDE, REQUEST_RESET, CANCEL_RESET, CONFIRM_RESET.

Title/outcome required before Details: trimmed 1-80 / 1-240 characters. Optional audience/place description and category answers max 160 trimmed characters. Optional group size 1-50 and duration minutes 1-240 whole decimal numbers; empty means undecided. These are local example bounds, not live capacity/date/payment authority. Non-public venue identifiers fail validation. No date/time fields in F1; those need the screen/package contract.

Unknown actions, fields, category IDs, example IDs and non-string values are ignored. Category answers are allowlisted per category. Nonempty category answers trigger confirmation before changing category. Shared manual edits survive; incompatible category answers and untouched old example defaults are cleared only through the defined category-change path. Pending dialogs block navigation/data edits. Reset of meaningful state requires request/confirmation; cancellation preserves fields.

USE_EXAMPLE is an explicit acceptance action, not a remote recommendation. It fills untouched empty fields only, including a curated venue type. User-cleared fields remain touched and empty. Example data never contains a real host, attendee, venue availability or demand count.

sketchSummary is a display sketch, not a server payload or authorization result. Unknown/non-public venue values and invalid numeric values become null. No published/saved/booking/price/qualification state is added.

## Data, privacy, RLS, money, AI and API
N/A with rationale: these files are not imported into any runtime consumer, read no personal/browser data and perform no I/O. There is no table, migration, RLS, Storage, provider, analytics, API, model, money or entitlement change. Test strings are synthetic. Privacy/Trust/design review is still required before a later screen captures user input. No self-approval of those later gates is implied.

The eventual integration must retain transient handling, no inputs in URL/storage/network, existing session/host/category rules and separate live-draft/publishing specifications.

## UI, assets, accessibility and performance
No UI or asset implementation in F1. Existing app routes, themes, language preferences, central Create navigation and Coco assets are untouched. New modules are reachable through tests only; confirm no runtime import before delivery. They do not change route bundles, requests or user-visible performance. CB1 artwork and measured UI budget remain pending.

## Verification and acceptance
| ID | Requirement | Verify |
|---|---|---|
| F1-01 | Exact category/mascot/species mapping, EN/FR/ES indoor examples and localized search | registry cases |
| F1-02 | Four-step validation and manual paths across all categories | reducer cases |
| F1-03 | No lost manual input on example/category/back/reset operations | preservation/confirmation cases |
| F1-04 | Unknown/prototype fields and guidance steps, non-string/coercion steps, invalid numeric values and category answers handled | negative cases |
| F1-05 | Immutable transitions, optional help and truthful normalized summaries | frozen-state/summary cases |
| F1-06 | No runtime consumers, dependencies, UI, schema or external writes | complete diff + consumer scan |
| F1-07 | Existing repository quality and new Vitest cases pass | hosted exact-head Quality and platform checks |

The local shell remains unavailable. Direct V8 source execution of the test cases with a small assertion adapter is supplemental evidence, explicitly not installed Vitest/build/lint/browser evidence. Hosted CI must provide the latter. Those hosted results are now recorded for source 094818d. The final delivery documentation head must also pass required checks before main integration.

## Rollout, recovery and review
The scoped PR targets the CB0 preparation branch while #99 is open. Merge preparation #99 only after its checks pass; retarget foundation #100 to current main after the parent merges, then merge only its accepted exact head. Use normal merge ancestry, expected-head checks and current-main reconciliation. The founder authorized this Phase 1 main integration on 2026-10-01. No user-facing release or runtime connection is included. Rollback removes only the unconnected new modules/spec/evidence and status additions; it changes no data. Self-review covers exact scope, immutable state and tests; any high findings remain blockers.

## Delivery vocabulary
After code creation: IMPLEMENTED / PARTIAL VERIFICATION. VERIFIED requires all F1 acceptance evidence and required CI. F1 completion does not make CB1 UI SPEC-READY or implemented, and does not authorize assets, publishing, live drafts, AI or store readiness.
