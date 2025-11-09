import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const dataDir = path.resolve(projectRoot, "../data");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@data": dataDir,
    },
  },
  server: {
    fs: {
      allow: [dataDir],
    },
  },
});
