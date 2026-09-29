import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { startProductionServer } from '../src/test/production-server.js';

const out = join(process.cwd(), 'artifacts', 'ARO-RB7', 'cloud-continuation');
await mkdir(out, { recursive: true });
const { base, server } = await startProductionServer(3107);
let browser;
const results = [];

async function visit(path, width, height, initial = {}) {
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme: initial.systemTheme ?? 'light',
    reducedMotion: 'reduce',
  });
  await context.addInitScript(({ theme, language }) => {
    if (theme && !localStorage.getItem('theme')) localStorage.setItem('theme', theme);
    if (language && !localStorage.getItem('conversa-language')) localStorage.setItem('conversa-language', language);
  }, initial);
  const page = await context.newPage();
  const errors = [];
  const writes = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });
  const response = await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('heading').first().waitFor({ state: 'visible' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  return { context, page, errors, writes, status: response?.status() };
}

const localized = {
  en: { trigger: 'Language: English', menu: 'Choose language' },
  fr: { trigger: 'Langue: Français', menu: 'Choisir la langue' },
  es: { trigger: 'Idioma: Español', menu: 'Elegir idioma' },
};

try {
  browser = await chromium.launch({ headless: true });

  {
    const { context, page, errors, writes, status } = await visit('/', 320, 620, { theme: 'light', language: 'en' });
    const language = page.getByRole('button', { name: 'Language: English', exact: true });
    const theme = page.getByRole('button', { name: 'Switch to dark mode', exact: true });
    const compactControlsVisible = await language.isVisible() && await theme.isVisible();

    await language.click();
    await page.getByRole('menuitemradio', { name: 'Français', exact: true }).click();
    await page.waitForFunction(() => document.documentElement.lang === 'fr');

    const frenchLanguage = page.getByRole('button', { name: 'Langue: Français', exact: true });
    await frenchLanguage.click();
    await page.keyboard.press('Escape');
    const escapeRestoredFocus = await frenchLanguage.evaluate(element => (
      element === document.activeElement && element.getAttribute('aria-expanded') === 'false'
    ));

    await page.getByRole('button', { name: 'Passer en mode sombre', exact: true }).click();
    await page.waitForFunction(() => document.documentElement.classList.contains('dark'));
    await page.getByRole('button', { name: 'Ouvrir le menu', exact: true }).click();

    await page.screenshot({ path: join(out, 'menu-320-dark-fr.png') });
    await page.reload();
    await page.waitForFunction(() => document.documentElement.classList.contains('dark') && document.documentElement.lang === 'fr');

    results.push({
      scenario: 'mobile public',
      status,
      compactControlsVisible,
      escapeRestoredFocus,
      storedTheme: await page.evaluate(() => localStorage.getItem('theme')),
      storedLanguage: await page.evaluate(() => localStorage.getItem('conversa-language')),
      hasBottomTabBar: await page.locator('nav.fixed.bottom-0').count() > 0,
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      errors,
      writes,
    });
    await context.close();
  }

  {
    const { context, page, errors, writes, status } = await visit('/about', 1440, 900, {
      theme: 'dark',
      language: 'es',
      systemTheme: 'dark',
    });
    const toLight = page.getByRole('button', { name: 'Cambiar a modo claro', exact: true });
    await toLight.click();
    await page.waitForFunction(() => document.documentElement.classList.contains('light'));
    const toDark = page.getByRole('button', { name: 'Cambiar a modo oscuro', exact: true });
    await toDark.click();
    await page.waitForFunction(() => document.documentElement.classList.contains('dark'));

    const language = page.getByRole('button', { name: 'Idioma: Español', exact: true });
    await language.click();
    const menu = page.getByRole('menu', { name: 'Elegir idioma', exact: true });
    const menuFits = await menu.evaluate(element => {
      const r = element.getBoundingClientRect();
      return r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth;
    });
    await page.keyboard.press('Escape');
    const escapeRestoredFocus = await language.evaluate(element => element === document.activeElement);

    await page.screenshot({ path: join(out, 'about-preferences-1440-dark-es.png') });
    results.push({
      scenario: 'desktop compact preferences',
      status,
      menuFits,
      escapeRestoredFocus,
      storedTheme: await page.evaluate(() => localStorage.getItem('theme')),
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      errors,
      writes,
    });
    await context.close();
  }

  {
    const { context, page, errors, writes, status } = await visit('/onboarding/preview', 390, 844, {
      theme: 'light',
      language: 'en',
    });
    await page.getByRole('button', { name: 'Language: English', exact: true }).click();
    await page.getByRole('menuitemradio', { name: 'Español', exact: true }).click();
    await page.waitForFunction(() => document.documentElement.lang === 'es');
    await page.screenshot({ path: join(out, 'onboarding-preferences-390-light-es.png') });

    results.push({
      scenario: 'onboarding',
      status,
      storedLanguage: await page.evaluate(() => localStorage.getItem('conversa-language')),
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      errors,
      writes,
    });
    await context.close();
  }

  {
    const { context, page, errors, writes, status } = await visit('/app/settings', 768, 900, {
      theme: 'light',
      language: 'fr',
    });
    await page.getByRole('button', { name: 'Passer en mode sombre', exact: true }).click();
    await page.waitForFunction(() => document.documentElement.classList.contains('dark'));
    await page.screenshot({ path: join(out, 'app-settings-768-dark-fr.png') });

    results.push({
      scenario: 'app settings',
      status,
      storedTheme: await page.evaluate(() => localStorage.getItem('theme')),
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      errors,
      writes,
    });
    await context.close();
  }

  {
    const { context, page, errors, writes, status } = await visit('/app', 320, 740, {
      theme: 'light',
      language: 'en',
    });
    const appShellControlsVisible = (
      await page.getByRole('button', { name: 'Language: English', exact: true }).isVisible()
      && await page.getByRole('button', { name: 'Switch to dark mode', exact: true }).isVisible()
    );
    await page.screenshot({ path: join(out, 'app-home-320-light-en.png') });

    results.push({
      scenario: 'app shell mobile',
      status,
      appShellControlsVisible,
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      errors,
      writes,
    });
    await context.close();
  }

  for (const [index, width] of [320, 360, 390, 430, 768, 1440].entries()) {
    for (const scale of [1, 2]) {
      const language = ['en', 'fr', 'es'][index % 3];
      const theme = scale === 1 ? 'light' : 'dark';
      const { context, page, errors, writes, status } = await visit('/onboarding/preview', width, 480, { theme, language });
      if (scale === 2) await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });

      const trigger = page.getByRole('button', { name: localized[language].trigger, exact: true });
      await trigger.focus();
      await page.keyboard.press('Enter');
      const menu = page.getByRole('menu', { name: localized[language].menu, exact: true });
      const selected = menu.getByRole('menuitemradio', { checked: true });
      const selectedFocused = await selected.evaluate(element => element === document.activeElement);
      const menuFits = await menu.evaluate(element => {
        const r = element.getBoundingClientRect();
        return r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth;
      });
      const controlsFit = await trigger.evaluate(element => {
        const group = element.closest('[role="group"]');
        const r = group.getBoundingClientRect();
        return r.left >= 0 && r.right <= innerWidth;
      });

      await page.screenshot({
        path: join(out, `onboarding-preferences-${width}-${theme}-${language}-${scale}x.png`),
      });
      await page.keyboard.press('Escape');
      const escapeRestoredFocus = await trigger.evaluate(element => (
        element === document.activeElement && element.getAttribute('aria-expanded') === 'false'
      ));

      results.push({
        scenario: `short phone and text scaling ${width}/${scale}`,
        status,
        menuFits,
        controlsFit,
        selectedFocused,
        escapeRestoredFocus,
        overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        errors,
        writes,
      });
      await context.close();
    }
  }
} finally {
  await writeFile(join(out, 'browser.json'), JSON.stringify(results, null, 2));
  await browser?.close();
  if (server.exitCode === null) server.kill('SIGTERM');
}

if (results.some(result => (
  result.status !== 200
  || result.overflow
  || result.errors.length
  || result.writes.length
  || result.compactControlsVisible === false
  || result.appShellControlsVisible === false
  || result.hasBottomTabBar
  || result.escapeRestoredFocus === false
  || result.menuFits === false
  || result.controlsFit === false
  || result.selectedFocused === false
  || (result.scenario === 'mobile public' && (result.storedTheme !== 'dark' || result.storedLanguage !== 'fr'))
  || (result.scenario === 'desktop compact preferences' && result.storedTheme !== 'dark')
  || (result.scenario === 'onboarding' && result.storedLanguage !== 'es')
  || (result.scenario === 'app settings' && result.storedTheme !== 'dark')
))) process.exitCode = 1;

if (process.exitCode) console.error(JSON.stringify(results, null, 2));
else console.log(`RB14 compact theme/language paths: ${results.length} passed`);
