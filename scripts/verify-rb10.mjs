import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const base = process.env.ARO_BROWSER_BASE ?? 'http://127.0.0.1:3112';
const output = join(process.cwd(), 'artifacts', 'ARO-RB10');
await mkdir(output, { recursive: true });
const cases = [
  { route: '/login', width: 320, height: 620, language: 'fr', theme: 'dark', heading: 'Bon retour' },
  { route: '/signup', width: 390, height: 844, language: 'es', theme: 'light', heading: 'Únete a ARO' },
  { route: '/forgot-password', width: 768, height: 900, language: 'en', theme: 'dark', heading: 'Forgot Password?' },
  { route: '/login', width: 1440, height: 900, language: 'es', theme: 'light', heading: 'Te damos la bienvenida' },
  { route: '/signup', width: 320, height: 620, language: 'fr', theme: 'dark', heading: 'Rejoignez ARO' },
  { route: '/forgot-password', width: 390, height: 844, language: 'es', theme: 'light', heading: '¿Olvidaste tu contraseña?' },
];
const requiredLinks = {
  '/login': ['/forgot-password', '/signup', '/terms', '/privacy'],
  '/signup': ['/login', '/terms', '/privacy'],
  '/forgot-password': ['/login'],
};
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const results = [];
try {
  for (const item of cases) {
    const context = await browser.newContext({ viewport: { width: item.width, height: item.height }, colorScheme: item.theme, reducedMotion: 'reduce' });
    await context.addInitScript(({ language, theme }) => {
      localStorage.setItem('conversa-language', language);
      localStorage.setItem('theme', theme);
    }, item);
    const page = await context.newPage();
    const errors = [];
    const writes = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`); });
    const response = await page.goto(`${base}${item.route}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(language => document.documentElement.lang === language, item.language);
    const renderedHeading = await page.getByRole('heading', { level: 1 }).innerText();
    const inputs = await page.locator('form input:not([type="hidden"])').evaluateAll(nodes => nodes.map(node => ({ type: node.type, disabled: node.disabled })));
    const enabledSubmit = await page.locator('form button[type="submit"]:not([disabled])').count();
    const links = await page.locator('a[href^="/"]').evaluateAll(nodes => [...new Set(nodes.map(node => node.getAttribute('href')))]);
    await page.screenshot({ path: join(output, `${item.route.slice(1)}-${item.width}-${item.theme}-${item.language}.png`) });
    results.push({ ...item, status: response?.status(), renderedHeading, inputs, enabledSubmit, links, resolvedTheme: await page.evaluate(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light'), overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors, writes });
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(row => row.status !== 200 || row.renderedHeading !== row.heading || row.resolvedTheme !== row.theme || row.overflow || row.errors.length || row.writes.length || row.enabledSubmit || row.inputs.some(input => !input.disabled) || requiredLinks[row.route].some(link => !row.links.includes(link)))) process.exitCode = 1;
