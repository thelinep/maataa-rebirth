import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const appRoot = fileURLToPath(new URL(".", import.meta.url));
const srcRoot = fileURLToPath(new URL("../../src", import.meta.url));

export default defineConfig({
  root: appRoot,
  base: "./",
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@maataa\/ui\/styles\.css$/,
        replacement: `${srcRoot}/styles.css`,
      },
      { find: /^@maataa\/ui$/, replacement: `${srcRoot}/index.ts` },
      { find: /^@maataa\/ui\/(.+)$/, replacement: `${srcRoot}/$1` },
    ],
  },
  // Brahmini local runtime (pnpm brahmini:runtime) for Idea → Script drafts.
  server: { host: "127.0.0.1", port: 4196, strictPort: true, proxy: { "/api/brahmini": "http://127.0.0.1:4175" } },
  preview: { host: "127.0.0.1", port: 4196, strictPort: true, proxy: { "/api/brahmini": "http://127.0.0.1:4175" } },
  build: { outDir: "dist", emptyOutDir: true },
});
