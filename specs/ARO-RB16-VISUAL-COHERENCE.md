# ARO-RB16 — English/light visual coherence

## Metadata and authority

Status: SPEC-READY; version 1.0.0; founder authorization: 2026-09-29 scoped continuation request. Branch: `codex/rb16-visual-coherence-20260929`, based on verified remote RB15 `a0cef112380f34f9c47c2a7e160fbbe4561fcf2e`. PR targets RB15 and remains unmerged.

Governing: AGENTS.md, master delivery plan, build playbook, ARO_DESIGN_SYSTEM.md, ARO_EXPERIENCE_SYSTEM.md, RB0–RB15 contracts, rebrand baseline/ledger, and `docs/rebrand/reference/ARO-approved.png`. This is a bounded continuation of RB13 presentation authority and RB14 preference accessibility, explicitly authorized by the founder; it does not change brand direction or release gates.

## Problem, outcome and scope

The integrated preview still changes visual language between ivory public entry and dark Create/detail surfaces. Mobile artwork can compete with overlaid labels, dense headings and small logistics copy. Visitors should recognize the same orange/ivory identity while following the existing introduction, Home, Explore, Create and opportunity-preview journey.

Compare mobile/desktop renders first. Correct concrete type, spacing, orange/ivory hierarchy, art placement and navigation mismatches using existing components/assets. Inspect public/account/supporting routes and signed-out host/admin entries. Preserve full-image onboarding and F1–F6 semantics, package history, theme/language behavior and F7 evidence. Correct still-valid inherited CodeRabbit findings without claiming specialist approval.

## Locked boundaries, permissions and states

No dependency, Auth, schema/RLS, provider, retention, eligibility, host verification, inventory, analytics, AI, messaging, booking or payment changes. Existing fixtures remain explicitly fictional. No invented live host, demand, review or income evidence. All roles retain existing permissions. Theme and language use existing contexts/storage only. Existing local preview state transitions, validation, empty/error/retry/loading states and destinations remain unchanged; no new data entity/API or business state machine. Existing server/Trust gates remain authoritative.

## Responsive, accessibility and performance

Capture 320×620, 390×844, 768×900 and 1440×900; inspect phone/desktop core routes, ordinary dark and FR/ES regression. Maintain 44px targets, visible keyboard focus, readable body copy, reduced motion and zero horizontal overflow. Language menu supports wrapped Up/Down, Home/End and Tab exit. No new asset/font requests; first mobile illustration remains under the existing 250KB target. Record image loads/bytes and limits; no unmeasured performance claim.

## Acceptance and evidence

| ID | Requirement | Verification |
| --- | --- | --- |
| RB16-1 | Rendered core routes converge on approved hierarchy and preserve complete onboarding art | Before/after screenshots, source review |
| RB16-2 | Public/account/support/host entries remain truthful and navigable | Route sweep, redirects, errors/network/overflow checks |
| RB16-3 | Theme/language, keyboard menu and reduced motion work | Preference tests, ordinary browser regression |
| RB16-4 | Build/lint/types/unit/relevant browser/E2E gates run on final source | Local logs, exact-head hosted CI |
| RB16-5 | CodeRabbit reviews a ready PR and each finding receives a disposition | Review record plus final-head recheck |

Evidence: `artifacts/ARO-RB16/VERIFICATION.md` and before/after browser results. Required independent privacy, Trust, design/accessibility and protected stack/release decisions remain open. IMPLEMENTED / PARTIAL VERIFICATION until they pass; no production-ready claim. Rollback reverts only this scoped presentation PR; no data migration or destructive recovery.
