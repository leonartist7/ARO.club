import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const output = join(process.cwd(), 'artifacts', 'ARO-RB1');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});
const results = [];
try {
  for (const [route, width, height, theme, language] of [
    ['/', 320, 700, 'light', 'en'],
    ['/', 390, 844, 'light', 'fr'],
    ['/', 1440, 900, 'light', 'en'],
    ['/', 1440, 900, 'dark', 'es'],
    ['/app', 360, 740, 'light', 'en'],
    ['/app', 1440, 900, 'dark', 'fr'],
  ]) {
    const slug = `${route === '/' ? 'home' : 'app'}-${width}-${theme}-${language}`;
    if (process.argv[2] && process.argv[2] !== slug) continue;
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    await context.addInitScript(({ theme, language }) => {
      localStorage.setItem('theme', theme);
      localStorage.setItem('conversa-language', language);
    }, { theme, language });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(`http://127.0.0.1:3101${route}`, { waitUntil: 'domcontentloaded' });
    await page.locator('main:visible').first().waitFor({ state: 'visible' });
    await page.getByText('Loading ARO…').first().waitFor({ state: 'hidden' });
    await page.waitForFunction(expected => document.documentElement.classList.contains(expected), theme);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(650); // The existing route fade-in lasts 500 ms.
    await page.screenshot({ path: join(output, `${slug}.png`) });
    results.push({ slug, status: response?.status(), title: await page.title(), bodyLength: (await page.locator('body').innerText()).length, errors });
    await context.close();
  }
} finally {
  await browser.close();
}
await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => result.status !== 200 || result.bodyLength < 50 || result.errors.length)) process.exitCode = 1;
