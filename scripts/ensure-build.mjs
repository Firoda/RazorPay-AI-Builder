// Runs before `npm start`: builds the frontend if web/dist is missing, so the app works on any host
// that only runs `npm install` + `npm start` (e.g. AI Studio / Cloud Run buildpacks).
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

if (!existsSync("web/dist/index.html")) {
  console.log("web/dist not found: building the frontend…");
  execSync("npx vite build --config web/vite.config.ts", { stdio: "inherit" });
}
