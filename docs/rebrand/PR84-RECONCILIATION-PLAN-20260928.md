# PR #84 owner reconciliation plan — 28 September 2026

Status: PLAN ONLY. This cloud task does not modify PR #84 or resolve its review conversations.

## Verified inputs

- Lower-stack source: RB6 `13e257107b5726e911210a1eb8048ce3d42143ac`.
- Existing source-plan PR #84: `codex/rebrand-source-plan-20260928`, head `7e3f9568202b37b7aeb420f9b642efb80121b1a2`, open and unmergeable at inspection.
- Target: the new RB10 commit containing this plan on `codex/rb10-account-entry-presentation-20260928`, descended from RB9 `fc4b08ed9eaff233b2001dc2590f11a8e51d7ebb`. Fetch and pin its exact remote SHA before execution; never substitute main.
- A read-only `git merge-tree --write-tree --name-only` preview of preceding RB10 `b28fc9f` with #84 reports one content conflict: `docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md`. Current-state and changelog merge automatically at that checkpoint. Recheck against the latest RB10 before applying; this is not an integration approval.

## Owner execution

1. Verify clean owner worktree and unchanged #84 head. Preserve its source-plan file, original body, attachment hash and historical-authority banner byte-for-byte. Do not replace it with reconstructed text or upload any other private attachment.
2. Reconcile the latest RB10 into the existing #84 branch using history-preserving merge ancestry unless the owner has separately authorized a rebase. Keep #84 as the same documentation PR; no force-push or main merge from this plan.
3. Resolve the ledger by retaining both the latest cloud checkpoint and #84's English/light founder-priority paragraph. Preserve all source-specific test history, the current independent privacy/Trust/retention gates, and outstanding hosted/visual limits. Do not replace the current ledger with the old #84 snapshot.
4. Retain #84's English/light sequencing in `ARO_CURRENT_STATE.md` and `ARO_CHANGELOG.md`, and the source-plan link in `specs/ARO-RB0-REBRAND-ADOPTION.md`. Keep dark/FR/ES working behavior and infrastructure. Keep the new RB1/RB2/RB6 contracts and all cloud evidence. The original plan remains historical context, not authority to waive narrower package gates.
5. Audit the diff against latest RB10: documentation only, preserving the five intended #84 files and any narrowly necessary reconciliation evidence. Confirm the source-plan body/hash and banner, links, no conflict markers, and no runtime/assets/dependency/F7 changes. Re-run required hosted checks on the resulting exact #84 head.
6. Obtain independent recheck of unresolved automated review comments and specialist gates. Do not self-resolve conversations or infer acceptance from prior green runs. Merge only in protected stack order after every required review and check.

## Gates that remain open

RB2 independent privacy/eligibility and Trust; RB4 Trust; RB5 SPEC-REQUIRED on-device Contact draft retention/deletion privacy approval; independent code/design/accessibility review; final-head platform checks; release acceptance. RB2 remains a nonpersistent preview. No VERIFIED or SHIPPED claim follows from completing this documentation reconciliation.
