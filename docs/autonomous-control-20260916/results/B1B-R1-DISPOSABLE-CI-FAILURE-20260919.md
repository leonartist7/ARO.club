# B1B-R1 hosted disposable-CI failure — 2026-09-19

- Task: B1B-I02-R7-authenticated-CI-mode
- Failed candidate: c502aa378b151bb2651a621628106834184df288 (PR #52, draft)
- Main base: 79603ae1af60a30f86c105e0f2a4d841043eb727
- Isolated-database run: 35431096853, job 105865693987
- Quality run: 35431096907 — success

## Result retained

The focused transition/scoping repair did not cause any broad regression: Quality passed; boundary tests were 11/11; pgTAP was 86/86; authentication setup, refresh, application/Trust boundaries, and both cleanup paths passed.

The run again failed in the active R7 path:

```
FAIL authenticated-synthetic-applicant-journey: BROWSER_ONBOARDING_DRAFT_360_LIGHT
```

The current stage has insufficient granularity to identify the exact interaction. No files were present at the screenshot artifact path, so no artifact uploaded. This is not a pass and does not supply any R7 evidence.

## Final bounded repair authorization

Claim one final B1B in-scope test-driver repair only in tools/ci/browser.mjs:

1. attach precise non-sensitive stage labels to each onboarding transition/request;
2. retain all existing assertions, synthetic-only data, artifact requirements, budgets, and guards;
3. on onboarding failure after login, emit one credential-free diagnostic screenshot only after confirming no email/password input is visible, so the existing CI artifact mechanism can retrieve it;
4. make no product, workflow, dependency, provider, SQL, access-control, or assertion changes.

If this third hosted candidate fails or fails to produce retrievable evidence, B1B becomes BLOCKED. Do not add another retry.
