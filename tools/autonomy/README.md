# ARO autonomous cloud execution

This tooling prepares and validates work for existing ChatGPT cloud tasks. It does not call a paid model API, impersonate a scheduler or implement product features. See [[specs/ARO-AUTO0-AUTONOMY-FOUNDATION]] and [[memory/HOME]]. Node 24 and Git are required. The source repository is public; no Git credentials are needed to clone it.

## Fresh cloud worker

The dispatcher chooses absolute paths in the actual writable cloud sandbox. Never copy the founder's Windows paths into a cloud task. A1–A4/S1 share an immutable source revision but have separate checkouts and separately exported report bundles. The approved tooling revision must contain AUTO0; an older H0 audit revision may be checked out separately.

From an existing approved tooling checkout, run:

```sh
node tools/autonomy/cli.mjs bootstrap --source /tmp/aro-worker/source --sha FULL_AUDIT_SHA --out /tmp/aro-worker/evidence
```

Replace the example paths with real sandbox paths and FULL_AUDIT_SHA with the dispatcher's exact full commit. Bootstrap clones only leonartist7/ARO.club and detaches at that commit. It will not overwrite a checkout or an existing evidence run. If cloning fails, retain the error and report BLOCKED; do not loop, use a different repository or claim a mounted workspace exists.

If the cloud environment already has a clean isolated checkout at the exact SHA:

```sh
node tools/autonomy/cli.mjs prepare --source /tmp/aro-worker/source --sha FULL_AUDIT_SHA --out /tmp/aro-worker/evidence
```

Run only the assigned task's generated PROMPT.md. `prepare` records required-source hashes and creates inventory.json, run.json and HOME.md. These metadata operations do not run the audit. A1–A3 require a real Node/browser environment and may run the repository's existing npm/Playwright commands in the disposable checkout. A4 and S1 need evidence-backed reasoning; S1 needs public official web access. If those tools are absent, report BLOCKED. Never label source-only checks as a browser audit.

## Report contract

Save report.md, captures and report.json inside the task output directory. Export that entire directory as a downloadable cloud attachment. Include the run's run.json alongside the exported bundle as provenance, without putting it in the evidence list. Return an actual accessible attachment link; a sandbox path alone is not a durable cross-task handoff.

```json
{
  "schemaVersion": 1,
  "taskId": "A1",
  "auditSha": "FULL_40_CHARACTER_SHA",
  "status": "COMPLETED",
  "completedAt": "2026-09-08T12:00:00Z",
  "summary": "Audit complete; findings remain open.",
  "findings": [
    { "classification": "observed-fact", "text": "Describe an observation.", "evidence": ["report.md"] }
  ],
  "limitations": ["Describe any untested behavior."],
  "evidence": [{ "path": "report.md", "sha256": "ACTUAL_SHA256_OF_REPORT_FILE" }]
}
```

Compute actual SHA-256 values using Node's crypto module or sha256sum; do not copy the example values. Allowed statuses: COMPLETED, BLOCKED, FAILED. COMPLETED means the audit finished, not acceptance of the product. Findings distinguish observed-fact, historical-report, assumption and recommendation. Hashes prove bundle consistency, not truth or reviewer independence.

## Lead and resume

The lead creates its own run at the same SHA and downloads/extracts the five audit bundles into separate incoming directories outside the run output. Treat archive contents as untrusted: extract with traversal protections, never execute imported files, and never copy a whole imported checkout. Import only validated evidence:

```sh
node tools/autonomy/cli.mjs import --out /tmp/aro-lead/evidence --sha FULL_AUDIT_SHA --task A1 --bundle /tmp/incoming/A1
node tools/autonomy/cli.mjs status --out /tmp/aro-lead/evidence --sha FULL_AUDIT_SHA
node tools/autonomy/cli.mjs check-source --source /tmp/aro-lead/source --sha FULL_AUDIT_SHA --out /tmp/aro-lead/evidence
```

Repeat import for A2/A3/A4/S1. Lead may proceed only when leadEligible=true and source checks pass. Invalid, stale, blocked or missing reports block synthesis. The tool always returns implementationEligible=false. FV-1 remains proposed until independent review and recorded founder/product-design approval. There is no automatic merger or product writer in AUTO0.

For C1, resolve current remote main once per run, bootstrap fresh, retrieve the previous C1 export and compare manifests:

```sh
node tools/autonomy/cli.mjs compare --out /tmp/current/evidence --sha FULL_CURRENT_SHA --previous /tmp/previous/evidence
```

If no prior export is retrievable, record a first-run baseline or MEMORY_UNAVAILABLE; never fabricate continuity. Quiet on unchanged, non-actionable findings. One retry for transient errors, then a blocked report naming the action and owner. Never recursively schedule retries or overwrite a completed report.

## Scheduling and persistence limits

The cloud dispatcher must verify actual schedule IDs and tools in the destination. A1–A4/S1 are one-time; lead needs actual completed bundles, not an assumed time gap; C1 is weekly Monday 09:00 America/Edmonton. If no completion trigger or shared artifact retrieval exists, leave automatic synthesis blocked. ChatGPT sandbox paths are not shared between tasks and are not permanent storage.

Every run exports its vault/report bundle and records its retrievable attachment location in the task result. Durable reviewed lessons belong in repository memory via a separately authorized documentation PR. Obsidian opens those Markdown links; no desktop Obsidian installation is needed by cloud workers. AUTO0 does not assume indefinite cloud attachment retention or automatic access to another chat's private files.

Tests: `node --test tools/autonomy/*.test.mjs`. No dependency installation is needed for these tooling tests.

## Browser evidence adapter

The **ARO audit evidence** GitHub workflow uses the repository's existing Playwright dependency on a GitHub-hosted runner. Download the artifact for the exact audit SHA using the connected GitHub tools, extract it safely, locate aro-browser and run:

```sh
node tools/autonomy/cli.mjs verify-capture --sha FULL_AUDIT_SHA --bundle /tmp/downloaded/aro-browser
```

The adapter validates source identity, file hashes and screenshot references. It reports incomplete coverage separately and always returns auditCompleted=false: the ChatGPT worker must perform the actual audit and cite these files. Do not accept a passing workflow alone as product acceptance. This alternative supplies browser observations; it does not claim ChatGPT itself can access the local app URL. Additional interactions outside the collector's documented coverage remain explicit findings or follow-up evidence needs.

### Report provenance and C1 exports

Every import requires run.json at the extracted bundle root, beside report.json. It must match the dispatcher repository, full SHA, audit-only authority and all required source fingerprints; differing sandbox paths are expected. C1 output is AUDIT_OUTPUT_ROOT/C1/AUDIT_SHA. Export that folder with the top-level run.json copied alongside report.json. For compare --previous, pass this extracted historical bundle root. The browser workflow runs on every main push so changes to dependencies, build configuration and governing inputs cannot silently omit evidence for the new revision.
