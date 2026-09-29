import { chromium } from 'playwright';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { startProductionServer } from '../src/test/production-server.js';

const output = join(process.cwd(), 'artifacts', 'ARO-RB13', 'release-candidate');
await mkdir(output, { recursive: true });
const { base, server } = await startProductionServer(3113);
const cases = [
  { route: '/', width: 320, height: 620, name: 'home-320', action: 'Get started', art: 'onboarding-connect' },
  { route: '/', width: 1440, height: 900, name: 'home-1440', action: 'Get started', art: 'onboarding-connect' },
  { route: '/onboarding/preview', width: 320, height: 620, name: 'onboarding-320', action: 'Show me more', art: 'onboarding-learn' },
  { route: '/onboarding/preview', width: 768, height: 900, name: 'onboarding-768', action: 'Show me more', art: 'onboarding-learn' },
  { route: '/explore', width: 320, height: 620, name: 'explore-320', action: 'Get started', art: 'onboarding-learn' },
  { route: '/about', width: 320, height: 620, name: 'about-320', action: 'Explore the introduction', art: 'onboarding-connect' },
  { route: '/for-teachers', width: 320, height: 620, name: 'teachers-320', action: 'Explore the introduction', art: 'onboarding-teach-language-v2' },
  { route: '/how-it-works', width: 390, height: 740, name: 'how-390', action: 'Explore the introduction', art: 'onboarding-learn' },
  { route: '/faq', width: 320, height: 620, name: 'faq-320', action: 'Explore the introduction', art: 'onboarding-connect' },
  { route: '/login', width: 320, height: 620, name: 'login-320' },
  { route: '/app', width: 320, height: 620, name: 'app-home-320', action: 'Find a class' },
  { route: '/app/world', width: 320, height: 620, name: 'world-320' },
  { route: '/app/opportunities', width: 320, height: 620, name: 'opportunities-320' },
  { route: '/app/create?mode=gather', width: 320, height: 620, name: 'create-320' },
  { route: '/app/settings', width: 320, height: 620, name: 'settings-320' },
  { route: '/app', width: 1440, height: 900, name: 'app-home-1440', action: 'Find a class' },
];

