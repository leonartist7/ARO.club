import { fileURLToPath } from "node:url";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { launch, BASE } from "./harness.mjs";
const inventory = JSON.parse(
  await readFile(
    new URL("../artifacts/ARO-N1/route-inventory.json", import.meta.url),
    "utf8",
  ),
);
const browser = await launch();
const results = [];
const errors = [];
const consoleErrors = [];
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (
    m.type() === "error" &&
    /hydration|hydrating|Minified React error/.test(m.text())
  )
    consoleErrors.push(m.text());
});
await mkdir(new URL("../artifacts/ARO-N1/", import.meta.url), {
  recursive: true,
});
try {
  for (const [route, , protectedRoute] of inventory) {
    const url = route.replaceAll(
      ":id",
      route.startsWith("experience/") ? "exp1" : route.startsWith("teacher/") ? "t1" : route.startsWith("app/") ? "shared-stories" : "1",
    );
    const response = await page.goto(BASE + "/" + url, {
      waitUntil: "networkidle",
    });
    await page.locator("body").waitFor();
    const text = await page.locator("body").innerText();
    const passed =
      response.status() < 500 &&
      text.trim().length > 20 &&
      (!protectedRoute || new URL(page.url()).pathname === "/login");
    results.push({
      route: "/" + url,
      status: response.status(),
      destination: new URL(page.url()).pathname,
      passed,
    });
  }
  await page.goto(BASE + "/experience/exp1", { waitUntil: "networkidle" });
  results.push({ scenario: "real experience parameter", passed: await page.getByRole("heading", { name: "Montmartre Café Conversation", exact: true }).count() === 1 });
  await page.goto(BASE + "/teacher/t1", { waitUntil: "networkidle" });
  results.push({ scenario: "real teacher parameter", passed: await page.getByRole("heading", { name: "Sophie Dubois", exact: true }).count() === 1 });
  await page.goto(BASE + "/profile?tab=saved", { waitUntil: "networkidle" });
  results.push({
    scenario: "protected query preserved",
    passed:
      new URL(page.url()).searchParams.get("next") === "/profile?tab=saved",
  });
  await page.goto(
    BASE + "/auth/callback?code=invalid&next=https://evil.example",
    { waitUntil: "networkidle" },
  );
  results.push({
    scenario: "invalid callback stays local",
    passed: new URL(page.url()).pathname === "/auth/error",
  });
  await page.goto(BASE + "/unknown-next-route", { waitUntil: "networkidle" });
  results.push({
    scenario: "unknown route",
    passed: (await page.locator("body").innerText()).includes("404"),
  });
  await page.goto(BASE + "/app/unknown-example", { waitUntil: "networkidle" });
  results.push({ scenario: "FV1 shell fallback preserved", passed: await page.getByRole("heading", { name: "Example unavailable", exact: true }).count() === 1 && await page.getByRole("link", { name: "Back to World", exact: true }).count() === 1 });
  for (const width of [360, 1440])
    for (const theme of ["light", "dark"]) {
      await page.setViewportSize({ width, height: width === 360 ? 800 : 1000 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      await page.goto(BASE + "/app", { waitUntil: "networkidle" });
      await page.evaluate((t) => localStorage.setItem("theme", t), theme);
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForFunction(
        (t) => document.documentElement.classList.contains(t),
        theme,
      );
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      results.push({
        scenario: `app ${width} ${theme}`,
        passed: overflow <= 1,
      });
      await page.screenshot({
        path: fileURLToPath(new URL(
          `../artifacts/ARO-N1/app-${width}-${theme}.png`,
          import.meta.url,
        )),
        animations: "disabled",
      });
    }
  await page.goto(BASE + "/app", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "World", exact: true }).click();
  await page.waitForURL("**/app/world");
  await page.goBack();
  await page.waitForURL("**/app");
  results.push({ scenario: "client navigation and history", passed: true });
  results.push({
    scenario: "no page or hydration errors",
    passed: errors.length === 0 && consoleErrors.length === 0,
  });
  const report = { results, errors, consoleErrors };
  await writeFile(
    new URL("../artifacts/ARO-N1/browser-parity.json", import.meta.url),
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        checks: results.length,
        failures: results.filter((r) => !r.passed),
        errors,
        consoleErrors,
      },
      null,
      2,
    ),
  );
  if (results.some((r) => !r.passed)) process.exitCode = 1;
} finally {
  await browser.close();
}
