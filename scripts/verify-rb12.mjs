import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { startProductionServer } from '../src/test/production-server.js';

const out = join(process.cwd(), 'artifacts', 'ARO-RB12', 'hosted');
await mkdir(out, { recursive: true });
const { base, server } = await startProductionServer(3112);
const results = [];
let browser;
try {
  browser = await chromium.launch({ headless: true });
  for (const [route, width, height, name] of [
    ['/', 320, 620, 'home-320'],
    ['/', 360, 640, 'home-360'],
    ['/', 768, 900, 'home-768'],
    ['/', 1440, 900, 'home-1440'],
    ['/about', 320, 620, 'about-320'],
    ['/about', 1440, 900, 'about-1440'],
    ['/how-it-works', 360, 640, 'how-360'],
    ['/for-teachers', 1440, 900, 'host-1440'],
    ['/faq', 320, 620, 'faq-320'],
  ]) {
    const context = await browser.newContext({ viewport: { width, height }, colorScheme: 'dark', reducedMotion: 'reduce' });
    await context.addInitScript(() => { localStorage.setItem('theme', 'dark'); localStorage.setItem('conversa-language', 'es'); });
    const page = await context.newPage();
    const errors = [];
    const writes = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.method()); });
    const response = await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
    await page.getByRole('heading', { level: 1 }).waitFor({ state: 'visible' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1200);
    const state = await page.evaluate(() => ({
      language: document.documentElement.lang,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      overflow: document.documentElement.scrollWidth > innerWidth,
      storedLanguage: localStorage.getItem('conversa-language'),
      storedTheme: localStorage.getItem('theme'),
    }));
    const image = await page.locator('picture img').first().evaluate(element => ({ loaded: element.naturalWidth > 0, top: Math.round(element.getBoundingClientRect().top), width: element.naturalWidth }));
    const preview = await page.getByText(/illustrated (introduction|examples)/i).count();
    const primary = await page.getByRole('link', { name: route === '/' ? /get started/i : /explore the introduction/i }).count();
    const explore = await page.locator('a[href="/explore"]').count();
    const host = route === '/' ? await page.locator('a[href="/for-teachers"]').count() : undefined;
    const storyLink = route === '/' ? await page.locator('a[href="#how-it-works"]').count() : undefined;
    const faq = route === '/faq' ? await page.locator('main details').count() : undefined;
    if (route === '/faq') await page.locator('main details summary').first().click();
    const faqExpanded = route === '/faq' ? await page.locator('main details').first().evaluate(element => element.open) : undefined;
    await page.screenshot({ path: join(out, `${name}.png`), fullPage: false });
    results.push({ route, width, height, status: response?.status(), ...state, image, preview, primary, explore, host, storyLink, faq, faqExpanded, errors, writes });
    await context.close();
  }
} finally {
  await writeFile(join(out, 'browser.json'), JSON.stringify(results, null, 2));
  await browser?.close();
  if (server.exitCode === null) server.kill('SIGTERM');
}
if (results.length !== 9 || results.some(item => item.status !== 200 || item.language !== 'en' || item.theme !== 'light' || item.storedLanguage !== 'es' || item.storedTheme !== 'dark' || item.overflow || !item.image.loaded || !item.preview || !item.primary || !item.explore || item.errors.length || item.writes.length || (item.route === '/' && (!item.host || !item.storyLink || (item.width === 320 && item.image.top >= item.height))) || (item.route === '/faq' && (item.faq !== 5 || !item.faqExpanded)))) process.exitCode = 1;
