import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { startProductionServer } from '../src/test/production-server.js';

const out = join(process.cwd(), 'artifacts', 'ARO-RB11', 'hosted');
await mkdir(out, { recursive: true });
const { base, server } = await startProductionServer(3111);
let browser;
const results = [];

try {
  browser = await chromium.launch({ headless: true });
  for (const [route, width, height, name] of [
    ['/', 320, 620, 'home-320-light-en'],
    ['/', 1440, 900, 'home-1440-light-en'],
    ['/onboarding/preview', 360, 640, 'onboarding-360-light-en'],
    ['/app/settings', 320, 620, 'settings-320-light-en'],
    ['/app/settings', 1440, 900, 'settings-1440-light-en'],
  ]) {
    const context = await browser.newContext({ viewport: { width, height }, colorScheme: 'dark', reducedMotion: 'reduce' });
    await context.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('conversa-language', 'es');
    });
    const page = await context.newPage();
    const errors = [];
    const writes = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.method()); });
    const response = await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
    await page.getByRole('heading').first().waitFor({ state: 'visible' });
    await page.evaluate(() => document.fonts.ready);
    const state = await page.evaluate(() => ({
      language: document.documentElement.lang,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      storedLanguage: localStorage.getItem('conversa-language'),
      storedTheme: localStorage.getItem('theme'),
      overflow: document.documentElement.scrollWidth > innerWidth,
    }));
    const preferenceControls = await page.getByRole('group', { name: /language|appearance/i }).count();
    const startAction = route === '/' ? await page.getByRole('link', { name: /get started/i }).count() : undefined;
    await page.screenshot({ path: join(out, `${name}.png`), fullPage: false });
    results.push({ route, width, height, status: response?.status(), ...state, preferenceControls, startAction, errors, writes });
    if (route === '/' && width === 320) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      const menuPreferences = await page.getByRole('group', { name: /language|appearance/i }).count();
      results.at(-1).menuPreferences = menuPreferences;
      await page.screenshot({ path: join(out, 'home-menu-320-light-en.png'), fullPage: false });
    }
    await context.close();
  }
} finally {
  await writeFile(join(out, 'browser.json'), JSON.stringify(results, null, 2));
  await browser?.close();
  if (server.exitCode === null) server.kill('SIGTERM');
}

if (results.length !== 5 || results.some(item => item.status !== 200 || item.language !== 'en' || item.theme !== 'light' || item.storedLanguage !== 'es' || item.storedTheme !== 'dark' || item.overflow || item.preferenceControls || item.menuPreferences || item.errors.length || item.writes.length || (item.startAction !== undefined && !item.startAction))) process.exitCode = 1;
