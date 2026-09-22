import { describe, it, expect } from "vitest";
import { allowedAuthTarget, safeReturnPath } from "./config";
describe("account boundaries", () => {
  it("permits only explicit isolated staging or local fixtures", () => {
    expect(
      allowedAuthTarget(
        "https://mibydnerayobemhnlfyl.supabase.co",
        "true",
        "preview",
      ),
    ).toBe(true);
    expect(allowedAuthTarget("http://127.0.0.1:54321", "true")).toBe(true);
    for (const url of [
      "https://ybhecubqnhukgpvchjay.supabase.co",
      "https://jjgccfrwjkwknyjtbtxa.supabase.co",
      "https://mibydnerayobemhnlfyl.supabase.co.evil.test",
      "invalid",
    ])
      expect(allowedAuthTarget(url, "true")).toBe(false);
    expect(
      allowedAuthTarget(
        "https://mibydnerayobemhnlfyl.supabase.co",
        "true",
        "production",
      ),
    ).toBe(false);
    expect(
      allowedAuthTarget("https://mibydnerayobemhnlfyl.supabase.co", "false"),
    ).toBe(false);
  });
  it("requires an explicitly selected separate production project and activation", () => {
    const projectRef = "abcdefghijklmnopqrst";
    const production = { enabled: "true", projectRef };
    const url = `https://${projectRef}.supabase.co`;
    expect(allowedAuthTarget(url, "false", "production", production)).toBe(true);
    expect(allowedAuthTarget(url, "true", "production")).toBe(false);
    expect(allowedAuthTarget(url, "true", "preview", production)).toBe(false);
    expect(allowedAuthTarget(url, "true", "production", { ...production, enabled: "false" })).toBe(false);
    for (const ref of ["mibydnerayobemhnlfyl", "jjgccfrwjkwknyjtbtxa", "ybhecubqnhukgpvchjay"])
      expect(allowedAuthTarget(`https://${ref}.supabase.co`, "true", "production", { enabled: "true", projectRef: ref })).toBe(false);
    for (const bad of [url + ".evil.test", url + "/rest/v1", url + "?key=value", url.replace("https:", "http:"), url.replace("https://", "https://user:pass@")])
      expect(allowedAuthTarget(bad, "true", "production", production)).toBe(false);
  });
  it("preserves local navigation and rejects redirect attacks", () => {
    expect(safeReturnPath("/profile?tab=saved#details")).toBe(
      "/profile?tab=saved#details",
    );
    for (const url of [
      "https://evil.test",
      "//evil.test",
      "/\\evil.test",
      "/%2f%2fevil.test",
      "/%5cevil.test",
      "/\nevil.test",
      "/%zz",
    ])
      expect(safeReturnPath(url)).toBe("/explore");
  });
});
