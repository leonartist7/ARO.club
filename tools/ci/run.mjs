import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { API, MAIL, requireCondition, requireHostedRunner, validateTarget } from './boundary.mjs';
import { createResetDiagnostic, exerciseAuth, waitForLocalAuthReady } from './auth.mjs';
import { browserVerificationPhase, exerciseAuthenticatedBrowser } from './browser.mjs';
import { exerciseDeletion } from './deletion.mjs';

const workdir = fileURLToPath(new URL('.', import.meta.url));
const project = 'aro-i0-ci';
const network = 'aro-i0-ci-net';
const ownership = `${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}-${process.env.GITHUB_JOB}`;
let activePhase = 'preflight';

function run(command, args, timeout = 120000) {
  const result = spawnSync(command, args, {
    cwd: workdir, encoding: 'utf8', timeout, maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, DO_NOT_TRACK: '1', SUPABASE_TELEMETRY_DISABLED: '1' },
  });
  // CLI output can contain local signing keys. Never print it, even on failure.
  if (result.error || result.status !== 0) {
    // Emit only an allowlisted category/SQLSTATE, never service output or keys.
    const diagnostic = String(result.stdout ?? '') + String(result.stderr ?? '');
    const state = diagnostic.match(/SQLSTATE[ :]+([0-9A-Z]{5})/);
    const categories = [['syntax error','SQL_SYNTAX'],['does not exist','SQL_OBJECT_MISSING'],
      ['permission denied','PERMISSION'],['already exists','OBJECT_EXISTS'],
      ['Too Many Requests','REGISTRY_RATE'],['failed to pull','IMAGE_PULL'],['timeout','TIMEOUT']];
    const category = categories.find(([phrase]) => diagnostic.toLowerCase().includes(phrase.toLowerCase()))?.[1] ?? 'UNKNOWN';
    process.stderr.write(`PROCESS_DIAGNOSTIC ${category} ${state?.[1] ?? 'NO_SQLSTATE'}\n`);
  }
  requireCondition(!result.error && result.status === 0, 'PROCESS_FAILED');
  return result.stdout;
}
function cli(args, timeout) {
  return run('supabase', [...args, '--workdir', workdir, '--network-id', network], timeout);
}
function names(kind) {
  const args = kind === 'containers' ? ['ps', '-a'] : [kind, 'ls'];
  return run('docker', [...args, '--format', '{{.Name' + (kind === 'containers' ? 's' : '') + '}}'])
    .trim().split('\n').filter(Boolean);
}
function ownNames(kind) { return names(kind).filter(name => name.endsWith(`_${project}`)); }
function noProjectResources() {
  requireCondition(ownNames('containers').length === 0 && ownNames('volume').length === 0, 'PROJECT_RESOURCES_EXIST');
}
async function phase(name, action) {
  activePhase = name;
  const started = performance.now();
  process.stdout.write(`START ${name}\n`);
  const result = await action();
  process.stdout.write(`PASS ${name} ${((performance.now() - started) / 1000).toFixed(2)}s\n`);
  return result;
}
function checkBindings() {
  const containers = ownNames('containers');
  requireCondition(containers.length >= 3, 'SERVICES_MISSING');
  let published = 0;
  for (const name of containers) {
    const [info] = JSON.parse(run('docker', ['inspect', name]));
    requireCondition(info.State.Running && (!info.State.Health || info.State.Health.Status === 'healthy'), 'SERVICE_UNHEALTHY');
    requireCondition(info.NetworkSettings.Networks[network], 'WRONG_NETWORK');
    for (const bindings of Object.values(info.NetworkSettings.Ports ?? {})) {
      for (const binding of bindings ?? []) {
        requireCondition(binding.HostIp === '127.0.0.1', 'PUBLIC_PORT_BINDING');
        published += 1;
      }
    }
  }
  requireCondition(published >= 3, 'EXPECTED_PORTS_MISSING');
}
function userCount(expected) {
  const value = run('docker', ['exec', `supabase_db_${project}`, 'psql', '-U', 'postgres', '-d', 'postgres', '-At', '-v', 'ON_ERROR_STOP=1', '-c', 'select count(*) from auth.users;']);
  requireCondition(value.trim() === String(expected), 'AUTH_COUNT_MISMATCH');
}
function sqlTests() {
  const result = spawnSync('supabase', ['test','db','--local','--workdir',workdir,'--network-id',network], {
    cwd: workdir, encoding: 'utf8', timeout: 120000, maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, DO_NOT_TRACK: '1', SUPABASE_TELEMETRY_DISABLED: '1' },
  });
  const output = String(result.stdout ?? '');
  if (result.error || result.status !== 0) {
    const diagnostic = output + String(result.stderr ?? '');
    // Only source-controlled filenames and integer line/assertion numbers.
    for (const line of diagnostic.split('\n')) {
      const location = line.match(/([a-z_]+\.test\.sql):(\d+):/);
      if (location) process.stderr.write(`SQL_TEST_LOCATION ${location[1]} ${location[2]}\n`);
      const failed = line.match(/not ok (\d+)/);
      if (failed) process.stderr.write(`SQL_TEST_ASSERTION ${failed[1]}\n`);
    }
  }
  requireCondition(!result.error && result.status === 0, 'SQL_TEST_PROCESS_FAILED');
  const testsDir = fileURLToPath(new URL('supabase/tests/', import.meta.url));
  const expected = readdirSync(testsDir).filter(name => name.endsWith('.test.sql'))
    .reduce((sum,name) => sum + Number(readFileSync(`${testsDir}/${name}`,'utf8').match(/select plan\((\d+)\)/i)?.[1] ?? 0),0);
  requireCondition(new RegExp(`Tests=${expected}\\b`).test(output) && /Result: PASS/.test(output), 'SQL_TEST_COUNT_OR_RESULT');
  process.stdout.write(`PASS pgTAP ${expected}/${expected} (transactions rolled back)\n`);
}
function verifyLifecycleMigration() {
  const directory = fileURLToPath(new URL('supabase/migrations/', import.meta.url));
  const files = readdirSync(directory).filter(name => name.endsWith('_auth3_account_lifecycle.sql'));
  requireCondition(files.length === 1, 'LIFECYCLE_MIGRATION_NOT_COMMITTED');
  const payload = readFileSync(new URL('supabase/changes/auth3_account_lifecycle.sql',import.meta.url));
  requireCondition(readFileSync(`${directory}/${files[0]}`).equals(payload), 'LIFECYCLE_PAYLOAD_MISMATCH');
  process.stdout.write(`AUTH3_MIGRATION ${files[0]} ${createHash('sha256').update(payload).digest('hex')}\n`);
}
function cleanup() {
  if (!names('network').includes(network)) {
    noProjectResources();
    return;
  }
  const [info] = JSON.parse(run('docker', ['network', 'inspect', network]));
  requireCondition(info.Labels?.['aro.i0.owner'] === ownership, 'CLEANUP_NOT_OWNED');
  cli(['stop', '--project-id', project, '--no-backup']);
  noProjectResources();
  run('docker', ['network', 'rm', network]);
  requireCondition(!names('network').includes(network), 'NETWORK_SURVIVED');
}

