# FV-1 recovery handoff

**PROPOSED / SPEC-REQUIRED. No product implementation is authorized by this documentation PR.**

- [Proposed FV-1 specification v0.1.0](proposed-ARO-FV-1.md)
- [Recovery provenance, bundle hashes and retrieval map](RECOVERY.md)
- [Recovered cloud synthesis and handoff](CLOUD_HANDOFF.md)
- [First packet: F1 media foundation](tasks/F1.md)
- Ordered remainder: [F2 shell/routes](tasks/F2.md) → [F3 journey state](tasks/F3.md) → [F4 discovery/Create](tasks/F4.md) → [F5 Profile/Express](tasks/F5.md) → [F6 return/Library/Settings](tasks/F6.md) → [F7 acceptance/review](tasks/F7.md)
- [Machine-readable dispatch status](packets.json); [documentation integrity manifest](manifest.json)

All five saved audits were freshly retrieved and validated in their existing cloud task; none were rerun. Their evidence base is `06730c74b44d1a6ee1da24c4d1d1ed721313df5c`; corrected tooling and proposal base are `6495e67798ad14876f6c04815f9f5e13eaf52b83`.

Approve scope, local preview/reset behavior, navigation/copy, budgets and verification profile; name the independent reviewer; then record the approved spec SHA and first execution base. Later execution SHAs must come from actual accepted predecessor commits. Do not substitute an invented future SHA or an audit SHA for that handoff.

One implementation writer at a time, one FV-1 package branch/PR, independent review after the finished diff. Preserve I0/P1 and all later runtime gates.
