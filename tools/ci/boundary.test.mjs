import { test } from 'node:test';
import assert from 'node:assert/strict';
import { API, CALLBACK, localFetch, recoveryLink, requireHostedRunner, validateTarget } from './boundary.mjs';

const env = { CI: 'true', GITHUB_ACTIONS: 'true', RUNNER_ENVIRONMENT: 'github-hosted' };
test('only disposable hosted Linux runner accepted', () => {
  requireHostedRunner(env, 'linux');
  for (const invalid of [{}, { ...env, RUNNER_ENVIRONMENT: 'self-hosted' }, { ...env, CI: 'false' }]) {
    assert.throws(() => requireHostedRunner(invalid, 'linux'), /CI_ONLY/);
  }
  assert.throws(() => requireHostedRunner(env, 'win32'), /CI_ONLY/);
});
test('hosted credentials and remote Docker configuration rejected', () => {
  for (const name of ['SUPABASE_ACCESS_TOKEN', 'SUPABASE_DB_PASSWORD', 'DATABASE_URL', 'PGHOST', 'DOCKER_HOST', 'DOCKER_CONTEXT']) {
    assert.throws(() => requireHostedRunner({ ...env, [name]: 'forbidden' }, 'linux'), /EXTERNAL_CONFIGURATION/);
  }
});
test('URL validation rejects remote, deceptive, wrong-port and credential URLs', () => {
  for (const raw of ['https://example.com', 'http://127.0.0.1.example.com:54321', 'http://127.0.0.1:54322', 'http://user:password@127.0.0.1:54321', 'file:///tmp/a', 'not-a-url']) {
    assert.throws(() => validateTarget(raw, API));
  }
  assert.equal(validateTarget(`${API}/auth/v1/user`, API).origin, API);
});
test('forbidden target never reaches network and errors omit URL values', async () => {
  let calls = 0;
  const fetcher = async () => { calls += 1; };
  await assert.rejects(localFetch('https://example.com?token=sensitive', API, {}, fetcher), { message: 'NONLOCAL_TARGET' });
  assert.equal(calls, 0);
});
test('redirects are never automatically followed', async () => {
  await localFetch(API, API, { redirect: 'follow' }, async (_url, options) => {
    assert.equal(options.redirect, 'manual');
    assert.ok(options.signal);
  });
});
test('only local recovery link with exact callback is accepted', () => {
  const raw = `${API}/auth/v1/verify?token=synthetic&type=recovery&redirect_to=${encodeURIComponent(CALLBACK)}`;
  assert.equal(recoveryLink(`<a href="${raw.replaceAll('&', '&amp;')}">Reset</a>`), raw);
  for (const link of [raw.replace(API, 'https://example.com'), raw.replace('type=recovery', 'type=signup'), raw.replace(encodeURIComponent(CALLBACK), 'https%3A%2F%2Fevil.invalid')]) {
    assert.throws(() => recoveryLink(`<a href="${link}">Reset</a>`));
  }
});

test('caller cancellation aborts an in-flight request without waiting for timeout', async () => {
  const controller = new AbortController();
  const reason = new Error('synthetic cancellation');
  const request = localFetch(API, API, { signal: controller.signal }, async (_url, options) => {
    assert.notEqual(options.signal, controller.signal);
    assert.equal(options.redirect, 'manual');
    return new Promise((_resolve, reject) => {
      options.signal.addEventListener('abort', () => reject(options.signal.reason), { once: true });
    });
  });
  controller.abort(reason);
  await assert.rejects(request, error => error === reason);
});

test('already-cancelled requests never invoke fetch', async () => {
  let calls = 0;
  await assert.rejects(localFetch(API, API, { signal: AbortSignal.abort() }, async () => { calls += 1; }), { name: 'AbortError' });
  assert.equal(calls, 0);
});
