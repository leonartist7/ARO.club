import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { API, MAIL, requireCondition, requireHostedRunner, validateTarget } from './boundary.mjs';
import { exerciseAuth } from './auth.mjs';
import { browserVerificationPhase, exerciseAuthenticatedBrowser } from './browser.mjs';

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
  const output = cli(['test', 'db', '--local']);
  requireCondition(/Tests=81\b/.test(output) && /Result: PASS/.test(output), 'SQL_TEST_COUNT_OR_RESULT');
  process.stdout.write('PASS pgTAP 81/81 (transactions rolled back)\n');
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
        exerciseAuthenticatedBrowser,
        browserVerificationPhase
      );
      await phase('synthetic-account-count', () => userCount(2));
      await phase('reset-removes-accounts', async () => {
        cli(['db', 'reset', '--local', '--no-seed'], 180000);
        userCount(0);
        await confirmReset();
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
