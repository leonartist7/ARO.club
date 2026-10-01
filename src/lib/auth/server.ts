import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  accountsEnabled,
  safeReturnPath,
  supabaseKey,
  supabaseUrl,
} from "./config";
import { lifecycleEnabled } from './lifecycle';

export async function serverSupabase() {
  if (
    !accountsEnabled ||
    (process.env.VERCEL_ENV &&
      process.env.VERCEL_ENV !== process.env.NEXT_PUBLIC_VERCEL_ENV)
  ) return null;
  const jar = await cookies();
  return createServerClient(supabaseUrl, supabaseKey, {
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store", signal: init?.signal ?? AbortSignal.timeout(10_000) }),
    },
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (values) => {
        // Server Components cannot write cookies; proxy refreshes them first.
        try {
          values.forEach(({ name, value, options }) =>
            jar.set(name, value, options),
          );
        } catch {
          /* Read-only render. */
        }
      },
    },
  });
}

export async function requireUser(returnTo: string, role?: string) {
  const client = await serverSupabase();
  const result = client ? await client.auth.getUser().catch(() => null) : null;
  const user = result?.data.user;
  const requestedPath = (await headers()).get("x-aro-return-path") || returnTo;
  if (!user || result?.error)
    redirect(
      "/login?next=" + encodeURIComponent(safeReturnPath(requestedPath)),
    );
  if (lifecycleEnabled) {
    const access = await Promise.resolve(client!.schema('api').rpc('account_access_status')).catch(() => null);
    if (access?.error || !access?.data?.active)
      redirect('/login?next=' + encodeURIComponent(safeReturnPath(requestedPath)));
    if (!access.data.eligible && !['/auth/reset-password', '/account/delete', '/account/eligibility'].includes(returnTo))
      redirect('/account/eligibility?next=' + encodeURIComponent(safeReturnPath(requestedPath)));
  }
  if (role) {
    const { data, error } = await client!
      .schema("api")
      .from("current_user_role")
      .select("role")
      .eq("user_id", user.id)
      .single();
    if (error || data?.role !== role) notFound();
  }
  return user;
}
