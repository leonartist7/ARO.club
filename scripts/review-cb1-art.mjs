import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const output = join(process.cwd(), 'artifacts', 'ARO-CB1-P', 'art-review');
await mkdir(output, { recursive: true });
const receipts = [];
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [360, 1440]) for (const theme of ['light', 'dark']) {
    const size = width === 360 ? 96 : 160;
    const context = await browser.newContext({ viewport: { width, height: 740 }, colorScheme: theme, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const cards = [];
    for (const [guideId, name, role] of [['tonguee', 'Tonguee', 'Languages'], ['squilly', 'Squilly', 'Skills'], ['rockatoo', 'Rockatoo', 'Music']]) {
      const data = await readFile(join(process.cwd(), 'artifacts', 'ARO-CB1-P', 'exports', guideId + '-welcome-' + (width === 360 ? 192 : 384) + '.webp'));
      cards.push('<article><img data-guide="' + guideId + '" width="' + size + '" height="' + size + '" alt="" src="data:image/webp;base64,' + data.toString('base64') + '"><div><h2>' + name + '</h2><p>' + role + ' guide</p></div></article>');
    }
    // Synthetic artifact only. Ivory is the approved illustration-family surface;
    // CSS Canvas/CanvasText selects native dark contrast without new product tokens.
    await page.setContent('<!doctype html><html lang="en" style="color-scheme:' + theme + '"><head><title>ARO guide artwork review</title><style>body{margin:0;padding:24px;font:16px/1.5 system-ui;background:' + (theme === 'light' ? 'rgb(255 240 238)' : 'Canvas') + ';color:CanvasText}h1{font-size:22px;margin:0 0 8px}p{margin:4px 0}h2{font-size:18px;margin:0}section{display:grid;gap:24px;margin-top:24px;grid-template-columns:' + (width === 360 ? '1fr' : 'repeat(3,minmax(0,1fr))') + '}article{display:flex;align-items:center;gap:16px;min-height:' + size + 'px}img{display:block;object-fit:contain;flex:none}</style></head><body><h1>ARO Circle Builder guides</h1><p>Static artwork review · ' + theme + ' · ' + size + 'px</p><section>' + cards.join('') + '</section></body></html>');
    await page.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const geometry = await page.locator('img').evaluateAll(images => images.map(img => ({
      guideId: img.dataset.guide, loaded: img.complete && img.naturalWidth > 0,
      width: img.getBoundingClientRect().width, height: img.getBoundingClientRect().height,
      fit: getComputedStyle(img).objectFit,
    })));
    assert(geometry.every(img => img.loaded && img.width === size && img.height === size && img.fit === 'contain'));
    const screenshot = await page.screenshot({ fullPage: true });
    const path = 'guides-' + width + '-' + theme + '.png';
    await writeFile(join(output, path), screenshot);
    const preview = await sharp(screenshot).webp({ quality: 80 }).toBuffer();
    const receipt = { width, theme, cssSize: size, path, geometry, previewBytes: preview.byteLength,
      previewSha256: createHash('sha256').update(preview).digest('hex') };
    receipts.push(receipt);
    process.stdout.write('CB1_ART_REVIEW=' + JSON.stringify({ ...receipt, base64: preview.toString('base64') }) + '\n');
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile(join(output, 'review.json'), JSON.stringify(receipts, null, 2));
}
