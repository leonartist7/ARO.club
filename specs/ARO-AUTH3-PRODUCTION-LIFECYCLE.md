# ARO-AUTH3 — Production account lifecycle

## 0. Metadata

- Status: SPEC-READY for implementation under the founder's 2026-10-01 instruction to finish signup, login, logout and account deletion. Release requires the evidence below.
- Version: 1.0.0; owner: ARO founder; durable decision: DECISIONS.md ADR-033.
- Base: PR #97, 48bd61893ba68e86ef25c3ddd7ba9f3656d5bd5c. Branch: codex/aro-auth-production-20261001.
- Governing documents: AGENTS.md, ARO_BUILD_PLAYBOOK.md, ARO_ARCHITECTURE.md, ARO_DATA_MODEL.md, ARO_TRUST_SAFETY.md, AUTH1, AUTH2.
- Independent security/privacy review remains mandatory before merge or live migration.

## 1–6. Problem, outcome and locked scope

AUTH2 accepts requests but has no processor. Logout does not close the outstanding JWT window. Account entry needs consistent passwords, reliable recovery, OAuth return paths and server-enforced adult eligibility.

Implement authenticated email/Google entry and existing-user eligibility, safe session/account switching, eight-character minimum passwords, recovery cleanup, a discoverable deletion entry, actual deletion for accounts without unresolved marketplace/Trust records, anonymous completion receipts, retries and a 30-day resolved-request purge. Preserve the Next/Supabase stack and existing verified-only publish controls. No new client dependency, payment operation, identity verification claim or analytics.

Adult eligibility is a self-declared birth date evaluated by the database, not proof of identity or age. The date is neither stored nor logged. All existing accounts must pass the same check; metadata cannot grant eligibility. Google users can have an Auth record before the check, but cannot use account data or marketplace operations. Deletion and recovery remain available to them.

## 7–13. Permissions, data, privacy and safety

- app_private.account_eligibility: user_id cascading to Auth, server timestamp and accepted terms version. Only the checked RPC may create it; no client table grant. Purged with the account.
- app_private.account_deletion_jobs: request_id cascading to AUTH2, SHA-256 receipt hash, lease time, bounded attempt counter and enumerated error code. No email, reason, credentials or raw birth date. Purged with the resolved request after 30 days.
- Authenticated RLS access requires a live auth.sessions row matching the signed session_id and user_id. Eligibility additionally protects account/marketplace data; recovery and deletion use only the live-session rule. Public profile/teacher/experience presentation excludes ineligible and processing owners.
- Deletion initiation requires a session created within 15 minutes and an explicit confirmation. Same-origin POST, expectedUserId cross-tab assertion, server getUser, validated opaque receipt cookie and no cached responses.
- Worker claims use row locks and a 10-minute lease. A claim revokes existing sessions; access remains denied throughout processing. A privileged Auth ban stops new sign-ins while processing. Storage erasure uses the Storage API, never raw metadata deletion.
- Any booking involving the account, protected verification history, or account-associated audit entry blocks automatic erasure. These records need a reviewed disposition/retention decision; the worker must not invent it or delete money/Trust history. These exceptions require an internal monitored operator before public rollout. Users must never be required to contact support to initiate deletion.
- Account rows are erased by the Auth admin API only after Storage cleanup. Existing cascade behavior removes profile and unreviewed content. Failed/ambiguous calls stay retryable; a missing Auth row reconciles completion. Completion is recorded only after Auth deletion succeeds or absence is verified.
- The receipt reveals only pending/processing/completed state and timestamps. A random 256-bit secret is stored in an HttpOnly, SameSite=Strict cookie; only its hash is stored in the private job. No public UUID-based status lookup.

## 14–16. Money, AI and server contract

No money, subscription, refund or AI behavior. Financial/Trust exceptions remain release gates for affected accounts. Apple sign-in/token revocation requires the native/provider package; no Apple provider is introduced here.

