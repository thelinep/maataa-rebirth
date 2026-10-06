import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { bundleTopology } from "../../scripts/bundle-topology.mjs";
import { fileURLToPath, URL } from "node:url";

const demoRoot = fileURLToPath(new URL(".", import.meta.url));
const srcRoot = fileURLToPath(new URL("../../src", import.meta.url));

function maataaManualChunks(id) {
  const normalized = id.replaceAll("\\", "/");

  if (normalized.includes("/node_modules/react/") || normalized.includes("/node_modules/react-dom/")) return "vendor-react";
  if (normalized.includes("/node_modules/@reduxjs/") || normalized.includes("/node_modules/react-redux/")) return "vendor-state";

  // Only split large, leaf-oriented canonical catalogs. Do not manually split
  // redux/static-data/demo/generic-governance modules: those modules are
  // interconnected, and forcing them into separate chunks creates Rollup
  // circular chunks that can fail before React mounts in production preview.
  if (normalized.endsWith("/src/registries/componentRegistry.ts") || normalized.endsWith("/src/registries/atomicComponentRegistry.ts")) return "maataa-component-registry";
  if (normalized.endsWith("/src/registries/pageRegistry.ts")) return "maataa-page-registry";
  if (normalized.endsWith("/src/registries/workspaceRegistry.ts")) return "maataa-workspace-registry";
  if (normalized.endsWith("/src/registries/layoutRegistry.ts")) return "maataa-layout-registry";
  if (normalized.endsWith("/src/registries/deviceRegistry.ts")) return "maataa-device-registry";
  if (normalized.endsWith("/src/registries/generatorRegistry.ts")) return "maataa-generator-registry";
  if (normalized.endsWith("/src/registries/toolRegistry.ts")) return "maataa-tool-registry";
  if (normalized.endsWith("/src/registries/aiSpaceRegistry.ts")) return "maataa-ai-space-registry";

  if (normalized.includes("/src/composer/")) return "maataa-composer";
  if (normalized.includes("/src/runtime/")) return "maataa-runtime";
  if (normalized.includes("/src/tools/") || normalized.includes("/src/tool-")) return "maataa-tools";
  if (normalized.includes("/src/generators/") || normalized.includes("/src/generator-")) return "maataa-generators";
  if (normalized.includes("/src/ai-spaces/") || normalized.includes("/src/ai-space-")) return "maataa-ai-spaces";
  if (normalized.includes("/src/devices/") || normalized.includes("/src/device-")) return "maataa-devices";
  if (normalized.includes("/src/layouts/") || normalized.includes("/src/layout-")) return "maataa-layouts";
  if (normalized.includes("/src/pages/") || normalized.includes("/src/page-")) return "maataa-pages";
  if (normalized.includes("/src/workspaces/") || normalized.includes("/src/workspace-")) return "maataa-workspaces";
}

export default defineConfig({
  root: demoRoot,
  plugins: [react(),bundleTopology()],
  resolve: {
    alias: [
      { find: /^@maataa\/ui$/, replacement: `${srcRoot}/index.ts` },
      { find: /^@maataa\/ui\/(.+)$/, replacement: `${srcRoot}/$1` },
    ],
  },
  server: { host: "127.0.0.1", port: 4173, strictPort: true, proxy: { "/api/brahmini": "http://127.0.0.1:4175" } },
  preview: { host: "127.0.0.1", port: 4173, strictPort: true, proxy: { "/api/brahmini": "http://127.0.0.1:4175" } },
  build: {
    outDir: fileURLToPath(new URL("../../demo-dist", import.meta.url)),
    emptyOutDir: true,
    chunkSizeWarningLimit: 900,
    rollupOptions: { output: { manualChunks: maataaManualChunks } },
  },
});
