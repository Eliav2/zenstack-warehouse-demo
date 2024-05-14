import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  optimizeDeps: {
    // include: [
    //   "zod-models",
    //   "prisma-models",
    // ],
    // force: true,
  },
  resolve: {
    alias: {
      "zod-models": path.resolve(
        __dirname,
        "../backend/node_modules/.zenstack/zod/models",
      ),
      "prisma-models": path.resolve(
        __dirname,
        "../backend/node_modules/@prisma/client",
      ),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