try {
  requireHostedRunner(process.env, process.platform);
  requireCondition(run('supabase', ['--version']).trim() === '2.116.0', 'CLI_VERSION');
  const config = readFileSync(new URL('supabase/config.toml', import.meta.url), 'utf8');
  requireCondition(/^project_id = "aro-i0-ci"$/m.test(config), 'PROJECT_ID');
  requireCondition(!existsSync(new URL('supabase/.temp/project-ref', import.meta.url)), 'LINKED_PROJECT');
  if (process.argv.includes('--cleanup')) {
    await phase('cleanup', cleanup);
  } else {
    await phase('fresh-runner', () => {
      noProjectResources();
      requireCondition(!names('network').includes(network), 'NETWORK_ALREADY_EXISTS');
      run('docker', ['network', 'create', '--driver', 'bridge', '--opt', 'com.docker.network.bridge.host_binding_ipv4=127.0.0.1', '--label', `aro.i0.owner=${ownership}`, network]);
    });
    try {
      await phase('verify-auth3-committed-migration', verifyLifecycleMigration);
      await phase('start-and-loopback-bindings', () => {
        cli(['start', '--exclude', 'realtime,imgproxy,postgres-meta,studio,edge-runtime,logflare,vector,supavisor'], 600000);
        checkBindings();
      });
      await phase('clean-reset', () => { cli(['db', 'reset', '--local', '--no-seed'], 180000); userCount(0); });
      await phase('sql-isolation-first', sqlTests);
      const status = JSON.parse(cli(['status', '-o', 'json']));
      validateTarget(status.API_URL, API, '/');
      validateTarget(status.INBUCKET_URL ?? status.MAILPIT_URL, MAIL, '/');
      const confirmReset = await exerciseAuth(
        status.ANON_KEY,
        phase,
        credentials => exerciseAuthenticatedBrowser({ ...credentials, serviceKey: status.SERVICE_ROLE_KEY }),
        browserVerificationPhase
      );
      await exerciseDeletion(status.ANON_KEY, status.SERVICE_ROLE_KEY, phase);
      await phase('synthetic-account-count', () => userCount(5));
      await phase('reset-removes-accounts', async () => {
        const diagnostic = createResetDiagnostic();
        try {
          diagnostic.mark('RESET_CLI_STARTED');
          cli(['db', 'reset', '--local', '--no-seed'], 180000);
          diagnostic.mark('RESET_CLI_COMPLETED');
          diagnostic.mark('ZERO_USERS_STARTED');
          userCount(0);
          diagnostic.mark('ZERO_USERS_COMPLETED');
          await waitForLocalAuthReady(status.ANON_KEY, diagnostic);
          await confirmReset(diagnostic);
        } catch (error) {
          diagnostic.failure(error);
          throw error;
        }
      });
      await phase('sql-isolation-repeat', sqlTests);
    } finally {
      const failedPhase = activePhase;
      await phase('cleanup', cleanup);
      activePhase = failedPhase;
    }
  }
} catch (error) {
  const code = /^[A-Z][A-Z0-9_]+$/.test(error.message) ? error.message : 'UNEXPECTED_FAILURE';
  process.stderr.write(`FAIL ${activePhase}: ${code} (sensitive service output suppressed)\n`);
  process.exitCode = 1;
}
