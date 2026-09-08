# Design award evidence

Updated 2026-09-08. Source inspection and prior evidence only; this pass did not perform a fresh browser/device visual certification.

## Moments to show

| Moment | Why it matters | Existing source | Verification still needed |
|---|---|---|---|
| Want + contribution + context form an opportunity | Makes the reason for a suggestion understandable | src/features/opportunity-formation/ | Real connected version; touch, keyboard, reduced motion |
| Personal Field | Gives a person a visual place in the product | src/pages/AppProfilePage.jsx | Full responsive/light-dark coverage; truthful privacy states |
| Commitment orbit closes | Shows group progress toward a shared event | src/pages/AppCommitPage.jsx | Currently synthetic; real threshold/concurrency and cancellation states |
| Passport connects lived outcomes | Gives returning a purpose beyond browsing | src/pages/AppPassportPage.jsx | Real outcome provenance and honest empty state |

Use the existing Field/Orbit/Portal/Path/Constellation language and warm copy. Prioritize one excellent formation interaction over additional animation systems.

## Release audit

Test 360/390/430/768/1440 widths, light/dark, keyboard focus, screen-reader names/status, reduced motion, large text, safe areas and device back navigation. Cover empty, loading, retry, permission denied, offline, success and cancellation. Every control must either work or truthfully explain its state.

Known source issue: AppSettingsPage renders six button rows without actions. Current commitment copy expresses a held place after local state only, although a prototype disclaimer exists. These cannot be presented as working store functionality.

Capture before/after screens, interaction clips, accessibility results and device/frame timings under shipaton/evidence/design/. Existing generated people/scenes are illustrations, not real customers or venue/attendance proof.
