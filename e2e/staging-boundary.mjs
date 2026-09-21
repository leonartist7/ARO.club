import { launch } from "./harness.mjs";
import { writeFile } from "node:fs/promises";
const base = process.env.E2E_STAGING_BASE || "http://localhost:5175";
const browser = await launch();
const report = { checks: [], errors: [] };
let page;
try {
  const context = await browser.newContext();
  page = await context.newPage();
  page.on("pageerror", (error) => report.errors.push(String(error)));
  await page.goto(base + "/login", { waitUntil: "networkidle" });
  report.checks.push({
    name: "email login enabled",
    passed: await page.getByLabel("Email Address").isEnabled(),
  });
  report.checks.push({
    name: "Google disabled",
    passed: await page
      .getByRole("button", { name: "Continue with Google" })
      .isDisabled(),
  });
  await page
    .getByLabel("Email Address")
    .fill("next-migration-invalid@example.invalid");
  await page
    .getByLabel("Password", { exact: true })
    .fill("invalid-synthetic-password");
  const request = page.waitForResponse((r) =>
    r.url().includes("mibydnerayobemhnlfyl.supabase.co/auth/v1/token"),
  );
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  const response = await request;
  await page.getByText("Invalid login credentials", { exact: true }).waitFor();
  report.checks.push({
    name: "staging rejects invalid credentials",
    passed:
      response.status() === 400 && new URL(page.url()).pathname === "/login",
  });
  await page.goto(base + "/admin", { waitUntil: "networkidle" });
  report.checks.push({
    name: "anonymous admin denied",
    passed: new URL(page.url()).pathname === "/login",
  });
  await page.goto(
    base + "/auth/callback?code=expired&next=https://evil.example",
    { waitUntil: "networkidle" },
  );
  report.checks.push({
    name: "expired callback fails locally",
    passed: new URL(page.url()).pathname === "/auth/error",
  });
  report.checks.push({
    name: "no session created",
    passed: !(await context.cookies()).some((c) =>
      c.name.includes("auth-token"),
    ),
  });
  await writeFile(
    new URL("../artifacts/ARO-N1/staging-boundary.json", import.meta.url),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
  if (report.errors.length || report.checks.some((c) => !c.passed))
    process.exitCode = 1;
} catch (error) {
  console.error(JSON.stringify({ error: String(error), url: page?.url(), fields: page ? await page.locator('input').evaluateAll(inputs => inputs.map(input => ({ type: input.type, id: input.id, disabled: input.disabled }))) : [] }));
  throw error;
} finally {
  await browser.close();
}
