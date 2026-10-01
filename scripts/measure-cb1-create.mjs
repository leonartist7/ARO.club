import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { startProductionServer } from '../src/test/production-server.js';

const readMetrics = (imageUrls) => {
          const imageResponses = new Set(imageUrls);
          const navigation = performance.getEntriesByType('navigation')[0];
          const resources = performance.getEntriesByType('resource').map(entry => ({
            path: new URL(entry.name).pathname,
            sameOrigin: new URL(entry.name).origin === location.origin,
            initiatorType: entry.initiatorType,
            imageResponse: imageResponses.has(entry.name),
            transferBytes: entry.transferSize,
            encodedBytes: entry.encodedBodySize,
            decodedBytes: entry.decodedBodySize,
            durationMs: entry.duration,
          }));
          const js = resources.filter(entry => /\.js$/.test(entry.path));
          const images = resources.filter(entry => entry.imageResponse || entry.initiatorType === 'img');
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
            renderedImages: [...document.images].filter(img => {
              const box = img.getBoundingClientRect(), style = getComputedStyle(img);
              return box.width > 0 && box.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0;
            }).map(img => ({
              path: new URL(img.currentSrc).pathname, loaded: img.complete && img.naturalWidth > 0,
              fit: getComputedStyle(img).objectFit,
            })),
          };
};
const collectImage = (urls) => (response) => {
  if ((response.headers()['content-type'] ?? '').toLowerCase().startsWith('image/')) urls.add(response.url());
};

const output = join(process.cwd(), 'artifacts', 'ARO-CB1-P', 'baseline');
await mkdir(output, { recursive: true });
const { base, server } = await startProductionServer(3121);
const samples = [];
let imageInitiatorProbe = null;
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
        const errors = [], writes = [], imageUrls = new Set();
        page.on('response', collectImage(imageUrls));
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
        const metrics = await page.evaluate(readMetrics, [...imageUrls]);
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
        assert.equal(metrics.renderedImages.length, 1, 'Existing Create must expose one rendered illustration');
        assert(metrics.renderedImages.every(img => img.loaded));
        await context.close();
      }
    }
  }
  const probeContext = await browser.newContext();
  const probePage = await probeContext.newPage();
  const probeImages = new Set();
  probePage.on('response', collectImage(probeImages));
  await probePage.goto(base + '/app/create', { waitUntil: 'networkidle' });
  probeImages.clear();
  await probePage.evaluate(() => performance.clearResourceTimings());
  await probePage.route(base + '/cb1-image-probe.css', route => route.fulfill({
    status: 200, contentType: 'text/css',
    body: 'div{width:64px;height:64px;background-image:url("' + base + '/brand/circle-builder/squilly-welcome-192.webp")}',
  }));
  await probePage.setContent('<!doctype html><html><head><link rel="preload" as="image" href="' + base + '/brand/circle-builder/tonguee-welcome-192.webp"><link rel="stylesheet" href="' + base + '/cb1-image-probe.css"></head><body><div></div></body></html>', { waitUntil: 'networkidle' });
  const probe = await probePage.evaluate(readMetrics, [...probeImages]);
  imageInitiatorProbe = {
    imageRequests: probe.imageRequests,
    imageEncodedBytes: probe.imageEncodedBytes,
    initiators: probe.resources.filter(resource => resource.imageResponse).map(resource => resource.initiatorType).sort(),
  };
  assert.equal(imageInitiatorProbe.imageRequests, 2);
  assert(imageInitiatorProbe.imageEncodedBytes > 0);
  assert.deepEqual(imageInitiatorProbe.initiators, ['css', 'link']);
  await probeContext.close();
} finally {
  await writeFile(join(output, 'baseline.json'), JSON.stringify({
    schemaVersion: 2,
    measuredCommit: process.env.GITHUB_SHA ?? 'local',
    baselineReference: '2f06fa3ddaae0020d4bca7cd040669bb9ac42346',
    method: 'production Next; Chromium; EN/light; reduced motion; single running server without explicit route/asset warmup; new cold-browser context per sample; no throttling; observation 500ms after networkidle',
    samples,
    imageInitiatorProbe,
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
process.stdout.write('CB1_IMAGE_INITIATOR_PROBE=' + JSON.stringify(imageInitiatorProbe) + '\n');
process.stdout.write('CB1_BASELINE_SUMMARY=' + JSON.stringify(summary) + '\n');
