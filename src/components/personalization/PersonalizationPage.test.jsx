import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import PersonalizationPage from "./PersonalizationPage";
import { PersonalizationProvider } from "./PreviewContext";
vi.mock("next/link", () => ({
  default: ({ children, ...props }) => <a {...props}>{children}</a>,
}));
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({push: vi.fn()}),
}));
vi.mock("../../contexts/ThemeContext", () => ({
  useTheme: () => ({ isDark: false, toggleTheme: vi.fn() }),
}));
vi.mock("../../contexts/LanguageContext", () => ({
  useLanguage: () => ({ language: "en", changeLanguage: vi.fn() }),
}));
let host, root;
const button = (text) =>
  [...host.querySelectorAll("button")].find(
    (node) => node.textContent.trim() === text,
  );
const click = async (node) => act(() => node.click());
beforeEach(() => {
  vi.stubGlobal("React", React);
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
});
afterEach(async () => {
  await act(() => root.unmount());
  host.remove();
  vi.unstubAllGlobals();
});
async function render(section) {
  await act(() =>
    root.render(
      <PersonalizationProvider>
        <PersonalizationPage section={section} />
      </PersonalizationProvider>,
    ),
  );
}
describe("personalization preview interactions", () => {
  it("offers a working retry when artwork fails", async () => {
    await render("character");
    const artwork = host.querySelector(".pv-avatar-base");
    await act(() => artwork.dispatchEvent(new Event("error")));
    expect(host.querySelector(".pv-art-error").textContent).toContain("Image unavailable");
    await click(button("Retry image"));
    expect(host.querySelector(".pv-avatar-base").tagName).toBe("IMG");
    expect(host.querySelector(".pv-art-error")).toBeNull();
  });

  it("separates character drafts, saves and cancellation", async () => {
    await render("character");
    expect(button("Save preview look").disabled).toBe(true);
    await click(host.querySelector('[data-item="hat"]'));
    expect(button("Save preview look").disabled).toBe(false);
    await click(button("Save preview look"));
    expect(button("Save preview look").disabled).toBe(true);
    await click(host.querySelector('[data-item="hat"]'));
    await click(button("Cancel changes"));
    expect(
      host.querySelector('[data-item="hat"]').getAttribute("aria-pressed"),
    ).toBe("true");
  });
  it("filters shop items and opens a correct editor destination", async () => {
    await render("shop");
    expect(host.querySelectorAll(".pv-item-card")).toHaveLength(5);
    await click(button("Wear"));
    expect(host.querySelectorAll(".pv-item-card")).toHaveLength(2);
    await click(host.querySelector(".pv-preview-button"));
    expect(host.querySelector("dialog .pv-action").getAttribute("href")).toBe(
      "/app/personalize/character?item=hat",
    );
  });
  it("removes a room decoration and restores it with undo", async () => {
    await render("space");
    const count = () => host.querySelectorAll(".pv-placed-item").length;
    expect(count()).toBe(3);
    await click(host.querySelector(".pv-editor-panel > .pv-text-button"));
    expect(count()).toBe(2);
    await click(host.querySelector(".pv-space-stage-top button"));
    expect(count()).toBe(3);
    expect(host.querySelector(".pv-save").disabled).toBe(true);
  });
  it("preserves chapter selection between world and list and previews a keepsake", async () => {
    await render("season");
    await click(host.querySelectorAll('.sx-chapters button')[2]);
    expect(host.querySelector('.sx-selected h2').textContent).toBe('Contribute');
    await click(button('List'));
    expect(host.querySelector('.sx-world')).toBeNull();
    expect(host.querySelector('.sx-selected .pv-action').getAttribute('href')).toBe('/app/opportunities/repair-table');
    await click(button('World'));
    expect(host.querySelector('.sx-point-2').getAttribute('aria-pressed')).toBe('true');
    await click(host.querySelector('.sx-object-grid button'));
    expect(host.querySelector('dialog .pv-action').getAttribute('href')).toBe('/app/personalize/space?item=plant');
  });
  it("opens each seasonal chapter without a purchase or claim action", async () => {
    await render("season");
    const chapterButtons = [...host.querySelectorAll(".sx-chapters button")];
    expect(chapterButtons).toHaveLength(4);
    for (const chapter of chapterButtons) {
      await click(chapter);
      await click(button("Chapter details"));
      expect(host.querySelector("dialog").textContent).toContain("preview");
      await click(host.querySelector(".pv-dialog-header button"));
    }
    expect(host.querySelector("dialog")).toBeNull();
  });
});
