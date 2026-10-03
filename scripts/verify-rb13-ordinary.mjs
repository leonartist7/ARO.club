import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { startProductionServer } from '../src/test/production-server.js';

const output = join(process.cwd(), 'artifacts', 'ARO-RB13', 'ordinary-preferences');
await mkdir(output, { recursive: true });
const { base, server } = await startProductionServer(3114);
const cases = [
  { route: '/', language: 'es', theme: 'dark', width: 390, name: 'home-es-dark' },
  { route: '/app/settings', language: 'es', theme: 'dark', width: 390, name: 'settings-es-dark' },
  { route: '/onboarding/preview', language: 'fr', theme: 'light', width: 390, name: 'onboarding-fr-light' },
];
const results = [];
let browser;
try {
  browser = await chromium.launch({ headless: true, ...(process.env.ARO_BROWSER_EXECUTABLE ? { executablePath: process.env.ARO_BROWSER_EXECUTABLE } : {}) });
  for (const item of cases) {
    const context = await browser.newContext({ viewport: { width: item.width, height: 740 }, colorScheme: item.theme, reducedMotion: 'reduce' });
    await context.addInitScript(({ language, theme }) => { localStorage.setItem('conversa-language', language); localStorage.setItem('theme', theme); }, item);
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(base + item.route, { waitUntil: 'domcontentloaded' });
    await page.locator('h1').first().waitFor({ state: 'visible' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    const state = await page.evaluate(() => ({ language: document.documentElement.lang, theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light', overflow: document.documentElement.scrollWidth > innerWidth, heading: document.querySelector('h1')?.textContent?.trim() }));
    await page.screenshot({ path: join(output, `${item.name}.png`), fullPage: false });
    results.push({ ...item, status: response?.status(), ...state, errors });
    await context.close();
  }
} finally {
  await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
  await browser?.close();
  if (server.exitCode === null) server.kill('SIGTERM');
}
if (results.length !== cases.length || results.some((item, index) => item.status !== 200 || item.language !== cases[index].language || item.theme !== cases[index].theme || item.overflow || item.errors.length)) process.exitCode = 1;
if (process.exitCode) console.error(JSON.stringify(results, null, 2));
else console.log(`RB13 ordinary theme/language paths: ${results.length} passed`);
