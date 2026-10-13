// Flat ESLint config for @maataa/ui.
//
// Type-checked rules need TypeScript type information. `./tsconfig.json` (the
// package build project) only includes `src/`, so the type-checked preset is
// applied to `src/**` with that project. Everything else (tests, apps,
// examples, scripts, stories, tool configs) has no project in that tsconfig and
// is linted with the same presets minus the rules that need type information
// (`tseslint.configs.disableTypeChecked`).
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

const TS_FILES = ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"];
const TYPED_FILES = ["src/**/*.ts", "src/**/*.tsx"];

export default tseslint.config(
  {
    ignores: [
      "dist/",
      ".certification/",
      "stories/generated/",
      "archives/",
      "artifacts/",
      "beta/",
      "demo-dist/",
      "storybook-static/",
      "examples/*/dist/",
      // Build outputs that .gitignore already excludes (flat config does not read .gitignore).
      "**/dist/",
      "**/target/",
      "**/.next/",
      "**/.open-next/",
      "**/.wrangler/",
      "**/node_modules/",
      "*-dist/",
      "apps/maataa-desktop-tauri/web/products/",
      "playwright-report/",
      "test-results/",
      "coverage/",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  reactHooks.configs["recommended-latest"],
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    settings: {
      "import/resolver": {
        node: { extensions: [".js", ".mjs", ".cjs", ".jsx", ".ts", ".tsx", ".mts", ".cts"] },
      },
    },
  },

  {
    rules: {
      "import/no-unresolved": [
        "error",
        {
          ignore: [
            // The package imports itself by name; Vite, Vitest and the app tsconfigs alias "@maataa/ui/*" to src/.
            "^@maataa/ui(/|$)",
            // Exports-map-only packages (no "main"); eslint-plugin-import's node resolver cannot read "exports".
            "^typescript-eslint$",
            "^vitest/config$",
          ],
        },
      ],
      // These @maataa/ui form components each render exactly one native <input>/<select>/<textarea>,
      // so `<label>Text <Input /></label>` is a valid nested association.
      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          controlComponents: [
            "Input", "Textarea", "Select", "NativeSelect", "SearchInput", "NumberInput",
            "DatePicker", "TimePicker", "ColorPicker", "Slider",
          ],
          depth: 3,
        },
      ],
      // `_`-prefixed names and rest-sibling omission (`const { a, ...rest } = x`) are this codebase's
      // deliberate "unused by design" idioms; everything else unused is still an error.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
    },
  },

  // Separately installed apps: their dependencies (next, h5wasm, @opennextjs/cloudflare) and the observatory's
  // "@/" alias live in their own package installs, not the root one; their own builds/typechecks cover resolution.
  {
    files: ["apps/hemant-observatory/**", "fixtures/consumer-next/**"],
    rules: { "import/no-unresolved": "off" },
  },

  // CommonJS files (e.g. the Electron preload script) must use require().
  {
    files: ["**/*.cjs"],
    languageOptions: { sourceType: "commonjs" },
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },

  // Type-aware linting for the package source, against the package tsconfig.
  {
    files: TYPED_FILES,
    languageOptions: {
      parserOptions: { project: "./tsconfig.json", tsconfigRootDir: import.meta.dirname },
    },
  },

  // Files outside ./tsconfig.json: same presets without type information (see header).
  {
    files: ["**/*.{js,mjs,cjs,jsx}", ...TS_FILES],
    ignores: TYPED_FILES,
    ...tseslint.configs.disableTypeChecked,
  },
);
