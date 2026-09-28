import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const out = join(process.cwd(), 'artifacts', 'ARO-RB7');
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const results = [];
async function visit(path, width, height, initial = {}) {
  const context = await browser.newContext({ viewport: { width, height }, colorScheme: initial.systemTheme ?? 'light', reducedMotion: 'reduce' });
  await context.addInitScript(({ theme, language }) => {
    if (theme && !localStorage.getItem('theme')) localStorage.setItem('theme', theme);
    if (language && !localStorage.getItem('conversa-language')) localStorage.setItem('conversa-language', language);
  }, initial);
  const page = await context.newPage();
  const errors = [];
  const writes = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`); });
  const response = await page.goto(`http://localhost:3107${path}`, { waitUntil: 'domcontentloaded' });
  await page.getByText('Loading ARO…').first().waitFor({ state: 'hidden' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(650);
  return { context, page, errors, writes, status: response?.status() };
}
try {
  {
    const { context, page, errors, writes, status } = await visit('/', 320, 620, { theme: 'light', language: 'en' });
    await page.screenshot({ path: join(out, 'home-320-light-en.png') });
    const headerHasAlwaysVisibleToggles = await page.getByRole('button', { name: 'Language' }).count() > 0 || await page.getByRole('button', { name: 'Switch to dark mode' }).count() > 0;
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('group', { name: 'Language' }).getByRole('button', { name: 'Français' }).click();
    await page.getByRole('group', { name: 'Apparence' }).getByRole('button', { name: 'Sombre' }).click();
    await page.waitForFunction(() => document.documentElement.classList.contains('dark') && document.documentElement.lang === 'fr');
    await page.screenshot({ path: join(out, 'menu-320-dark-fr.png') });
    await page.keyboard.press('Escape');
    const escapeRestoredFocus = await page.evaluate(() => document.activeElement?.getAttribute('aria-label') === 'Ouvrir le menu');
    await page.reload();
    await page.waitForFunction(() => document.documentElement.classList.contains('dark') && document.documentElement.lang === 'fr');
    results.push({ scenario: 'mobile public', status, headerHasAlwaysVisibleToggles, escapeRestoredFocus, storedTheme: await page.evaluate(() => localStorage.getItem('theme')), storedLanguage: await page.evaluate(() => localStorage.getItem('conversa-language')), hasBottomTabBar: await page.locator('nav.fixed.bottom-0').count() > 0, overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors, writes });
    await context.close();
  }
  {
    const { context, page, errors, writes, status } = await visit('/about', 1440, 900, { theme: 'dark', language: 'es', systemTheme: 'dark' });
    await page.getByRole('button', { name: 'Preferencias' }).click();
    await page.waitForFunction(() => document.activeElement?.getAttribute('aria-pressed') !== null);
    const opensAtChoice = await page.evaluate(() => document.activeElement?.getAttribute('aria-pressed') !== null);
    await page.getByRole('group', { name: 'Apariencia' }).getByRole('button', { name: 'Usar el ajuste del dispositivo' }).click();
    await page.screenshot({ path: join(out, 'about-preferences-1440-dark-es.png') });
    await page.emulateMedia({ colorScheme: 'light' });
    await page.waitForFunction(() => document.documentElement.classList.contains('light'));
    await page.keyboard.press('Escape');
    const escapeRestoredFocus = await page.evaluate(() => document.activeElement?.getAttribute('aria-label') === 'Preferencias');
    results.push({ scenario: 'desktop system preference', status, opensAtChoice, escapeRestoredFocus, storedTheme: await page.evaluate(() => localStorage.getItem('theme')), overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors, writes });
    await context.close();
  }
  {
    const { context, page, errors, writes, status } = await visit('/onboarding/preview', 390, 844, { theme: 'light', language: 'en' });
    await page.getByRole('button', { name: 'Preferences' }).click();
    await page.getByRole('group', { name: 'Language' }).getByRole('button', { name: 'Español' }).click();
    await page.screenshot({ path: join(out, 'onboarding-preferences-390-light-es.png') });
    results.push({ scenario: 'onboarding', status, storedLanguage: await page.evaluate(() => localStorage.getItem('conversa-language')), overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors, writes });
    await context.close();
  }
  {
    const { context, page, errors, writes, status } = await visit('/app/settings', 768, 900, { theme: 'light', language: 'fr' });
    await page.getByRole('group', { name: 'Apparence' }).getByRole('button', { name: 'Sombre' }).click();
    await page.waitForFunction(() => document.documentElement.classList.contains('dark'));
    await page.screenshot({ path: join(out, 'app-settings-768-dark-fr.png') });
    results.push({ scenario: 'app settings', status, storedTheme: await page.evaluate(() => localStorage.getItem('theme')), overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors, writes });
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(join(out, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => result.status !== 200 || result.overflow || result.errors.length || result.writes.length || result.headerHasAlwaysVisibleToggles || result.hasBottomTabBar || result.escapeRestoredFocus === false || result.opensAtChoice === false || (result.scenario === 'mobile public' && (result.storedTheme !== 'dark' || result.storedLanguage !== 'fr')) || (result.scenario === 'desktop system preference' && result.storedTheme !== 'system') || (result.scenario === 'onboarding' && result.storedLanguage !== 'es') || (result.scenario === 'app settings' && result.storedTheme !== 'dark'))) process.exitCode = 1;
