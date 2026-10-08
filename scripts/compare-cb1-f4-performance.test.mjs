import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BASE_SHA, comparePerformance } from './compare-cb1-f4-performance.mjs';

function fixture(guided = false) {
  return { schemaVersion: 3, measuredCommit: guided ? 'a'.repeat(40) : BASE_SHA,
    guided, harnessSha256: 'b'.repeat(64), lockfileSha256: 'c'.repeat(64),
    browserVersion: '151.0.7922.34', host: { hostname: 'synthetic-runner' }, releaseScope: null, method: 'synthetic paired test',
    imageInitiatorProbe: { imageRequests: 2, imageEncodedBytes: 24000, initiators: ['css', 'link'] },
    samples: [360, 1440].flatMap(width => ['learn', 'share', 'gather'].flatMap(mode => [1, 2, 3].map(sample => ({
      width, height: width === 360 ? 740 : 900, mode, sample, status: 200, language: 'en', dark: false, overflow: false,
      errors: [], writes: [], jsEncodedBytes: 335015, jsTransferBytes: 340715, resourceRequests: 34,
      imageEncodedBytes: guided && mode === 'gather' ? 0 : 14000, imageRequests: guided && mode === 'gather' ? 0 : 1,
      renderedImages: guided && mode === 'gather' ? [] : [{ loaded: true }],
      fcpMs: 100, lcpMs: 150, renderedReadyMs: 750, cls: 0.004,
    })))) };
}
test('accepts complete compatible paired samples and reports all six cases', () => {
  const result = comparePerformance(fixture(), fixture(true));
  assert(result.pass); assert.equal(result.cases.length, 6);
});
test('retains one over-budget CLS outlier rather than accepting its median', () => {
  const current = fixture(true); current.samples[9].cls = 0.011363678355275847;
  const result = comparePerformance(fixture(), current);
  assert(!result.pass); assert.equal(result.failures[0].metric, 'cls'); assert.equal(result.failures[0].sample, 1);
});
test('enforces both absolute and paired relative byte limits and timing medians', () => {
  const before = fixture(), after = fixture(true);
  for (const sample of after.samples) { sample.jsEncodedBytes = 367784; sample.jsTransferBytes = 389868; sample.resourceRequests = 39; sample.imageEncodedBytes = 70000; sample.fcpMs = 201; }
  const result = comparePerformance(before, after);
  assert(!result.pass);
  for (const metric of ['jsEncodedBytes', 'jsTransferBytes', 'resourceRequests', 'imageEncodedBytes', 'fcpMs']) assert(result.failures.some(failure => failure.metric === metric));
  for (const sample of before.samples) sample.jsEncodedBytes = 300000;
  for (const sample of after.samples) sample.jsEncodedBytes = 335015;
  assert(comparePerformance(before, after).failures.some(failure => failure.metric === 'jsEncodedBytes' && failure.limit === 332768));
});
test('rejects mismatched provenance, missing metrics, duplicates, writes and extra guide requests', () => {
  const mutations = [
    report => { report.harnessSha256 = 'd'.repeat(64); }, report => { report.lockfileSha256 = 'd'.repeat(64); },
    report => { report.host.hostname = 'other-runner'; }, report => { report.browserVersion = 'other-browser'; },
    report => { report.method = 'warm cache'; }, report => { report.releaseScope = 'english-light'; },
    report => { report.samples[0].lcpMs = null; }, report => { report.samples[0].sample = 2; },
    report => { report.samples[0].writes.push('POST'); }, report => { report.samples[0].imageRequests = 2; },
    report => { report.samples.pop(); },
  ];
  for (const mutate of mutations) { const report = fixture(true); mutate(report); assert.throws(() => comparePerformance(fixture(), report)); }
});
