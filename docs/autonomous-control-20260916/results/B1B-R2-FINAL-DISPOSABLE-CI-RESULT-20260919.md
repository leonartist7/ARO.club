# B1B-R2 final hosted disposable-CI result — 2026-09-19

- Task: B1B-I02-R7-authenticated-CI-mode
- Final candidate: fd169e43d481c9ee25c0ed051659adb7736265b2 (PR #52, draft)
- Main base: 79603ae1af60a30f86c105e0f2a4d841043eb727
- Isolated-database run: 35431430361, job 105866637885
- Quality run: 35431430371 — success
- Artifact: GitHub Actions 10580653458, i0-2-authenticated-baseline
- Artifact digest: sha256:1d31bdf62b8a62c7b50e3d241a54506244bfce8a2150321f59039dabb50dc65d
- Durable evidence copy: Library file libfile_c4cca6b9b4408191b7484293f1db23b7, /ARO/b1b-r2-ci-artifact.zip

## Verified run facts

The Quality workflow passed. The disposable database run passed:

- 11/11 boundary checks;
- pgTAP 86/86, transaction-rolled-back;
- synthetic signup, password/refresh, and application/Trust-boundary phases;
- cleanup in both the failing invocation and explicit cleanup phase.

The R7 journey then failed exactly at:

```
BROWSER_ONBOARDING_DRAFT_CREATE_REQUEST_360_LIGHT
```

This means the browser completed the real onboarding sequence through the ready-to-submit screen, but no expected POST teacher_applications draft-create response arrived after the explicit button action. The actual cause is not asserted beyond that observed missing response.

## Retrieved evidence

The controller downloaded artifact 10580653458, computed the ZIP SHA-256, and matched it to the Actions-published digest. The archive contains exactly one file:

```
authenticated-synthetic-journey-360-light-onboarding-diagnostic.png
```

Visual inspection shows an otherwise blank rendered application viewport, with no email or password fields visible. It is a diagnostic failure capture, not required R7 success evidence. Required draft, failure, retry, server-timestamp, and 360/1440 light/dark authenticated captures are absent.

## Terminal state

This was the final permitted B1B retry. B1B is BLOCKED for this window. Do not add another repair cycle or weaken the evidence requirement. The final immutable PR #52 diff is now eligible for an independent review that must explicitly keep R7 NOT PASS. It does not authorize a merge, acceptance, deployment, release, or any product status upgrade.
