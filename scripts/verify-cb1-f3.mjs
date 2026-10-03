import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve, extname, sep } from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { chromium } from 'playwright';
import { circleBuilderCopy } from '../src/i18n/circleBuilder.js';
import { CATEGORY_REGISTRY } from '../src/features/circle-builder/registry.js';

const root = process.cwd(), output = join(root, 'artifacts/ARO-CB1-F3/browser'), dist = join(root, 'dist/cb1-f3-fixture');
await mkdir(output, { recursive: true });
await build({ configFile: false, root, plugins: [react()], logLevel: 'warn', build: { outDir: dist, emptyOutDir: true, rollupOptions: { input: join(root, 'src/test/cb1-f3/fixture.html') } } });
const server = createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  const folder = path.startsWith('/brand/') || path.startsWith('/fonts/') ? join(root, 'public') : dist;
  const file = resolve(folder, '.' + path);
  if (!file.startsWith(folder + sep)) { res.writeHead(403).end(); return; }
  const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2' };
  try { const content = await readFile(file); res.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(content); } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(3124, '127.0.0.1', resolve));
const base = 'http://127.0.0.1:3124', canary = 'F3-PRIVATE-CANARY-20371';
const cases = [], captures = [], errors = [], leakage = [], writes = [];
const sharp = createRequire(import.meta.resolve('next/package.json'))('sharp');
let browser;
const button = (page, name) => page.getByRole('button', { name, exact: true });
const input = (page, name) => page.getByLabel(name, { exact: true });
async function open(width, locale = 'en', theme = 'light', failure = false) {
  const context = await browser.newContext({ viewport: { width, height: width === 320 ? 568 : width < 768 ? 740 : 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  await context.addInitScript(theme => document.addEventListener('DOMContentLoaded', () => document.documentElement.classList.toggle('dark', theme === 'dark')), theme);
  const page = await context.newPage();
  if (failure) await page.route('**/brand/circle-builder/**', route => route.abort());
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.text().includes(canary)) leakage.push('console'); });
  page.on('request', request => {
    if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.method());
    if ([request.url(), request.postData(), JSON.stringify(request.headers())].some(value => value?.includes(canary))) leakage.push('request');
  });
  page.on('websocket', socket => { socket.on('framesent', event => { if (String(event.payload).includes(canary)) leakage.push('websocket'); }); });
  await page.goto(base + '/src/test/cb1-f3/fixture.html?locale=' + locale, { waitUntil: 'networkidle' });
  return { page, context };
}
async function privacy(page) {
  assert(!page.url().includes(canary));
  assert.equal(await page.evaluate(value => [localStorage, sessionStorage].some(storage => Object.keys(storage).some(key => (storage.getItem(key) ?? '').includes(value))), canary), false);
}
async function layout(page) {
  const result = await page.evaluate(() => {
    const visible = el => el.getBoundingClientRect().height > 0 && getComputedStyle(el).visibility !== 'hidden';
    const rgb = color => color.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => { const c = value / 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }).reduce((sum, c, i) => sum + c * [.2126, .7152, .0722][i], 0);
    const borders = [...document.querySelectorAll('input,select')].filter(visible).map(el => {
      const style = getComputedStyle(el), border = rgb(style.borderTopColor); let parent = el.parentElement;
      while (parent && getComputedStyle(parent).backgroundColor === 'rgba(0, 0, 0, 0)') parent = parent.parentElement;
      return [rgb(style.backgroundColor), rgb(getComputedStyle(parent ?? document.body).backgroundColor)].map(bg => (Math.max(bg, border) + .05) / (Math.min(bg, border) + .05));
    });
    return { overflow: document.documentElement.scrollWidth > innerWidth, text: [...document.querySelectorAll('input,select,p,label,button,dt,dd')].filter(visible).every(el => parseFloat(getComputedStyle(el).fontSize) >= 16), targets: [...document.querySelectorAll('button,input,select')].filter(visible).every(el => el.getBoundingClientRect().height >= 44), borders };
  });
  assert.equal(result.overflow, false); assert(result.text); assert(result.targets); assert(result.borders.flat().every(ratio => ratio >= 3), 'control border contrast >=3:1');
}
async function start(page, category, copy, manual = false, locale = 'en') {
  await button(page, category.label[locale]).click();
  if (manual) await button(page, copy.ownIdea).click(); else await button(page, copy.useExample).click();
  await button(page, copy.chooseNext).click();
  if (manual) { await input(page, copy.title).fill('A small shared practice'); await input(page, copy.outcome).fill('Practice one small thing.'); }
  await button(page, copy.shapeNext).click();
  assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), copy.detailsTitle);
}
async function capture(page, name, width, theme, category, step) {
  await page.locator('img').evaluateAll(imgs => Promise.all(imgs.map(img => img.decode())));
  const png = await page.screenshot({ path: join(output, name + '.png'), fullPage: true });
  const webp = await sharp(png).resize({ width: Math.min(width, 720) }).webp({ quality: 76 }).toBuffer();
  await writeFile(join(output, name + '.webp'), webp);
  captures.push({ name, width, theme, category, step, bytes: webp.length, sha256: createHash('sha256').update(webp).digest('hex') });
}
try {
  browser = await chromium.launch({ headless: true });
  for (const width of [320, 360, 390, 768, 1440]) for (const theme of ['light', 'dark']) for (const locale of ['en', 'fr', 'es']) {
    const { page, context } = await open(width, locale, theme), copy = circleBuilderCopy[locale], category = CATEGORY_REGISTRY[['en', 'fr', 'es'].indexOf(locale)];
    await start(page, category, copy, theme === 'dark', locale); await layout(page);
    for (const name of [copy.people, copy.place, copy.timeGroup]) {
      const toggle = button(page, name), id = await toggle.getAttribute('aria-controls');
      assert.equal(await page.locator('#' + id).count(), 1); assert.equal(await page.locator('#' + id).isVisible(), await toggle.getAttribute('aria-expanded') === 'true');
    }
    await input(page, copy.detailFields.audience).fill('x'.repeat(161)); await button(page, copy.detailsNext).click(); assert((await page.getByRole('alert').textContent()).includes(copy.peopleHint));
    await input(page, copy.detailFields.audience).fill(canary); await input(page, copy.detailFields.groupSize).fill('5');
    await button(page, copy.place).click(); assert.equal(await input(page, copy.detailFields.audience).count(), 0);
    await button(page, copy.detailsNext).click(); assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-groupSize');
    await input(page, copy.detailFields.groupSize).fill('4'); await button(page, copy.place).click();
    await input(page, copy.detailFields.venueType).selectOption('public-library'); await input(page, copy.detailFields.placeDescription).fill(canary + ' public setting'); await layout(page);
    await input(page, copy.detailFields.placeDescription).fill('x'.repeat(161)); await button(page, copy.detailsNext).click(); assert((await page.getByRole('alert').textContent()).includes(copy.placeHint)); await input(page, copy.detailFields.placeDescription).fill(canary + ' public setting');
    await button(page, copy.timeGroup).click();
    assert.equal(await input(page, copy.detailFields.date).getAttribute('inputmode'), 'text'); assert.equal(await input(page, copy.detailFields.time).getAttribute('inputmode'), 'text');
    await input(page, copy.detailFields.date).fill('2025-02-29'); await input(page, copy.detailFields.time).fill('10:30'); await button(page, copy.detailsNext).click();
    assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-date'); await input(page, copy.detailFields.date).fill('2024-02-29');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-date'); await button(page, copy.detailsNext).click(); assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-timeZone');
    await input(page, copy.detailFields.time).fill(''); assert.equal(await page.getByText(copy.zoneRequired, { exact: true }).count(), 0); assert.equal(await page.getByRole('status').textContent(), ''); await input(page, copy.detailFields.time).fill('10:30'); await button(page, copy.detailsNext).click();
    await input(page, copy.detailFields.timeZone).fill('+01:00'); await button(page, copy.detailsNext).click(); assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-timeZone');
    await input(page, copy.detailFields.timeZone).fill('Europe/Paris'); await layout(page);
    if (width < 1024) await button(page, copy.showSketch).click();
    assert(await page.locator('#builder-live-sketch').isVisible()); assert((await page.locator('#builder-live-sketch').textContent()).includes(canary));
    await button(page, copy.hideGuide).click(); assert.equal(await page.locator('img').count(), 0); await button(page, copy.detailsNext).click(); await layout(page);
    for (const [edit, target, field] of [[copy.editPeople, 'details-people', 'audience'], [copy.editPlace, 'details-place', 'placeDescription'], [copy.editTime, 'details-time', 'durationMinutes']]) {
      await button(page, edit).click(); await input(page, copy.detailFields[field]).fill(field === 'durationMinutes' ? '45' : canary + ' edit'); await button(page, copy.returnReview).click(); assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-summary-' + target);
    }
    await button(page, copy.editShape).click(); await input(page, copy.title).fill(''); await button(page, copy.backReview).click(); await button(page, copy.editPeople).click(); await button(page, copy.returnReview).click();
    assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-title'); await input(page, copy.title).fill(canary); await button(page, copy.returnReview).click(); assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-summary-shape');
    await button(page, copy.finishSketch).click(); assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), copy.readyTitle); assert(await page.getByText(copy.readyBody, { exact: true }).isVisible()); await layout(page); await privacy(page);
    await button(page, copy.editSketch).click(); await button(page, copy.finishSketch).click(); await button(page, copy.startAnother).click();
    assert.equal(await page.evaluate(() => document.activeElement.textContent), copy.keepEditing);
    for (let i = 0; i < 5; i++) { await page.keyboard.press('Tab'); assert(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement))); }
    await page.keyboard.press('Escape'); assert.equal(await page.getByRole('dialog').count(), 0); assert.equal(await page.evaluate(() => document.activeElement.textContent), copy.startAnother);
    await button(page, copy.startAnother).click(); await page.getByRole('dialog').getByRole('button', { name: copy.startAnother, exact: true }).click();
    assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), copy.chooseTitle); assert.equal(await page.getByRole('button', { pressed: true }).count(), 0); await privacy(page);
    cases.push({ width, theme, locale, category: category.id, manual: theme === 'dark', validationFocus: true, targetReturn: true, reset: true, privacy: true }); await context.close();
  }
  for (const width of [360, 1440]) for (const theme of ['light', 'dark']) for (const category of CATEGORY_REGISTRY) {
    const { page, context } = await open(width, 'en', theme), copy = circleBuilderCopy.en;
    await start(page, category, copy);
    const name = category.id + '-' + width + '-' + theme;
    if (width < 1024) await button(page, copy.showSketch).click();
    await capture(page, name + '-details', width, theme, category.id, 'details');
    await button(page, copy.detailsNext).click(); await capture(page, name + '-review', width, theme, category.id, 'review');
    await button(page, copy.finishSketch).click(); await capture(page, name + '-ready', width, theme, category.id, 'ready'); await context.close();
  }
  const { page, context } = await open(320, 'en', 'dark', true), copy = circleBuilderCopy.en;
  await start(page, CATEGORY_REGISTRY[2], copy, true); await page.getByRole('img', { name: /Rockatoo/ }).waitFor({ state: 'visible' });
  await input(page, copy.detailFields.audience).fill(canary); await button(page, copy.timeGroup).click(); await input(page, copy.detailFields.date).fill('2026-10-03');
  await button(page, copy.detailsNext).click(); assert(await page.getByText('2026-10-03', { exact: true }).isVisible()); await button(page, copy.finishSketch).click(); await privacy(page); await layout(page); await context.close();
  assert.deepEqual(errors, []); assert.deepEqual(leakage, []); assert.deepEqual(writes, []);
  const report = { schemaVersion: 1, source: process.env.GITHUB_SHA ?? 'local', fixture: 'isolated production Vite components, no Next app route', browser: browser.version(), cases, captures, partialSchedule: true, artworkFailure: true, errors, leakage, writes };
  await writeFile(join(output, 'report.json'), JSON.stringify(report, null, 2)); process.stdout.write('CB1_F3_REPORT=' + JSON.stringify(report) + '\n');
} catch (error) { process.stderr.write('CB1_F3_FAILURE=' + JSON.stringify({ error: error.message, pageErrors: errors }) + '\n'); throw error; }
finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); }
