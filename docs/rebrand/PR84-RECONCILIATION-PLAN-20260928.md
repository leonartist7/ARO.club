# PR #84 owner reconciliation plan — 28 September 2026

Status: PLAN ONLY. This cloud task does not modify PR #84 or resolve its review conversations.

## Verified inputs

- Lower-stack source: RB6 `9eb4e15d2435eb08787a0b8db10ae601987f5053`.
- Existing source-plan PR #84: `codex/rebrand-source-plan-20260928`, head `91a3ceb51a1c50ef37372588f7abb3fe6b72f0e2`, open and mergeable against prior RB10 8ee50c4 at inspection; fresh integration and checks are required for the new RB10.
- Target: the new RB10 commit containing this plan on `codex/rb10-account-entry-presentation-20260928`, descended from RB9 `fdda59ebd2a1adb7d27101caca34ec14cfbc464b`. Fetch and pin its exact remote SHA before execution; never substitute main.
- The owner completed the previous reconciliation: #84 now includes exact RB10 `8ee50c409b45e130ebc428ce90ce1723031240fc` and retains both English/light priority and cloud ledger history. Repeat the merge preview against the new published RB10 before resolving anything; prior conflict predictions and old green checks are historical.

## Owner execution

1. Verify clean owner worktree and unchanged #84 head. Preserve its source-plan file, original body, attachment hash and historical-authority banner byte-for-byte. Do not replace it with reconstructed text or upload any other private attachment.
2. Reconcile the latest RB10 into the existing #84 branch using history-preserving merge ancestry unless the owner has separately authorized a rebase. Keep #84 as the same documentation PR; no force-push or main merge from this plan.
3. If the ledger conflicts, resolve it by retaining both the latest cloud checkpoint and #84's English/light founder-priority paragraph. Preserve all source-specific test history, the current independent privacy/Trust/retention gates, and outstanding hosted/visual limits. Do not replace the current ledger with the old #84 snapshot.
4. Retain #84's English/light sequencing in `ARO_CURRENT_STATE.md` and `ARO_CHANGELOG.md`, and the source-plan link in `specs/ARO-RB0-REBRAND-ADOPTION.md`. Keep dark/FR/ES working behavior and infrastructure. Keep the new RB1/RB2/RB6 contracts and all cloud evidence. The original plan remains historical context, not authority to waive narrower package gates.
5. Audit the diff against latest RB10: documentation only, preserving the five intended #84 files and any narrowly necessary reconciliation evidence. Confirm the source-plan body/hash and banner, links, no conflict markers, and no runtime/assets/dependency/F7 changes. Re-run required hosted checks on the resulting exact #84 head.
6. Obtain independent recheck of unresolved automated review comments and specialist gates. Do not self-resolve conversations or infer acceptance from prior green runs. Merge only in protected stack order after every required review and check.

## Gates that remain open

RB2 independent privacy/eligibility and Trust; RB4 Trust; RB5 SPEC-REQUIRED on-device Contact draft retention/deletion privacy approval; independent code/design/accessibility review; final-head platform checks; release acceptance. RB2 remains a nonpersistent preview. No VERIFIED or SHIPPED claim follows from completing this documentation reconciliation.
