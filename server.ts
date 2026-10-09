import { existsSync } from "node:fs";
import { join } from "node:path";
import express from "express";
import { createApp } from "./server/app";
import { buildContainer } from "./server/container";

try {
  process.loadEnvFile(".env");
} catch {
  // no .env file: rely on the real environment (e.g. Cloud Run env vars)
}

const container = buildContainer();
const port = 3000;
const app = createApp(container);
const webDist = join(process.cwd(), "web", "dist");

if (process.env.NODE_ENV !== "production") {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    configFile: "web/vite.config.ts",
    server: { middlewareMode: true, host: "0.0.0.0", hmr: false },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else if (existsSync(webDist)) {
  app.use(express.static(webDist));
  app.get("*", (req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api") && !req.path.startsWith("/webhooks") && !req.path.startsWith("/pay-test")) {
      return res.sendFile(join(webDist, "index.html"));
    }
    next();
  });
}

app.listen(port, "0.0.0.0", () => {
  const { aiMode, model, razorpayTest } = container.config;
  console.log(`SeatSaver backend on http://0.0.0.0:${port} (AI: ${aiMode}/${model}, Razorpay test API: ${razorpayTest ? "on" : "simulated"})`);
});

export { app };
