import { mkdir, writeFile, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const mode = process.argv[2];
const routeDirectory = new URL("../app/%255Fdesign/", import.meta.url);
const routeFile = new URL("page.tsx", routeDirectory);
const root = fileURLToPath(new URL("../", import.meta.url));
const page = 'export { default } from "../../design/reference";\n';
async function restorePreview() {
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(routeFile, page);
}
if (mode === "dev") await restorePreview();
else if (mode === "build") await rm(routeFile, { force: true });
else if (mode !== "start") throw new Error("Expected dev, build, or start");
const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", mode, ...process.argv.slice(3)],
  {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, ...(mode !== "dev" ? { APEX_BUILD: "1" } : {}) },
  },
);
child.on("exit", async (code) => {
  if (mode === "build") await restorePreview();
  process.exitCode = code ?? 1;
});
