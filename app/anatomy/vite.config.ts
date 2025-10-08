/**
 * Copyright (c) Seattle Figure Studio
 * Author: Seattle Figure Studio
 */
import { resolve as resolvePath, sep } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const toPosixPath = (value: string) => value.split(sep).join("/");

const projectRoot = fileURLToPath(new URL("./", import.meta.url));
const flashofferSource = fileURLToPath(
  new URL("../../press/app/flashoffer-react/src/index.ts", import.meta.url),
);
const nodeModulesDir = resolvePath(projectRoot, "node_modules");
const materialBase = toPosixPath(resolvePath(nodeModulesDir, "@mui/material"));
const muiUtilsBase = toPosixPath(resolvePath(nodeModulesDir, "@mui/utils"));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "flashoffer-react",
        replacement: flashofferSource,
      },
      {
        find: /^@mui\/material$/i,
        replacement: `${materialBase}/index.js`,
      },
      {
        find: /^@mui\/material\/(.*)$/i,
        replacement: `${materialBase}/$1`,
      },
      {
        find: /^@mui\/utils$/i,
        replacement: `${muiUtilsBase}/index.js`,
      },
      {
        find: /^@mui\/utils\/(.*)$/i,
        replacement: `${muiUtilsBase}/$1`,
      },
    ],
  },
  build: {
    outDir: "build/landing",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/chunk-[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    css: true,
  },
});
