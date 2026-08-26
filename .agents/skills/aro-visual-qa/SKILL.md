---
name: aro-visual-qa
description: "Use for ARO user-facing package verification, browser inspection, responsive QA, dark-mode checks, screenshot evidence, accessibility smoke checks, and visual regression follow-up."
---

# ARO Visual QA

Visual QA is an implementation gate, not decoration. A user-facing package is not verified merely because it builds or because screenshots were captured.

## Read first

Read `AGENTS.md`, `ARO_CODEX_AUTONOMY.md`, the active package spec, and the relevant design/experience documents named by the package.

## Baseline capture

Use the repository evidence runner for package-relevant routes:

```bash
npm run aro:evidence -- --package <PACKAGE_ID> --routes /route-a,/route-b
```

Defaults cover:

- mobile `390x844`;
- tablet `768x1024`;
- desktop `1440x900`;
- light and dark themes.

Override routes/viewports/themes only when the package requires something different.

## Inspect, do not merely capture

Review every relevant screenshot/render for:

- clipping, overflow, unexpected empty space, or overlapping content;
- incorrect stacking/layering/z-index;
- broken typography hierarchy or unreadable text;
- dark-mode surfaces/contrast regressions;
- unintended horizontal scrolling;
- missing/loading/error/empty/success states where applicable;
- obvious keyboard/focus/touch-target/accessibility regressions;
- motion or animation that obscures state or causes layout instability;
- missing assets, broken images, console/page errors;
- mobile layouts that merely shrink desktop instead of remaining usable;
- Trust, price, commitment, privacy, or safety information being visually obscured.

If a defect is found, fix it if it is inside the approved package, then recapture and re-inspect the affected evidence.

## Browser checks

Use the existing E2E suite in addition to screenshots:

```bash
npm run test:e2e
```

The suite already checks journeys, route sweeps, responsive overflow, and dark mode. Add package-specific coverage when the package introduces behavior not covered by the generic suite.

## Evidence naming

Evidence produced by `aro:evidence` is stored under:

`artifacts/codex-evidence/<package>/<timestamp>/`

The directory is intentionally ignored by Git. Reference relevant paths in the delivery report or attach the screenshots to the PR/task through the available Codex/GitHub surface.

## Result

Report concrete pass/fail observations. Do not use `looks good` as evidence. If inspection is impossible in the current environment, state why and identify the exact missing capability rather than claiming visual verification.
