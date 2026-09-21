export function allowedAuthTarget(
  url: string,
  enabled: string | undefined,
  deployment?: string,
  production?: { enabled?: string; projectRef?: string },
) {
  try {
    const target = new URL(url);
    if (target.username || target.password || target.search || target.hash || target.pathname !== "/")
      return false;
    if (deployment === "production") {
      const ref = production?.projectRef || "";
      // Existing staging and quarantined/unrelated projects are never production targets.
      const excluded = [
        "mibydnerayobemhnlfyl", "jjgccfrwjkwknyjtbtxa", "ybhecubqnhukgpvchjay",
        "aqhsjyvophxmxgbdgjtl", "gymigzfkkjcfcmunkkzh", "bbqdhqcbjkuszfjalkcn",
        "rztxxajwpcszbgsitnup", "ugppbaavzevmdkblniim",
      ];
      return production?.enabled === "true" && /^[a-z]{20}$/.test(ref) &&
        !excluded.includes(ref) && target.origin === `https://${ref}.supabase.co`;
    }
    if (enabled !== "true") return false;
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
    {
      enabled: process.env.NEXT_PUBLIC_ENABLE_PRODUCTION_ACCOUNTS,
      projectRef: process.env.NEXT_PUBLIC_PRODUCTION_SUPABASE_REF,
    },
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
