import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    config.build ??= {};
    config.build.chunkSizeWarningLimit = 1000;
    config.build.rollupOptions ??= {};
    const output = config.build.rollupOptions.output;
    const baseOutput = Array.isArray(output) ? output[0] ?? {} : output ?? {};
    config.build.rollupOptions.output = {
      ...baseOutput,
      manualChunks(id) {
        const normalized = id.replaceAll("\\", "/");
        if (normalized.includes("/node_modules/react/") || normalized.includes("/node_modules/react-dom/")) return "vendor-react";
        if (normalized.includes("/node_modules/axe-core/")) return "vendor-a11y";
        if (normalized.includes("/src/registries/") || normalized.includes("/src/registry-")) return "maataa-registries";
        if (normalized.includes("/src/static-data/") || normalized.includes("/src/demo/")) return "maataa-demo-data";
      },
    };
    return config;
  },
};
export default config;
