import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const { launch } = await import(pathToFileURL(path.join(root, 'e2e/harness.mjs')).href);
const browser = await launch();
const findings = [];

try {
  for (const width of [360, 1440]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, colorScheme: theme, reducedMotion: 'reduce' });
      await context.addInitScript(value => localStorage.setItem('theme', value), theme);
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const info = await page.evaluate(() => ({
        hasContent: document.body.innerText.trim().length > 100,
        fontLoaded: document.fonts.check('40px "Noise Order"'),
        headingFont: getComputedStyle(document.querySelector('h1')).fontFamily,
        wordmarkFont: getComputedStyle(document.querySelector('.aro-wordmark')).fontFamily,
        overflow: document.documentElement.scrollWidth > innerWidth,
        errorOverlay: Boolean(document.querySelector('[data-nextjs-dialog]')),
      }));
      await page.screenshot({ path: path.join(root, `artifacts/ARO-R2/home-${width}-${theme}.png`), fullPage: true });
      findings.push({ width, theme, status: response?.status(), ...info, errors });
      if (width === 1440 && theme === 'light') {
        const app = await page.goto('http://127.0.0.1:5173/app', { waitUntil: 'networkidle' });
        await page.screenshot({ path: path.join(root, 'artifacts/ARO-R2/app-desktop.png'), fullPage: true });
        findings.push({ route: '/app', status: app?.status(), hasContent: await page.evaluate(() => document.body.innerText.trim().length > 100) });
      }
      await context.close();
    }
  }
  fs.writeFileSync(path.join(root, 'artifacts/ARO-R2/browser.json'), JSON.stringify(findings, null, 2));
  console.log(JSON.stringify(findings, null, 2));
  if (findings.some(item => item.status !== 200 || item.hasContent === false || item.fontLoaded === false || item.overflow || item.errorOverlay || item.errors?.length)) process.exitCode = 1;
} finally {
  await browser.close();
}
