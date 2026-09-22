import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import path from 'node:path';

// Build once before the browser suites; each suite gets a separate server port.
export async function startProductionServer(port) {
  const base = `http://127.0.0.1:${port}`;
  let output = '';
  const server = spawn(process.execPath, [path.join(process.cwd(), 'node_modules/next/dist/bin/next'),
    'start', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: process.cwd(), env: process.env, stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stdout.on('data', (chunk) => { output += chunk.toString(); });
  server.stderr.on('data', (chunk) => { output += chunk.toString(); });
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Next.js preview exited: ${output.slice(-2000)}`);
    try {
      if ((await fetch(base + '/icon.svg', { signal: AbortSignal.timeout(1500) })).ok) return { base, server, output: () => output };
    } catch { /* Startup probe; a bounded failure below includes server output. */ }
    await delay(250);
  }
  server.kill('SIGTERM');
  throw new Error(`Next.js preview timeout: ${output.slice(-2000)}`);
}
