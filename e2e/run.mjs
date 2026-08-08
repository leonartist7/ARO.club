import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import { BASE } from './harness.mjs';
import journeys from './journeys.mjs';
import sweep from './sweep.mjs';
import responsive from './responsive.mjs';
import darkMode from './darkmode.mjs';

/**
 * Runs the end-to-end suite against a dev server.
 *
 * Starts one itself unless something is already listening on BASE, so the
 * suite works both locally (server already up) and in CI (cold).
 */

const isUp = async () => {
  try {
    const response = await fetch(BASE, { signal: AbortSignal.timeout(1500) });
    return response.ok;
  } catch {
    return false;
  }
};

const waitForServer = async (attempts = 40) => {
  for (let i = 0; i < attempts; i++) {
    if (await isUp()) return true;
    await sleep(500);
  }
  return false;
};

let server = null;

if (await isUp()) {
  console.log(`Using the dev server already running at ${BASE}`);
} else {
  console.log(`Starting a dev server for ${BASE}`);
  server = spawn('npm', ['run', 'dev'], { stdio: 'ignore', detached: true });

  if (!(await waitForServer())) {
    console.error(`Dev server never came up at ${BASE}`);
    if (server) process.kill(-server.pid, 'SIGTERM');
    process.exit(1);
  }
}

const suites = [
  ['journeys', journeys],
  ['sweep', sweep],
  ['responsive', responsive],
  ['dark mode', darkMode],
];

let failed = 0;
let passed = 0;

try {
  for (const [name, suite] of suites) {
    console.log(`\n=== ${name} ===`);
    const run = await suite();
    passed += run.passed;
    failed += run.failures.length;

    if (run.pageErrors.length) {
      console.log(`\n  uncaught page errors during ${name}: ${run.pageErrors.length}`);
      run.pageErrors.slice(0, 8).forEach((error) => console.log(`    ${error}`));
      failed += run.pageErrors.length;
    }
  }
} finally {
  if (server) {
    try {
      process.kill(-server.pid, 'SIGTERM');
    } catch {
      /* already gone */
    }
  }
}

console.log(`\n${'='.repeat(48)}`);
console.log(failed === 0 ? `All e2e checks passed (${passed})` : `${failed} failed, ${passed} passed`);
process.exit(failed === 0 ? 0 : 1);
