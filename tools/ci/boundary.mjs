export const API = 'http://127.0.0.1:54321';
export const MAIL = 'http://127.0.0.1:54324';
export const CALLBACK = 'http://127.0.0.1:5173/reset-password';

export function requireCondition(value, code) {
  if (!value) throw new Error(code);
}

export function validateTarget(raw, origin, path) {
  let url;
  try { url = new URL(raw); } catch { throw new Error('INVALID_URL'); }
  requireCondition([API, MAIL, new URL(CALLBACK).origin].includes(origin), 'UNAPPROVED_ORIGIN');
  requireCondition(url.origin === origin && !url.username && !url.password, 'NONLOCAL_TARGET');
  if (path) requireCondition(url.pathname === path, 'UNEXPECTED_PATH');
  return url;
}

export function requireHostedRunner(env, platform) {
  requireCondition(platform === 'linux' && env.GITHUB_ACTIONS === 'true' &&
    env.RUNNER_ENVIRONMENT === 'github-hosted' && env.CI === 'true', 'CI_ONLY');
  for (const name of Object.keys(env)) {
    if (/^(SUPABASE_(ACCESS_TOKEN|DB_PASSWORD|PROJECT_ID|PROJECT_REF|URL|KEY|SERVICE_ROLE_KEY)|PG(HOST|SERVICE|PASSWORD|DATABASE)|DATABASE_URL|DOCKER_HOST|DOCKER_CONTEXT)$/.test(name)) {
      requireCondition(!env[name], 'EXTERNAL_CONFIGURATION');
    }
  }
}

export async function localFetch(raw, origin, options = {}, fetcher = fetch) {
  const url = validateTarget(raw, origin);
  const timeout = AbortSignal.timeout(15000);
  const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
  signal.throwIfAborted();
  return fetcher(url, { ...options, redirect: 'manual', signal });
}

export function recoveryLink(html) {
  const links = [...html.matchAll(/href=["']([^"']+)["']/g)].map(match => match[1].replaceAll('&amp;', '&'));
  const link = links.find(raw => {
    try { return new URL(raw).pathname === '/auth/v1/verify'; } catch { return false; }
  });
  const url = validateTarget(link, API, '/auth/v1/verify');
  requireCondition(url.searchParams.get('type') === 'recovery', 'NOT_RECOVERY');
  requireCondition(url.searchParams.get('redirect_to') === CALLBACK, 'RECOVERY_REDIRECT');
  return url.href;
}
