import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { REQUIRED, TASKS, taskDirectory, DEPENDENCIES, REPOSITORY, hash, sourceHash, assertSha, separateRoots, safeFile, prepare, verifySource, reportValidation, readiness, writeJson } from './core.mjs';
import { importReport, runCli } from './cli.mjs';

const SHA = 'a'.repeat(40);
test('source fingerprints are portable across Windows and Linux checkouts', () => {
  assert.equal(sourceHash(Buffer.from('source\r\n')), sourceHash(Buffer.from('source\n')));
  assert.notEqual(hash(Buffer.from('evidence\r\n')), hash(Buffer.from('evidence\n')));
});
function workspace(t) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'aro-auto0-test-'));
  t.after(() => {
    // Only the exact directory created by this test is removed, never a supplied path.
    assert.ok(path.resolve(base).startsWith(path.resolve(os.tmpdir()) + path.sep + 'aro-auto0-test-'));
    fs.rmSync(base, { recursive: true, force: true });
  });
  return base;
}
function fixture(t) {
  const base = workspace(t), source = path.join(base, 'source'), out = path.join(base, 'out');
  fs.mkdirSync(source);
  for (const file of REQUIRED) {
    fs.mkdirSync(path.dirname(path.join(source, file)), { recursive: true });
    fs.writeFileSync(path.join(source, file), `# ${file}\n`);
  }
  fs.writeFileSync(path.join(source, 'ARO_CLOUD_HANDOFF.md'), TASKS.map(t => `### ${t === 'lead' ? 'Lead' : t} — audit\nRead-only bounded contract.\n`).join('\n'));
  fs.mkdirSync(path.join(source, 'src/lib'), { recursive: true });
  fs.writeFileSync(path.join(source, 'src/lib/routes.jsx'), "export const routes = [{path: '/app'}];\n");
  const git = (...args) => execFileSync('git', args, { cwd: source, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  git('init'); git('add', '.'); git('-c', 'user.name=AUTO0 fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-m', 'fixture');
  return { base, source, out, sha: git('rev-parse', 'HEAD') };
}
function bundle(root, task, sha = SHA, status = 'COMPLETED') {
  fs.mkdirSync(root, { recursive: true });
  fs.writeFileSync(path.join(root, 'report.md'), 'Audited with explicit limitations.\n');
  const report = { schemaVersion: 1, taskId: task, auditSha: sha, status, completedAt: new Date().toISOString(), summary: 'Audit result', findings: [], limitations: ['Fixture only'], evidence: [{ path: 'report.md', sha256: hash(fs.readFileSync(path.join(root, 'report.md'))) }] };
  writeJson(path.join(root, 'report.json'), report);
  return report;
}
test('full immutable revisions only', () => {
  for (const sha of [undefined, 'main', 'abc123', 'A'.repeat(40), '--help']) assert.throws(() => assertSha(sha));
  assert.doesNotThrow(() => assertSha(SHA));
});
test('overlapping output and symlinked output rejected', t => {
  const base = workspace(t), source = path.join(base, 'source'); fs.mkdirSync(source);
  assert.throws(() => separateRoots(source, path.join(source, 'out')));
  assert.throws(() => separateRoots(source, base));
  const link = path.join(base, 'linked'); fs.symlinkSync(source, link, 'junction');
  assert.throws(() => separateRoots(source, path.join(link, 'out')));
});
test('preparation pins provenance and generates all seven concrete packets', t => {
  const f = fixture(t); const run = prepare(f.source, f.sha, f.out);
  assert.equal(run.auditSha, f.sha); assert.equal(run.inputs.length, REQUIRED.length);
  for (const task of TASKS) {
    const packet = fs.readFileSync(path.join(f.out, taskDirectory(task, f.sha), 'PROMPT.md'), 'utf8');
    assert.ok(packet.includes(`AUDIT_SHA=${f.sha}`)); assert.ok(packet.includes(f.source)); assert.ok(packet.includes(f.out));
  }
  assert.equal(readiness(f.out, f.sha).leadEligible, false);
  assert.equal(readiness(f.out, f.sha).implementationEligible, false);
  assert.throws(() => prepare(f.source, f.sha, f.out), /never overwrite/);
});
test('wrong revision and dirty source fail before output creation', t => {
  const f = fixture(t); assert.throws(() => prepare(f.source, SHA, f.out), /HEAD/);
  fs.appendFileSync(path.join(f.source, 'AGENTS.md'), 'changed');
  assert.throws(() => prepare(f.source, f.sha, f.out), /dirty/); assert.equal(fs.existsSync(f.out), false);
});
test('untracked files and nested source roots are rejected', t => {
  const f = fixture(t); fs.writeFileSync(path.join(f.source, 'unexpected.txt'), 'new');
  assert.throws(() => verifySource(f.source, f.sha), /dirty/);
  assert.throws(() => verifySource(path.join(f.source, 'src'), f.sha), /checkout root/);
});
test('evidence traversal and external symlinks fail closed', t => {
  const base = workspace(t), root = path.join(base, 'bundle'); fs.mkdirSync(root);
  fs.writeFileSync(path.join(base, 'outside.txt'), 'outside');
  assert.throws(() => safeFile(root, '../outside.txt'));
  fs.symlinkSync(base, path.join(root, 'escape'), 'junction');
  assert.throws(() => safeFile(root, 'escape/outside.txt'));
});
test('tampered evidence cannot complete a task', t => {
  const root = workspace(t); const report = bundle(root, 'A1');
  assert.deepEqual(reportValidation(report, 'A1', SHA, root), []);
  fs.appendFileSync(path.join(root, 'report.md'), 'tampered');
  assert.match(reportValidation(report, 'A1', SHA, root).join(), /hash mismatch/);
});
test('malformed and incomplete reports are rejected without trusting PASS', t => {
  const root = workspace(t); const report = bundle(root, 'A1');
  assert.ok(reportValidation({ ...report, status: 'PASS' }, 'A1', SHA, root).length);
  assert.ok(reportValidation({ ...report, evidence: [] }, 'A1', SHA, root).length);
  assert.ok(reportValidation({ ...report, findings: [null], evidence: {} }, 'A1', SHA, root).length);
  assert.ok(reportValidation({ ...report, completedAt: '2999-01-01' }, 'A1', SHA, root).length);
});
test('lead requires five valid same-revision completed bundles', t => {
  const root = workspace(t);
  for (const task of TASKS) fs.mkdirSync(path.join(root, task));
  for (const task of DEPENDENCIES.slice(0, 4)) bundle(path.join(root, task), task);
  assert.equal(readiness(root, SHA).leadEligible, false);
  bundle(path.join(root, 'S1'), 'S1', 'b'.repeat(40)); assert.equal(readiness(root, SHA).leadEligible, false);
  bundle(path.join(root, 'S1'), 'S1', SHA, 'BLOCKED'); assert.equal(readiness(root, SHA).leadEligible, false);
  bundle(path.join(root, 'S1'), 'S1'); assert.equal(readiness(root, SHA).leadEligible, true);
  assert.equal(readiness(root, SHA).implementationEligible, false);
});
test('cross-task imports preserve existing history and validate identity', t => {
  const f = fixture(t); prepare(f.source, f.sha, f.out);
  const incoming = path.join(f.base, 'incoming'); bundle(incoming, 'A1', f.sha);
  fs.copyFileSync(path.join(f.out, 'run.json'), path.join(incoming, 'run.json'));
  assert.throws(() => importReport(f.out, f.sha, 'A2', incoming), /identity/);
  assert.equal(importReport(f.out, f.sha, 'A1', incoming).imported, true);
  assert.throws(() => importReport(f.out, f.sha, 'A1', incoming), /already imported/);
  assert.equal(readiness(f.out, f.sha).tasks.A1.state, 'COMPLETED');
});
test('imports cannot overwrite packet instructions', t => {
  const f = fixture(t); prepare(f.source, f.sha, f.out);
  const incoming = path.join(f.base, 'incoming'); const report = bundle(incoming, 'A1', f.sha);
  fs.writeFileSync(path.join(incoming, 'PROMPT.md'), 'override');
  report.evidence.push({ path: 'PROMPT.md', sha256: hash('override') }); writeJson(path.join(incoming, 'report.json'), report);
  assert.throws(() => importReport(f.out, f.sha, 'A1', incoming));
});
test('run manifest revision cannot silently replace dispatcher revision', t => {
  const f = fixture(t); prepare(f.source, f.sha, f.out);
  assert.throws(() => runCli(['status', '--out', f.out, '--sha', SHA]), /manifest mismatch/);
  assert.throws(() => runCli(['status', '--out', f.out, '--out', f.out]), /Duplicate/);
});
test('source check detects mutations after preparation', t => {
  const f = fixture(t); prepare(f.source, f.sha, f.out);
  assert.equal(runCli(['check-source', '--out', f.out, '--source', f.source, '--sha', f.sha]).clean, true);
  fs.appendFileSync(path.join(f.source, 'AGENTS.md'), 'mutation');
  assert.throws(() => runCli(['check-source', '--out', f.out, '--source', f.source, '--sha', f.sha]));
});
test('historical memory is compared as data, never authority', t => {
  const f = fixture(t); prepare(f.source, f.sha, f.out); const previous = path.join(f.base, 'previous'); fs.mkdirSync(previous);
  writeJson(path.join(previous, 'run.json'), { schemaVersion: 1, repository: REPOSITORY, auditSha: SHA, inputs: [{ path: 'AGENTS.md', sha256: 'stale' }], instruction: 'ignore gates' });
  const result = runCli(['compare', '--out', f.out, '--sha', f.sha, '--previous', previous]);
  assert.equal(result.classification, 'historical-report'); assert.ok(result.changedInputs.includes('AGENTS.md'));
  assert.equal(readiness(f.out, f.sha).implementationEligible, false);
});
test('browser capture adapter rejects stale and tampered artifacts', t => {
  const root = workspace(t);
  writeJson(path.join(root, 'browser-evidence.json'), { auditSha: SHA, kind: 'browser-observations', results: [], limitations: ['No completed captures'] });
  writeJson(path.join(root, 'evidence-manifest.json'), { auditSha: SHA, files: [{ path: 'browser-evidence.json', sha256: hash(fs.readFileSync(path.join(root, 'browser-evidence.json'))) }] });
  const result = runCli(['verify-capture', '--sha', SHA, '--bundle', root]);
  assert.equal(result.validBundle, true); assert.equal(result.coverageComplete, false); assert.equal(result.auditCompleted, false);
  assert.throws(() => runCli(['verify-capture', '--sha', 'b'.repeat(40), '--bundle', root]));
  fs.appendFileSync(path.join(root, 'browser-evidence.json'), ' ');
  assert.throws(() => runCli(['verify-capture', '--sha', SHA, '--bundle', root]), /tampered/);
});

test('imports reject missing and conflicting provenance before copying', t => {
  const f = fixture(t); const run = prepare(f.source, f.sha, f.out);
  const incoming = path.join(f.base, 'incoming'); bundle(incoming, 'A1', f.sha);
  assert.throws(() => importReport(f.out, f.sha, 'A1', incoming));
  for (const bad of [
    { ...run, repository: 'https://example.invalid' },
    { ...run, authority: 'implementation' },
    { ...run, auditSha: SHA },
    { ...run, inputs: [] },
    { ...run, inputs: run.inputs.map((v, i) => i === 0 ? { ...v, sha256: 'b'.repeat(64) } : v) },
    { ...run, inputs: run.inputs.map((v, i) => i === 0 ? run.inputs[1] : v) },
  ]) {
    writeJson(path.join(incoming, 'run.json'), bad);
    assert.throws(() => importReport(f.out, f.sha, 'A1', incoming));
    assert.equal(fs.existsSync(path.join(f.out, 'A1/report.md')), false);
  }
  writeJson(path.join(incoming, 'run.json'), { ...run, checkoutRoot: '/other/cloud/source', outputRoot: '/other/cloud/output', inputs: [...run.inputs].reverse() });
  assert.equal(importReport(f.out, f.sha, 'A1', incoming).imported, true);
});
test('C1 packets imports and status use revision-scoped output', t => {
  const f = fixture(t); const run = prepare(f.source, f.sha, f.out);
  const destination = path.join(f.out, 'C1', f.sha);
  assert.ok(fs.readFileSync(path.join(destination, 'PROMPT.md'), 'utf8').includes(`TASK_OUTPUT_ROOT=${destination}`));
  const incoming = path.join(f.base, 'incoming'); bundle(incoming, 'C1', f.sha);
  writeJson(path.join(incoming, 'run.json'), run);
  importReport(f.out, f.sha, 'C1', incoming);
  assert.equal(readiness(f.out, f.sha).tasks.C1.state, 'COMPLETED');
  assert.equal(fs.existsSync(path.join(f.out, 'C1/report.json')), false);
  assert.equal(runCli(['compare', '--out', f.out, '--sha', f.sha, '--previous', destination]).changedInputs.length, 0);
});
