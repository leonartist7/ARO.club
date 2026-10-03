import { beforeEach, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
const state = vi.hoisted(() => ({ enabled: true, refresh: true }));
vi.mock('./lib/auth/config', () => ({
  get accountsEnabled() { return state.enabled; },
  supabaseUrl: 'http://localhost:54321', supabaseKey: 'synthetic-public-key',
}));
vi.mock('@supabase/ssr', () => ({
  createServerClient: (_url: string, _key: string, options: { cookies: { setAll: (values: unknown[]) => void } }) => ({
    auth: { getUser: async () => {
      if (state.refresh) options.cookies.setAll([
        { name: 'sb-session', value: 'refreshed', options: { path: '/', sameSite: 'lax' } },
      ]);
      return { data: { user: null }, error: null };
    } },
  }),
}));
import { proxy } from './proxy';
beforeEach(() => { state.enabled = true; state.refresh = true; });
it('forwards refreshed cookies to the render and browser without shared caching', async () => {
  const response = await proxy(new NextRequest('http://localhost:5173/profile?tab=saved'));
  expect(response.cookies.get('sb-session')?.value).toBe('refreshed');
  expect(response.headers.get('x-middleware-request-cookie')).toContain('sb-session=refreshed');
  expect(response.headers.get('cache-control')).toBe('private, no-store');
});
it('overwrites a spoofed return path with the actual path and query', async () => {
  state.enabled = false;
  const response = await proxy(new NextRequest('http://localhost:5173/admin?tab=users', {
    headers: { 'x-aro-return-path': 'https://evil.example' },
  }));
  expect(response.headers.get('x-middleware-request-x-aro-return-path')).toBe('/admin?tab=users');
  expect(response.cookies.getAll()).toHaveLength(0);
});
it('keeps responses private even without a cookie refresh', async () => {
  state.refresh = false;
  const response = await proxy(new NextRequest('http://localhost:5173/profile'));
  expect(response.headers.get('cache-control')).toBe('private, no-store');
});
