# ARO-READY1 — Foundation readiness reconciliation

## Contract

- Version: 1.0.0; status: SPEC-READY for documentation and read-only verification only.
- Authorization: founder's September 22 request to implement the product-readiness plan.
- Claim: READY1-20260922-001; canonical controller ledger version 46.
- Base: f37dc084d7172415f581a41e90d2edd9ba3738b9.
- Branch: codex/readiness-foundation-20260922. Owner: current delivery controller.
- Governing authority: AGENTS.md; master delivery plan; build playbook; I0 v1.1.0, I0.2, N1 rollout v1.3.2, P1 v1.0.0; accepted FV2/FV3 preparation and existing F7 owner.

## Outcome and permitted changes

Replace stale execution assumptions with an evidence-backed next-action packet. Write only this spec and docs/readiness-20260922/ in this branch. The controller separately updates its existing canonical ledger using compare-and-swap and exact readback. No competing ledger or registry edits while F7 owns its reconciliation.

Read current provider metadata, schema catalogues and deployment state without reading customer rows or secret values. Review finished source and existing artifacts. Coordinate the existing F7 owner. Prepare exact hosted-auth, P1 and native handoffs; never mark them implementation-ready when consequential dependencies remain unresolved.

## Non-goals and interfaces

No product/API/type/schema/RLS/auth/dependency changes, hosted writes, account creation, paid services, migrations, deployments, merge, store submission or scheduling. No app tests against hosted staging before applicable Trust controls and authorization are established. No replay of historical failed CI merely to obtain green results.

## Acceptance

| ID | Criterion | Evidence |
|---|---|---|
| READY1-01 | Current main and canonical ledger pinned; historical results preserved | Source/evidence index and controller readback |
| READY1-02 | Every remaining I0/N1/I0.2 gate has a verdict, evidence, owner and smallest next action | Acceptance matrix and independent requirement-level review |
| READY1-03 | Hosted reality separated from disposable evidence | Provider metadata and read-only catalogue checks; safe auth/recovery packet |
| READY1-04 | F7 owner recovered without ownership takeover | Existing-task response and exact PR state |
| READY1-05 | P1 Next.js seams mapped without bypassing parent gates | Readiness and interface mapping |
| READY1-06 | Sponsor offers separated from actual access; native work has bounded prerequisites | Sponsor/access inventory and native acceptance contract |
| READY1-07 | Package independently reviewed, links/hashes verified and protected runtime unchanged | Finished-diff review, scope check and manifest |

## Verification and stop rules

No runtime change means prior runtime tests remain applicable; required publication checks still apply. Validate Markdown references, source SHAs and artifact hashes. Record unavailable capabilities explicitly. Independent reviewer cannot mutate source or self-approve the controller's work. Preserve secrets and synthetic-data boundaries. On provider mutation, unresolved commercial/privacy policy, owner collision or conflicting ledger version, stop that action and continue independent authorized work.

## Delivery

One documentation PR, immutable review evidence, exact remaining blockers and durable controller handoff. VERIFIED means this preparation package passed, never that P1, hosted auth, F7 or store release passed.
