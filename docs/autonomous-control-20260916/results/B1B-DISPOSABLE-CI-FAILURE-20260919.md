# B1B hosted disposable-CI failure — 2026-09-19

- Task: `B1B-I02-R7-authenticated-CI-mode`
- Candidate: `6c65965758c7c695aecd343d84287e54b0e53d73` (PR #52, draft)
- Main base: `79603ae1af60a30f86c105e0f2a4d841043eb727`
- Isolated-database run: `35430717532`, job `105864669567`
- Quality run: `35430717521` — success
- Affected phase: `authenticated-synthetic-applicant-journey`

## Observed result

The disposable DB preconditions passed:

- boundary tests: 11/11;
- pgTAP: 86/86, transaction rolled back;
- authentication setup, token refresh, and application/Trust boundary phase: pass;
- cleanup: pass both in the failing invocation and explicit cleanup step.

The authenticated browser failed at:

```
FAIL authenticated-synthetic-applicant-journey: BROWSER_ONBOARDING_DRAFT_360_LIGHT
```

No screenshot artifact was uploaded because failure occurred before the first intended draft capture. The workflow’s artifact upload step recorded “No files were found”; therefore no R7 evidence exists for this candidate and it remains unreviewed/unaccepted.

## Bounded diagnosis and repair hypothesis

The browser driver moves from the language and experience swipe pages straight into broad `locator('button').evaluateAll(...)` calls. The corresponding component uses delayed/animated step transitions. This makes stale and entering controls coexist temporarily and can make the two-button invariant false before the actual draft request is reached.

The proposed repair is limited to `tools/ci/browser.mjs`:

1. wait for the semantic language/experience/avatar headings after each transition;
2. scope the swipe-button selection to the visible active step, retaining the intended selection;
3. retain the same authenticated contract, API assertions, artifact names, guard, synthetic-only data, and budgets;
4. add no product/runtime behavior and no new permissions.

This is B1B repair cycle 1 of 2. If a rerun fails outside this focused test-driver defect or the second candidate cannot produce retrievable evidence, mark it BLOCKED rather than weakening assertions.
