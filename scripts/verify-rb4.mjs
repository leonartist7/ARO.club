import { BASE, launch, navigate, requireAppOrigin } from '../e2e/harness.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const output = join(process.cwd(), 'artifacts', 'ARO-RB4');
await mkdir(output, { recursive: true });
const browser = await launch();
const results = [];
try {
  for (const [route, width, height, theme, language, expectedStatus] of [
    ['/experience/exp1', 320, 700, 'light', 'en', 200],
    ['/experience/not-an-experience', 320, 700, 'light', 'en', 404],
    ['/teacher/t1', 390, 844, 'dark', 'fr', 200],
    ['/teacher/not-a-teacher', 390, 844, 'dark', 'fr', 404],
    ['/map', 1440, 900, 'light', 'es', 200],
    ['/favorites', 360, 740, 'light', 'en', 200],
    ['/recently-viewed', 390, 844, 'dark', 'es', 200],
    ['/compare', 768, 900, 'light', 'fr', 200],
    ['/this-route-does-not-exist', 1440, 900, 'dark', 'en', 404],
  ]) {
    const slug = `${route.slice(1).replaceAll('/', '-')}-${width}-${theme}-${language}`;
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    await context.addInitScript({ content: `localStorage.setItem('theme', ${JSON.stringify(theme)}); localStorage.setItem('conversa-language', ${JSON.stringify(language)}); localStorage.setItem('conversa-compare', '["exp1","exp2"]');` });
    const page = await context.newPage();
    const errors = [];
    const writes = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`); });
    const response = await navigate(page, `${BASE}${route}`, { waitUntil: 'domcontentloaded' });
    requireAppOrigin(page, BASE);
    await page.getByText('Loading ARO…').first().waitFor({ state: 'hidden' });
    await page.waitForFunction(expected => document.documentElement.classList.contains(expected), theme);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(650);
    if (await page.locator('main img').count()) await page.locator('main img').first().evaluate(image => image.decode().catch(() => {}));
    await page.screenshot({ path: join(output, `${slug}.png`) });
    let darkFocusRing = null;
    if (theme === 'dark') {
      await page.keyboard.press('Tab');
      const action = page.locator('main a[href="/onboarding/preview"]');
      await action.focus();
      darkFocusRing = await action.evaluate(element => getComputedStyle(element).boxShadow.includes('255, 248, 238'));
    }
    const main = await page.locator('main').first().innerText();
    results.push({ slug, status: response?.status(), expectedStatus, heading: await page.locator('h1').first().innerText(), main: main.slice(0, 500), mainLandmarks: await page.getByRole('main').count(), hasPreviewLink: await page.locator('main a[href="/onboarding/preview"]').count() > 0, hidesPersistedFixtures: await page.getByText('Compare Now').count() === 0, darkFocusRing, horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors, writes });
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => result.status !== result.expectedStatus || result.mainLandmarks !== 1 || !result.hasPreviewLink || !result.hidesPersistedFixtures || result.darkFocusRing === false || result.horizontalOverflow || result.errors.length || result.writes.length)) process.exitCode = 1;
