import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const output = join(process.cwd(), 'artifacts', 'ARO-RB3');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
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
    await context.addInitScript(({ theme, language }) => { localStorage.setItem('theme', theme); localStorage.setItem('conversa-language', language); }, { theme, language });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(`http://localhost:3103${route}`, { waitUntil: 'domcontentloaded' });
    await page.getByText('Loading ARO…').first().waitFor({ state: 'hidden' });
    await page.waitForFunction(expected => document.documentElement.classList.contains(expected), theme);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(650);
    if (await page.locator('main img, section img').count()) await page.locator('main img, section img').first().evaluate(image => image.decode().catch(() => {}));
    await page.screenshot({ path: join(output, `${slug}.png`) });
    results.push({ slug, status: response?.status(), title: await page.title(), horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors, visibleText: (await page.locator('body').innerText()).slice(0, 450) });
    await context.close();
  }
} finally { await browser.close(); }
if (!process.argv[2]) await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => result.status !== 200 || result.horizontalOverflow || result.errors.length)) process.exitCode = 1;
