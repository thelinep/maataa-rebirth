import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const src = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [react()],
  // Unit tests import "@maataa/ui/..." (e.g. the Next fixture) from source, not from a
  // previously built dist/. The packed tarball is certified separately by package:consumer.
  resolve: {
    alias: [
      { find: /^@maataa\/ui$/, replacement: `${src}/index.ts` },
      { find: /^@maataa\/ui\/(.+)$/, replacement: `${src}/$1` },
    ],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    exclude: ["tests/e2e/**"],
  },
});
