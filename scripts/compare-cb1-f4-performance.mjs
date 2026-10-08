import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

export const BASE_SHA = 'f7adc10a40fa5388b8b1956bd80160b7f72cc990';
const median = values => [...values].sort((a, b) => a - b)[1];
const metrics = ['jsEncodedBytes', 'jsTransferBytes', 'resourceRequests', 'imageEncodedBytes', 'fcpMs', 'lcpMs', 'renderedReadyMs'];

export function comparePerformance(baseline, current) {
  assert.equal(baseline.schemaVersion, 3, 'baseline provenance required');
  assert.equal(current.schemaVersion, 3, 'current provenance required');
  assert.equal(baseline.measuredCommit, BASE_SHA, 'immutable package base required');
  assert.match(current.measuredCommit, /^[a-f0-9]{40}$/, 'exact current source required');
  assert.equal(baseline.guided, false); assert.equal(current.guided, true);
  for (const key of ['harnessSha256', 'lockfileSha256']) {
    assert.match(baseline[key], /^[a-f0-9]{64}$/);
    assert.equal(baseline[key], current[key], 'paired ' + key);
  }
  assert.equal(baseline.browserVersion, '151.0.7922.34', 'pinned Chromium required');
  assert.equal(current.browserVersion, baseline.browserVersion);
  assert.deepEqual(baseline.host, current.host, 'same runner required');
  assert.equal(baseline.releaseScope, current.releaseScope);
  assert.equal(baseline.method, current.method, 'same measurement settings required');
  for (const report of [baseline, current]) {
    assert.equal(report.samples.length, 18, 'all three samples of all six cases required');
    assert.equal(report.imageInitiatorProbe.imageRequests, 2);
    assert(report.imageInitiatorProbe.imageEncodedBytes > 0);
    assert.deepEqual(report.imageInitiatorProbe.initiators, ['css', 'link']);
    for (const sample of report.samples) {
      assert.equal(sample.height, sample.width === 360 ? 740 : 900);
      assert.equal(sample.status, 200); assert.equal(sample.language, 'en');
      assert.equal(sample.dark, false); assert.equal(sample.overflow, false);
      assert.deepEqual(sample.errors, []); assert.deepEqual(sample.writes, []);
      assert(Number.isFinite(sample.cls) && sample.cls >= 0);
      for (const metric of metrics) assert(Number.isFinite(sample[metric]) && sample[metric] >= 0, 'missing ' + metric);
      assert(sample.jsEncodedBytes > 0 && sample.fcpMs > 0 && sample.lcpMs > 0 && sample.renderedReadyMs > 0);
      const count = report.guided && sample.mode === 'gather' ? 0 : 1;
      assert.equal(sample.renderedImages.length, count);
      assert.equal(sample.imageRequests, count, 'one active guide and no inactive requests');
      assert(sample.renderedImages.every(image => image.loaded));
    }
  }
  const cases = [], failures = [];
  for (const width of [360, 1440]) for (const mode of ['learn', 'share', 'gather']) {
    const before = baseline.samples.filter(sample => sample.width === width && sample.mode === mode);
    const after = current.samples.filter(sample => sample.width === width && sample.mode === mode);
    for (const group of [before, after]) assert.deepEqual(group.map(sample => sample.sample).sort(), [1, 2, 3], 'unique complete case samples');
    const limits = {
      jsEncodedBytes: Math.min(367783, median(before.map(sample => sample.jsEncodedBytes)) + 32768),
      jsTransferBytes: Math.min(389867, median(before.map(sample => sample.jsTransferBytes)) + 49152),
      resourceRequests: Math.min(38, median(before.map(sample => sample.resourceRequests)) + 4),
      imageEncodedBytes: median(before.map(sample => sample.imageEncodedBytes)) + 49152,
    };
    for (const metric of ['fcpMs', 'lcpMs', 'renderedReadyMs']) {
      const value = median(before.map(sample => sample[metric]));
      limits[metric] = value + Math.max(100, value * 0.25);
    }
    const rows = metrics.map(metric => {
      const values = after.map(sample => sample[metric]);
      const value = median(values), limit = limits[metric], pass = value <= limit;
      if (!pass) failures.push({ width, mode, metric, value, limit });
      return { metric, before: { min: Math.min(...before.map(sample => sample[metric])), median: median(before.map(sample => sample[metric])), max: Math.max(...before.map(sample => sample[metric])) }, after: { min: Math.min(...values), median: value, max: Math.max(...values) }, limit, pass };
    });
    // Timing uses the approved median; payload and request caps constrain every initial load.
    for (const sample of after) for (const metric of ['jsEncodedBytes', 'jsTransferBytes', 'resourceRequests', 'imageEncodedBytes']) {
      if (sample[metric] > limits[metric]) failures.push({ width, mode, sample: sample.sample, metric, value: sample[metric], limit: limits[metric] });
    }
    for (const sample of after) if (sample.cls > 0.01) failures.push({ width, mode, sample: sample.sample, metric: 'cls', value: sample.cls, limit: 0.01, shifts: sample.shifts ?? [] });
    cases.push({ width, mode, rows, cls: after.map(sample => ({ sample: sample.sample, value: sample.cls, pass: sample.cls <= 0.01 })) });
  }
  return { schemaVersion: 1, baseline: baseline.measuredCommit, current: current.measuredCommit, browser: current.browserVersion, cases, failures, pass: failures.length === 0,
    limits: 'CI lab only; no field Web Vitals, throttled-phone or INP claim. Independent review and route accessibility remain separate gates.' };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [beforePath, afterPath, outputPath] = process.argv.slice(2);
  assert(beforePath && afterPath && outputPath, 'baseline current output paths required');
  let result;
  try {
    result = comparePerformance(JSON.parse(await readFile(beforePath, 'utf8')), JSON.parse(await readFile(afterPath, 'utf8')));
  } catch (error) { result = { pass: false, evidenceError: error.message }; }
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(result, null, 2));
  process.stdout.write('CB1_F4_PAIRED_PERFORMANCE=' + JSON.stringify(result) + '\n');
  assert.equal(result.pass, true, 'CB1-F4 performance evidence/budgets must all pass');
}
