# Verified execution lessons

These lessons describe tooling behavior, not product authority. Revalidate when the cited source or environment changes.

## L-001 — A GitHub link does not provision a checkout

- State: VERIFIED by the observed cloud A1 preflight failure and local AUTO0 bootstrap/packet tests.
- Source: published H0 revision 06730c74b44d1a6ee1da24c4d1d1ed721313df5c; cloud task “Visual Audit Preflight Stop” 6a9fbcf6-d1a4-83e8-8611-76f63572b5b4.
- Observation: the audit had repository context but lacked AUDIT_SHA, CHECKOUT_ROOT and AUDIT_OUTPUT_ROOT and correctly stopped.
- Lesson: dispatchers must provision actual disposable paths and inject the exact SHA before starting work. AUTO0 packet generation supplies those inputs.
- Limit: provisioning does not establish browser, network, account or provider access.

## L-002 — A build pass does not establish browser capability

- State: OBSERVED / environment-specific; recheck on each cloud environment change.
- Source: cloud setup task 6a9fbdd1-0584-83e8-89e5-27bb2d3e32db reported Node 24, lint, tests and build success but blocked browser URL access and Chromium installation on September 8, 2026.
- Lesson: use a verified browser execution environment and retain browser evidence separately. Never substitute source inspection for a browser audit silently.
- Limit: this is a cloud setup report, not a claim that all ChatGPT environments have the same restriction.
