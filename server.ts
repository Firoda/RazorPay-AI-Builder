import { existsSync } from "node:fs";
import { join } from "node:path";
import express, { type NextFunction, type Request, type Response } from "express";
import { createApp } from "./server/app";
import { buildContainer } from "./server/container";

try {
  process.loadEnvFile(".env");
} catch {
  // no .env file: rely on the real environment (e.g. Cloud Run env vars)
}

const container = buildContainer();
// AI Studio expects 3000; Cloud Run and other hosts inject PORT.
const port = Number(process.env.PORT || 3000);
const app = createApp(container);

// Two front ends, one server:
//   /      → Portal 1, the story          (story/, built to story/dist)
//   /app/  → Portal 2, the guided product (web/,   built to web/dist, Vite base "/app/")
const storyDist = join(process.cwd(), "story", "dist");
const webDist = join(process.cwd(), "web", "dist");
const isBackendPath = (p: string) => p.startsWith("/api") || p.startsWith("/webhooks") || p.startsWith("/pay-test");

// "/app" → "/app/" (Express also matches "/app/" on a "/app" route, so check the raw URL).
app.use((req: Request, res: Response, next: NextFunction) =>
  req.originalUrl === "/app" || req.originalUrl.startsWith("/app?") ? res.redirect(301, req.originalUrl.replace("/app", "/app/")) : next(),
);

if (process.env.NODE_ENV !== "production") {
  const { createServer: createViteServer } = await import("vite");
  const viteOpts = (configFile: string) => ({
    configFile,
    server: { middlewareMode: true, host: "0.0.0.0", hmr: false, ws: false as const },
    appType: "spa" as const,
  });
  const webVite = await createViteServer(viteOpts("web/vite.config.ts"));
  const storyVite = await createViteServer(viteOpts("story/vite.config.ts"));
  app.use((req: Request, res: Response, next: NextFunction) =>
    req.path.startsWith("/app/") ? webVite.middlewares(req, res, next) : next(),
  );
  app.use((req: Request, res: Response, next: NextFunction) =>
    isBackendPath(req.path) ? next() : storyVite.middlewares(req, res, next),
  );
} else {
  if (existsSync(webDist)) {
    app.use("/app", express.static(webDist));
    app.use("/app", (req: Request, res: Response, next: NextFunction) =>
      req.method === "GET" ? res.sendFile(join(webDist, "index.html")) : next(),
    );
  }
  if (existsSync(storyDist)) {
    app.use(express.static(storyDist));
    // SPA fallback. (Express 5 rejects the bare "*" route pattern, so this is plain middleware.)
    app.use((req: Request, res: Response, next: NextFunction) =>
      req.method === "GET" && !isBackendPath(req.path) ? res.sendFile(join(storyDist, "index.html")) : next(),
    );
  }
}

app.listen(port, "0.0.0.0", () => {
  const { aiMode, model, razorpayTest } = container.config;
  console.log(`SeatSaver on http://0.0.0.0:${port}  story: /  product: /app/  (AI: ${aiMode}/${model}, Razorpay test API: ${razorpayTest ? "on" : "simulated"})`);
});

export { app };
