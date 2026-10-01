import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
// Reuse Next's installed image encoder; no new dependency or creative redraw.
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const output = join(process.cwd(), 'artifacts', 'ARO-CB1-P', 'exports');
await mkdir(output, { recursive: true });
const receipts = [];
for (const guideId of ['tonguee', 'squilly', 'rockatoo']) {
  const original = await readFile(join(process.cwd(), 'artifacts', 'ARO-CB1-P', 'originals', guideId + '-welcome.png'));
  const source = await sharp(original).metadata();
  assert(source.width > 0 && source.height > 0 && source.hasAlpha);
  for (const size of [192, 384]) {
    const { data, info } = await sharp(original).resize({
      width: size, height: size, fit: 'inside', withoutEnlargement: true,
    }).webp({ quality: 84, alphaQuality: 100 }).toBuffer({ resolveWithObject: true });
    assert.equal(info.width, size); assert.equal(info.height, size);
    assert(data.byteLength <= (size === 192 ? 40 : 96) * 1024);
    const path = guideId + '-welcome-' + size + '.webp';
    const committed = await readFile(join(process.cwd(), 'public', 'brand', 'circle-builder', path));
    assert.deepEqual(data, committed, 'Committed guide differs from deterministic export: ' + path);
    await writeFile(join(output, path), data);
    const receipt = { guideId, pose: 'welcome', path, width: info.width, height: info.height,
      bytes: data.byteLength, sha256: createHash('sha256').update(data).digest('hex'),
      originalSha256: createHash('sha256').update(original).digest('hex'),
      originalWidth: source.width, originalHeight: source.height, originalBytes: original.byteLength,
      hasAlpha: source.hasAlpha, encoder: 'Next dependency sharp; resize inside; webp quality84 alpha100',
    };
    receipts.push(receipt);
    if (process.env.ARO_CB1_EXPORT_RECEIPTS === 'true') {
      process.stdout.write('CB1_ASSET_RECEIPT=' + JSON.stringify({ ...receipt, base64: data.toString('base64') }) + '\n');
    }
  }
}
await writeFile(join(output, 'manifest.json'), JSON.stringify(receipts, null, 2));
process.stdout.write('CB1_ASSET_METADATA=' + JSON.stringify(receipts) + '\n');
