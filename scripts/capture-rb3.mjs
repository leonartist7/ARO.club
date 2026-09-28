import { BASE, launch, navigate, requireAppOrigin } from '../e2e/harness.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { translations } from '../src/i18n/translations.js';
import { rebrandJourneyCopy } from '../src/i18n/rebrandJourney.js';

const output = join(process.cwd(), 'artifacts', 'ARO-RB3');
await mkdir(output, { recursive: true });
const browser = await launch();
const results = [];
try {
  for (const [route, width, height, theme, language] of [
    ['/', 320, 620, 'light', 'en'],
    ['/', 390, 844, 'dark', 'es'],
    ['/', 1440, 900, 'light', 'fr'],
    ['/explore', 360, 700, 'light', 'en'],
    ['/explore', 1440, 900, 'dark', 'fr'],
    ['/app', 360, 740, 'light', 'en'],
    ['/app', 1440, 900, 'dark', 'es'],
    ['/app/world', 390, 844, 'light', 'fr'],
    ['/app/create', 320, 620, 'dark', 'en'],
    ['/app/create', 1440, 900, 'light', 'es'],
  ]) {
    const slug = `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}-${width}-${theme}-${language}`;
    if (process.argv[2] && process.argv[2] !== slug) continue;
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    await context.addInitScript({ content: `localStorage.setItem('theme', ${JSON.stringify(theme)}); localStorage.setItem('conversa-language', ${JSON.stringify(language)});` });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await navigate(page, `${BASE}${route}`, { waitUntil: 'domcontentloaded' });
    requireAppOrigin(page, BASE);
    await page.getByText('Loading ARO…').first().waitFor({ state: 'hidden' });
    await page.waitForFunction(expected => document.documentElement.classList.contains(expected), theme);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(650);
    if (await page.locator('main img, section img').count()) await page.locator('main img, section img').first().evaluate(image => image.decode().catch(() => {}));
    await page.screenshot({ path: join(output, `${slug}.png`) });
    const visibleText = (await page.locator('body').innerText()).slice(0, 600);
    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    const checks = {};
    if (route === '/') {
      checks.teacherTrustFooter = (await page.locator('footer').innerText()).includes(translations[language].footer.trustVerified);
      checks.formationBoundary = (await page.locator('#formation').innerText()).includes(rebrandJourneyCopy[language].formationPreview);
      checks.gatherDestination = await page.locator('a[href="/app/create?mode=gather"]').count() === 1;
      await page.locator('a[href="/app/create?mode=gather"]').click();
      checks.gatherLanding = await page.getByRole('button', { name: rebrandJourneyCopy[language].gather }).getAttribute('aria-pressed') === 'true';
    }
    if (route === '/explore') checks.oneMainLandmark = await page.getByRole('main').count() === 1;
    if (route === '/app/create') {
      const journey = rebrandJourneyCopy[language];
      await page.getByRole('button', { name: journey.teach }).click();
      await page.waitForTimeout(100);
      checks.teachResponds = await page.getByRole('button', { name: journey.teach }).getAttribute('aria-pressed') === 'true' && await page.evaluate(() => document.activeElement?.id === 'seed-studio-composition' && scrollY > 0);
      await page.getByRole('button', { name: journey.gather }).click();
      await page.waitForTimeout(100);
      checks.gatherResponds = await page.getByRole('button', { name: journey.gather }).getAttribute('aria-pressed') === 'true' && await page.evaluate(() => document.activeElement?.id === 'seed-studio-composition');
    }
    results.push({ slug, status: response?.status(), title: await page.title(), horizontalOverflow, errors, checks, visibleText });
    await context.close();
  }
} finally { await browser.close(); }
if (!process.argv[2]) await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => result.status !== 200 || result.horizontalOverflow || result.errors.length || Object.values(result.checks).some(value => !value))) process.exitCode = 1;
