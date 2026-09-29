# RB15 integration evidence

**Status:** IMPLEMENTED / PARTIAL VERIFICATION. No `main` merge or production release.

## Sources and changes

- RB13 visual candidate `9fb7c4c32789558829e3227794532b05b542ba60`, including the full-image onboarding repair.
- RB14 direct theme/language controls `3861c7426af88845d4ee29341483e9c50263dea6`.
- Compact shared footer `e82f97730d69f2d5ea54770652db6521ea306372`.
- Normal merge ancestry on `codex/rb15-main-integration-20260929`; no owner branch was rewritten.
- Raised the Circle's unsent-preview disclosure from 12px to 16px; aligned F6 image-fit browser acceptance to `contain`, matching its current full-image presentation and existing component assertions. No image source or F7 measurement rule was changed.
- The first hosted Quality attempt on PR #90 (run 36591290083) then exposed the Circle's 20px-high Return to World link and the stale F6 crop-position expectation. The link now has a 44px minimum height and F6 asserts the centered position of the full-size image.

## Verification

- `npm ci`: pass (506 packages from lockfile).
- `npm run lint -- --max-warnings=0`: pass.
- `npm run type-check`: pass.
- `npm test -- --maxWorkers=2 --fileParallelism=false`: 189 passed, 3 existing skips.
- `npm run build`: pass (Next.js 16.3.5).
- `NEXT_PUBLIC_ARO_RELEASE_SCOPE=english-light npm run build`: pass.
- Local production-browser F4 matrix: pass, 80 observations at 360/390/430/768/1440px in light/dark, 44px minimum targets, 16px minimum essential text, zero overflow and zero Create network writes. Local F6 matrix: pass, 40 responsive/theme and 8 zoom observations, centered `contain` imagery, minimum targets 44px and zero overflow. These runs used temporary Chromium 153 from `@sparticuz/chromium` outside the repository because the lockfile-managed Chromium 151 (Playwright revision 1234) download returned an invalid empty archive. Hosted pinned-browser verification remains authoritative.
- Hosted final-head Quality and isolated database: pending publication of the repair head. The first PR #90 Quality run failed on the two additional issues above; its static, English/light and public-design jobs passed. The isolated database run on that first head was still in progress at this checkpoint.

The previous RB13 head's Quality run [36585629021](https://github.com/leonartist7/ARO.club/actions/runs/36585629021) failed on the two addressed browser checks: 12px essential Circle copy at 360px and an F6 expectation of `cover` after the full-image `contain` change. Its static, public redesign and English/light jobs passed; isolated database run 36585628969 passed. These earlier runs do not certify this new combination.

## Open gates

RB0 review conversations; RB2 independent privacy/eligibility/security and Trust; RB4 Trust and persisted fixture comparison review; RB5 Contact draft retention/deletion privacy specification; independent design/accessibility review; final-head protected checks; production Auth and native packaging. The founder's instruction to publish the latest website does not turn these missing specialist decisions into verification evidence. The branch remains draft and unmerged until the gates are resolved.
