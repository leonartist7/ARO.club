# FV-1 — final approval package

**SPEC-REQUIRED. Documentation, implementation and release approvals are separate. No product work is dispatched.**

- [Authoritative FV-1 v0.2.0 candidate](../../specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md): selected defaults (§6), budgets/profile (§20), approval/base reconciliation (§25), independent/human review (§27).
- [First packet F1, including passed cloud encoder preflight](tasks/F1.md).
- One implementation branch/PR, sequential slices: [F1](tasks/F1.md) → [F2](tasks/F2.md) → [F3](tasks/F3.md) → [F4](tasks/F4.md) → [F5](tasks/F5.md) → [F6](tasks/F6.md) → [F7](tasks/F7.md).
- [Packet metadata](packets.json); [integrity manifest](manifest.json).
- Preserved evidence: [five-bundle recovery](RECOVERY.md), [historical cloud synthesis](CLOUD_HANDOFF.md), [superseded v0.1.0 proposal](proposed-ARO-FV-1.md).

All five saved audits were already recovered and validated; none were rerun. Exact audit base: `06730c74b44d1a6ee1da24c4d1d1ed721313df5c`; unchanged product comparison baseline: `6495e67798ad14876f6c04815f9f5e13eaf52b83`.

F1 must start from the actual approved documentation merge commit containing the SPEC-READY spec, never the old product baseline. Future merge/predecessor SHAs cannot be known now; null execution fields deliberately block dispatch until full SHAs are recorded in the single implementation PR. No additional planning infrastructure is needed.

Approval checklist: approve documentation publication; separately approve the selected FV-1 scope/defaults for F1–F7 implementation; reserve product merge/Preview/Production release for completed evidence and founder approval. Human screen-reader and final visual review remain mandatory before verification/release. I0/P1 and later runtime gates remain unchanged.


Committed candidate specification: [`a576640cc5b9828486d8bdd0f970636b3ff07138`](https://github.com/leonartist7/ARO.club/blob/a576640cc5b9828486d8bdd0f970636b3ff07138/specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md). This immutable review revision is not an approved task base.
