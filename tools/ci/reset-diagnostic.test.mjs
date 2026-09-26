import test from 'node:test';
import assert from 'node:assert/strict';
import { authClient, confirmRemovedAccount, createResetDiagnostic, waitForLocalAuthReady } from './auth.mjs';
import { API } from './boundary.mjs';

const secret = 'synthetic-private-key-body-url-password';
const key = `${secret}-publishable-fixture`;
function fixture(t, fetcher) {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (...args) => {
    calls.push(args);
    return fetcher(...args);
  });
  const lines = [];
  const diagnostic = createResetDiagnostic(line => lines.push(line.trim()));
  return { calls, lines, diagnostic, run: () => confirmRemovedAccount(authClient(key), `${secret}@example.invalid`, secret, diagnostic) };
}
function safe(lines) {
  assert.ok(lines.length > 0);
  assert.ok(lines.every(line => !line.includes(secret)));
  assert.ok(lines.every(line => /^RESET_DIAGNOSTIC(?:_FAILURE)? [A-Z_]+(?: (?:TIMEOUT|ABORT|TRANSPORT|JSON_PARSE|ASSERTION|OTHER))?$/.test(line)));
}

test('removed account uses exactly one original 400 password request and ordered stages', async t => {
  const f = fixture(t, () => new Response(JSON.stringify({ error: secret }), { status: 400 }));
  await f.run();
  assert.deepEqual(f.lines, [
    'RESET_DIAGNOSTIC RESET_CREDENTIAL_REQUEST_STARTED',
    'RESET_DIAGNOSTIC RESPONSE_RECEIVED',
    'RESET_DIAGNOSTIC EXPECTED_STATUS_ACCEPTED',
    'RESET_DIAGNOSTIC JSON_PARSE_COMPLETED',
    'RESET_DIAGNOSTIC REMOVED_ACCOUNT_ASSERTION_PASSED',
  ]);
  assert.equal(f.calls.length, 1);
  assert.equal(f.calls[0][0].href, `${API}/auth/v1/token?grant_type=password`);
  assert.equal(f.calls[0][1].method, 'POST');
  assert.equal(f.calls[0][1].redirect, 'manual');
  assert.ok(f.calls[0][1].signal instanceof AbortSignal);
  assert.deepEqual(JSON.parse(f.calls[0][1].body), { email: `${secret}@example.invalid`, password: secret });
  safe(f.lines);
});

test('post-reset health waits for transient transport and 503, then proves removal once', async t => {
  const calls = [];
  const lines = [];
  let healthCalls = 0;
  t.mock.method(globalThis, 'fetch', async (...args) => {
    calls.push(args);
    if (args[0].pathname === '/auth/v1/health') {
      healthCalls += 1;
      if (healthCalls === 1) throw new TypeError(secret);
      return new Response(null, { status: healthCalls === 2 ? 503 : 200 });
    }
    return new Response(JSON.stringify({ error: secret }), { status: 400 });
  });
  const diagnostic = createResetDiagnostic(line => lines.push(line.trim()));
  let pauses = 0;
  await waitForLocalAuthReady(key, diagnostic, undefined, async () => { pauses += 1; });
  await confirmRemovedAccount(authClient(key), `${secret}@example.invalid`, secret, diagnostic);
  assert.equal(healthCalls, 3);
  assert.equal(pauses, 2);
  assert.equal(calls.filter(([url]) => url.pathname === '/auth/v1/token').length, 1);
  assert.ok(calls.filter(([url]) => url.pathname === '/auth/v1/health').every(([, options]) =>
    options.headers.apikey === key && options.redirect === 'manual' && options.signal instanceof AbortSignal));
  assert.deepEqual(lines.slice(0, 2), ['RESET_DIAGNOSTIC AUTH_READY_STARTED', 'RESET_DIAGNOSTIC AUTH_READY_CONFIRMED']);
  safe(lines);
});

test('health probe fails closed on unexpected status without sending credentials', async t => {
  const f = fixture(t, () => new Response(null, { status: 401 }));
  await assert.rejects(waitForLocalAuthReady(key, f.diagnostic), { message: 'AUTH_HEALTH_HTTP_401' });
  assert.equal(f.calls.length, 1);
  assert.equal(f.calls[0][0].pathname, '/auth/v1/health');
  assert.deepEqual(f.lines, ['RESET_DIAGNOSTIC AUTH_READY_STARTED']);
  safe(f.lines);
});

test('health probe exhausts its bound without sending credentials', async t => {
  const f = fixture(t, () => { throw new TypeError(secret); });
  let pauses = 0;
  await assert.rejects(waitForLocalAuthReady(key, f.diagnostic, undefined, async () => { pauses += 1; }), { message: 'AUTH_NOT_READY' });
  assert.equal(f.calls.length, 20);
  assert.equal(pauses, 19);
  assert.ok(f.calls.every(([url]) => url.pathname === '/auth/v1/health'));
  safe(f.lines);
});

