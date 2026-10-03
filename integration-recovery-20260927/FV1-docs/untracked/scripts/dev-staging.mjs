import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
try {
  process.loadEnvFile(
    fileURLToPath(new URL("../.env.staging.local", import.meta.url)),
  );
} catch {
  throw new Error(
    "Create ignored .env.staging.local using .env.example and the isolated staging publishable key.",
  );
}
const next = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);
const child = spawn(
  process.execPath,
  [next, "dev", "--port", "5173", ...process.argv.slice(2)],
  { cwd: root, env: process.env, stdio: "inherit" },
);
child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
