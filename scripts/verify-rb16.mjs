import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { startProductionServer } from '../src/test/production-server.js';

const phase = process.env.ARO_RB16_PHASE ?? 'after';
assert(['before', 'after'].includes(phase));
const output = join(process.cwd(), 'artifacts', 'ARO-RB16', phase);
await mkdir(output, { recursive: true });
const { base, server } = await startProductionServer(3116);
const core = [
  ['public-home', '/'], ['onboarding', '/onboarding/preview'], ['home', '/app'],
  ['explore', '/explore'], ['opportunities', '/app/opportunities'],
  ['create', '/app/create?mode=gather'], ['detail', '/app/opportunities/river-photo-walk'],
];
const results = [];
let browser;
try {
  browser = await chromium.launch({ headless: true });
  for (const viewport of [{ width: 320, height: 620 }, { width: 390, height: 844 }, { width: 768, height: 900 }, { width: 1440, height: 900 }]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce', colorScheme: 'light' });
    await context.addInitScript(() => { localStorage.setItem('theme', 'light'); localStorage.setItem('conversa-language', 'en'); });
    const page = await context.newPage();
    for (const [name, route] of core) {
      const errors = [], writes = [];
      const onError = error => errors.push(error.message);
      const onRequest = request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`); };
      page.on('pageerror', onError);
      page.on('request', onRequest);
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        heading: document.querySelector('h1')?.textContent,
        language: document.documentElement.lang,
        dark: document.documentElement.classList.contains('dark'),
        images: [...document.querySelectorAll('img')].filter(img => img.getBoundingClientRect().width && img.getBoundingClientRect().top < innerHeight).map(img => ({ src: new URL(img.currentSrc).pathname, loaded: img.complete && img.naturalWidth > 0, fit: getComputedStyle(img).objectFit })),
      }));
      await page.screenshot({ path: join(output, `${name}-${viewport.width}.png`), fullPage: true });
      results.push({ name, route, ...viewport, status: response.status(), ...state, errors, writes });
      page.off('pageerror', onError);
      page.off('request', onRequest);
    }
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await context.addInitScript(() => { localStorage.setItem('theme', 'light'); localStorage.setItem('conversa-language', 'en'); });
  const page = await context.newPage();
  for (const route of ['/about', '/how-it-works', '/for-teachers', '/faq', '/contact', '/privacy', '/terms', '/cookies', '/login', '/signup', '/forgot-password', '/auth/error', '/choose-role', '/map', '/favorites', '/recently-viewed', '/compare', '/bookings', '/leaderboard', '/experience/exp1', '/teacher/t1', '/app/world', '/app/circles', '/app/circles/river-photo-walk', '/app/opportunities/river-photo-walk/commit', '/app/insights', '/app/library', '/app/passport', '/app/profile', '/app/settings', '/app/express', '/teacher/application', '/teacher/dashboard', '/student-dashboard', '/admin', '/chat']) {
    const errors = [], writes = [];
    const onError = error => errors.push(error.message);
    const onRequest = request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.method()); };
    page.on('pageerror', onError); page.on('request', onRequest);
    const response = await page.goto(base + route, { waitUntil: 'networkidle' });
    results.push({ route, status: response.status(), finalRoute: page.url().replace(base, ''), overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors, writes });
    page.off('pageerror', onError); page.off('request', onRequest);
  }
  if (phase === 'after') {
    await page.goto(base + '/app/create', { waitUntil: 'networkidle' });
    const trigger = page.getByRole('button', { name: 'Language: English' });
    await trigger.click();
    await assert.doesNotReject(() => page.getByRole('menuitemradio', { name: 'English' }).waitFor());
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Français');
    await page.keyboard.press('End');
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Español');
    await page.keyboard.press('Escape');
    assert.equal(await trigger.evaluate(element => document.activeElement === element), true);
    await trigger.click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Tab');
    assert.equal(await page.getByRole('menu').count(), 0);
    await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    assert.equal(await page.evaluate(() => document.documentElement.classList.contains('dark')), true);
    await page.screenshot({ path: join(output, 'create-dark-390.png'), fullPage: true });
  }
  await context.close();
} finally {
  await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
  await browser?.close();
  if (server.exitCode === null) server.kill('SIGTERM');
}
assert.equal(results.length, 64);
assert.deepEqual(results.filter(item => item.name && (item.status !== 200 || item.language !== 'en' || item.dark || !item.heading)), []);
assert.deepEqual(results.filter(item => item.status >= 500 || item.overflow || item.errors.length || item.writes.length || item.images?.some(img => !img.loaded)), []);
console.log(`RB16 ${phase}: 28 screenshots and 36 supporting routes passed`);
