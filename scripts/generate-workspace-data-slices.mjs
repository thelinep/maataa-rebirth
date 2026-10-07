import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.join(root, "src/registries/workspaceRegistry.ts");
const slicesPath = path.join(root, "examples/redux-demo/workspaceDataSlices.ts");
const outputPath = path.join(root, "examples/redux-demo/data/workspace-data-slices.json");

function transpile(source, fileName) {
  return ts.transpileModule(source, {
    fileName,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
}

function toDataUrl(source) {
  return `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
}

const registryUrl = toDataUrl(transpile(fs.readFileSync(registryPath, "utf8"), registryPath));
const registryModule = await import(registryUrl);
const sliceSource = fs
  .readFileSync(slicesPath, "utf8")
  .replace(
    'from "../../src/registries/workspaceRegistry"',
    `from "${registryUrl}"`,
  );
const sliceModule = await import(toDataUrl(transpile(sliceSource, slicesPath)));
const { WORKSPACE_TYPES } = registryModule;
const { createWorkspaceDataSlice, WORKSPACE_DOMAIN_BY_GROUP } = sliceModule;

const countByGroup = {};
const countByDomain = {};
const workspaces = WORKSPACE_TYPES.map((workspace) => {
  countByGroup[workspace.groupKey] = (countByGroup[workspace.groupKey] ?? 0) + 1;
  const slice = createWorkspaceDataSlice(workspace);
  countByDomain[slice.domain] = (countByDomain[slice.domain] ?? 0) + 1;
  return { workspace, slice };
});

const document = {
  schemaVersion: "maataa.workspace-data-slices.v1",
  source: {
    registry: "src/registries/workspaceRegistry.ts",
    sliceFactory: "examples/redux-demo/workspaceDataSlices.ts",
    provenance: "Synthetic fixture",
    total: workspaces.length,
  },
  summary: {
    countByGroup: Object.fromEntries(Object.entries(countByGroup).sort(([a], [b]) => a.localeCompare(b))),
    countByDomain: Object.fromEntries(Object.entries(countByDomain).sort(([a], [b]) => a.localeCompare(b))),
  },
  workspaces,
};

if (Object.keys(WORKSPACE_DOMAIN_BY_GROUP).some((groupKey) => !countByGroup[groupKey])) {
  throw new Error("A configured workspace domain has no canonical registry records.");
}

const serialized = `${JSON.stringify(document, null, 2)}\n`;
if (process.argv.includes("--check")) {
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, "utf8") !== serialized) {
    throw new Error("Workspace data slice JSON is stale. Run pnpm workspace:slices to regenerate it.");
  }
  console.log(`Workspace data slices current: ${workspaces.length} records`);
} else {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, serialized);
  console.log(`Generated ${workspaces.length} workspace slices at ${path.relative(root, outputPath)}`);
}