for (const [name, error, category] of [
  ['transport', new TypeError(secret, { cause: new Error(secret) }), 'TRANSPORT'],
  ['timeout', new DOMException(secret, 'TimeoutError'), 'TIMEOUT'],
  ['abort', new DOMException(secret, 'AbortError'), 'ABORT'],
  ['other', new Error(secret), 'OTHER'],
]) {
  test(`${name} failure reports only fixed request stage/category and rethrows`, async t => {
    const f = fixture(t, () => { throw error; });
    await assert.rejects(f.run(), candidate => candidate === error);
    assert.equal(f.calls.length, 1);
    assert.equal(f.lines.at(-1), `RESET_DIAGNOSTIC_FAILURE RESET_CREDENTIAL_REQUEST_STARTED ${category}`);
    f.diagnostic.failure(error);
    assert.equal(f.lines.filter(line => line.startsWith('RESET_DIAGNOSTIC_FAILURE')).length, 1);
    safe(f.lines);
  });
}

for (const status of [200, 401, 403, 500]) {
  test(`unexpected HTTP ${status} remains a failure before JSON parsing`, async t => {
    let parsed = false;
    const f = fixture(t, () => ({ status, json() { parsed = true; throw new Error(secret); } }));
    await assert.rejects(f.run(), { message: `AUTH_HTTP_${status}` });
    assert.equal(parsed, false);
    assert.equal(f.calls.length, 1);
    assert.equal(f.lines.at(-1), 'RESET_DIAGNOSTIC_FAILURE RESPONSE_RECEIVED ASSERTION');
    safe(f.lines);
  });
}

test('malformed JSON preserves parsing failure without logging body or error', async t => {
  const f = fixture(t, () => new Response(secret, { status: 400 }));
  await assert.rejects(f.run(), SyntaxError);
  assert.equal(f.lines.at(-1), 'RESET_DIAGNOSTIC_FAILURE EXPECTED_STATUS_ACCEPTED JSON_PARSE');
  safe(f.lines);
});

test('body read failure preserves transport classification after accepted status', async t => {
  const error = new TypeError(secret);
  const f = fixture(t, () => ({ status: 400, json: async () => { throw error; } }));
  await assert.rejects(f.run(), candidate => candidate === error);
  assert.equal(f.lines.at(-1), 'RESET_DIAGNOSTIC_FAILURE EXPECTED_STATUS_ACCEPTED TRANSPORT');
  safe(f.lines);
});

test('returned access token still fails RESET_ACCOUNT_SURVIVED without disclosure', async t => {
  const f = fixture(t, () => new Response(JSON.stringify({ access_token: secret }), { status: 400 }));
  await assert.rejects(f.run(), { message: 'RESET_ACCOUNT_SURVIVED' });
  assert.equal(f.lines.at(-1), 'RESET_DIAGNOSTIC_FAILURE JSON_PARSE_COMPLETED ASSERTION');
  assert.ok(!f.lines.some(line => line.endsWith('REMOVED_ACCOUNT_ASSERTION_PASSED')));
  safe(f.lines);
});

test('non-diagnostic Auth requests retain response, error and no-marker behavior', async t => {
  const output = [];
  const originalWrite = process.stdout.write.bind(process.stdout);
  t.mock.method(process.stdout, 'write', (chunk, ...args) => {
    if (typeof chunk === 'string' && chunk.startsWith('RESET_DIAGNOSTIC')) { output.push(chunk); return true; }
    return originalWrite(chunk, ...args);
  });
  const values = [new Response(JSON.stringify({ id: 'synthetic' }), { status: 200 }),
    new Response(null, { status: 204 }), new Response(secret, { status: 403 })];
  let count = 0;
  t.mock.method(globalThis, 'fetch', async () => values[count++]);
  const request = authClient(key);
  assert.deepEqual(await request('user'), { id: 'synthetic' });
  assert.equal(await request('logout', { method: 'POST', statuses: [204] }), null);
  await assert.rejects(request('user'), { message: 'AUTH_HTTP_403' });
  assert.equal(count, 3);
  assert.deepEqual(output, []);
});

test('CLI and count markers use a closed vocabulary and never echo invalid stages', () => {
  const lines = [];
  const d = createResetDiagnostic(line => lines.push(line.trim()));
  for (const stage of ['RESET_CLI_STARTED', 'RESET_CLI_COMPLETED', 'ZERO_USERS_STARTED', 'ZERO_USERS_COMPLETED']) d.mark(stage);
  assert.throws(() => d.mark(secret), { message: 'RESET_DIAGNOSTIC_STAGE' });
  d.failure(new Error(secret));
  assert.deepEqual(lines.slice(0, 4), ['RESET_CLI_STARTED', 'RESET_CLI_COMPLETED', 'ZERO_USERS_STARTED', 'ZERO_USERS_COMPLETED'].map(stage => `RESET_DIAGNOSTIC ${stage}`));
  assert.equal(lines.at(-1), 'RESET_DIAGNOSTIC_FAILURE ZERO_USERS_COMPLETED OTHER');
  safe(lines);
});
