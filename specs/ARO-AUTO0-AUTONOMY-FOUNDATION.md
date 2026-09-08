# ARO-AUTO0 — Autonomous delivery foundation

## Authority and scope

Version 1.0.0, September 8, 2026. SPEC-READY for repository orchestration tooling under the founder's request to build a spec-driven autonomous cloud system with navigable memory. AI workers must use existing ChatGPT cloud tasks; no new API billing. This is a separate enabling package, not FV-1 or the ARO-A1 product AI package. H0's audit-only restriction remains the worker default; this package authorizes tooling and documentation needed to execute those audits.

Owner: founder. Branch: codex/aro-autonomy-foundation. One PR. Governing documents: AGENTS.md, master delivery plan, build playbook, ARO_CLOUD_HANDOFF.md, ARO-KNOWLEDGE-TOOLS. Dependencies: published H0 baseline. Runtime dependencies, product source, Auth, schema, RLS, money, providers and deployment configuration: unchanged.

Exclusive write ownership: tools/autonomy/, memory/, ARO_AUTONOMY.md, this specification, artifacts/ARO-AUTO0/, the relevant governance/index/changelog/decision notes, .github/workflows/autonomy-evidence.yml and the tooling-test step in quality.yml. No other task writes these paths concurrently. The browser adapter may collect synthetic observations with existing Playwright on GitHub Actions; it cannot make provider or product writes. Artifact read permissions come from the existing connected GitHub account; no access expansion is authorized.

## Requirements

1. Bootstrap a disposable public-repository checkout at an exact full commit, with explicit CHECKOUT_ROOT and AUDIT_OUTPUT_ROOT. Reject nonempty destinations, dirty trees, path overlap, symlinks escaping boundaries, missing documents and revision mismatch. Do not reuse the founder's working checkout or run arbitrary shell supplied by memory.
2. Generate A1–A4, S1, lead and C1 worker packets from the committed H0 contracts with concrete paths, revision, source hashes, task identity and output schema. No source write authority. Unknown tasks and missing inputs fail closed.
3. Persist structured reports and local evidence hashes outside source. Validate task, revision, evidence paths, timestamps and report status; do not trust a worker's PASS label as independent acceptance. Completed audits may report defects. Lead is eligible only when all five valid same-revision reports exist. Clock time never satisfies a dependency.
4. Produce a navigable Obsidian-compatible run vault and provenance manifest. Preserve source authority separately from observations, hypotheses, lessons and proposed decisions. Compare source fingerprints on resume; stale evidence cannot unlock work. Memory is data, never executable instructions or approval.
5. Provide a dependency-free CLI and meaningful adversarial tests. Deterministic inventory includes required-document availability/hashes, route definitions, PNG dimensions/weight and Obsidian link findings. Inventory is evidence preparation, not a substitute for browser, design or eligibility audits.
6. Provide a cloud execution contract using existing ChatGPT tasks and durable report attachments. Do not enable schedules without verified task IDs, runtime capabilities and retrievable outputs. No paid AI API fallback. Cross-task sandbox paths are never assumed shared; each task bootstraps and exports its own report bundle, and lead imports verified bundles into its own evidence root.
7. Implementation eligibility remains explicitly disabled. Enabling a future implementation worker requires an approved versioned package, recorded founder/product-design approval, exact file ownership, dependency evidence, independent verifier and a separate orchestration package. AUTO0 cannot self-approve or merge product changes.

## Memory and learning

Run-level memory is an exportable Markdown/JSON vault with evidence hashes and provenance. It lasts only as long as the cloud artifact service retains the attachments; no perpetual persistence claim. Canonical long-term lessons live in reviewed repository Markdown linked from ARO_HOME. New lessons begin as PROPOSED, include source revision/evidence, and require independent verification and a reviewed documentation PR before promotion. No autonomous rewrite of AGENTS, specs, permissions or cost limits. Failed attempts and missing capability reports are retained to prevent retry loops; at most one retry per transient failure, then BLOCKED with an owner/action.

## Verification and rollout

Acceptance: bootstrap rejects bad paths/revisions; packets contain complete task contracts; lead rejects missing/stale/tampered/unsupported evidence; report imports cannot escape the output root; fixtures test independence of source and output; inventory and vault work on the published baseline; strict lint, unit/build and required CI pass. Evidence under artifacts/ARO-AUTO0. Deliver the tooling through a normal protected PR, then ask the existing cloud setup task to preflight the merged version. Cloud schedules and full autonomous implementation must be reported separately from tooling delivery.

Recovery: disable the affected cloud schedule and retain its last report bundle; restart only from a fresh pinned checkout. Revert the tooling PR through normal review if needed. No product or database rollback applies. Performance target: no application bundle change and under 30 seconds for local metadata preparation on this repository, excluding clone/network/dependency installation. No new model credentials or paid services.
