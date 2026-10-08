import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { startProductionServer } from '../src/test/production-server.js';
import { getCircleBuilderCopy } from '../src/i18n/circleBuilder.js';
import { CATEGORY_REGISTRY } from '../src/features/circle-builder/registry.js';

const output = join(process.cwd(), 'artifacts/ARO-CB1-F4/browser');
await mkdir(output, { recursive: true });
const { base, server, output: serverOutput } = await startProductionServer(3125);
const externalRequests = [];
const externalServer = createServer((request, response) => {
  externalRequests.push({ method: request.method, path: request.url });
  response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  response.end('<!doctype html><title>Synthetic exit</title><p>Exit destination</p>');
});
await new Promise((resolve, reject) => {
  externalServer.once('error', reject);
  externalServer.listen(0, '127.0.0.1', resolve);
});
const externalAddress = externalServer.address();
assert(externalAddress && typeof externalAddress === 'object', 'synthetic external server must expose an address');
const external = `http://127.0.0.1:${externalAddress.port}/exit`;
const canary = 'F4-PRIVATE-' + randomUUID(), cases = [], extended = [], failures = [], leakage = [], writes = [], audits = [];
const requestChecks = [], inputToPaintMs = [], interceptedHeaderAudits = [], popupAudits = [];
let rawHeaderAudits = 0, providedHeaderAudits = 0;
const initialStorage = new WeakMap();
let browser, completed = false;
const button = (page, name) => page.getByRole('button', { name, exact: true });
async function check(page) {
  const builderRoute = new URL(page.url()).pathname === '/app/create';
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'no horizontal overflow');
  assert.equal(await page.evaluate(value => [localStorage, sessionStorage].some(storage => Object.keys(storage).some(key => key.includes(value) || (storage.getItem(key) ?? '').includes(value))), canary), false);
  assert(!page.url().includes(canary));
  assert(await page.locator('main button, main input, main select, main textarea, main a, main summary').evaluateAll((nodes, builderRoute) => nodes.filter(node => node.getBoundingClientRect().height > 0).every(node => { const box = node.getBoundingClientRect(); return box.height >= 44 && (!builderRoute || box.width >= 44); }), builderRoute));
  if (builderRoute) assert(await page.locator('main p, main label, main button, main input, main select, main textarea').evaluateAll(nodes => nodes.filter(node => node.getBoundingClientRect().height > 0 && (node.textContent.trim() || node.matches('input, textarea, select'))).every(node => parseFloat(getComputedStyle(node).fontSize) >= 16)), 'builder essential text remains at least16px');
  assert(!(await page.context().cookies()).some(cookie => cookie.value.includes(canary)));
  assert(!serverOutput().includes(canary), 'no canary in production server output');
}
async function newCase({ width = 360, height = 568, theme = 'light', locale = 'en', motion = 'reduce', failGuide = false } = {}) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: motion, acceptDownloads: true });
  await context.addInitScript(({ theme, locale }) => {
    if (!['http:', 'https:'].includes(location.protocol)) return;
    localStorage.setItem('theme', theme); localStorage.setItem('conversa-language', locale);
    // Test-only listener accounting delegates to the real browser APIs.
    const add = window.addEventListener, remove = window.removeEventListener, handlers = new Set();
    window.addEventListener = function(type, listener, ...options) { if (type === 'beforeunload') handlers.add(listener); return add.call(this, type, listener, ...options); };
    window.removeEventListener = function(type, listener, ...options) { if (type === 'beforeunload') handlers.delete(listener); return remove.call(this, type, listener, ...options); };
    window.__f4UnloadCount = () => handlers.size;
  }, { theme, locale });
  context.on('request', request => {
    if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.method());
    const url = new URL(request.url());
    const intercepted = url.pathname === '/f4-download.txt' || (failGuide && url.pathname.startsWith('/brand/circle-builder/'));
    // Aborted/fulfilled fixtures send no outbound request and can lack Chromium's raw-header event.
    // Audit their provided headers plus the existing cookie canary check; all real requests use allHeaders.
    if (intercepted) interceptedHeaderAudits.push({ host: url.hostname, path: url.pathname, mode: 'provided headers; locally intercepted, no outbound transport' });
    requestChecks.push((intercepted ? Promise.resolve(request.headers()) : request.allHeaders()).then(headers => {
      if (intercepted) providedHeaderAudits++; else rawHeaderAudits++;
      if ([request.url(), request.postData(), JSON.stringify(headers)].some(text => text?.includes(canary))) leakage.push('request');
    }).catch(error => failures.push('request audit: ' + error.message)));
  });
  context.on('page', page => {
    page.on('pageerror', error => failures.push(error.message));
    page.on('console', message => { if (message.text().includes(canary)) leakage.push('console'); });
    page.on('websocket', socket => socket.on('framesent', event => { if (String(event.payload).includes(canary)) leakage.push('websocket'); }));
  });
  const page = await context.newPage();
  page.on('dialog', dialog => { assert.equal(dialog.type(), 'beforeunload'); void dialog.accept(); });
  return { context, page, copy: getCircleBuilderCopy(locale) };
}
async function settleRequestChecks() {
  let observed = -1;
  while (observed !== requestChecks.length) {
    observed = requestChecks.length;
    await Promise.all(requestChecks.slice(0, observed));
    await new Promise(resolve => setImmediate(resolve));
  }
}
async function closeCase(context) {
  await Promise.all(context.pages().map(page => page.waitForLoadState('networkidle')));
  await settleRequestChecks();
  await context.close();
}
async function audit(page, stage) {
  await check(page);
  const inventory = await page.evaluate(async () => ({
    indexedDB: (await indexedDB.databases()).map(database => database.name),
    caches: await caches.keys(),
    localStorage: Object.keys(localStorage).sort(), sessionStorage: Object.keys(sessionStorage).sort(),
  }));
  const values = await page.evaluate(() => Object.fromEntries(Object.keys(localStorage).filter(key => !['theme', 'conversa-language'].includes(key)).sort().map(key => [key, localStorage.getItem(key)])));
  assert.deepEqual(inventory.indexedDB, []); assert.deepEqual(inventory.caches, []);
  // Global providers already initialize empty legacy collections. The builder must not add or alter them.
  if (stage === 'initial') initialStorage.set(page.context(), values);
  else { assert(initialStorage.has(page.context()), 'initial storage evidence required'); assert.deepEqual(values, initialStorage.get(page.context()), 'builder does not add or alter stored data'); }
  assert.deepEqual(inventory.sessionStorage, []);
  audits.push({ stage, ...inventory });
}
async function tabTo(page, locator) {
  for (let i = 0; i < 90; i++) {
    if (await locator.evaluate(node => node === document.activeElement)) return;
    await page.keyboard.press('Tab');
  }
  assert.fail('keyboard target unreachable');
}
async function activate(page, locator) { await tabTo(page, locator); await page.keyboard.press('Enter'); }
async function addLink(page, { href, target, download, id = 'f4-test-link' }) {
  await page.evaluate(options => {
    document.getElementById(options.id)?.remove();
    const link = document.createElement('a'); link.id = options.id; link.href = options.href; link.textContent = 'Synthetic navigation probe';
    if (options.target) link.target = options.target;
    if (options.download) link.download = 'synthetic.txt';
    // Above the app shell: the probe is test DOM only and is never a product control.
    Object.assign(link.style, { position: 'fixed', top: '0px', left: '0px', zIndex: '100', background: 'white' });
    document.body.append(link);
  }, { href, target, download, id });
  return page.locator('#' + id);
}
try {
  browser = await chromium.launch({ headless: true });
  for (const width of [320, 360, 390, 768, 1440]) for (const theme of ['light', 'dark']) for (const locale of ['en', 'fr', 'es']) {
    const { context, page, copy } = await newCase({ width, height: width === 320 ? 568 : width < 768 ? 740 : 900, theme, locale });
    const category = CATEGORY_REGISTRY[['en', 'fr', 'es'].indexOf(locale)];
    const capture = async name => { if (locale === 'en' && [360, 1440].includes(width)) await page.screenshot({ path: join(output, name + '-' + width + '-' + theme + '.png'), fullPage: true }); };
    assert.equal((await page.goto(base + '/app/create', { waitUntil: 'networkidle' })).status(), 200);
    await audit(page, 'initial');
    await capture('choose');
    await button(page, category.label[locale]).click();
    if (theme === 'light') await button(page, copy.useExample).click(); else await button(page, copy.ownIdea).click();
    await button(page, copy.chooseNext).click();
    await page.getByLabel(copy.title, { exact: true }).fill(canary);
    await page.getByLabel(copy.outcome, { exact: true }).fill('Practice one small thing.');
    await audit(page, 'shape'); await capture('shape'); await button(page, copy.shapeNext).click(); await check(page); await capture('details');
    await button(page, copy.detailsNext).click();
    await button(page, copy.editPeople).click(); await page.getByLabel(copy.detailFields.audience, { exact: true }).fill(canary + ' adults');
    await button(page, copy.returnReview).click(); assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-summary-details-people');
    await audit(page, 'edited-review'); await capture('review');
    await button(page, copy.finishSketch).click(); assert(await page.getByText(copy.readyBody, { exact: true }).isVisible()); await audit(page, 'ready');
    const shellExit = page.locator('nav a[href="/app/world"]').last(); await shellExit.click();
    assert.equal(await page.evaluate(() => document.activeElement.textContent), copy.keepEditing);
    await capture('exit-dialog');
    for (let i = 0; i < 4; i++) { await page.keyboard.press('Tab'); assert(await page.evaluate(() => document.querySelector('dialog[open]').contains(document.activeElement))); }
    await page.keyboard.press('Escape'); assert.equal(await page.getByRole('dialog').count(), 0); assert(await shellExit.evaluate(node => node === document.activeElement));
    await capture('ready');
    await button(page, copy.startAnother).click(); await page.getByRole('dialog').getByRole('button', { name: copy.startAnother, exact: true }).click();
    assert.equal(await page.getByRole('button', { pressed: true }).count(), 0);
    assert.equal(await page.evaluate(() => window.__f4UnloadCount()), 0, 'reset removes unload listener');
    await button(page, category.label[locale]).click(); await shellExit.click(); await button(page, copy.discardSketch).click();
    await page.waitForURL(base + '/app/world'); await check(page);
    cases.push({ width, theme, locale, group: category.id, path: theme === 'light' ? 'example' : 'manual', targetedEdit: true, exitCancelFocus: true, discard: true, reset: true, canary: true });
    await closeCase(context);
  }
  // Real legacy entries, including empty/invalid modes, never fill sketch answers.
  for (const [mode, category] of [['learn', 'languages'], ['share', 'skills'], ['gather', null], ['unknown', null], ['', null]]) {
    const { context, page, copy } = await newCase();
    await page.goto(base + '/app/create' + (mode ? '?mode=' + mode : ''), { waitUntil: 'networkidle' });
    for (const item of CATEGORY_REGISTRY) assert.equal(await button(page, item.label.en).getAttribute('aria-pressed'), String(item.id === category));
    assert.equal(await page.locator('nav a[href="/app/create"]').count(), 0);
    await button(page, CATEGORY_REGISTRY[0].label.en).click(); await button(page, copy.chooseNext).click();
    assert.equal(await page.locator('#builder-title').inputValue(), ''); assert.equal(await page.locator('#builder-outcome').inputValue(), '');
    extended.push({ legacyMode: mode || 'absent', selected: category, unfilled: true }); await closeCase(context);
  }
  // Every guide fails locally; all manual paths stay keyboard-operable on a short phone.
  for (const category of CATEGORY_REGISTRY) {
    const { context, page, copy } = await newCase({ theme: 'dark', motion: 'no-preference', failGuide: true });
    let artRequests = 0;
    await context.route('**/brand/circle-builder/*.webp', route => { artRequests++; return route.abort(); });
    await page.goto(base + '/app/create', { waitUntil: 'networkidle' });
    await audit(page, 'initial');
    await activate(page, button(page, category.label.en));
    await page.getByRole('img', { name: new RegExp(copy.guideFallback) }).waitFor();
    await activate(page, button(page, copy.ownIdea)); await activate(page, button(page, copy.chooseNext));
    await activate(page, button(page, copy.shapeNext));
    assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-title');
    await page.evaluate(() => {
      window.__f4InputPaint = null;
      document.querySelector('#builder-title').addEventListener('input', () => {
        const start = performance.now(); requestAnimationFrame(() => requestAnimationFrame(() => { window.__f4InputPaint = performance.now() - start; }));
      }, { once: true });
    });
    await page.keyboard.type(canary); await page.waitForFunction(() => window.__f4InputPaint !== null);
    inputToPaintMs.push(await page.evaluate(() => window.__f4InputPaint));
    await tabTo(page, page.locator('#builder-outcome')); await page.keyboard.type('Practice something meaningful.');
    await tabTo(page, page.locator('#builder-' + category.answerFields[0])); await page.keyboard.type(canary);
    await activate(page, button(page, copy.hideGuide));
    await activate(page, button(page, copy.shapeNext));
    for (const [group, field] of [['people', 'audience'], ['place', 'placeDescription'], ['time', 'durationMinutes']]) {
      const groupButton = button(page, group === 'time' ? copy.timeGroup : copy[group]);
      if (await groupButton.getAttribute('aria-expanded') !== 'true') await activate(page, groupButton);
      await tabTo(page, page.locator('#builder-' + field)); await page.keyboard.type(field === 'durationMinutes' ? '45' : canary);
    }
    await activate(page, button(page, copy.detailsNext)); await audit(page, 'keyboard-review');
    await activate(page, button(page, copy.editShape)); assert.equal(await page.locator('#builder-title').inputValue(), canary);
    await activate(page, button(page, copy.returnReview)); await activate(page, button(page, copy.finishSketch));
    assert(await page.getByText(copy.readyBody, { exact: true }).isVisible());
    await page.screenshot({ path: join(output, 'keyboard-fallback-' + category.id + '.png'), fullPage: true });
    assert(artRequests >= 1 && artRequests <= 3, 'fallback must not enter a retry loop');
    await audit(page, 'keyboard-ready');
    extended.push({ category: category.id, keyboardManual: true, firstInvalidFocus: true, guideFailure: true, guideHidden: true, normalMotion: true, artRequests });
    await closeCase(context);
  }
  // Synthetic owned anchors exercise the actual document capture guard against a local cross-origin server.
  {
    const { context, page, copy } = await newCase();
    await context.route(base + '/f4-download.txt', route => route.fulfill({ status: 200, contentType: 'text/plain', body: 'Synthetic download' }));
    await page.goto(base + '/app/create', { waitUntil: 'networkidle' });
    await audit(page, 'initial');
    await button(page, CATEGORY_REGISTRY[0].label.en).click(); await button(page, copy.chooseNext).click();
    await page.locator('#builder-title').fill(canary); await page.locator('#builder-outcome').fill('Keep this local.');
    let probe = await addLink(page, { href: external }); await probe.click();
    await button(page, copy.keepEditing).click(); assert(await probe.evaluate(node => node === document.activeElement));
    assert.equal(await page.locator('#builder-title').inputValue(), canary);
    probe = await addLink(page, { href: '#app-main' }); await probe.click();
    assert.equal(await page.getByRole('dialog').count(), 0); assert.equal(await page.locator('#builder-title').inputValue(), canary);
    for (const target of ['_blank', 'control-modified']) {
      probe = await addLink(page, { href: external, target: target === '_blank' ? '_blank' : undefined });
      const popupPromise = context.waitForEvent('page');
      await probe.click(target === 'control-modified' ? { modifiers: ['Control'] } : {});
      const popup = await popupPromise;
      await popup.waitForURL(external, { waitUntil: 'domcontentloaded' });
      assert.equal(popup.url(), external); assert.equal(await popup.title(), 'Synthetic exit');
      popupAudits.push({ activation: target, url: popup.url(), title: await popup.title(), headerAudit: 'allHeaders' });
      assert.equal(await page.getByRole('dialog').count(), 0); assert.equal(await page.locator('#builder-title').inputValue(), canary);
      await popup.close();
    }
    probe = await addLink(page, { href: base + '/f4-download.txt', download: true });
    const downloadPromise = page.waitForEvent('download'); await probe.click(); await downloadPromise;
    assert.equal(await page.getByRole('dialog').count(), 0); assert.equal(await page.locator('#builder-title').inputValue(), canary);
    await button(page, copy.shapeNext).click(); await button(page, copy.detailsNext).click(); await button(page, copy.finishSketch).click();
    await button(page, copy.startAnother).click();
    probe = await addLink(page, { href: external });
    await probe.evaluate(node => node.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 })));
    assert.equal(await page.getByRole('dialog').count(), 1, 'no nested exit during reset'); await page.keyboard.press('Escape');
    await audit(page, 'external-cancel-and-modified');
    await probe.click(); await button(page, copy.discardSketch).click(); await page.waitForURL(external);
    extended.push({ externalCancelFocus: true, externalDiscard: true, fragment: true, newTab: true, controlModified: true, download: true, noNestedDialogs: true });
    await closeCase(context);
  }
  // Reload really drops memory; browser Back uses public browser semantics, without history traps.
  for (const action of ['reload', 'back']) {
    const { context, page, copy } = await newCase();
    await page.goto(base + '/app/world', { waitUntil: 'networkidle' }); await page.goto(base + '/app/create', { waitUntil: 'networkidle' });
    await audit(page, 'initial');
    assert.equal(await page.evaluate(() => window.__f4UnloadCount()), 0);
    await button(page, CATEGORY_REGISTRY[0].label.en).click(); await button(page, copy.chooseNext).click(); await page.locator('#builder-title').fill(canary);
    assert.equal(await page.evaluate(() => window.__f4UnloadCount()), 1);
    if (action === 'reload') { await page.reload({ waitUntil: 'networkidle' }); await button(page, CATEGORY_REGISTRY[0].label.en).click(); await button(page, copy.chooseNext).click(); assert.equal(await page.locator('#builder-title').inputValue(), ''); }
    else { await page.goBack({ waitUntil: 'networkidle' }); await page.waitForURL(base + '/app/world'); assert.equal(await page.getByRole('dialog').count(), 0); }
    await audit(page, action); extended.push({ action, memoryLossDisclosed: true, canary: true }); await closeCase(context);
  }
  await settleRequestChecks();
  assert(externalRequests.filter(request => request.method === 'GET' && request.path === '/exit').length >= 3, 'all external navigation probes reach the local cross-origin fixture');
  assert.deepEqual(failures, []); assert.deepEqual(leakage, []); assert.deepEqual(writes, []);
  completed = true;
} finally {
  await settleRequestChecks();
  const report = { source: process.env.GITHUB_SHA ?? 'local', browser: browser?.version() ?? null, completed, cases, extended, audits, inputToPaintMs, interceptedHeaderAudits, failures, leakage, writes,
    popupAudits, requestHeaderAudits: { raw: rawHeaderAudits, providedForLocalInterceptions: providedHeaderAudits }, externalRequests,
    limits: 'Synthetic input-to-two-frame latency is not field INP. Screen-reader/device/safe-area review and independent acceptance remain separate gates. Browser Back/reload/mobile termination are disclosed best-effort loss, never guaranteed preservation.' };
  await writeFile(join(output, 'report.json'), JSON.stringify(report, null, 2));
  process.stdout.write('CB1_F4_ROUTE_REPORT=' + JSON.stringify(report) + '\n');
  await browser?.close(); server.kill('SIGTERM');
  await new Promise((resolve, reject) => externalServer.close(error => error ? reject(error) : resolve()));
}
process.stdout.write('CB1_F4_ROUTE_CASES=' + cases.length + '\n');
