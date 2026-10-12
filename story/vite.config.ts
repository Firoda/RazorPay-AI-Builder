import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Portal 1: the scroll story, served at /
export default defineConfig({
  root: "story",
  base: "/",
  plugins: [react()],
  build: { outDir: "dist", emptyOutDir: true },
  server: { port: 5174, hmr: false, proxy: { "/api": "http://localhost:3000", "/app": "http://localhost:3000" } },
});
