# B2 hosted disposable-CI result — 2026-09-19

- Task: B2-I02-R3-protected-Trust-repair
- Candidate: b2dd8b6a4afd7299857510fd1d7891feffb6723a (PR #53, draft)
- Main base: 79603ae1af60a30f86c105e0f2a4d841043eb727
- Disposable run: 35432443191, job 105869320074
- Quality run: 35432443188, still running when this result was recorded

## Retrieved facts

The hosted workflow passed boundary unit tests (11/11), started a fresh loopback-bound disposable platform, completed clean reset, then failed during sql-isolation-first before reporting the required pgTAP 91/91 pass:

```
FAIL sql-isolation-first: PROCESS_FAILED
```

Cleanup then passed, including the explicit cleanup phase. No screenshot file or artifact was produced. The CI runner deliberately suppresses Supabase CLI output because it can include local signing keys, so the exact pgTAP assertion/error is not available from the hosted log.

## Status

B2 remains REPAIR_REQUIRED. Do not infer a B2 SQL pass, and do not start independent B2 acceptance review. A focused read-only static SQL diagnosis is the next action. Any repair must remain within the B2 allowlist, preserve the approved direct-owner/no-history contract, and use at most the remaining bounded repair capacity.
