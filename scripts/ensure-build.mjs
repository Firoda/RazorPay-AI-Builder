// Runs before `npm start`: builds whichever front end is missing, so the app works on any host
// that only runs `npm install` + `npm start` (e.g. AI Studio / Cloud Run buildpacks).
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

for (const [name, config] of [["story", "story/vite.config.ts"], ["web", "web/vite.config.ts"]]) {
  if (!existsSync(`${name}/dist/index.html`)) {
    console.log(`${name}/dist not found: building…`);
    execSync(`npx vite build --config ${config}`, { stdio: "inherit" });
  }
}
