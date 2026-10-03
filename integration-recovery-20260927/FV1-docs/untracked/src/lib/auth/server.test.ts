import { beforeEach, describe, expect, it, vi } from "vitest";
const state = vi.hoisted(() => ({
  client: null as any,
  enabled: true,
  returnPath: "/profile?tab=saved",
}));
vi.mock("server-only", () => ({}));
vi.mock("@supabase/ssr", () => ({ createServerClient: () => state.client }));
vi.mock("./config", () => ({
  get accountsEnabled() {
    return state.enabled;
  },
  safeReturnPath: (v: string) => v,
  supabaseUrl: "http://localhost:54321",
  supabaseKey: "test",
}));
vi.mock("next/headers", () => ({
  cookies: async () => ({ getAll: () => [], set: vi.fn() }),
  headers: async () => new Headers({ "x-aro-return-path": state.returnPath }),
}));
vi.mock("next/navigation", () => ({
  redirect: (path: string) => {
    throw new Error("redirect:" + path);
  },
  notFound: () => {
    throw new Error("not-found");
  },
}));
import { requireUser } from "./server";
describe("server access enforcement", () => {
  beforeEach(() => {
    state.enabled = true;
    state.client = {
      auth: {
        getUser: vi
          .fn()
          .mockResolvedValue({ data: { user: null }, error: null }),
      },
    };
  });
  it("preserves query strings when redirecting anonymous users", async () => {
    await expect(requireUser("/profile")).rejects.toThrow(
      "redirect:/login?next=%2Fprofile%3Ftab%3Dsaved",
    );
  });
  it("denies unavailable account configuration", async () => {
    state.enabled = false;
    await expect(requireUser("/profile")).rejects.toThrow("redirect:");
  });
  it("does not trust an editable admin metadata claim", async () => {
    state.client.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-a", user_metadata: { role: "admin" } } },
      error: null,
    });
    const query = {
      select: () => query,
      eq: () => query,
      single: async () => ({ data: { role: "participant" }, error: null }),
    };
    state.client.schema = () => ({ from: () => query });
    await expect(requireUser("/admin", "admin")).rejects.toThrow("not-found");
  });
  it("denies role lookup failures", async () => {
    state.client.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-a" } },
      error: null,
    });
    const query = {
      select: () => query,
      eq: () => query,
      single: async () => ({ data: null, error: { message: "unavailable" } }),
    };
    state.client.schema = () => ({ from: () => query });
    await expect(requireUser("/admin", "admin")).rejects.toThrow("not-found");
  });
});
