import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
const state = vi.hoisted(() => ({ client: null as any }));
vi.mock("../../../lib/auth/server", () => ({
  serverSupabase: async () => state.client,
}));
import { GET } from "./route";
describe("authentication callback", () => {
  beforeEach(() => {
    state.client = null;
  });
  it("does not simulate login when accounts are unavailable", async () => {
    const response = await GET(
      new NextRequest("https://preview.example/auth/callback?code=fake"),
    );
    expect(response.headers.get("location")).toBe(
      "https://preview.example/auth/error",
    );
    expect(response.headers.get("cache-control")).toContain("no-store");
  });
  it("exchanges a code before redirecting and discards sensitive query parameters", async () => {
    const exchangeCodeForSession = vi.fn().mockResolvedValue({ error: null });
    state.client = { auth: { exchangeCodeForSession } };
    const response = await GET(
      new NextRequest(
        "https://preview.example/auth/callback?code=one-time&next=%2Fprofile%3Ftab%3Dsaved",
      ),
    );
    expect(exchangeCodeForSession).toHaveBeenCalledWith("one-time");
    expect(response.headers.get("location")).toBe(
      "https://preview.example/profile?tab=saved",
    );
  });
  it("rejects external return destinations", async () => {
    state.client = {
      auth: {
        exchangeCodeForSession: vi.fn().mockResolvedValue({ error: null }),
      },
    };
    const response = await GET(
      new NextRequest(
        "https://preview.example/auth/callback?code=one-time&next=https://evil.example",
      ),
    );
    expect(response.headers.get("location")).toBe(
      "https://preview.example/explore",
    );
  });
  it("shows a recoverable error for expired or failed links", async () => {
    state.client = {
      auth: {
        exchangeCodeForSession: vi
          .fn()
          .mockResolvedValue({ error: { message: "expired" } }),
      },
    };
    expect(
      (
        await GET(
          new NextRequest("https://preview.example/auth/callback?code=expired"),
        )
      ).headers.get("location"),
    ).toBe("https://preview.example/auth/error");
  });
  it("verifies recovery tokens before showing the password form", async () => {
    const verifyOtp = vi.fn().mockResolvedValue({ error: null });
    state.client = { auth: { verifyOtp } };
    const response = await GET(
      new NextRequest(
        "https://preview.example/auth/callback?token_hash=single-use&type=recovery",
      ),
    );
    expect(verifyOtp).toHaveBeenCalledWith({
      token_hash: "single-use",
      type: "recovery",
    });
    expect(response.headers.get("location")).toBe(
      "https://preview.example/auth/reset-password",
    );
  });
});
