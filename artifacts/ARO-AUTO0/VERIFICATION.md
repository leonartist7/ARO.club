# AUTO0 verification

Date: September 8, 2026. Package: ARO-AUTO0 1.0.0. Status: IMPLEMENTED / LOCAL CHECKS PASSED; cloud adapter execution and schedule integration require independent results.

## Local evidence

- `node --test tools/autonomy/core.test.mjs`: 16 tests passed. Covers immutable revisions, concrete packet generation, dirty/nested source rejection, output overlap and symlinks, malformed/stale/tampered reports, evidence traversal, dependency completeness, import overwrite protection, dispatcher revision enforcement, source rechecking, historical memory and browser artifact validation.
- Full public-repository bootstrap at H0 merge `06730c74b44d1a6ee1da24c4d1d1ed721313df5c` succeeded in a new disposable temporary checkout. Required documents were committed and available; all seven packets were generated. `check-source` returned clean; readiness correctly kept lead and implementation ineligible without reports. The temporary clone was subsequently removed to reclaim disk space; its inventory is preserved in h0-source-inventory.json.
- Initial npm invocation failed with ENOSPC on the founder machine. Only the test's own disposable clone was removed. Retrying through the installed Node binaries passed strict ESLint, 73 existing tests across five files (36.03 seconds) and production build (2623 modules, 17.51 seconds).
- The built main JS remains 604.45 kB / 193.55 kB gzip and CSS 129.34 kB / 19.62 kB gzip, identical to H0. Existing chunk-size and stale browser-data warnings remain. No product source, runtime dependencies or schema changes are included.
- `node --check` passed for the core, CLI and browser collector. Git diff whitespace check passed before staging.

## Cloud verification contract

The PR's ARO audit evidence job must run the controller tests, prepare a clean pinned source, build, collect the 150 browser observation matrix and upload the matching artifact. This job is a collector: it never marks A1–A3 completed or unlocks implementation. Actual workflow and artifact IDs are reported in the delivery PR/task after execution; no future success is asserted here.

Existing cloud setup separately reported A4, S1 and C1 schedules created; A1–A3 were blocked on browser capability and lead on report dependencies. AUTO0 supplies an alternative browser evidence environment but does not prove cloud artifact retrieval or final worker schedule activation until the coordinator verifies those steps.

## Self-review and limitations

No paid AI/API integration, deployment credentials, automatic product writer or auto-merger. Sources and memory are data; generated packets preserve governing authority. Evidence hashes validate integrity, not truth or review independence. Canonical lessons require independent verification and reviewed promotion. Artifact retention is finite, and private cloud task attachments are not assumed universally retrievable.

Browser observations deliberately report limited keyboard coverage, forced DOM themes, reduced-motion-only capture and local resource timings. Full navigation interactions, composited contrast, screen-reader behavior and real-user performance remain worker audit scope or explicit gaps. Any failed cloud capture/retrieval blocks dependent claims; it cannot be silently reclassified as passing source inspection.
