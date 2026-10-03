import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
const state = vi.hoisted(() => ({ enabled: true, lifecycle: true, url: 'https://mibydnerayobemhnlfyl.supabase.co', create: vi.fn(() => ({ serverClient: true })) }));
vi.mock('server-only', () => ({}));
vi.mock('@supabase/supabase-js', () => ({ createClient: state.create }));
vi.mock('./config', () => ({ get accountsEnabled() { return state.enabled; }, get supabaseUrl() { return state.url; } }));
vi.mock('./lifecycle', () => ({ get lifecycleEnabled() { return state.lifecycle; } }));
import { deletionAdmin } from './admin';
describe('privileged deletion target', () => {
  beforeEach(() => {
    vi.stubEnv('ENABLE_ACCOUNT_DELETION_WORKER', 'true');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'synthetic-server-key');
    vi.stubEnv('SUPABASE_SERVER_PROJECT_REF', 'mibydnerayobemhnlfyl');
    vi.stubEnv('VERCEL_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_PRODUCTION_SUPABASE_REF', 'mibydnerayobemhnlfyl');
    state.enabled = true; state.lifecycle = true; state.url = 'https://mibydnerayobemhnlfyl.supabase.co'; state.create.mockClear();
  });
  afterEach(() => vi.unstubAllEnvs());
  it('requires every explicit server and public lifecycle switch', () => {
    expect(deletionAdmin()).toEqual({ serverClient: true });
    state.lifecycle = false;
    expect(deletionAdmin()).toBeNull();
    state.lifecycle = true; vi.stubEnv('ENABLE_ACCOUNT_DELETION_WORKER', 'false');
    expect(deletionAdmin()).toBeNull();
  });
  it('denies wrong backend, environment, or absent server credentials', () => {
    state.url = 'https://ybhecubqnhukgpvchjay.supabase.co';
    expect(deletionAdmin()).toBeNull();
    state.url = 'https://mibydnerayobemhnlfyl.supabase.co'; vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'preview');
    expect(deletionAdmin()).toBeNull();
    vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'production'); vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', '');
    expect(deletionAdmin()).toBeNull();
    expect(state.create).not.toHaveBeenCalled();
  });
});
