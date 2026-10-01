# ARO execution phases

Coordination plan, 2026-10-01. [Dashboard](README.md). This plan defines bounded next work and preserves the existing package gates. It does not reorder P1→P2→A1/P3→P4→P5, grant a new money/category/AI/native policy, or make future packages SPEC-READY.

| Phase | Deliverable | Exit evidence |
|---|---|---|
| 0 Organize | PR inventory, current-state corrections, one roadmap and failure register | Complete inventory, preserved unique work, checked links, scoped documentation PR |
| 1 Stabilize accounts | Accept and integrate AUTH2/AUTH3 in order; verify backend migrations, worker, monitoring and all hosted account journeys | Final-head security/privacy acceptance; hostile RLS/session/deletion proof; production synthetic journey |
| 2 Circle Builder foundation | Finish #99/#100 recovery and guide-key regression fix; reconcile the recovered brief | Required checks/reviews, normal ancestry, main SHA, no runtime consumer in foundation |
| 3 Builder experience | Approved mascot art and field contract; complete Choose/Shape/Details/Review route | Manual/example/edit/reset paths; accessible mobile/desktop flow; no false saved/published state |
| 4 Private data | CB2 save/resume/revision/delete plus required P1 private goal/capability foundation | Owner-only RLS, conflict/retry, export/retention/deletion integration |
| 5 Host and supply | Reviewed lesson/evidence, host/category eligibility, safe publication and real discovery | Server enforcement, human decisions/appeal, approved lesson versions and live provenance |
| 6 Participation | P2 intent, A1/P3 explainable suggestions, P4 commitments, booking/notification loop | Privacy aggregation, evaluated human-approved suggestions, concurrency/cancellation/idempotency |
| 7 Paid pilot and outcomes | Separately approved marketplace money package; P5 attendance/Proof/Passport | Payment/refund/payout reconciliation, disputes, actual completion and learner materials |
| 8 Production web MVP | Complete host and learner journeys, operations, policy/support, recovery and performance | V1 release matrix passes; controlled pilot and observation |
| 9 Stores | Native package, signed beta builds, device checks and current platform policy review | Store-ready evidence and submission receipts; approval recorded separately |
| Later Full vision | Adjacent verticals, Seasons, AR, venue intelligence and subscriptions | Independent approved packages after core-loop gates |

## Executable queue

