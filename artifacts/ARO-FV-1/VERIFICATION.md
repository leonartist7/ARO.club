# FV-1 F7 — bounded lab-profile drift report

**Recorded:** 2026-09-14 UTC
**Status:** **BLOCKED — approved amendment awaits documentation merge; exact browser execution gap remains**
**Scope performed:** the mandatory bounded F7 lab preflight only. No production build, preview server, controlled functional/performance measurement, audit rerun, product-file edit, deployment, merge, or release was performed.

## Immutable execution binding

| Field | Value | Result |
|---|---|---|
| F7 task base | `79603ae1af60a30f86c105e0f2a4d841043eb727` | PASS |
| Resumed branch | `codex/fv1-f7-acceptance-evidence` | PASS — exists at `origin` |
| HEAD before F7 documentation | `79603ae1af60a30f86c105e0f2a4d841043eb727` | PASS — exact base |
| Working tree before F7 documentation | clean | PASS |
| Base ancestry | `79603ae…` is an ancestor of HEAD | PASS |

## Frozen-profile comparison

| Required FV-1 §20 value | Observed value | Result |
|---|---|---|
| Linux x86_64 | Ubuntu 24.04.3 LTS, x86_64 | PASS |
| Kernel captured | `6.18.44` | recorded (not a frozen comparison value) |
| Intel Xeon Platinum 8573C | Intel(R) Xeon(R) Platinum **8272CL** CPU @ 2.60GHz | **MISMATCH** |
| 8 CPU equivalents | cgroup `cpu.max`: `800000 100000` | PASS |
| 20 GiB memory | cgroup `memory.max`: `21474836480` bytes | PASS |
| 9 visible/affinity CPUs | affinity `0-8`; 9 online CPUs | PASS |
| Node 24.19.0 | `v24.19.0` | PASS |
| npm 11.9.0 | `11.9.0` | PASS |
| repository Playwright 1.62.0 | lockfile and installed `playwright` / `playwright-core`: `1.62.0` | PASS |
| Chromium 151.0.7922.34, revision 1234 | Playwright metadata requests that exact Chromium | metadata PASS; executable unavailable |
| Chromium executable and SHA-256 | expected path `/root/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome`; file absent | **FAIL — no SHA-256 possible** |
| Exact bundled browser launch | not runnable because executable is absent | **FAIL** |

Additional fingerprint: `package-lock.json` SHA-256 is `329028782e209d41d2388193b3540e8a46d5bc90785c871a91d1944197ddb1d1`.

## Browser-provisioning record

`npm ci` completed without changing tracked files and installed the lockfile-pinned Playwright 1.62.0. The only §20-permitted browser-provisioning command was attempted twice, with no successful executable materialized:

```text
node node_modules/playwright/cli.js install chromium
```

Both attempts began the required download of Chrome for Testing 151.0.7922.34 / Playwright Chromium revision 1234, but the browser executable remained absent at the required path. The task runner did not yield a usable browser-install exit status before the command ceased producing output. A subsequent existence check confirmed no executable; no arbitrary system-Chrome fallback was used. No further provisioning retries were made.

## Decision

The CPU-model mismatch independently makes this host ineligible for controlled F7 measurements under the approved frozen profile. The unavailable exact bundled browser is a second execution-capability gap. Therefore F7 stopped before writing `e2e/fv1.mjs`, starting a server, running the integrated matrix, controlled performance checks, quality gates, or independent review.

No completed historical audit or synthesis was rerun.

## F7 lab-profile amendment — FOUNDER APPROVED; DOCUMENTATION MERGE PENDING

The founder approved this narrow amendment on 2026-09-14. It changes no implementation or acceptance result. It becomes operative only after the corresponding documentation-only change is merged through normal checks.

1. For F7 measurements only, permit this otherwise matching cloud host with CPU model `Intel(R) Xeon(R) Platinum 8272CL CPU @ 2.60GHz` in place of `Intel Xeon Platinum 8573C`.
2. Keep every other §20 condition unchanged: Ubuntu 24.04.3 LTS/x86_64, 8 CPU-equivalent quota, 20 GiB memory, 9 affinity CPUs, Node 24.19.0, npm 11.9.0, lockfile-pinned Playwright 1.62.0, exact Chromium 151.0.7922.34 revision 1234, DPR/theme/viewport settings, 4x CPU throttle, specified network emulation, three-run method, 10-second observation, all accessibility/image/byte/performance ceilings, review gates, and release WITHHELD.
3. Before any F7 measurement, the exact lockfile-managed Chromium must be successfully provisioned in the external Playwright cache, its executable SHA-256 recorded, and a headless launch recorded. This proposal does not permit a system-browser substitution.
4. This proposal does not weaken or waive a functional, performance, image, accessibility, independent-review, NVDA, founder-review, merge, deployment, promotion, or release requirement.

Until the approved amendment is documented and merged, and the exact browser prerequisite passes, all controlled F7 measurements remain prohibited.

## Acceptance state at this stop point

| Row | F7 status | Evidence |
|---|---|---|
| FV1-01 | predecessor accepted; not re-executed by F7 | accepted F1 history; no F7 rerun |
| FV1-02 | predecessor accepted; not re-executed by F7 | accepted F2 history; no F7 rerun |
| FV1-03 | predecessor accepted; not re-executed by F7 | accepted F3 history; no F7 rerun |
| FV1-04 | predecessor accepted; not re-executed by F7 | accepted F4 history; no F7 rerun |
| FV1-05 | predecessor accepted; not re-executed by F7 | accepted F5 history; no F7 rerun |
| FV1-06 | predecessor accepted at `79603ae1af60a30f86c105e0f2a4d841043eb727`; not re-executed by F7 | F7 immutable base |
| FV1-07 | **BLOCKED** | approved host amendment awaits documentation merge; exact bundled browser remains absent; no measurement run |
| FV1-08 | **BLOCKED** | F7 runner/quality-gate/independent-review sequence cannot legitimately start before FV1-07's documentation merge and browser prerequisite |

Human NVDA + Chromium-on-Windows testing and founder visual review remain pending and are not self-certified by this record.
