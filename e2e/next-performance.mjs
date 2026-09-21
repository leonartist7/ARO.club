import { launch, BASE } from './harness.mjs';
import { writeFile } from 'node:fs/promises';
const browser = await launch();
const samples = [];
try {
  for (const route of ['/', '/app']) {
    for (let sample = 0; sample < 3; sample++) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
      await context.addInitScript(() => {
        window.__metrics = { lcp: 0, cls: 0 };
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) window.__metrics.lcp = entry.startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__metrics.cls += entry.value;
        }).observe({ type: 'layout-shift', buffered: true });
      });
      const page = await context.newPage();
      await page.goto(BASE + route, { waitUntil: 'networkidle' });
      samples.push({ route, sample, ...await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const scripts = performance.getEntriesByType('resource').filter(r => r.initiatorType === 'script');
        return { ttfbMs: navigation.responseStart, domContentLoadedMs: navigation.domContentLoadedEventEnd,
          javascriptDecodedBytes: scripts.reduce((sum, r) => sum + r.decodedBodySize, 0),
          ...window.__metrics };
      }) });
      await context.close();
    }
  }
  await writeFile(process.env.E2E_PERFORMANCE_OUTPUT || new URL('../artifacts/ARO-N1/performance.json', import.meta.url), JSON.stringify({
    environment: 'Local production server, desktop Chromium, no throttling; observational samples, not a release benchmark.', samples,
  }, null, 2));
  console.log(JSON.stringify(samples, null, 2));
} finally { await browser.close(); }
