import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "layouts/universal": "src/layouts/universal.tsx",
    "primitives/index": "src/primitives/index.ts",
    "runtime-observatory/index": "runtime-observatory/index.ts",
    "topology/index": "src/topology/index.ts",
    "themes/index": "themes/index.ts",
    "theme/index": "src/theme/index.ts",
    "app-shell/index": "src/app-shell/index.ts",
    "hud/index": "src/hud/index.ts",
    "ui-system/index": "ui-system/index.ts"
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  external: [
    "react",
    "react-dom",
    "framer-motion",
    "lucide-react",
    "@maataa/theme",
    "@maataa/themelab",
    "@maataa/navigation",
    "@maataa/content-engine",
    "@maataa/time-runtime",
    "@maataa/runtime-search",
    "@maataa/runtime-intelligence",
    "node:fs",
    "node:path"
  ]
});
