import { describe, expect, it } from "vitest";
import { initialSpace, placeItem } from "./catalog";

describe("personal courtyard placement", () => {
  it("moves a single object without mutating the saved room", () => {
    const saved = Object.freeze({ ...initialSpace });
    const draft = placeItem(saved, "table", "lantern");
    expect(draft.table).toBe("lantern");
    expect(draft.floorRight).toBeNull();
    expect(saved.floorRight).toBe("lantern");
    expect(Object.values(draft).filter((id) => id === "lantern")).toHaveLength(
      1,
    );
  });
  it("rejects unsupported objects and incompatible zones", () => {
    expect(placeItem(initialSpace, "shelfLeft", "plant")).toBe(initialSpace);
    expect(placeItem(initialSpace, "table", "hat")).toBe(initialSpace);
    expect(placeItem(initialSpace, "unknown", "lantern")).toBe(initialSpace);
  });
  it("clears one spot without removing other decorations", () => {
    expect(placeItem(initialSpace, "floorLeft", null)).toEqual({
      ...initialSpace,
      floorLeft: null,
    });
  });
});
