export function allowedAuthTarget(
  url: string,
  enabled: string | undefined,
  deployment?: string,
) {
  if (enabled !== "true" || deployment === "production") return false;
  try {
    const target = new URL(url);
    return (
      target.origin === "https://mibydnerayobemhnlfyl.supabase.co" ||
      (deployment !== "preview" &&
        target.protocol === "http:" &&
        ["localhost", "127.0.0.1"].includes(target.hostname))
    );
  } catch {
    return false;
  }
}

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";
export const accountsEnabled =
  Boolean(supabaseKey) &&
  allowedAuthTarget(
    supabaseUrl,
    process.env.NEXT_PUBLIC_ENABLE_STAGING_ACCOUNTS,
    process.env.NEXT_PUBLIC_VERCEL_ENV,
  );

export function safeReturnPath(
  value: string | null | undefined,
  fallback = "/explore",
) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\x00-\x20]/.test(value)
  )
    return fallback;
  try {
    const decoded = decodeURIComponent(value);
    if (decoded.startsWith("//") || /[\\\x00-\x20]/.test(decoded))
      return fallback;
    const target = new URL(value, "https://aro.invalid");
    return target.origin === "https://aro.invalid"
      ? target.pathname + target.search + target.hash
      : fallback;
  } catch {
    return fallback;
  }
}
