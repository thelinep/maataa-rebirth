import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const outputPath = path.join(root, "examples/support-center/ProductPackages.ts");

const representedRoots = new Set([
  "atomic", "components", "layout-atoms", "layouts", "page-atoms", "pages",
  "workspace-atoms", "workspaces", "registries", "registry-atoms", "generator-atoms",
  "generators", "tool-atoms", "tools", "ai-space-atoms", "ai-spaces", "device-atoms",
  "devices", "types", "redux", "static-data", "demo", "identity", "icons", "themes", "hooks",
]);

const descriptions = {
  foundation: ["Foundation", "Color, spacing, shape, elevation, and other base design tokens used across the UI."],
  typography: ["Typography", "Semantic heading, body, label, caption, and code text primitives and type roles."],
  actions: ["Actions", "Buttons and other user-triggered controls, with variants for primary, secondary, and quiet actions."],
  forms: ["Forms", "Inputs, selection, validation, and form composition primitives for user-provided data."],
  navigation: ["Navigation", "Navigation bars, breadcrumbs, tabs, menus, and related wayfinding components."],
  surfaces: ["Surfaces", "Cards, dialogs, drawers, panels, and other containers for structured content."],
  feedback: ["Feedback", "Badges, alerts, progress, empty states, loading states, and status communication."],
  data: ["Data display", "Tables, lists, metrics, and data presentation components."],
  visualization: ["Visualization", "Charts and visual presentation primitives for data-driven interfaces."],
  maps: ["Maps", "Map views, markers, controls, and spatial presentation building blocks."],
  mobile: ["Mobile", "Mobile-oriented navigation, safe-area, and touch-friendly interface components."],
  "page-groups": ["Page groups", "Canonical groupings that organize page-purpose records into navigable families."],
  "workspace-groups": ["Workspace groups", "Canonical families for classifying and discovering workspace types."],
  "layout-groups": ["Layout groups", "Canonical families for classifying reusable layout structures."],
  "generator-groups": ["Generator groups", "Canonical families for grouping artifact-generation surfaces."],
  "tool-groups": ["Tool groups", "Canonical families for grouping host-provided tool surfaces."],
  "ai-space-groups": ["AI-space groups", "Canonical families for grouping AI-oriented workspace surfaces."],
  "device-groups": ["Device groups", "Canonical families for organizing device and viewport definitions."],
  "registry-ui": ["Registry UI", "Reusable interfaces for registry browsing, search, groups, details, and state."],
  composer: ["Composer", "Composition contracts and helpers for assembling supported UI surfaces."],
  runtime: ["Runtime", "Host-neutral runtime types and integration boundaries; execution authority belongs to the host."],
};

const groups = {
  foundation: "Core interface", typography: "Core interface", actions: "Core interface", forms: "Core interface",
  navigation: "Core interface", surfaces: "Core interface", feedback: "Core interface", data: "Core interface",
  visualization: "Specialized surfaces", maps: "Specialized surfaces", mobile: "Specialized surfaces",
  "page-groups": "Composition and taxonomy", "workspace-groups": "Composition and taxonomy",
  "layout-groups": "Composition and taxonomy", "generator-groups": "Composition and taxonomy",
  "tool-groups": "Composition and taxonomy", "ai-space-groups": "Composition and taxonomy",
  "device-groups": "Composition and taxonomy", "registry-ui": "Platform and composition",
  composer: "Platform and composition", runtime: "Platform and composition",
};

async function sourceFiles(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(entries.map(entry => entry.isDirectory()
      ? sourceFiles(path.join(directory, entry.name))
      : /\.tsx?$/.test(entry.name) && !/\.(test|spec)\.tsx?$/.test(entry.name)
        ? [path.join(directory, entry.name)]
        : []));
    return nested.flat().sort();
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

function publicModulePath(rootName, file) {
  const relative = path.relative(path.join(root, "src", rootName), file).replace(/\\/g, "/").replace(/\.tsx?$/, "");
  return relative === "index" ? `@maataa/ui/${rootName}` : `@maataa/ui/${rootName}/${relative.replace(/\/index$/, "")}`;
}

const exportedRoots = [...new Set(Object.keys(packageJson.exports)
  .filter(key => key.startsWith("./") && key !== "./styles.css")
  .map(key => key.slice(2).split("/")[0]))].sort();
const omittedRoots = exportedRoots.filter(name => !representedRoots.has(name));
const areas = [];

for (const name of omittedRoots) {
  const [title, description] = descriptions[name] ?? [name, "A public MAATAA UI package area."];
  const files = await sourceFiles(path.join(root, "src", name));
  areas.push({
    id: name,
    title,
    group: groups[name] ?? "Package areas",
    packagePath: name,
    importPath: `@maataa/ui/${name}`,
    description,
    modules: files.map(file => ({ name: path.relative(path.join(root, "src", name), file).replace(/\\/g, "/"), importPath: publicModulePath(name, file) })),
  });
}

const middlewareFiles = await sourceFiles(path.join(root, "src", "redux", "middleware"));
const middlewareImportPath = file => {
  const relative = path.relative(path.join(root, "src", "redux", "middleware"), file)
    .replace(/\\/g, "/")
    .replace(/\.tsx?$/, "")
    .replace(/(?:^|\/)index$/, "");
  return relative ? `@maataa/ui/redux/middleware/${relative}` : "@maataa/ui/redux/middleware";
};
areas.push({
  id: "redux-middleware",
  title: "Redux middleware",
  group: "State and behavior",
  packagePath: "redux/middleware",
  importPath: "@maataa/ui/redux/middleware",
  description: "Optional middleware and listener integrations for host-owned Redux stores. This is state integration support, not persistence or server authority.",
  modules: middlewareFiles.map(file => ({
    name: path.relative(path.join(root, "src", "redux", "middleware"), file).replace(/\\/g, "/"),
    importPath: middlewareImportPath(file),
  })),
});

const source = `// Generated by scripts/generate-support-center-package-index.mjs. Do not edit by hand.\nexport const ADDITIONAL_PACKAGES = ${JSON.stringify(areas, null, 2)} as const;\n`;
await writeFile(outputPath, source);
console.log(`Generated ${areas.length} additional package detail records from ${exportedRoots.length} public export roots.`);
