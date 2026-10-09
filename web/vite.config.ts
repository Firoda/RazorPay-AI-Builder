import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "web",
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
