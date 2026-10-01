import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { startProductionServer } from '../src/test/production-server.js';

const output = join(process.cwd(), 'artifacts', 'ARO-CB1-P', 'baseline');
await mkdir(output, { recursive: true });
const { base, server } = await startProductionServer(3121);
const samples = [];
let browser;
try {
  browser = await chromium.launch({ headless: true });
  for (const viewport of [{ width: 360, height: 740 }, { width: 1440, height: 900 }]) {
    for (const mode of ['learn', 'share', 'gather']) {
      for (let sample = 1; sample <= 3; sample += 1) {
        const context = await browser.newContext({ viewport, reducedMotion: 'reduce', colorScheme: 'light' });
        await context.addInitScript(() => {
          localStorage.setItem('theme', 'light');
          localStorage.setItem('conversa-language', 'en');
          window.__cbLab = { lcpMs: null, cls: 0 };
          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) window.__cbLab.lcpMs = entry.startTime;
          }).observe({ type: 'largest-contentful-paint', buffered: true });
          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__cbLab.cls += entry.value;
          }).observe({ type: 'layout-shift', buffered: true });
        });
        const page = await context.newPage();
        const errors = [], writes = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('request', request => {
          if (!['GET', 'HEAD'].includes(request.method())) writes.push({ method: request.method(), url: request.url() });
        });
        const response = await page.goto(base + '/app/create?mode=' + mode, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await page.getByRole('heading', { level: 1 }).waitFor();
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const renderedReadyMs = await page.evaluate(() => performance.now());
        await page.waitForTimeout(500);
        const metrics = await page.evaluate(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          const resources = performance.getEntriesByType('resource').map(entry => ({
            path: new URL(entry.name).pathname,
            sameOrigin: new URL(entry.name).origin === location.origin,
            initiatorType: entry.initiatorType,
            transferBytes: entry.transferSize,
            encodedBytes: entry.encodedBodySize,
            decodedBytes: entry.decodedBodySize,
            durationMs: entry.duration,
          }));
          const js = resources.filter(entry => /\.js$/.test(entry.path));
          const images = resources.filter(entry => entry.initiatorType === 'img');
          const sum = (entries, key) => entries.reduce((total, entry) => total + entry[key], 0);
          return {
            heading: document.querySelector('h1')?.textContent,
            language: document.documentElement.lang,
            dark: document.documentElement.classList.contains('dark'),
            overflow: document.documentElement.scrollWidth > innerWidth,
            domContentLoadedMs: navigation.domContentLoadedEventEnd,
            loadMs: navigation.loadEventEnd,
            documentTransferBytes: navigation.transferSize,
            fcpMs: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? null,
            ...window.__cbLab,
            jsTransferBytes: sum(js, 'transferBytes'), jsEncodedBytes: sum(js, 'encodedBytes'),
            imageTransferBytes: sum(images, 'transferBytes'), imageEncodedBytes: sum(images, 'encodedBytes'),
            jsRequests: js.length, imageRequests: images.length,
            resourceRequests: resources.length,
            zeroTransferResources: resources.filter(entry => entry.transferBytes === 0).length,
            resources,
            visibleImages: [...document.images].filter(img => img.getBoundingClientRect().width && img.getBoundingClientRect().top < innerHeight).map(img => ({
              path: new URL(img.currentSrc).pathname, loaded: img.complete && img.naturalWidth > 0,
              fit: getComputedStyle(img).objectFit,
            })),
          };
        });
        if (sample === 1) await page.screenshot({ path: join(output, mode + '-' + viewport.width + '.png'), fullPage: true });
        samples.push({ mode, sample, ...viewport, status: response.status(), renderedReadyMs, ...metrics, errors, writes });
        assert.equal(response.status(), 200);
        assert.equal(metrics.language, 'en');
        assert.equal(metrics.dark, false);
        assert.equal(metrics.overflow, false);
        assert(metrics.heading);
        assert(metrics.jsRequests > 0 && metrics.jsEncodedBytes > 0, 'JS entries must be observable');
        assert.deepEqual(errors, []);
        assert.deepEqual(writes, []);
        assert(metrics.visibleImages.every(img => img.loaded));
        await context.close();
      }
    }
  }
} finally {
  await writeFile(join(output, 'baseline.json'), JSON.stringify({
    schemaVersion: 1,
    measuredCommit: process.env.GITHUB_SHA ?? 'local',
    baselineReference: '2f06fa3ddaae0020d4bca7cd040669bb9ac42346',
    method: 'production Next; Chromium; EN/light; reduced motion; single running server without explicit route/asset warmup; new cold-browser context per sample; no throttling; observation 500ms after networkidle',
    samples,
  }, null, 2));
  await browser?.close();
  if (server.exitCode === null) server.kill('SIGTERM');
}
assert.equal(samples.length, 18);
const fields = ['jsTransferBytes', 'jsEncodedBytes', 'imageTransferBytes', 'imageEncodedBytes', 'resourceRequests', 'jsRequests', 'imageRequests', 'fcpMs', 'lcpMs', 'cls', 'domContentLoadedMs', 'loadMs', 'renderedReadyMs'];
const summary = [];
for (const width of [360, 1440]) for (const mode of ['learn', 'share', 'gather']) {
  const group = samples.filter(sample => sample.width === width && sample.mode === mode);
  const metrics = Object.fromEntries(fields.map(field => {
    const values = group.map(sample => sample[field]).filter(value => typeof value === 'number').sort((a, b) => a - b);
    return [field, { min: values[0] ?? null, median: values[1] ?? null, max: values.at(-1) ?? null }];
  }));
  summary.push({ width, mode, samples: group.length, metrics });
}
await writeFile(join(output, 'summary.json'), JSON.stringify(summary, null, 2));
process.stdout.write('CB1_BASELINE_SUMMARY=' + JSON.stringify(summary) + '\n');