| Task | Work and owner lane | Dependency | Acceptance and handoff |
|---|---|---|---|
| ORG1-01 | Inventory all PR metadata; ancestry-check open heads; close only contained heads | Audited main | 100 records, 46 comparisons, 22 closure receipts; unique work kept |
| ORG1-02 | Commit current snapshot, source brief, gap register and plan; check links/scope | ORG1-01 | Markdown/JSON only; canonical history preserved; protected PR checks |
| Q0-NEXT | Investigate document chooser failure and retain repeatability evidence | Current main logs; scoped corrective authority before code | Unchanged original assertion; final-head platform PASS; recurring-failure diagnosis recorded |
| AUTH3-REVIEW | Independent final-head security/privacy review and disposition of seven findings | #98 immutable final head and governing docs | Written review acceptance; scope-aware resolved threads; no self-certification |
| AUTH3-INTEGRATE | Recheck #97/#98 readiness; integrate parent then child and verify main | AUTH3-REVIEW, required checks, parent release-block supersession | Normal merge ancestry; main SHA; no runtime activation before rollout criteria |
| AUTH3-ROLLOUT | Live migration diff/order, backup, worker/cron/purge/exception operations and hosted account matrix | Accepted AUTH3; provider authorization/capabilities | Synthetic owned tests only; receipt/Storage/Auth erasure and recovery/session/RLS proof; flags activated under spec |
| CB-F1-RECOVER | Finish active owner correction and regressions on #99/#100 | Fresh heads and Phase 1 authority on #99 | Checks/reviews at final heads; parent→child merges; unconnected consumer audit |
| CB1-SPEC | Map recovered brief, four-screen UI, six-stage content, art/accessibility/performance | Accepted foundation; design/privacy/Trust reviewers | Field mapping and reviewed asset manifest; measurable route/request budget; SPEC-READY before screens |
| CB1-SCREENS | Choose/Shape, Details/Review modules in small PRs, then full route integration | CB1-SPEC | Manual/example/hide-guide/edit/back/reset/category/exit flows; narrow phone/desktop/focus/reduced-motion/error evidence |
| P1-CB2 | Private goal/capability foundation and independent private draft package | Parent I0/Trust/Auth gates and respective SPEC-READY specs | Hostile owner/other-user/admin RLS; save/resume/conflict/retry/delete/export/retention/deletion |
| HOST-CB3 | Category policy, lesson/evidence review, approved-version publishing and real discovery | Verified data/Trust; explicit publishing spec | Server verified-host gate, review reasons/appeal, idempotency, safe public provenance; policy choices recorded |
| P2-A1-P3 | Explicit private intent/aggregate demand, AI foundation and explainable human-approved suggestions | Verified P1 then P2; approved AI package | Privacy suppression, source provenance, eval/cost/latency/manual fallback; no auto-contact/publish |
| P4-OPERATE | Commit/withdraw/cancel, capacity/deadline, booking, delivery notifications and support | Verified P3 and approved state/notification contracts | Atomic seats, retry/idempotency, honest interest vs booking, host/participant state, operational errors |
| MONEY-PILOT | Prices/fees/currency/tax/refund/payout and marketplace provider integration | Separate approved money/legal/security spec | Server authority, test-mode signature/webhook/reconciliation; live activation accepted independently |
| P5-PROVE | Attendance/outcomes, correction/dispute, materials/reflections/Passport | Verified P4; P5 spec | Attributable provenance and privacy; eligibility inputs cannot be fabricated |
| V1-WEB | Host and learner complete-loop matrix, accessibility/performance/security/operations audit | Verified core dependencies and selected pilot scope | Backup/restore/rollback, support/deletion/privacy truth, monitored controlled pilot; no absent feature advertised |
| NATIVE-PLAN | Native runtime/wrapper decision and server-route/deep-link/OAuth/keyboard/offline strategy | Own architecture spec; may prepare alongside core | Approved decision/budget, platform IDs/signing custody and test plan |
| NATIVE-DELIVER | Signed iOS/Android beta builds, device account/deletion/payment matrix, store disclosures/reviewer access | NATIVE-PLAN plus verified advertised product | Device/beta receipts and current policy matrix; submissions/approvals recorded separately |

## Launch policy gaps to resolve in their owning specs

The original brief's three-attendance eligibility rule, founding-host exception, initial 1–2 learners and review after four hosted sessions must be explicitly accepted or revised before server behavior. Proposed broader publishing categories do not override Tonguee-first/category gates. Decide the pilot category/area and paid or free scope in the governing package; do not infer a global launch from catalog imagery.

For iOS assess Apple [login services](https://developer.apple.com/app-store/review/guidelines/#login-services) applicability to Google login and offer the required equivalent option unless a documented exception applies; this is a native readiness task, not an AUTH3 provider change. Apple [account deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/) and Google [in-app/web account deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en) must be tested against actual behavior. Assess user-content reporting/blocking/moderation and transaction classification against the exact native features. Privacy/support/data declarations must match actual collected data, retention and SDKs.

## Each phase uses one delivery record

Package/spec version; exact source SHA; branch/PR/dependency; named criteria and evidence; CI/review links; mobile/desktop/locale/theme evidence when relevant; schema/RLS/money results when relevant; deployment/integration SHA; limitations; remaining gate; next task. Snapshot current remote main/branch before work and coordinate exclusive file ownership. This chat's ORG1 work does not edit active AUTH or Circle Builder source.
