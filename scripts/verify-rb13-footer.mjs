import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { startProductionServer } from '../src/test/production-server.js';

const output = join(process.cwd(), 'artifacts', 'ARO-RB13', 'footer');
await mkdir(output, { recursive: true });
const { base, server } = await startProductionServer(3114);
const cases = [
  { width: 320, height: 620, theme: 'light', name: 'footer-320-light' },
  { width: 390, height: 844, theme: 'dark', name: 'footer-390-dark' },
  { width: 768, height: 900, theme: 'light', name: 'footer-768-light' },
  { width: 1440, height: 900, theme: 'dark', name: 'footer-1440-dark' },
];
const results = [];
let browser;

try {
  browser = await chromium.launch({ headless: true, ...(process.env.ARO_BROWSER_EXECUTABLE ? { executablePath: process.env.ARO_BROWSER_EXECUTABLE } : {}) });

  for (const item of cases) {
    const context = await browser.newContext({
      viewport: { width: item.width, height: item.height },
      colorScheme: item.theme,
      reducedMotion: 'reduce',
    });
    await context.addInitScript((theme) => {
      localStorage.setItem('theme', theme);
      localStorage.setItem('conversa-language', 'en');
    }, item.theme);

    const page = await context.newPage();
    const errors = [];
    const writes = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('request', (request) => {
      if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
    });

    const response = await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
    const footer = page.locator('footer');
    await footer.waitFor({ state: 'visible' });
    await page.waitForFunction((theme) => document.documentElement.classList.contains('dark') === (theme === 'dark'), item.theme);
    await page.evaluate(() => document.fonts.ready);

    const state = await page.evaluate(() => ({
      actualTheme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      overflow: document.documentElement.scrollWidth > innerWidth,
    }));
    const footerHeight = Math.round((await footer.boundingBox()).height);
    const details = footer.locator('details');
    const detailsDisplay = await details.evaluate((element) => getComputedStyle(element.parentElement).display);
    const visibleNavigationCount = await footer.locator('nav[aria-label="Explore ARO"]').evaluateAll((elements) => {
      const visible = (element) => {
        let current = element;
        while (current && current !== document.documentElement) {
          const style = getComputedStyle(current);
          if (style.display === 'none' || style.visibility === 'hidden') return false;
          if (current.tagName === 'DETAILS' && !current.open) return false;
          current = current.parentElement;
        }
        return true;
      };
      return elements.filter(visible).length;
    });
    let mobileExpanded;
    let menuTargets = [];
    let menuTargetsMeetSize = true;

    if (item.width < 768) {
      await footer.screenshot({ path: join(output, `${item.name}-collapsed.png`) });
      const summary = details.locator('summary');
      await summary.focus();
      await summary.press('Space');
      mobileExpanded = await details.evaluate((element) => element.open);
      const mobileNavigation = footer.locator('nav[aria-label="Explore ARO"]:visible');
      menuTargets = await mobileNavigation.locator('a').evaluateAll((elements) => elements.map((element) => {
        const { width, height } = element.getBoundingClientRect();
        return { href: element.getAttribute('href'), width: Math.round(width), height: Math.round(height) };
      }));
      menuTargetsMeetSize = menuTargets.every((target) => target.width >= 44 && target.height >= 44);
      await footer.screenshot({ path: join(output, `${item.name}-expanded.png`) });
    } else {
      const desktopNavigation = footer.locator('nav[aria-label="Explore ARO"]:visible');
      menuTargets = await desktopNavigation.locator('a').evaluateAll((elements) => elements.map((element) => {
        const { width, height } = element.getBoundingClientRect();
        return { href: element.getAttribute('href'), width: Math.round(width), height: Math.round(height) };
      }));
      menuTargetsMeetSize = menuTargets.every((target) => target.width >= 44 && target.height >= 44);
      await footer.screenshot({ path: join(output, `${item.name}.png`) });
    }

    const legalTargets = await footer.locator('nav[aria-label="Legal"] a').evaluateAll((elements) => elements.map((element) => {
      const { width, height } = element.getBoundingClientRect();
      return { href: element.getAttribute('href'), width: Math.round(width), height: Math.round(height) };
    }));
    const expectedNavigation = ['/about', '/how-it-works', '/for-teachers', '/faq', '/explore', '/map', '/contact'];
    const expectedLegal = ['/privacy', '/terms', '/cookies'];
    const navigationPresent = expectedNavigation.every((href) => menuTargets.some((target) => target.href === href));
    const legalPresent = expectedLegal.every((href) => legalTargets.some((target) => target.href === href));
    const legalTargetsMeetSize = legalTargets.every((target) => target.width >= 44 && target.height >= 44);

    results.push({
      ...item,
      status: response?.status(),
      ...state,
      footerHeight,
      detailsDisplay,
      visibleNavigationCount,
      mobileExpanded,
      navigationPresent,
      legalPresent,
      menuTargetsMeetSize,
      legalTargetsMeetSize,
      errors,
      writes,
    });
    await context.close();
  }
} finally {
  await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
  await browser?.close();
  if (server.exitCode === null) server.kill('SIGTERM');
}

const failures = results.filter((item) =>
  item.status !== 200 || item.actualTheme !== item.theme || item.overflow || item.errors.length || item.writes.length ||
  (item.width < 768 && (item.detailsDisplay === 'none' || item.mobileExpanded !== true || item.footerHeight > 400)) ||
  (item.width >= 768 && (item.detailsDisplay !== 'none' || item.visibleNavigationCount !== 1)) ||
  !item.navigationPresent || !item.legalPresent || !item.menuTargetsMeetSize || !item.legalTargetsMeetSize,
);

if (results.length !== cases.length || failures.length) {
  console.error(JSON.stringify({ failures, checked: results.length }, null, 2));
  process.exitCode = 1;
} else {
  console.log(`RB13 footer: ${results.length} responsive/theme checks passed; mobile collapsed heights ${results.filter((item) => item.width < 768).map((item) => `${item.width}px=${item.footerHeight}px`).join(', ')}`);
}
