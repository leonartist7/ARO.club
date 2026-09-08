# ARO-UX0 Pre-implementation Baseline

> Captured from clean `main` at `2e0a97f` before creating
> `feat/aro-ux0-opportunity-prototype` on 2026-09-04.

## Source and visual baseline

- PR #34 is present in `main` through merge commit `2e0a97f`.
- The existing first viewport described ARO but offered only a static orbit.
- The page then led into search, a three-step explanation and six marketplace
  cards. The dominant experience was therefore an editorial marketplace rather
  than opportunity formation.
- The 1440px baseline capture is preserved outside the delivery artifact set
  because it was taken before the package branch; measurements are recorded
  below.

## Quality baseline

| Check | Result |
|---|---|
| `npm run lint` | PASS, zero warnings |
| `npm test` | PASS, 61/61 tests |
| `npm run test:e2e` | PASS, 16/16 checks |
| `npm run build` | PASS, 2,602 modules |

The managed Windows sandbox initially blocked esbuild configuration resolution.
The same commands passed with the workspace runtime allowed. Vitest/Vite emitted
the inherited stale browser-data advisories, and Rollup emitted the inherited
500 kB shared-chunk advisory. No dependency update is authorized in UX0.

## Bundle baseline

| Asset | Minified | Gzip |
|---|---:|---:|
| Home route chunk | 9.94 kB | 2.75 kB |
| Shared entry JavaScript | 750.86 kB | 230.09 kB |
| Global CSS | 89.84 kB | 13.92 kB |

## Browser and request baseline

Untouched `main` was opened at 1440×1000 in installed Chromium against the
local Vite server.

| Measure | Baseline |
|---|---:|
| Dev resource requests | 84 |
| Dev transferred bytes | 6,220,585 |
| First Contentful Paint | 1,036 ms |
| CLS | 0.000103 |
| Horizontal overflow | 0 px |
| Console errors | 0 |

The request list included Google Fonts plus several Unsplash experience and
teacher images. Development-module request counts are recorded as a diagnostic
baseline and are not compared directly with the compiled Preview request count.
