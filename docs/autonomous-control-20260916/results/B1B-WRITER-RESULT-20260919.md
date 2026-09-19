# B1B writer result — 2026-09-19

- Task ID: `B1B-I02-R7-authenticated-CI-mode`
- Claim: `B1B-20260919-001`
- Immutable implementation base: `998b39b7fc9af32d632882442a53dad47e8710ce`
- Published candidate head: `6c65965758c7c695aecd343d84287e54b0e53d73`
- Reviewable candidate: PR #52 (draft)

## Scope completed

The approved R7 amendment changed only:

- `src/config/ux0.js`
- `tools/ci/browser.mjs`
- `tools/ci/run.mjs`

It adds a fail-closed UX0 default and a two-part disposable-CI browser exception: a compile marker plus HTTP loopback origin. The runner removes any inherited marker, injects it only into an IPC-authenticated disposable browser child, and does not expose synthetic credentials through command-line arguments, environment variables, logs, or screenshots.

The child flow is specified to prove a synthetic authenticated applicant journey: draft before submit, editable document surface, intentional upload failure, retry success, explicit successful submit with server timestamp, and 360/1440px light/dark profile captures.

## Local verification (writer-reported)

| Command/check | Result |
| --- | --- |
| two-part UX0 guard command | pass |
| `npm run lint` | pass |
| `npm test` | 136 passed, 3 skipped |
| `npm run build` | pass |
| `node --test tools/ci/boundary.test.mjs` | 11 passed |
| `git diff --check` | pass |

Hosted disposable database/browser CI was intentionally not run locally. It is now running under GitHub Actions for the published head.

## Required next validation

Do not mark R7 proven from this result. Retrieve the hosted artifact, verify its digest and filenames, inspect screenshots for the expected authenticated journey, then send the immutable head and retrieved evidence to a non-writing independent reviewer. No merge, package acceptance, deployment, or release is authorized by this result.