| Operation | Caller | Contract | Failure/idempotency |
|---|---|---|---|
| api.account_access_status | authenticated | active/eligible/deleting flags | fail closed |
| api.confirm_adult_eligibility | authenticated | transient birth date, fixed terms version | reject under 18; repeat adult confirmation is idempotent |
| POST /api/account/deletion | signed-in same-origin owner | confirm=true; receipt cookie | recent session; one open request per user |
| GET /api/account/deletion | receipt holder or signed-in owner | status/timestamps only | receipt required for signed-out access |
| GET /api/internal/account-deletions | cron | exact bearer CRON_SECRET | off by default; server-only key/ref/environment validation |
| service-only deletion RPCs | service role | claim, inventory, finish/error, queue health, purge | ten-minute lease, bounded pages and retries |

## 17–22. Experience, reliability and budgets

Use existing light/dark primitives and EN/FR/ES copy. Include loading, eligibility rejection, validation, submission, status, retry and reauthentication states. Preserve one main landmark, labels, visible focus and 44px targets at 360px and 1440px. Publish a 30-day processing maximum only when a staffed queue and deployment are verified. Show completed receipt after the account session disappears.

OAuth uses the existing query-free allowlisted callback. A ten-minute, same-origin return cookie carries a validated relative path; the callback validates again and deletes it. Recovery takes priority over any return cookie. No redirect allowlist expansion is needed.

Requests have 10-second network timeouts; worker inventory pages at 100 objects and at most five pages per account per run. Retry unfinished work using the lease; never mark partial cleanup completed. Cron works on at most five accounts within a 40-second start budget, daily in the initial limited pilot; queue health returns a failure signal while exceptions or near-overdue work persist. More than five requests/day or unmonitored exceptions blocks public rollout. No performance improvement is claimed without measurement.

## 23–24. Acceptance and evidence

| ID | Requirement | Verification |
|---|---|---|
| AUTH3-01 | live/expired/revoked JWT, account switching and late profile results | pgTAP and AuthContext tests |
| AUTH3-02 | adult cutoff, editable metadata denial, existing-user gate | pgTAP and eligibility tests |
| AUTH3-03 | recent confirmation, ownership, duplicate requests and receipt isolation | API tests and pgTAP |
| AUTH3-04 | Storage-before-Auth erasure, refusal/retry/reconciliation and purge | worker tests, pgTAP, disposable hosted journey |
| AUTH3-05 | email/OAuth/recovery/logout and return paths | callback/UI tests and hosted inbox/provider journey |
| AUTH3-06 | phone/desktop, light/dark, keyboard and locale states | browser evidence |
| AUTH3-07 | production environment/cron/queue owner and native store paths | provider and native-build evidence |

## 25–30. Rollout, recovery, review and delivery

Apply AUTH2 then append-only AUTH3 in a disposable database. Run full Trust/RLS regression, then independent security/privacy review. Only then apply the same migrations to the selected existing backend. Deploy with matching public lifecycle and server worker flags, server-only Supabase service-role key/ref and CRON_SECRET. Keep worker and lifecycle UI disabled until the migration, cron invocation, purge, exception monitoring and hosted synthetic deletion are verified.

Rollback disables worker/UI flags and restores the last verified frontend; it never drops requests or restores erased personal data. Partial Storage cleanup must be resumed, not falsely reversed. Monitor failed and blocked jobs and oldest pending age daily; an unstaffed queue is a release blocker. No deletion of existing personal accounts is authorized as a test.

Native iOS/Android binaries, equivalent iOS login, Google production audience, SMTP inbox proofs and required store metadata must be verified before a store-ready claim. A web build is insufficient. Operational setup: artifacts/ARO-AUTH3/RUNBOOK.md. Record actual test results and unresolved gates in artifacts/ARO-AUTH3/VERIFICATION.md and the canonical ledgers. Implementation approval is not release certification.
