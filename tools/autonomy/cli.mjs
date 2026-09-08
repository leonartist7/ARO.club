import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { REPOSITORY, TASKS, assertSha, hash, sourceHash, inside, realDestination, separateRoots, safeFile, verifySource, prepare, readiness, reportValidation, writeJson } from './core.mjs';

function options(args) {
  const result = {};
  for (let i = 0; i < args.length; i += 2) {
    if (!/^--[a-z-]+$/.test(args[i]) || !args[i + 1] || args[i + 1].startsWith('--')) throw Error('Expected --option value pairs');
    if (result[args[i].slice(2)]) throw Error('Duplicate option');
    result[args[i].slice(2)] = args[i + 1];
  }
  return result;
}
function readRun(out, sha) {
  assertSha(sha);
  const root = fs.realpathSync(out);
  const run = JSON.parse(fs.readFileSync(safeFile(root, 'run.json'), 'utf8'));
  if (run.schemaVersion !== 1 || run.auditSha !== sha || run.repository !== REPOSITORY || run.authority !== 'audit-only') throw Error('Run manifest mismatch');
  return { root, run };
}
export function importReport(output, sha, task, bundle) {
  if (!TASKS.includes(task)) throw Error('Unknown task');
  const { root } = readRun(output, sha);
  const input = fs.realpathSync(bundle);
  if (inside(root, input) || inside(input, root)) throw Error('Import source must be a separate extracted bundle');
  const report = JSON.parse(fs.readFileSync(safeFile(input, 'report.json'), 'utf8'));
  const errors = reportValidation(report, task, sha, input);
  if (errors.length) throw Error(errors.join('; '));
  const destination = fs.realpathSync(path.join(root, task));
  if (!inside(root, destination)) throw Error('Task directory escapes output');
  if (fs.existsSync(path.join(destination, 'report.json'))) throw Error('Report already imported; use a new run instead of overwriting history');
  const names = new Set();
  for (const evidence of report.evidence) {
    const normalized = path.posix.normalize(evidence.path);
    if (normalized !== evidence.path || ['report.json', 'PROMPT.md'].includes(normalized) || names.has(normalized)) throw Error('Reserved, duplicate or noncanonical evidence path');
    names.add(normalized);
    const target = realDestination(path.resolve(destination, normalized));
    if (!inside(destination, target) || fs.existsSync(target)) throw Error('Evidence destination exists or escapes output');
  }
  for (const evidence of report.evidence) {
    const target = path.join(destination, evidence.path);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(safeFile(input, evidence.path), target, fs.constants.COPYFILE_EXCL);
  }
  writeJson(path.join(destination, 'report.json'), report);
  return { taskId: task, imported: true, auditSha: sha, independentlyVerified: false };
}
export function runCli(argv) {
  const [command, ...args] = argv;
  const opts = options(args);
  if (command === 'verify-capture') {
    assertSha(opts.sha);
    const root = fs.realpathSync(opts.bundle);
    const manifest = JSON.parse(fs.readFileSync(safeFile(root, 'evidence-manifest.json'), 'utf8'));
    if (manifest.auditSha !== opts.sha || !Array.isArray(manifest.files) || !manifest.files.some(f => f.path === 'browser-evidence.json')) throw Error('Capture identity or manifest invalid');
    const names = new Set();
    for (const file of manifest.files) {
      if (names.has(file.path) || hash(fs.readFileSync(safeFile(root, file.path))) !== file.sha256) throw Error('Capture evidence duplicated or tampered');
      names.add(file.path);
    }
    const evidence = JSON.parse(fs.readFileSync(safeFile(root, 'browser-evidence.json'), 'utf8'));
    if (evidence.auditSha !== opts.sha || evidence.kind !== 'browser-observations' || !Array.isArray(evidence.results)) throw Error('Capture content invalid');
    for (const result of evidence.results) if (result.screenshot && !names.has(result.screenshot)) throw Error('Screenshot is not in manifest');
    const matrixKeys = new Set(evidence.results.map(r => `${r.route}:${r.width}:${r.theme}`));
    return { validBundle: true, auditSha: opts.sha, observations: evidence.results.length, coverageComplete: evidence.results.length === 150 && matrixKeys.size === 150 && evidence.results.every(r => !r.error && [360, 390, 430, 768, 1440].includes(r.width) && ['light', 'dark'].includes(r.theme)), auditCompleted: false, limitations: evidence.limitations };
  }
  if (command === 'bootstrap') {
    assertSha(opts.sha);
    const source = realDestination(opts.source);
    const output = realDestination(opts.out);
    if (inside(source, output) || inside(output, source)) throw Error('Separate source/output required');
    if (fs.existsSync(source)) throw Error('Bootstrap requires a nonexistent checkout destination');
    fs.mkdirSync(path.dirname(source), { recursive: true });
    execFileSync('git', ['clone', '--no-checkout', '--filter=blob:none', `${REPOSITORY}.git`, source], { stdio: 'inherit' });
    execFileSync('git', ['checkout', '--detach', opts.sha], { cwd: source, stdio: 'inherit' });
    return prepare(source, opts.sha, output);
  }
  if (command === 'prepare') return prepare(opts.source, opts.sha, opts.out);
  if (command === 'status') {
    const { root } = readRun(opts.out, opts.sha);
    return readiness(root, opts.sha);
  }
  if (command === 'check-source') {
    const { root, run } = readRun(opts.out, opts.sha);
    const { root: source } = verifySource(opts.source, opts.sha);
    separateRoots(source, root);
    if (run.inputs.some(input => input.encoding !== 'utf8-lf' || sourceHash(fs.readFileSync(safeFile(source, input.path))) !== input.sha256)) throw Error('Source input fingerprint changed');
    return { clean: true, auditSha: opts.sha };
  }
  if (command === 'import') return importReport(opts.out, opts.sha, opts.task, opts.bundle);
  if (command === 'compare') {
    const { run } = readRun(opts.out, opts.sha);
    const previousRoot = fs.realpathSync(opts.previous);
    const previous = JSON.parse(fs.readFileSync(safeFile(previousRoot, 'run.json'), 'utf8'));
    assertSha(previous.auditSha);
    if (previous.repository !== REPOSITORY || previous.schemaVersion !== 1 || !Array.isArray(previous.inputs)) throw Error('Invalid historical manifest');
    const old = new Map(previous.inputs.map(i => [i.path, i.sha256]));
    return { classification: 'historical-report', previousSha: previous.auditSha, auditSha: opts.sha,
      changedInputs: run.inputs.filter(i => old.get(i.path) !== i.sha256).map(i => i.path),
      removedInputs: previous.inputs.filter(i => !run.inputs.some(n => n.path === i.path)).map(i => i.path),
      limitation: 'Fingerprint comparison only; historical claims need revalidation' };
  }
  throw Error('Commands: bootstrap, prepare, check-source, status, import, compare, verify-capture. See tools/autonomy/README.md');
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { process.stdout.write(`${JSON.stringify(runCli(process.argv.slice(2)), null, 2)}\n`); }
  catch (error) { process.stderr.write(`AUTO0 STOP: ${error.message}\n`); process.exitCode = 1; }
}