const results = [];
const routeResults = [];
let browser;
try {
  browser = await chromium.launch({ headless: true, ...(process.env.ARO_BROWSER_EXECUTABLE ? { executablePath: process.env.ARO_BROWSER_EXECUTABLE } : {}) });
  for (const item of cases) {
    const context = await browser.newContext({ viewport: { width: item.width, height: item.height }, colorScheme: 'dark', reducedMotion: 'reduce' });
    await context.addInitScript(() => { localStorage.setItem('theme', 'dark'); localStorage.setItem('conversa-language', 'es'); });
    const page = await context.newPage();
    const errors = [];
    const writes = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`); });
    const response = await page.goto(base + item.route, { waitUntil: 'domcontentloaded' });
    await page.locator('h1').first().waitFor({ state: 'visible' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(750);
    const state = await page.evaluate(() => ({
      language: document.documentElement.lang,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      storedLanguage: localStorage.getItem('conversa-language'),
      storedTheme: localStorage.getItem('theme'),
      overflow: document.documentElement.scrollWidth > innerWidth,
      heading: document.querySelector('h1')?.textContent?.trim(),
    }));
    let action;
    if (item.action) {
      const control = page.getByRole(item.route === '/onboarding/preview' ? 'button' : 'link', { name: item.action, exact: true }).first();
      action = await control.evaluate(element => { const { top, bottom } = element.getBoundingClientRect(); return { top: Math.round(top), bottom: Math.round(bottom) }; });
    }
    let art;
    if (item.art) {
      art = await page.locator(`img[src*="${item.art}-640.webp"]`).first().evaluate(element => {
        const image = element.getBoundingClientRect();
        const frame = element.closest('[data-onboarding-scene-art]')?.getBoundingClientRect();
        return {
          loaded: element.naturalWidth > 0,
          top: Math.round(image.top),
          naturalWidth: element.naturalWidth,
          objectFit: getComputedStyle(element).objectFit,
          frameRatio: frame ? Number((frame.width / frame.height).toFixed(3)) : null,
          imageRatio: Number((image.width / image.height).toFixed(3)),
        };
      });
    }
    const truthful = item.route === '/explore' ? await page.getByText(/no verified live classes/i).count() > 0 : item.route === '/app' ? await page.getByText(/fictional preview/i).count() > 0 : true;
    if (item.route === '/faq') await page.locator('details summary').first().click();
    const faqOpened = item.route === '/faq' ? await page.locator('details').first().evaluate(element => element.open) : undefined;
    await page.screenshot({ path: join(output, `${item.name}.png`), fullPage: false });
    results.push({ ...item, status: response?.status(), ...state, action, art, truthful, faqOpened, errors, writes });
    await context.close();
  }
  const routeContext = await browser.newContext({ viewport: { width: 360, height: 640 }, reducedMotion: 'reduce' });
  const routePage = await routeContext.newPage();
  for (const route of [
    '/', '/about', '/how-it-works', '/for-teachers', '/faq', '/contact', '/privacy', '/terms', '/cookies',
    '/login', '/signup', '/forgot-password', '/auth/error', '/choose-role', '/onboarding/preview',
    '/explore', '/map', '/favorites', '/recently-viewed', '/compare', '/bookings', '/leaderboard',
    '/experience/exp1', '/teacher/t1', '/app', '/app/world', '/app/opportunities',
    '/app/opportunities/river-photo-walk', '/app/opportunities/river-photo-walk/commit', '/app/create',
    '/app/circles', '/app/circles/river-photo-walk', '/app/insights', '/app/library', '/app/passport',
    '/app/profile', '/app/settings', '/app/express', '/teacher/application', '/chat',
  ]) {
    const errors = [];
    const writes = [];
    const onError = error => errors.push(error.message);
    const onRequest = request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.method()); };
    routePage.on('pageerror', onError);
    routePage.on('request', onRequest);
    const response = await routePage.goto(base + route, { waitUntil: 'domcontentloaded' });
    await routePage.waitForTimeout(150);
    routeResults.push({ route, status: response?.status(), finalUrl: routePage.url().replace(base, ''), overflow: await routePage.evaluate(() => document.documentElement.scrollWidth > innerWidth), headingCount: await routePage.locator('h1').count(), errors, writes });
    routePage.off('pageerror', onError);
    routePage.off('request', onRequest);
  }
  await routeContext.close();
} finally {
  await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
  await writeFile(join(output, 'route-sweep.json'), JSON.stringify(routeResults, null, 2));
  await browser?.close();
  if (server.exitCode === null) server.kill('SIGTERM');
}

const artBytes = Object.fromEntries(await Promise.all(['onboarding-connect-640.webp', 'onboarding-learn-640.webp', 'onboarding-teach-language-v2-640.webp'].map(async name => [name, (await stat(join(process.cwd(), 'public', 'brand', name))).size])));
await writeFile(join(output, 'asset-bytes.json'), JSON.stringify(artBytes, null, 2));
const failures = results.filter(item => item.status !== 200 || item.language !== 'en' || item.theme !== 'light' || item.storedLanguage !== 'es' || item.storedTheme !== 'dark' || item.overflow || !item.truthful || item.errors.length || item.writes.length || (item.action && (item.action.top < 0 || item.action.bottom > item.height)) || (item.art && (!item.art.loaded || item.art.top >= item.height)) || (item.route === '/onboarding/preview' && item.art && (item.art.objectFit !== 'contain' || Math.abs(item.art.frameRatio - 4 / 3) > 0.02 || Math.abs(item.art.imageRatio - 4 / 3) > 0.02)) || item.faqOpened === false);
const routeFailures = routeResults.filter(item => !item.status || item.status >= 500 || item.overflow || item.errors.length || item.writes.length);
if (results.length !== cases.length || failures.length || routeResults.length !== 40 || routeFailures.length) {
  console.error(JSON.stringify({ failures, routeFailures, checked: results.length, routes: routeResults.length }, null, 2));
  process.exitCode = 1;
} else {
  console.log(`RB13 visual journey: ${results.length} screenshots and ${routeResults.length} route checks passed; mobile art bytes ${JSON.stringify(artBytes)}`);
}
