# N1 chooser diagnostic final evidence

Claim N1-CHOOSER-DIAG-20260921-001; exactly one authorized attempt. Head66d77dfe2f7f9424aa40fb414e57167ddec873fc, PR54 draft/unmerged. Controller independently verified all exact-head checks SUCCESS, clean tracked source, ZIP hash, all16JSONs and all4 onboarding-ready images. Independent source-diff review already accepted diagnostic instrumentation.

Quality35608883433 static106362727298/browser-smoke106362728056 SUCCESS. Platform35608883428/job106362728176 SUCCESS. Owner reports91SQL twice,all4 journeys,recovery/password change,logout revocation,5accounts reset0,cleanup. Run https://github.com/leonartist7/ARO.club/actions/runs/35608883428/jobs/106362728176.

Artifact10643396088,4003994bytes, expires2026-09-28T14:01:09Z. SHA25619f8bba4c6eec86d18a51bdea29372e8909c0d3382e87ae290eb176c38f3581d independently matched. Persistent local archive C:/Users/leona/Documents/Web dev/ARO/shipaton-evidence/N1-66d77dfe/authenticated-baseline.zip. Contains32PNG+16JSON. This local archive preserves evidence beyond hosted artifact expiry, not public submission access.

## Diagnostic results

All8 initial/retry cases: button focused/connected,document focused,input present/connected true;ariaDisabled false. Trusted Enter and button click observed; existing product input.click observed untrusted. Every Enter completed and chooser observed in2–4ms. No diagnostic error. This proves those observations on this run only. Earlier chooser failures remain unexplained; instrumentation changes timing and success cannot establish cause or a flake classification. No extra run or product repair was performed.

## Contrast and performance

All4 heading contrastJSONs: foreground rgb(31,41,55),background rgb(255,255,255),ratio14.67911847763172:1. Controller visually inspected onboarding-ready images at360/1440 light/dark: heading legible. The narrow heading contrast criterion is VERIFIED on this successor head. Earlier f72cff12 failed run remains historical and is not retroactively passed.

| Case | Auth p95 ms | Data p95 ms | Samples |
|---|---:|---:|---|
|360-light|135.206|48.242|1Auth/34data|
|360-dark|119.089|33.287|1Auth/34data|
|1440-light|122.659|52.214|1Auth/34data|
|1440-dark|124.451|41.313|1Auth/34data|

All below unchanged1000ms synthetic CI budget. Not hosted latency or full performance acceptance.

## Disposition and next gates

Diagnostic collection VERIFIED/CLOSED; contrast criterion VERIFIED on66d77dfe; full N1/I02-08 remain unaccepted. Retain unexplained historical chooser failures as reliability limitation for final review, with no unsupported root-cause claim. No further diagnostic reruns authorized by this claim.

Mobile fixed-nav screenshot overlap requires actual viewport/scroll reachability evidence before obstruction is confirmed or dismissed; no navigation repair here. Human NVDA/founder visual acceptance, hosted confirmation/recovery/SMTP/dedicated production backend, F7 ownership/gates, and migration payload regression remain separate. No merge, hostedSQL/provider or release action. Existing owner returns to its remaining authorized gates; this result adds no authority.
