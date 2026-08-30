import { randomBytes, randomUUID } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { API, MAIL, CALLBACK, localFetch, recoveryLink, requireCondition, validateTarget } from './boundary.mjs';

export function authClient(anonKey) {
  requireCondition(typeof anonKey === 'string' && anonKey.length > 20, 'MISSING_LOCAL_KEY');
  return async function request(path, { method = 'GET', token, body, statuses = [200] } = {}) {
    const response = await localFetch(`${API}/auth/v1/${path}`, API, {
      method,
      headers: { apikey: anonKey, 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    requireCondition(statuses.includes(response.status), `AUTH_HTTP_${response.status}`);
    if (response.status === 204) return null;
    return response.json();
  };
}

async function recoveryMail(email) {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    const listing = await localFetch(`${MAIL}/api/v1/messages`, MAIL);
    requireCondition(listing.status === 200, 'MAIL_LIST_FAILED');
    const data = await listing.json();
    const message = data.messages?.find(item => item.To?.some(to => to.Address === email));
    if (message) {
      const response = await localFetch(`${MAIL}/api/v1/message/${encodeURIComponent(message.ID)}`, MAIL);
      requireCondition(response.status === 200, 'MAIL_READ_FAILED');
      return (await response.json()).HTML;
    }
    await delay(500);
  }
  throw new Error('MAIL_TIMEOUT');
}

export async function exerciseAuth(anonKey, phase) {
  const request = authClient(anonKey);
  const email = `i0-${randomUUID()}@example.invalid`;
  const otherEmail = `i0-${randomUUID()}@example.invalid`;
  const password = `Aa1!${randomBytes(24).toString('hex')}`;
  const newPassword = `Bb2!${randomBytes(24).toString('hex')}`;
  let userId;
  await phase('auth-signup-two-users', async () => {
    const owner = await request('signup', { method: 'POST', body: { email, password } });
    const other = await request('signup', { method: 'POST', body: { email: otherEmail, password } });
    userId = owner.user?.id;
    requireCondition(userId && other.user?.id && userId !== other.user.id, 'DISTINCT_USERS_REQUIRED');
  });
  const signIn = (candidate, statuses = [200]) => request('token?grant_type=password', {
    method: 'POST', body: { email, password: candidate }, statuses,
  });
  let session;
  await phase('auth-password-and-refresh', async () => {
    const rejected = await signIn('wrong-password', [400]);
    requireCondition(!rejected.access_token, 'INVALID_PASSWORD_ACCEPTED');
    session = await signIn(password);
    requireCondition(session.user?.id === userId && session.refresh_token, 'SIGNIN_IDENTITY');
    session = await request('token?grant_type=refresh_token', { method: 'POST', body: { refresh_token: session.refresh_token } });
    requireCondition(session.user?.id === userId && session.access_token, 'REFRESH_IDENTITY');
    const user = await request('user', { token: session.access_token });
    requireCondition(user.id === userId, 'USER_IDENTITY');
    await request('admin/users', { token: session.access_token, statuses: [403] });
  });
  await phase('auth-recovery-password-change', async () => {
    await request(`recover?redirect_to=${encodeURIComponent(CALLBACK)}`, { method: 'POST', body: { email } });
    const link = recoveryLink(await recoveryMail(email));
    const verification = await localFetch(link, API);
    requireCondition([302, 303].includes(verification.status), 'RECOVERY_VERIFY_FAILED');
    const redirect = validateTarget(verification.headers.get('location'), new URL(CALLBACK).origin, '/reset-password');
    const fragment = new URLSearchParams(redirect.hash.slice(1));
    const token = fragment.get('access_token');
    requireCondition(token && fragment.get('type') === 'recovery' && !fragment.has('error'), 'RECOVERY_SESSION');
    const user = await request('user', { method: 'PUT', token, body: { password: newPassword } });
    requireCondition(user.id === userId, 'PASSWORD_UPDATE_IDENTITY');
    const rejected = await signIn(password, [400]);
    requireCondition(!rejected.access_token, 'OLD_PASSWORD_ACCEPTED');
    session = await signIn(newPassword);
    requireCondition(session.user?.id === userId, 'NEW_PASSWORD_IDENTITY');
  });
  await phase('auth-logout-revokes-refresh', async () => {
    await request('logout?scope=global', { method: 'POST', token: session.access_token, statuses: [204] });
    const rejected = await request('token?grant_type=refresh_token', {
      method: 'POST', body: { refresh_token: session.refresh_token }, statuses: [400],
    });
    requireCondition(!rejected.access_token, 'REVOKED_REFRESH_ACCEPTED');
  });
  // Return only an in-memory check. Credentials are never written to evidence.
  return async () => {
    const rejected = await signIn(newPassword, [400]);
    requireCondition(!rejected.access_token, 'RESET_ACCOUNT_SURVIVED');
  };
}
