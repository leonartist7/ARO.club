# Evidence and progress ledger

Snapshot September 23. Proposal completeness and implementation acceptance are separate. All EF-P/C/I/S/X criteria begin **NOT RUN**; no prose specification is a passing test.

| Package | Specification | Implementation | Verification | Independent acceptance |
|---|---|---|---|---|
| PV1 | Existing package | IMPLEMENTED preview | Partial; original evidence applies | Not established here |
| EF1 | Existing package | IMPLEMENTED preview | Scoped local tests and current-head CI successful; browser gaps remain | Not established here |
| EF-Q | Bounded preparation defined | Not executed as a full package | Initial head/check reconciliation recorded in START-HERE only | Pending |
| EF-P | PROPOSED v1.0 | Not started | NOT RUN | Pending |
| EF-C | PROPOSED v1.0 | Not started | NOT RUN | Pending |
| EF-I | PROPOSED v1.0 | Not started | NOT RUN | Pending |
| EF-S | PROPOSED v1.0 | Not started | NOT RUN | Pending |
| EF-X | PROPOSED v1.0 | Not started | NOT RUN | Pending |

## Required evidence per implementation PR

Create a package-local evidence directory with `VERIFICATION.md`, source/build metadata, screenshots and structured observations. Use one row for every criterion ID from PACKAGES and every applicable shared-contract requirement. Fields: criterion, method, exact command/scenario, expected result, observed result, artifact, tested SHA, status, reviewer. Allowed outcomes PASS / FAIL / BLOCKED / NOT RUN; a skip is not PASS.

| Check | Method | Required scope |
|---|---|---|
| Source baseline | Record refs, tree, dirty status and dependency eligibility | Before any runtime edit |
| Build/lint | `npm run build`, `npm run lint` | Exact final source |
| Types | `npm run type-check` when not already covered by the recorded build gate | Exact final source |
| Behavioral tests | Relevant existing and new Vitest suites | Each state transition and boundary the package changes |
| Route semantics | Existing parity lane where applicable | Links, back/forward, direct entry, invalid IDs |
| Layout | Browser screenshots and overflow measurements | 320, 390, 768, 1440 × light/dark for each changed route |
| Localization | Inspect live strings and controls | EN/FR/ES at 320 and 390, both themes; no clipped essential text |
| Keyboard | Manual or browser-driven full task | Focus order, visible focus, dialog trap/Escape/return, no drag-only step |
| Text/reflow | Browser settings/style fixture | 200% text size and 320 CSS px reflow; no lost actions |
| Motion | Actual reduced-motion browser preference | Equivalent completion of the task without spatial animation |
| Assistive technology | Screen-reader task script and recorded tester/environment | Names, roles, selected states, status messages; automated audit is supplemental |
| Phones | Physical iPhone Safari and Android Chrome when available | Safe area, browser chrome, keyboard, landscape, touch; record unavailable as BLOCKED |
| Boundary | Network/storage audit on tested path | No newly introduced provider/write/persistence behavior; preserve approved existing boundary |
| Performance | Same-profile before/after artifact | JS/CSS/image transfer, requests, layout shift, interaction and load metrics |
| Visual review | Paired full-page and task-state screenshots | Hierarchy, brand coherence, legibility, usable controls, actual app rather than concept art |

Do not rerun unrelated F1–F6 audits or F7's controlled lane for a small package. Existing CI is useful regression evidence, not a substitute for the specific changed-feature evidence. A docs-only handoff needs link/path/scope validation, not a runtime build.

## Task scripts

1. Participant: Home → opportunity → joining preview → Circle → Explore; repeat direct entry and invalid ID. Verify no reservation appears.
2. Creator: choose each mode, change two ingredients, switch away and back, review, edit, cancel/reset, exit and reload. Verify no publish/save claim.
3. Identity: Your World → Personal Field → Passport; select the same example memory from World and List. Close with Escape and inspect returned focus.
4. Season: select Contribute, switch World/List, inspect object, close, open archive preview, return. Verify selected chapter survives view changes and no reward is claimed.
5. Expression: try hat, cancel; try again, save preview; move lantern between compatible zones; replace occupied zone; remove; undo; cancel; reload. Verify one instance and documented reset semantics.

## Review rubric

Score each from 1–5 with screenshot/task evidence: task clarity, ARO identity, mobile reachability, typography/readability, interaction completeness, inclusive access, truthful state, visual consistency. Any broken primary task, misleading claim, inaccessible control or boundary violation blocks acceptance regardless of visual score. The score is a critique aid, not a substitute for criteria.

For planning progress, count accepted criteria over the fixed criterion set of an adopted package. Never mix proposed screens, implemented components and shipped capabilities into one percentage. Scope additions change the denominator explicitly. Release percentage is not computed until release scope and gates are fixed.
