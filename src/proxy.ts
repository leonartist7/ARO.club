import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { accountsEnabled, supabaseUrl, supabaseKey } from "./lib/auth/config";
import legacyExperiences from "./data/experiences.json";
import legacyTeachers from "./data/teachers.json";

const legacyExperienceIds = new Set(legacyExperiences.map(({ id }) => id));
const legacyTeacherIds = new Set(legacyTeachers.map(({ id }) => id));

export async function proxy(request: NextRequest) {
  const legacyPath = request.nextUrl.pathname.match(/^\/(experience|teacher)\/([^/]+)\/?$/);
  if (legacyPath) {
    const [, kind, id] = legacyPath;
    const known = kind === "experience" ? legacyExperienceIds.has(id) : legacyTeacherIds.has(id);
    if (!known) {
      return NextResponse.rewrite(new URL("/__aro_unknown_legacy", request.url), { status: 404 });
    }
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "x-aro-return-path",
    request.nextUrl.pathname + request.nextUrl.search,
  );
  let response = NextResponse.next({ request: { headers: requestHeaders } });
  if (
    !accountsEnabled ||
    (process.env.VERCEL_ENV &&
      process.env.VERCEL_ENV !== process.env.NEXT_PUBLIC_VERCEL_ENV)
  )
    return response;
  const client = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (values) => {
        values.forEach(({ name, value }) => request.cookies.set(name, value));
        requestHeaders.set("cookie", request.cookies.toString());
        response = NextResponse.next({ request: { headers: requestHeaders } });
        values.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });
  try {
    await client.auth.getUser();
  } catch {
    /* Protected pages independently deny unverifiable sessions. */
  }
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2)$).*)",
  ],
};
