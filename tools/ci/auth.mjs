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

function platformClient(anonKey) {
  return async function request(path, { method = 'GET', token, body, headers = {}, statuses = [200] } = {}) {
    const response = await localFetch(`${API}/${path}`, API, {
      method,
      headers: {
        apikey: anonKey,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(body !== undefined && !(body instanceof Uint8Array) ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      ...(body !== undefined ? { body: body instanceof Uint8Array ? body : JSON.stringify(body) } : {}),
    });
    requireCondition(statuses.includes(response.status), `PLATFORM_HTTP_${response.status}`);
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  };
}

async function recoveryMail(email) {
  const signal = AbortSignal.timeout(30000);
  try {
    while (!signal.aborted) {
      const listing = await localFetch(`${MAIL}/api/v1/messages`, MAIL, { signal });
      requireCondition(listing.status === 200, 'MAIL_LIST_FAILED');
      const data = await listing.json();
      const message = data.messages?.find(item => item.To?.some(to => to.Address === email));
      if (message) {
        const response = await localFetch(`${MAIL}/api/v1/message/${encodeURIComponent(message.ID)}`, MAIL, { signal });
        requireCondition(response.status === 200, 'MAIL_READ_FAILED');
        return (await response.json()).HTML;
      }
      await delay(500, undefined, { signal });
    }
  } catch (error) {
    if (!signal.aborted) throw error;
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
  let otherUserId;
  let otherSession;
  await phase('auth-signup-two-users', async () => {
    const owner = await request('signup', { method: 'POST', body: { email, password } });
    const other = await request('signup', { method: 'POST', body: { email: otherEmail, password } });
    userId = owner.user?.id;
    otherUserId = other.user?.id;
    requireCondition(userId && otherUserId && userId !== otherUserId, 'DISTINCT_USERS_REQUIRED');
  });
  const signIn = (candidate, statuses = [200], candidateEmail = email) => request('token?grant_type=password', {
    method: 'POST', body: { email: candidateEmail, password: candidate }, statuses,
  });
  let session;
  await phase('auth-password-and-refresh', async () => {
    const rejected = await signIn('wrong-password', [400]);
    requireCondition(!rejected.access_token, 'INVALID_PASSWORD_ACCEPTED');
    session = await signIn(password);
    requireCondition(session.user?.id === userId && session.refresh_token, 'SIGNIN_IDENTITY');
    otherSession = await signIn(password, [200], otherEmail);
    requireCondition(otherSession.user?.id === otherUserId && otherSession.access_token, 'OTHER_SIGNIN_IDENTITY');
    session = await request('token?grant_type=refresh_token', { method: 'POST', body: { refresh_token: session.refresh_token } });
    requireCondition(session.user?.id === userId && session.access_token, 'REFRESH_IDENTITY');
    const user = await request('user', { token: session.access_token });
    requireCondition(user.id === userId, 'USER_IDENTITY');
    await request('admin/users', { token: session.access_token, statuses: [403] });
  });
  await phase('application-auth-and-trust-boundaries', async () => {
    const platform = platformClient(anonKey);
    const ownerToken = session.access_token;
    const otherToken = otherSession.access_token;
    const ownProfile = await platform(`rest/v1/profiles?id=eq.${userId}&select=id,name`, { token: ownerToken });
    requireCondition(ownProfile?.length === 1 && ownProfile[0].id === userId, 'OWNER_PROFILE_MISSING');
    const role = await platform(`rest/v1/current_user_role?user_id=eq.${userId}&select=user_id,role`, {
      token: ownerToken, headers: { 'Accept-Profile': 'api' },
    });
    requireCondition(role?.length === 1 && role[0].role === 'participant', 'CURRENT_ROLE_MISSING');
    const hiddenProfile = await platform(`rest/v1/profiles?id=eq.${otherUserId}&select=id`, { token: ownerToken });
    requireCondition(hiddenProfile?.length === 0, 'CROSS_USER_PROFILE_VISIBLE');
    await platform(`rest/v1/profiles?id=eq.${userId}`, {
      method: 'PATCH', token: ownerToken, body: { name: 'Synthetic Owner' }, statuses: [204],
    });
    await platform(`rest/v1/profiles?id=eq.${userId}`, {
      method: 'PATCH', token: ownerToken, body: { points: 999 }, statuses: [401, 403],
    });
    const cards = await platform(`rest/v1/profile_cards?id=eq.${userId}&select=id,name`);
    requireCondition(cards?.[0]?.name === 'Synthetic Owner', 'PUBLIC_CARD_NOT_SYNCED');

    const [application] = await platform('rest/v1/teacher_applications', {
      method: 'POST', token: ownerToken,
      headers: { Prefer: 'return=representation' },
      body: { user_id: userId, display_name: 'Synthetic Teacher' }, statuses: [201],
    });
    requireCondition(application?.status === 'draft', 'APPLICATION_DRAFT_MISSING');
    const hiddenApplication = await platform(`rest/v1/teacher_applications?id=eq.${application.id}&select=id`, { token: otherToken });
    requireCondition(hiddenApplication?.length === 0, 'CROSS_USER_APPLICATION_VISIBLE');

    const objectPath = `${userId}/${application.id}/id.png`;
    await platform(`storage/v1/object/verification-docs/${objectPath}`, {
      method: 'POST', token: ownerToken, body: new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
      headers: { 'Content-Type': 'image/png', 'x-upsert': 'false' }, statuses: [200],
    });
    await platform('rest/v1/teacher_documents', {
      method: 'POST', token: ownerToken, body: {
        application_id: application.id, user_id: userId, doc_type: 'id', object_path: objectPath,
      }, statuses: [201],
    });
    const hiddenDocument = await platform(`rest/v1/teacher_documents?application_id=eq.${application.id}&select=id`, { token: otherToken });
    requireCondition(hiddenDocument?.length === 0, 'CROSS_USER_DOCUMENT_VISIBLE');
    await platform(`storage/v1/object/verification-docs/${objectPath}`, {
      token: otherToken, statuses: [400, 403, 404],
    });
    await platform(`rest/v1/teacher_applications?id=eq.${application.id}`, {
      method: 'PATCH', token: ownerToken, body: { status: 'submitted' }, statuses: [204],
    });
    await platform('rest/v1/bookings', {
      method: 'POST', token: ownerToken, body: { student_id: userId, total_minor: 1, currency: 'CAD' },
      statuses: [401, 403],
    });
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
