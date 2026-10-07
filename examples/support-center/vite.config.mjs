import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const appRoot = fileURLToPath(new URL(".", import.meta.url));
const srcRoot = fileURLToPath(new URL("../../src", import.meta.url));

export default defineConfig({
  root: appRoot,
  // Relative asset URLs allow the same production build to run from Electron's file:// origin.
  base: "./",
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@maataa\/ui$/, replacement: `${srcRoot}/index.ts` },
      { find: /^@maataa\/ui\/(.+)$/, replacement: `${srcRoot}/$1` },
    ],
  },
  server: { host: "127.0.0.1", port: 4178, strictPort: true },
  preview: { host: "127.0.0.1", port: 4178, strictPort: true },
  build: { outDir: fileURLToPath(new URL("../../support-center-dist", import.meta.url)), emptyOutDir: true },
});
