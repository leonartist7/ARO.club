# AUTO0 Next.js evidence compatibility

Version 1.0.0 — SPEC-READY / IN-PROGRESS, 2026-09-21.
Claim: AUTO0-NEXT-20260921-001. Base: b44c82f59a339c0c240894c981401625df9456de.
Branch: codex/auto0-nextjs-compat-20260921. Separate checkout, dependencies and external evidence output; preserve N1.

Authority: ARO-AUTO0-AUTONOMY-FOUNDATION v1.0 and controller packet `docs/autonomous-control-20260916/AUTO0-NEXTJS-COMPAT-PACKET-20260921.md` on `codex/aro-overnight-controller-20260916`, blob `07eced640e2a34785b3153d6d0cfdab17148bf55`. Existing AGENTS, master delivery, build playbook, cloud handoff and knowledge-tool boundaries remain. Source integration is not production or product acceptance.

## Closed scope
Only tools/autonomy/core.mjs, browser.mjs, core.test.mjs, optional framework.mjs/framework.test.mjs, README.md, this specification and artifacts/ARO-AUTO0-NEXTJS/. No workflow, product source, dependency/lockfile, provider, SQL, global authority or memory-policy edits. Controller owns registry reconciliation; no concurrent registry writes.

## Acceptance
1. Deterministic committed-source inventory recognizes current src/app pages and historical Vite routes.jsx. Strip route groups from URL paths, retain dynamic/catchall notation and provenance. Reject missing, escaping, uncommitted, ambiguous and unsupported inputs; document unsupported conventions. Inventory does not establish runtime routing acceptance.
2. Launch only the matching installed fixed executable at 127.0.0.1:5199. Preserve ownership/port conflict, cleanup, exact-SHA, clean-tree, root separation, synthetic-only, network restrictions, evidence manifest and existing 150-case route/viewport/theme matrix.
3. Next evidence must establish a fresh synthetic build and runtime with disabled account flags and absent provider configuration, not merely UX0=true. Reject local environment files and enabled/provider environment values without exposing values. An inherited build is not proof. If this cannot be established within the closed scope, stop and return the precise proposal.
4. Meaningful adversarial tests cover both inventories/launches, grouped/dynamic routes, source boundary failures and unsupported framework. Preserve existing tests; no mirror-only tests or dependencies. Required lint/build/focused tests and exact-candidate capture CI must pass; verify source unchanged before/after. No extra database audits.
5. Independent finished-diff and final evidence review before acceptance. Return base/head, changed files, commands/exits, inventory/launch/synthetic evidence, artifact hash and limitations. Metadata target <30s excluding clone/install/network; no product bundle changes.

One bounded implementation/verification attempt. Stop on unexplained failure or new authority needs; no blind reruns. New draft PR, no merge/deployment/schedule/provider activation. N1/I02-08/F7/human/store and provider gates remain independent.
