# ARO — autonomous chat handoff, 2026-09-15

Status: documentation reconciliation and preparation dispatch only. Founder request: update required handoffs after F1–F7 work and prepare separate autonomous chats. This does not approve another runtime or visual implementation package, merge, deployment, release, provider mutation or scheduling.

## Verified repository snapshot

Source main: `79603ae1af60a30f86c105e0f2a4d841043eb727`. Read-only GitHub PR metadata and fetched first-parent Git history were inspected on 2026-09-15. PR-body test claims are attributed prior evidence, not tests rerun by this handoff.

| Slice | Integration commit | Evidence |
|---|---|---|
| F1 + F2 | `7815c976c284ec4ea92cf56d51aed5daf977bbcb` | merged [PR #41](https://github.com/leonartist7/ARO.club/pull/41); accepted F1 `c0813087f9f4f0b6d5b4dc6930030d5942457298`, F2 evidence `d1313f942b93ad50dbb0f244c71157eef03e571b` |
| F3 | `764d47d650aae71910c9bfffcc0d510227b1ee13` | merged [PR #43](https://github.com/leonartist7/ARO.club/pull/43) |
| F4 | `b74ea6352264c5e0f1c79c15516866d143941eeb` | merged [PR #44](https://github.com/leonartist7/ARO.club/pull/44) |
| F5 | `dc8701e17df8297bcf0bb9d85828e83573140343` | merged [PR #45](https://github.com/leonartist7/ARO.club/pull/45) |
| F6 | `79603ae1af60a30f86c105e0f2a4d841043eb727` | merged [PR #46](https://github.com/leonartist7/ARO.club/pull/46) |
| F7 | no accepted integration | draft [PR #48](https://github.com/leonartist7/ARO.club/pull/48), head `123a31f25ed5ce5faae7d5484f578622b2f57ca2` |

F1–F6 are IMPLEMENTED / merged with slice CI evidence; this is not integrated FV-1 VERIFIED or SHIPPED. Do not rerun these slices, H0 A1–S1 audits or lead synthesis.

## F7 ownership and remaining gates

- Preserve branch `codex/fv1-f7-acceptance-evidence`, PR #48 and original F7 task base above. Never reset it to this snapshot or dispatch a second F7 writer.
- [PR #47](https://github.com/leonartist7/ARO.club/pull/47), head `eec03532558e18e3ea0ce600efbda8a584be4880`, records founder approval of Intel Xeon Platinum 8272CL for F7 measurement only. It was OPEN, not merged, at inspection. Recheck actual state before execution; approval is not proof of merge.
- After amendment integration, the F7 owner must explicitly reconcile its governing spec reference without changing the accepted product base. Exact Playwright 1.62.0 / Chromium 151.0.7922.34 revision 1234 install and launch remain mandatory, together with every other §20 condition, 4× CPU throttling, three-run method, budgets and accessibility thresholds.
- Integrated acceptance, independent nonwriting review, proficient human NVDA/Chromium on Windows testing and founder visual review remain outstanding. An automated summary is not independent acceptance.
- §20 requires no concurrent task on the measurement host. Separate chats/worktrees do not prove host isolation. Preparation work may run on other hosts; pause it on the measurement host during controlled F7 measurements.
- The documentation PR overlaps F7's future status-file ownership and PR #47's changelog. Do not merge it while either owner writes those paths. Reconcile the final documentation diff with their latest heads serially. This task does not merge any PR.

## Start separate chats

Use each packet below in its own existing ChatGPT/Codex cloud task. These are finite tasks, not schedules. Select Terra / high if available; report the actual selection only if exposed. No paid model API fallback. Complete one useful output and stop; no polling/coordinator loops.

| Chat | Packet | Can start before F7? | Deliverable |
|---|---|---|---|
| 1 | [FV2-PREP](FV2-PREP.md) | Yes, source read-only | proposed participant journey spec and implementer handoff |
| 2 | [FV3-PREP](FV3-PREP.md) | Yes, source read-only | proposed creator journey spec and implementer handoff |
| 3 | [I0-REVIEW-PREP](I0-REVIEW-PREP.md) | Yes, repository evidence only | exact remaining infrastructure/reviewer action matrix |

All three own separate external output directories and no repository files. Their proposals remain PROPOSED, never SPEC-READY by self-approval. Return complete output text plus retrievable files using the task's available persistence. If file delivery fails, include the full packet in the reply and state the limitation. No private attachment URLs in public GitHub.

Before starting, fetch this documentation branch and pin its full commit as HANDOFF_SHA. Check out source at the exact SOURCE_SHA in the packet into a separate clean path. If newer main changes relevant source, report a bounded drift comparison and use the pinned snapshot for the proposal; do not silently rebase the analysis. This handoff works before its documentation PR is merged.

## Whole-plan queue

| Area | Current useful work | Execution boundary |
|---|---|---|
| FV-1 F7 | existing owner's acceptance and review work | lab, independent and human gates retained |
| FV-2 / FV-3 | packets above | no UI writes before approved package/dependencies |
| FV-4 return / FV-5 system states | later bounded design proposals informed by F7/FV2/FV3 | avoid duplicate planning now |
| FV-6 walkthrough | later clearly synthetic story/script | no store or launch-readiness claim |
| I0 / I0.2 | evidence gap preparation | hosted Auth was deferred; no provider actions in this dispatch |
| P1 | existing SPEC-READY package remains BASELINE BLOCKED | complete I0 and authenticated/RLS gates first |
| N1 / X1 | later platform decision and experience foundation | P1 then N1 dependencies unchanged; no migration now |
| P2 → ARO-A1 → P3 → P4 → P5 | later intent, AI foundation, Catalyst, commitment, Proof | package specs and sequential gates required |
| Seasons / AR / Beacons / money expansion | preserved strategic direction | no implementation dispatch |

C1 remains the existing read-only weekly lane. No schedules were inspected or changed by this task; preserve the existing schedule and checkpoints. Corrected document hashes do not mean C1 has passed or FV-1 acceptance is complete.
