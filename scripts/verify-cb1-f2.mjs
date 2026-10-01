import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';
import { createRequire } from 'node:module';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { chromium } from 'playwright';
import { circleBuilderCopy } from '../src/i18n/circleBuilder.js';
import { CATEGORY_REGISTRY, getExample } from '../src/features/circle-builder/registry.js';

const root = process.cwd(), output = join(root, 'artifacts/ARO-CB1-F2/browser');
const dist = join(root, '.cb1-f2-fixture');
await mkdir(output, { recursive: true });
// Existing Vite is test tooling only. No fixture is a Next route or production bundle.
await build({ configFile: false, root, plugins: [react()], logLevel: 'warn',
  build: { outDir: dist, emptyOutDir: true, rollupOptions: { input: join(root, 'src/test/cb1-f2/fixture.html') } } });
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  const folder = path.startsWith('/brand/') || path.startsWith('/fonts/') ? join(root, 'public') : dist;
  const file = resolve(folder, '.' + path);
  if (!file.startsWith(folder + '/')) { res.writeHead(403).end(); return; }
  try { const content = await readFile(file); res.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(content); }
  catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(3123, '127.0.0.1', resolve));
const base = 'http://127.0.0.1:3123', canary = 'F2-PRIVATE-CANARY-9381';
const cases = [], captures = [], errors = [], leakage = [], posts = [];
let browser;
const sharp = createRequire(import.meta.resolve('next/package.json'))('sharp');
const button = (page, name) => page.getByRole('button', { name, exact: true });
async function open(width, locale = 'en', theme = 'light', failure = false) {
  const context = await browser.newContext({ viewport: { width, height: width < 768 ? 740 : 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  await context.addInitScript(theme => document.addEventListener('DOMContentLoaded', () => document.documentElement.classList.toggle('dark', theme === 'dark')), theme);
  const page = await context.newPage();
  if (failure) await page.route('**/brand/circle-builder/**', route => route.abort());
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.text().includes(canary)) leakage.push('console'); });
  page.on('request', request => {
    if (!['GET', 'HEAD'].includes(request.method())) posts.push(request.method());
    if ([request.url(), request.postData(), JSON.stringify(request.headers())].some(value => value?.includes(canary))) leakage.push('request');
  });
  await page.goto(base + '/src/test/cb1-f2/fixture.html?locale=' + locale, { waitUntil: 'networkidle' });
  return { page, context };
}
async function layout(page) {
  const result = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth,
    text: [...document.querySelectorAll('input,textarea,p,label,button')].filter(el => el.getBoundingClientRect().height && getComputedStyle(el).display !== 'none').every(el => parseFloat(getComputedStyle(el).fontSize) >= 16),
    borders: [...document.querySelectorAll('input,textarea')].map(el => {
      const rgb = color => color.match(/[\d.]+/g).slice(0,3).map(Number).map(value => { const c = value / 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }).reduce((sum, c, i) => sum + c * [.2126,.7152,.0722][i], 0);
      const style = getComputedStyle(el), border = rgb(style.borderTopColor);
      let parent = el.parentElement; while (parent && getComputedStyle(parent).backgroundColor === 'rgba(0, 0, 0, 0)') parent = parent.parentElement;
      const inside = rgb(style.backgroundColor), outside = rgb(getComputedStyle(parent ?? document.body).backgroundColor);
      const ratio = bg => (Math.max(bg,border)+.05)/(Math.min(bg,border)+.05);
      return Math.min(ratio(inside), ratio(outside));
    }),
    targets: [...document.querySelectorAll('button,input,summary')].filter(el => el.getBoundingClientRect().height).every(el => el.getBoundingClientRect().height >= 44) }));
  assert.equal(result.overflow, false); assert(result.text); assert(result.targets); assert(result.borders.every(ratio => ratio >= 3), 'Input borders must contrast >=3:1 against interior and exterior');
}
async function privacy(page) {
  assert(!page.url().includes(canary));
  assert.equal(await page.evaluate(value => [localStorage, sessionStorage].some(storage => Object.keys(storage).some(key => (storage.getItem(key) ?? '').includes(value))), canary), false);
}
try {
  browser = await chromium.launch({ headless: true });
  for (const width of [320, 360, 390, 768, 1440]) for (const theme of ['light', 'dark']) for (const locale of ['en', 'fr', 'es']) {
    const { page, context } = await open(width, locale, theme), copy = circleBuilderCopy[locale];
    const category = CATEGORY_REGISTRY[['en', 'fr', 'es'].indexOf(locale)];
    await layout(page);
    await button(page, category.label[locale]).click();
    await button(page, copy.useExample).click();
    await button(page, copy.chooseNext).click();
    assert.equal(await page.getByLabel(copy.title, { exact: true }).inputValue(), getExample(category.id, category.examples[0].id, locale).title);
    assert.equal(await page.evaluate(() => document.activeElement.tagName), 'H1');
    await layout(page);
    await page.getByLabel(copy.title, { exact: true }).fill(canary);
    await button(page, copy.hideGuide).click(); assert.equal(await page.locator('img').count(), 0);
    await button(page, copy.showGuide).click();
    const image = page.locator('img'); await image.scrollIntoViewIfNeeded();
    const art = await image.evaluate(async img => { await img.decode(); const r = img.getBoundingClientRect(); return { loaded: img.naturalWidth > 0, fit: getComputedStyle(img).objectFit, width: r.width, height: r.height }; });
    assert(art.loaded); assert.equal(art.fit, 'contain'); assert.equal(art.width, art.height); assert.equal(art.width, width >= 1024 ? 160 : 96);
    await button(page, copy.back).click(); await button(page, copy.chooseNext).click();
    assert.equal(await page.getByLabel(copy.title, { exact: true }).inputValue(), canary);
    await privacy(page); cases.push({ width, theme, locale, category: category.id, art, manualEditsPreserved: true });
    await context.close();
  }
  // Manual paths and keyboard validation for every group.
  for (const category of CATEGORY_REGISTRY) {
    const { page, context } = await open(360), copy = circleBuilderCopy.en;
    await button(page, copy.chooseNext).focus(); await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Languages');
    await button(page, category.label.en).focus(); await page.keyboard.press('Space');
    await button(page, copy.ownIdea).click(); await button(page, copy.chooseNext).click();
    assert.equal(await page.getByLabel(copy.title, { exact: true }).inputValue(), '');
    await button(page, copy.shapeNext).click(); assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-title');
    await page.getByLabel(copy.title, { exact: true }).fill(canary);
    await page.getByLabel(copy.outcome, { exact: true }).fill('Practice one small thing.');
    await page.getByText(copy.exampleHelp, { exact: true }).click();
    await button(page, copy.suggestTitle).click();
    const dialog = page.getByRole('dialog'); assert.equal(await dialog.count(), 1);
    assert.equal(await page.evaluate(() => document.activeElement.textContent), copy.keepAnswer);
    for (let i = 0; i < 5; i++) { await page.keyboard.press('Tab'); assert(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement))); }
    await page.keyboard.press('Escape'); assert.equal(await dialog.count(), 0);
    assert.equal(await page.evaluate(() => document.activeElement.textContent), copy.suggestTitle);
    assert.equal(await page.getByLabel(copy.title, { exact: true }).inputValue(), canary);
    await button(page, copy.suggestTitle).click(); await button(page, copy.apply).click();
    assert.equal(await page.getByLabel(copy.title, { exact: true }).inputValue(), getExample(category.id, category.examples[0].id).title);
    await page.getByLabel(copy.fields[category.answerFields[0]], { exact: true }).fill('x'.repeat(161));
    await button(page, copy.shapeNext).click(); assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-' + category.answerFields[0]);
    await page.getByLabel(copy.fields[category.answerFields[0]], { exact: true }).fill('Synthetic category answer');
    await button(page, copy.back).click(); await button(page, CATEGORY_REGISTRY.find(c => c.id !== category.id).label.en).click();
    assert.equal(await page.getByRole('dialog').count(), 1); await page.keyboard.press('Escape');
    assert.equal(await button(page, category.label.en).getAttribute('aria-pressed'), 'true');
    await button(page, copy.chooseNext).click(); await button(page, copy.shapeNext).click();
    assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'F2 handoff accepted');
    await privacy(page); await context.close();
  }
  for (const width of [360, 1440]) for (const theme of ['light', 'dark']) for (const category of CATEGORY_REGISTRY) {
    const { page, context } = await open(width, 'en', theme), copy = circleBuilderCopy.en;
    await button(page, category.label.en).click(); await button(page, copy.useExample).click(); await button(page, copy.chooseNext).click();
    await page.locator('img').evaluate(img => img.decode());
    const name = category.id + '-' + width + '-' + theme;
    const png = await page.screenshot({ path: join(output, name + '.png'), fullPage: true });
    const webp = await sharp(png).resize({ width: Math.min(width, 720) }).webp({ quality: 76 }).toBuffer();
    await writeFile(join(output, name + '.webp'), webp);
    captures.push({ name, width, theme, category: category.id, bytes: webp.length, base64: webp.toString('base64') });
    await context.close();
  }
  const { page, context } = await open(320, 'en', 'dark', true);
  await button(page, 'Music').click(); await button(page, circleBuilderCopy.en.chooseNext).click();
  assert.equal(await page.getByRole('img', { name: /Rockatoo/ }).count(), 1);
  await page.getByLabel('Title', { exact: true }).fill(canary); await privacy(page); await layout(page); await context.close();
  assert.deepEqual(errors, []); assert.deepEqual(leakage, []); assert.deepEqual(posts, []);
  const report = { schemaVersion: 1, source: process.env.GITHUB_SHA ?? 'local', fixture: 'isolated production Vite build; not a Next route', browser: browser.version(), cases, manualKeyboardGroups: 3, captures: captures.map(({ base64: _base64, ...capture }) => capture), artworkFailure: true, errors, leakage, posts };
  await writeFile(join(output, 'report.json'), JSON.stringify(report, null, 2));
  process.stdout.write('CB1_F2_REPORT=' + JSON.stringify(report) + '\n');
  if (process.env.ARO_CB1_F2_RECEIPTS === 'true') for (const capture of captures) process.stdout.write('CB1_F2_CAPTURE=' + JSON.stringify(capture) + '\n');
} finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); }
