# ARO — lean delivery handoff

User preference: gpt-5.6-terra, high reasoning, existing subscription only. Verify the actual task model setting; writing its name in a prompt does not select it. Cloud execution only unless the founder changes that preference.

## Next action

Existing cloud task: Schedule audit tasks (`6a9fbdd1-0584-83e8-89e5-27bb2d3e32db`). Recovery and one-time synthesis requested. Five saved audit bundles require fresh validation. Preserve the historical blocked checkpoint; use a separate guarded recovery record. Do not repeat completed audits.

Repository: https://github.com/leonartist7/ARO.club
Tooling revision: 6495e67798ad14876f6c04815f9f5e13eaf52b83
Historical audit revision: 06730c74b44d1a6ee1da24c4d1d1ed721313df5c

## Implementation task prompt

Implement only the assigned approved FV-1 work item. First read AGENTS.md and its required authority chain, the exact package spec and recorded founder/product-design approval. If the spec or approval is missing, return the precise missing prerequisite; do not invent approval. Confirm the assigned base SHA and a clean isolated checkout. Historical audit findings must be checked against that current base before editing.

Use the task packet's exact file ownership, dependencies, non-goals, acceptance criteria and verification commands. If any are absent, complete a proposed packet before implementation. One writer, one package branch, one PR. No changes to runtime APIs, schemas, Auth, providers, dependencies or other blocked packages through a frontend fix.

Read relevant code once and reuse evidence while its revision remains valid. Implement the smallest complete change. Run focused tests and repository-required checks. Fix actual failures; do not repeatedly rerun passing suites without new changes. Request independent review of the finished diff. Do not self-approve, bypass checks or merge without authorized delivery rules.

Return: commit/PR, acceptance results, evidence locations, unresolved risks and next eligible work item. Keep the response short. Escalate model complexity only for a concrete unresolved design, security or debugging problem; do not duplicate the entire task across models.

## Scheduling

Keep weekly C1 documentation health. Use immediate, dependency-driven delivery for implementation; avoid hourly planning or repeated whole-repository audits. A schedule may start a bounded approved task only after its prerequisite report and approval checks succeed. Stop on permanent blockers and preserve evidence. Do not add paid API execution or assume local desktop jobs continue with the computer off.

Status: workflow preference and handoff only. FV-1 approval and actual Terra model selection are not yet confirmed. This file is a local handoff, not committed package authority.
