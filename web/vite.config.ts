import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Portal 2: the guided product, served at /app/
export default defineConfig({
  root: "web",
  base: "/app/",
  plugins: [react()],
  build: { outDir: "dist", emptyOutDir: true },
  server: {
    port: 5173,
    hmr: false,
    proxy: {
      "/api": "http://localhost:3000",
      "/pay-test": "http://localhost:3000",
      "/webhooks": "http://localhost:3000",
    },
  },
});
