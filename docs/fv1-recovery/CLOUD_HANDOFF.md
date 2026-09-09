> Historical recovered synthesis. The [authoritative v0.2.2 specification](../../specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md) supersedes its unresolved choices and proposed execution bases. Current progress is on PR #41: F1 accepted at `c0813087f9f4f0b6d5b4dc6930030d5942457298`; F2 IMPLEMENTED / CI-VERIFIED at `d1313f942b93ad50dbb0f244c71157eef03e571b`. This historical evidence does not authorize further implementation by itself.

# Recovered cloud handoff

Source: existing task `Schedule audit tasks`, response `6548a81c-1d72-5bca-a69e-96b93236a90b`, retrieved 2026-09-08. Text reproduced below; attachment-only references replaced with filenames. This is the cloud worker's validation account, not a second local import. The raw bundles remain in the user's cloud Library.

**Validation passed; lead synthesis completed once. FV-1 remains PROPOSED / SPEC-REQUIRED.**

All five saved A1/A2/A3/A4/S1 bundles were freshly retrieved and successfully imported using tooling `6495e67798ad14876f6c04815f9f5e13eaf52b83` against H0 `06730c74b44d1a6ee1da24c4d1d1ed721313df5c`. Required source fingerprints, manifests and evidence hashes matched; source remained clean. The exported synthesis also passed corrected import validation.

The old **BLOCKED v3** record is untouched. Its linked recovery record advanced through a guarded claim to **COMPLETED v2**. No audits were rerun, schedules created, GitHub content published or product files changed. C1 remains weekly; the obsolete coordinator remains disabled.

Files:

- `proposed-ARO-FV-1.md` (saved cloud specification)
- `report.md` (saved cloud synthesis)
- `ARO-lead-FV1-proposed-H0.zip` (saved cloud export)

The handoff text below does not require desktop attachment access.

**Proposed synthesis**

Prioritize:

1. **Truthful opportunity state:** reconcile contradictory counts, threshold/capacity language and implicit “You joined” claims. Invalid IDs must never silently display Shared Stories.
2. **Visual/accessibility defects:** fix Profile headline overlap, undersized controls, primary-action contrast and World’s dark-card readability.
3. **Honest navigation and previews:** correct Create exits, Library destinations and unqualified fictional earnings/history/settings claims.
4. **Image delivery and composition:** replace oversized delivery with responsive derivatives while preserving people and transparency. H0 Library image transfer was **7.28 MB**, World **3.24 MB**; shared JS was **193,559 bytes gzip**.

Broader participant/creator/return-story redesign belongs to later FV packages. S1 establishes neither entrant eligibility nor store readiness. I0 and P1 baseline remain blocked; P2–P5 and payments/AI/location/3D/AR/Seasons/Beacons remain ineligible.

**Reusable implementation preamble**

> Implement only the assigned FV-1 packet after founder/product-design approval is recorded in the repository. Require immutable `APPROVED_SPEC_SHA`, `PACKAGE_BASE_SHA` and `TASK_BASE_SHA`; do not invent them. Evidence baseline is H0 `06730c74b44d1a6ee1da24c4d1d1ed721313df5c`. Candidate implementation base is `6495e67798ad14876f6c04815f9f5e13eaf52b83`, whose checked product paths match H0; reconcile any later changes before writing.
>
> Use one writer at a time, sequential packets in one FV-1 branch/PR, and independent review after the finished diff. Change only the assigned files. Preserve existing stack and feature gates. No new dependencies, paid APIs, backend/auth/payment/persistence/location/AI services, deployment or status upgrades.
>
> Stop on missing approval, SHA/hash mismatch, unexplained base drift, unowned changes, required interface changes, failed budgets, unavailable mandatory verification or new product decisions. Record commands, exits, tested commit, focused evidence and remaining limitations. Do not repeat whole-repository audits or start planning loops.

Preference: **gpt-5.6-terra / high reasoning**. Available cloud task controls expose no model/reasoning selector, so actual selection is **not verified**. The receiving Codex task must verify its own controls.

**Sequential task packets — proposed, not activated**

