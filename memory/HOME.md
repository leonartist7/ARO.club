---
tags: [aro, memory, autonomy]
---

# ARO durable memory

Start with [[../AGENTS|Agent authority]], [[../ARO_CURRENT_STATE|Current state]], [[../ARO_SPEC_INDEX|Package registry]] and [[../ARO_AUTONOMY|Autonomous execution]]. This vault is navigation and evidence, never an alternative authority hierarchy.

- [[LESSONS]] — verified, narrowly scoped lessons with provenance.
- [[LESSON_TEMPLATE]] — proposed learning awaiting verification and review.
- [[../DECISIONS|Durable decisions]] — founder decisions remain separate from learned observations.
- [[../tools/autonomy/README|Cloud run protocol]] — bootstrap, report exchange and dependency checks.
- [[../specs/ARO-AUTO0-AUTONOMY-FOUNDATION|AUTO0 specification]] — boundaries of the current tooling.

Run memory is exported from each cloud task as a Markdown/JSON bundle with an exact source revision and evidence hashes. Store the actual attachment links in the cloud coordinator's checkpoint. Cloud filesystem paths alone are not durable memory. If retrieval fails, report MEMORY_UNAVAILABLE and stop dependent synthesis; do not invent previous findings.

Learning cycle: observe → capture evidence → classify → propose lesson → independently verify → review documentation PR → promote. Agents may create proposed lessons in their output bundle. They may not change this repository memory, instructions, gates or source automatically. Repeated failures should yield one concise capability report, not unbounded retries.
