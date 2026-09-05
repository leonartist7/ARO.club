import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE, launch, navigate } from './harness.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const ARTIFACT_ROOT = join(ROOT, 'artifacts', 'ARO-UX0');
const SCREENSHOT_ROOT = join(ARTIFACT_ROOT, 'screenshots');
const VIEWPORTS = [
  { name: '360', width: 360, height: 800 },
  { name: '390', width: 390, height: 844 },
  { name: '430', width: 430, height: 932 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 1000 },
];

const selectScenario = async (page) => {
  await page.locator('input[value="conversational-spanish"]').check({ force: true });
  await page.locator('input[value="cooking-stories"]').check({ force: true });
  await page.locator('input[value="kitchen-saturday"]').check({ force: true });
  await page.getByTestId('formed-result').waitFor();
};

const ratio = (foreground, background) => {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  const luminance = (color) => 0.2126 * channel(color[0]) + 0.7152 * channel(color[1]) + 0.0722 * channel(color[2]);
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return Number(((light + 0.05) / (dark + 0.05)).toFixed(2));
};

async function captureBrowserEvidence() {
  const browser = await launch();
  const matrix = [];
  const allRequests = new Map();
  const allErrors = [];
  const allFailedRequests = [];

  for (const colorScheme of ['light', 'dark']) {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({ viewport, colorScheme, reducedMotion: 'no-preference' });
      const page = await context.newPage();
      const errors = [];
      const failedRequests = [];
      const requests = [];

      await page.addInitScript(() => {
        window.__ux0Cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.__ux0Cls += entry.value;
          }
        }).observe({ type: 'layout-shift', buffered: true });
      });
      page.on('console', (message) => {
        if (message.type() === 'error' || message.type() === 'warning') errors.push(`${message.type()}: ${message.text()}`);
      });
      page.on('pageerror', (error) => errors.push(`pageerror: ${String(error)}`));
      page.on('requestfailed', (request) => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText}`));
      page.on('request', (request) => {
        const entry = { url: request.url(), method: request.method(), type: request.resourceType() };
        requests.push(entry);
        allRequests.set(`${entry.method} ${entry.url}`, entry);
      });

      await navigate(page, BASE, { waitUntil: 'networkidle' });
      await selectScenario(page);
      await page.waitForTimeout(350);

      const layout = await page.evaluate(() => {
        const field = document.querySelector('[data-testid="formation-field"]').getBoundingClientRect();
        const anchorInside = ['want', 'bring', 'context'].map((anchor) => {
          const rect = document.querySelector(`[data-testid="field-anchor-${anchor}"]`).getBoundingClientRect();
          return rect.left >= field.left - 1 && rect.right <= field.right + 1 && rect.top >= field.top - 1 && rect.bottom <= field.bottom + 1;
        });
        const controls = [...document.querySelectorAll('[data-testid="opportunity-formation"] label, [data-testid="opportunity-formation"] button')]
          .filter((element) => getComputedStyle(element).visibility !== 'hidden')
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return { width: Math.round(rect.width), height: Math.round(rect.height), text: element.textContent.trim().slice(0, 60) };
          });
        const unnamed = [...document.querySelectorAll('a[href], button, input, select, textarea')]
          .filter((element) => {
            const style = getComputedStyle(element);
            if (style.display === 'none' || style.visibility === 'hidden') return false;
            const label = element.getAttribute('aria-label') || element.labels?.[0]?.textContent || element.textContent || element.getAttribute('alt');
            return !label?.trim();
          })
          .map((element) => element.outerHTML.slice(0, 160));
        return {
          h1Count: document.querySelectorAll('h1').length,
          mainCount: document.querySelectorAll('main').length,
          overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          anchorInside,
          minTargetWidth: Math.min(...controls.map((control) => control.width)),
          minTargetHeight: Math.min(...controls.map((control) => control.height)),
          unnamed,
          liveRegion: document.querySelector('[data-testid="formation-announcement"]')?.textContent.trim(),
          figureDescription: document.querySelector('#formation-field-caption')?.textContent.trim(),
          imageAlt: document.querySelector('img[src*="opportunity-table"]')?.alt,
          cls: window.__ux0Cls,
          resources: performance.getEntriesByType('resource').length,
          transferBytes: performance.getEntriesByType('resource').reduce((total, entry) => total + (entry.transferSize || 0), 0),
          fcpMs: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? null,
        };
      });

      const screenshot = join(SCREENSHOT_ROOT, `${viewport.name}-${colorScheme}.jpg`);
      await page.screenshot({ path: screenshot, type: 'jpeg', quality: 82, fullPage: true });
      matrix.push({ colorScheme, viewport, screenshot: relative(ROOT, screenshot), errors, failedRequests, requests: requests.length, layout });
      allErrors.push(...errors.map((error) => `${viewport.name}-${colorScheme}: ${error}`));
      allFailedRequests.push(...failedRequests.map((error) => `${viewport.name}-${colorScheme}: ${error}`));
      await context.close();
    }
  }

  const boundaryContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const boundaryPage = await boundaryContext.newPage();
  const boundaryRequests = [];
  boundaryPage.on('request', (request) => boundaryRequests.push(request.url()));
  for (const route of ['/', '/login', '/signup', '/forgot-password', '/auth/callback']) {
    await navigate(boundaryPage, BASE + route, { waitUntil: 'networkidle' });
  }

  await navigate(boundaryPage, BASE, { waitUntil: 'domcontentloaded' });
  await boundaryPage.locator('input[value="conversational-spanish"]').evaluate((input) => input.click());
  await boundaryPage.locator('input[value="cooking-stories"]').evaluate((input) => input.click());
  const responseMs = await boundaryPage.evaluate(() => new Promise((resolve) => {
    const status = document.querySelector('[data-testid="formation-status"]');
    const input = document.querySelector('input[value="kitchen-saturday"]');
    const started = performance.now();
    const observer = new MutationObserver(() => {
      if (/Ready|Forming/.test(status.textContent)) {
        observer.disconnect();
        resolve(performance.now() - started);
      }
    });
    observer.observe(status, { childList: true, subtree: true, characterData: true });
    input.click();
  }));
  await boundaryPage.getByTestId('formed-result').waitFor();
  const rationaleColors = await boundaryPage.getByTestId('formation-rationale-explanation').evaluate((element) => ({
    foreground: getComputedStyle(element).color,
    background: getComputedStyle(element.parentElement).backgroundColor,
  }));
  const parseColor = (value) => value.match(/[\d.]+/g).slice(0, 3).map(Number);
  const rationaleContrast = ratio(
    parseColor(rationaleColors.foreground),
    parseColor(rationaleColors.background)
  );

  const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const reducedPage = await reducedContext.newPage();
  await navigate(reducedPage, BASE, { waitUntil: 'domcontentloaded' });
  await selectScenario(reducedPage);
  const reducedMotionDuration = await reducedPage.locator('.aro-aperture').evaluate((element) => getComputedStyle(element).transitionDuration);

  await reducedContext.close();
  await boundaryContext.close();
  await browser.close();

  return {
    baseUrl: BASE,
    capturedAt: new Date().toISOString(),
    matrix,
    console: { errorsAndWarnings: allErrors },
    network: {
      uniqueRequests: [...allRequests.values()],
      failedRequests: allFailedRequests,
      supabaseDomainRequests: boundaryRequests.filter((url) => new URL(url).hostname.includes('supabase')),
      auditedRoutes: ['/', '/login', '/signup', '/forgot-password', '/auth/callback'],
    },
    performance: { responseMs: Number(responseMs.toFixed(2)) },
    accessibility: {
      reducedMotionDuration,
      tokenContrastRatios: {
        inkOnBone: ratio([40, 36, 32], [246, 240, 230]),
        whiteOnPrimary600: ratio([255, 255, 255], [190, 50, 25]),
        boneOnInk: ratio([246, 240, 230], [40, 36, 32]),
        secondary300OnInk: ratio([239, 193, 75], [40, 36, 32]),
      },
      renderedRationaleContrast: {
        ...rationaleColors,
        ratio: rationaleContrast,
      },
    },
  };
}

async function captureBundleEvidence() {
  const distRoot = join(ROOT, 'dist');
  const assetsRoot = join(distRoot, 'assets');
  const files = await readdir(assetsRoot);
  const assets = [];

  for (const file of files) {
    const path = join(assetsRoot, file);
    const info = await stat(path);
    if (!info.isFile()) continue;
    const contents = await readFile(path);
    assets.push({ file, bytes: info.size, gzipBytes: gzipSync(contents).length });
  }

  const indexHtml = await readFile(join(distRoot, 'index.html'), 'utf8');
  return {
    capturedAt: new Date().toISOString(),
    transformedModules: 2606,
    indexScript: indexHtml.match(/src="([^"]+\.js)"/)?.[1] ?? null,
    homeChunk: assets.find((asset) => asset.file.startsWith('HomePage-')) ?? null,
    css: assets.find((asset) => asset.file.startsWith('index-') && asset.file.endsWith('.css')) ?? null,
    largestJavaScript: assets.filter((asset) => asset.file.endsWith('.js')).sort((a, b) => b.gzipBytes - a.gzipBytes)[0] ?? null,
    generatedImages: [
      { file: 'public/ux0/opportunity-table-800.webp', bytes: (await stat(join(ROOT, 'public', 'ux0', 'opportunity-table-800.webp'))).size },
      { file: 'public/ux0/opportunity-table-1440.webp', bytes: (await stat(join(ROOT, 'public', 'ux0', 'opportunity-table-1440.webp'))).size },
    ],
    assets,
  };
}

await mkdir(SCREENSHOT_ROOT, { recursive: true });
const [browserEvidence, bundleEvidence] = await Promise.all([
  captureBrowserEvidence(),
  captureBundleEvidence(),
]);
await writeFile(join(ARTIFACT_ROOT, 'browser-evidence.json'), `${JSON.stringify(browserEvidence, null, 2)}\n`);
await writeFile(join(ARTIFACT_ROOT, 'bundle-evidence.json'), `${JSON.stringify(bundleEvidence, null, 2)}\n`);
console.log(`UX0 evidence captured at ${ARTIFACT_ROOT}`);
