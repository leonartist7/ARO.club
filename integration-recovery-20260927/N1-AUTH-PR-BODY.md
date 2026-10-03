The staging Auth recovery email now uses a token-hash link to the app callback. The older local migration checkout used a recovery redirect with an existing `next` query, which did not fit the revised template. This PR carries the clean redirect, redacted callback diagnostics, an email-confirmation hash test, and clearer error copy onto current `main`.

It preserves the production account guards and authoritative role checks on `main`. It does not change Supabase settings, schema, RLS, keys, or production Auth.

Validation: the focused callback and Auth configuration suite passed 9 tests with one Vitest thread worker; lint and the production build passed. The first default-worker test attempt timed out before running tests. The build reported a cache-persistence warning because the local disk filled after route generation; generated caches from completed worktrees were removed. The previous local staging recovery link opened the reset form once and rejected reuse, but this reconciled PR has not received hosted Auth acceptance.

Fresh signup confirmation, password-change/login, hosted callback alignment, role lookup, and independent security/privacy review remain open. This PR stays draft until those gates are resolved.
