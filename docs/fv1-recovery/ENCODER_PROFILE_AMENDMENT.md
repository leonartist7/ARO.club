# FV-1 encoder profile amendment review note

Documentation-only amendment proposed from base `606d06bcded8e0afde0f2f4eca35a4986650ce5d`.

Scope is limited to `specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md` section 20 and `docs/fv1-recovery/tasks/F1.md`. No product code, assets, derivatives, dependencies, budgets, F1–F7 behavior/scope, merge, deployment or release authority is changed.

CPython 3.12.13 remains valid. CPython 3.13.5 is permitted only with Pillow 12.3.0 and libwebp 1.6.0 when the exact synthetic preflight records 88 bytes, SHA-256 `a2dd5e25c6a9dd61b8194f496c8b3995a5ba2efc0abc9079ecd2b6cd8ec5450b`, deterministic three-run encoding, and exact RGBA/alpha round-trip. Any mismatch remains a stop condition.