Paths below are repository-relative. Each packet also owns its uniquely named translation and test files; no shared-file ownership overlaps.

**F1 — Responsive media foundation**

Files: new `src/components/app/AppImage.jsx`, `src/data/aroMedia.js`, `src/i18n/fv1/media.js`, `src/components/app/AppImage.test.jsx`, `tools/assets/fv1-images.py`, `public/fv1/manifest.json`, plus the derivative set below.

> Preserve all nine originals. Generate reproducible WebP derivatives with hashes, dimensions, encoder/version and byte counts. Implement intrinsic dimensions, sizes/srcset, appropriate loading, meaningful/decorative alt handling and same-geometry failure fallback. Preserve Express alpha and relevant people. Freeze the component interface before page integration; do not edit pages.

Exact derivative naming: `public/fv1/<stem>-<width>.webp`, only these combinations:

| Stem | Widths |
|---|---|
| `aro-living-miniature-calgary-v1` | 640, 1440 |
| `aro-maya-expression-persona-v1` | 480, 960 |
| `aro-maya-profile-portrait-v1` | 256, 384 |
| `aro-passport-life-map-v1` | 160, 640, 1440 |
| `aro-portal-home-v1` | 160, 640, 1440 |
| `aro-repair-table-v1` | 160, 640, 1440 |
| `aro-river-light-circle-v1` | 160, 640, 1440 |
| `aro-season-discovery-v1` | 640, 1440 |
| `aro-shared-stories-table-v1` | 160, 640, 1440 |

Acceptance/evidence: deterministic manifest check, component tests, byte table and crop/alpha comparisons. Stop if approved size and composition requirements cannot both pass.

**F2 — Shell, navigation and recovery**

Files: `src/components/app/AppShell.jsx`, `src/components/app/AppPrimitives.jsx`, `src/lib/routes.jsx`; new `src/pages/AppNotFoundPage.jsx`, `src/i18n/fv1/shell.js`, `src/components/app/AppShell.test.jsx`.

> Preserve the five existing destinations. World owns opportunity/Circle routes; Insights owns Passport. Correct Create’s Close to World. Add truthful prototype notice, 44px shared targets, skip/main focus and unknown-`/app` recovery. Explain unavailable search/notification previews without implementing services. Preserve legacy routes.

Acceptance/evidence: route ownership, accessible names, exit destination, skip focus, unknown-route recovery and keyboard/back-navigation checks.

**F3 — Truthful opportunity/Circle state**

Files: `src/data/aroApp.js`; `src/pages/AppOpportunityDetailPage.jsx`, `AppCommitPage.jsx`, `AppCirclesPage.jsx`, `AppCircleRoomPage.jsx`; new `src/i18n/fv1/journey.js`, `src/pages/AppJourney.test.jsx`.

> Separate numeric example count, threshold and capacity. Derive all displayed counts; never equate reaching a minimum with a real confirmed event. Unknown IDs return a missing-example view. Keep only an explicitly local, capacity-clamped +1/reset preview. Navigation/reload resets it; direct Circle entry never claims membership. Existing local chat must say it is unsent. No persistence or live commitments.

Acceptance/evidence: below/at threshold, full capacity, reset/re-entry, invalid detail/commit/room and consistent identity. Include state table and observed absence of new service mutations.

**F4 — Discovery and Create integration**

Files: `src/pages/AppHomePage.jsx`, `AppWorldPage.jsx`, `AppOpportunitiesPage.jsx`, `AppCreatePage.jsx`; new `src/i18n/fv1/discovery.js`, `src/pages/AppDiscovery.test.jsx`.

> Consume the frozen media/fixture interfaces. Align both Create returns with World; remove conflicting count copy. Repair World dark-card contrast, small targets and mobile crops. Keep Seed Studio local. Explain unavailable controls without adding search, publishing, location or cross-route intent behavior.

Acceptance/evidence: correct returns and counts, measured contrast, target sizes, resource selection and representative mobile/desktop crops.

**F5 — Profile and Express**

Files: `src/pages/AppProfilePage.jsx`, `AppExpressPage.jsx`; new `src/i18n/fv1/personal.js`, `src/pages/AppPersonal.test.jsx`.

