import { NextResponse, type NextRequest } from "next/server";
import { serverSupabase } from "../../../lib/auth/server";
import { safeReturnPath } from "../../../lib/auth/config";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const client = await serverSupabase();
  let destination = "/auth/error";
  if (client) {
    const code = params.get("code");
    const tokenHash = params.get("token_hash");
    const type = params.get("type");
    try {
      const result = code
        ? await client.auth.exchangeCodeForSession(code)
        : tokenHash && (type === "email" || type === "recovery")
          ? await client.auth.verifyOtp({ token_hash: tokenHash, type })
          : null;
      if (result && !result.error)
        destination =
          type === "recovery"
            ? "/auth/reset-password"
            : safeReturnPath(params.get("next"));
    } catch {
      /* Invalid or unavailable provider: show a recoverable error. */
    }
  }
  const response = NextResponse.redirect(new URL(destination, request.url));
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
