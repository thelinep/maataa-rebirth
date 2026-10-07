import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readCatalog } from "./read-canonical-catalog.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const exists = async (relativePath) => {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
};
const packageJson = await readJson("package.json");
const publicApi = await readJson("manifests/PUBLIC_API.json");
const records = readCatalog(
  path.join(root, "src/registries/componentRegistry.ts"),
  "COMPONENT_REGISTRY",
);
const atomicRecords = readCatalog(
  path.join(root, "src/registries/atomicComponentRegistry.ts"),
  "ATOMIC_COMPONENT_REGISTRY",
);
const entryPoints = new Set(
  publicApi.entryPoints.map(({ subpath }) => subpath),
);
const publicExports = new Map(
  publicApi.exports.map((entry) => [
    `${entry.subpath}#${entry.name}`,
    entry.kind,
  ]),
);

function packageExportMatches(subpath) {
  return Object.keys(packageJson.exports).some((key) => {
    if (!key.includes("*")) return key === subpath;
    const [prefix, suffix] = key.split("*");
    return subpath.startsWith(prefix) && subpath.endsWith(suffix);
  });
}

const failures = [];
const namespaces = new Map();
const kinds = new Map();
for (const record of records) {
  const subpath = `.${record.importPath.replace(packageJson.name, "")}`;
  const relativeSource = `src${subpath.slice(1)}`;
  let sourcePath;
  for (const extension of [".tsx", ".ts"]) {
    const candidate = `${relativeSource}${extension}`;
    if (await exists(candidate)) {
      sourcePath = candidate;
      break;
    }
  }
  const sourceExists = sourcePath ? await exists(sourcePath) : false;
  const declaredSubpath = entryPoints.has(subpath);
  const exportKind = publicExports.get(`${subpath}#${record.name}`);
  const hasNamedExport = exportKind !== undefined;
  const kindMatches =
    exportKind === undefined ||
    (exportKind === "type" ? record.kind === "type" : record.kind !== "type");
  const namespace = subpath.split("/")[1] ?? ".";
  namespaces.set(namespace, (namespaces.get(namespace) ?? 0) + 1);
  kinds.set(
    exportKind ?? "missing",
    (kinds.get(exportKind ?? "missing") ?? 0) + 1,
  );

  if (
    !sourceExists ||
    !declaredSubpath ||
    !packageExportMatches(subpath) ||
    !hasNamedExport ||
    !kindMatches
  ) {
    failures.push({
      id: record.id,
      name: record.name,
      subpath,
      sourceExists,
      declaredSubpath,
      packageExportMatches: packageExportMatches(subpath),
      exportKind: exportKind ?? "missing",
      registryKind: record.kind,
      kindMatches,
    });
  }
}

const atomicFailures = atomicRecords.filter((record) => {
  const subpath = `.${record.importPath.replace(packageJson.name, "")}`;
  return (
    publicExports.get(`${subpath}#${record.name}`) !== "runtime" ||
    record.kind !== "atom"
  );
});

const result = {
  package: packageJson.name,
  version: packageJson.version,
  registryRecords: records.length,
  runtimeExports: kinds.get("runtime") ?? 0,
  typeOnlyExports: kinds.get("type") ?? 0,
  atomicRuntimeRecords: atomicRecords.length,
  namespaces: Object.fromEntries(
    [...namespaces].sort(([a], [b]) => a.localeCompare(b)),
  ),
  coverageFailures: failures.length,
  atomicClassificationFailures: atomicFailures.length,
};

if (failures.length || atomicFailures.length) {
  console.error(
    JSON.stringify({ ...result, failures, atomicFailures }, null, 2),
  );
  process.exitCode = 1;
} else {
  console.log(JSON.stringify(result, null, 2));
}