> Separate headline and all four active nodes without replacing the field design. Preserve privacy explanations and local expression preview. Integrate portrait/persona derivatives. Use labelled native `aria-pressed` button groups for retained choices, with complete keyboard access. No persisted identity or inferred personality.

Acceptance/evidence: five widths × two themes, all node/choice states, 200% text zoom, visible focus, 44px targets, essential prose ≥16px and measured contrast.

**F6 — Return, Library and Settings**

Files: `src/pages/AppInsightsPage.jsx`, `AppPassportPage.jsx`, `AppLibraryPage.jsx`, `AppSettingsPage.jsx`; new `src/i18n/fv1/return.js`, `src/pages/AppReturn.test.jsx`.

> Qualify or remove fictional earnings, proof and editability claims. Make unavailable settings/filters informational. Every Library row either links to the matching existing example with matching text or explicitly indicates unavailability; remove misleading self-links. Integrate thumbnails and respectful crops. No actual records, earnings computation or working preferences.

Acceptance/evidence: all six Library-row dispositions, direct-entry notices, retained keyboard actions, image bytes and Insights/Passport mobile crops.

**F7 — Focused acceptance and independent review**

Files: new `e2e/fv1.mjs`, `artifacts/ARO-FV-1/VERIFICATION.md`, `artifacts/ARO-FV-1/acceptance.json`; approved `specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md`; `ARO_SPEC_INDEX.md`, `ARO_CURRENT_STATE.md`, `ARO_IMPLEMENTATION_STATUS.md`, `ARO_CHANGELOG.md`.

> Verify the finished package, obtain independent diff review and record factual package evidence without upgrading unrelated gates. Cover the 15 baseline routes at 360/390/430/768/1440 in both themes, additional invalid routes and retained interaction states. Route fixes back to their exclusive owner, serially.

Required evidence: tested SHA, browser/settings, command exits, screenshots/traces/hashes, resource and contrast measurements, keyboard/reset/error sequences, write-path allowlist and independent reviewer verdict. Large captures remain outside tracked source.

**Commands and acceptance shared by the packets**

Each page/component packet runs its named test:

```bash
npm test -- --run <exact-test-file-above>
```

F1 additionally implements and runs:

```bash
python3 tools/assets/fv1-images.py --check
```

On the finished package:

```bash
npm run lint
npm test -- --run
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Then, separately, the proposed F7 runner:

```bash
node e2e/fv1.mjs --base http://127.0.0.1:4173 --out ABSOLUTE_EXTERNAL_EVIDENCE_ROOT
```

These new runner/script interfaces are proposed deliverables, not existing commands claimed to have run.

Candidate budgets requiring approval: shared JS ≤201,559 gzip bytes; route-total JS ≤210,000; CSS ≤24,000. Thumbnails ≤20 KB, portraits ≤40 KB, heroes ≤250/400 KB mobile/desktop, cards ≤80/120 KB. Initial visible images ≤400/600 KB under specified cold-cache DPR-1 conditions. Record controlled LCP/CLS with proposed targets ≤2.5s/0.10; do not claim field INP from scripted samples.

Verify ≥44px targets, normal-text contrast ≥4.5:1, complete retained keyboard interactions, text zoom/reflow, ordinary/reduced motion and scoped screen-reader behavior. Missing required verification remains a documented acceptance blocker. Rollback would revert the eventual FV-1 package; no provider or data migration is proposed.

**Evidence limitations**

Validation proves compatible provenance and hashes, **not independent product acceptance**. The six capture limitations remain:

- Forced DOM theme does not prove theme switching.
- Only reduced-motion captures were collected.
- Only the first eight focus stops were collected.
- Computed colors do not establish complete composited contrast.
- Unthrottled local transfer sizes are not real-user performance.
- Click-through and control behavior require interpretation or additional tests.

Full interaction/accessibility acceptance, app LCP/CLS/INP and store eligibility remain unproven at H0. **The next gate is recorded founder/product-design approval of this proposed scope—not implementation activation.**
