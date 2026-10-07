import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const api = JSON.parse(
  fs.readFileSync(path.join(repo, "manifests/PUBLIC_API.json"), "utf8"),
);
const pkg = JSON.parse(
  fs.readFileSync(path.join(repo, "package.json"), "utf8"),
);
const archive = JSON.parse(
  fs.readFileSync(
    path.join(repo, "archives/maataa-ui-source-snapshots/manifest.json"),
    "utf8",
  ),
);
const consumers = [
  {
    id: "NEVO web",
    packageName: "@maataa/ui",
    root: "/Users/vesahe/Documents/Repos/nevo-event-os-3/apps/web",
  },
  {
    id: "MOM web",
    packageName: "@maataa/maataa-ui",
    root: "/Users/vesahe/revenue/live/mom/apps/web",
  },
  {
    id: "MOM Storybook",
    packageName: "@maataa/maataa-ui",
    root: "/Users/vesahe/revenue/live/mom/apps/storybook",
  },
  {
    id: "MOM 3D exhibition (migrated)",
    packageName: "@maataa/ui",
    root: "/Users/vesahe/revenue/live/mom/apps/exhibition-3d",
  },
  {
    id: "Hybrid Next consumer",
    packageName: "@maataa/ui",
    root: "/Users/vesahe/Documents/Repos/maataa-hybrid-runtime/src/apps/next",
  },
];
const ignoredDirectories = new Set([
  "node_modules",
  ".next",
  "dist",
  "storybook-static",
  "coverage",
  "public",
]);
const canonicalSymbols = new Map();
for (const item of api.exports) {
  const key =
    item.subpath === "." ? "@maataa/ui" : `@maataa/ui${item.subpath.slice(1)}`;
  if (!canonicalSymbols.has(key)) canonicalSymbols.set(key, new Set());
  canonicalSymbols.get(key).add(item.name);
}
const canonicalSubpaths = Object.keys(pkg.exports);
const archiveExports = new Map();

function exportedNames(file) {
  const source = fs.readFileSync(file, "utf8");
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
  );
  const names = new Set();
  for (const statement of sourceFile.statements) {
    const isExported = statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (
      isExported &&
      (ts.isFunctionDeclaration(statement) ||
        ts.isClassDeclaration(statement) ||
        ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement) ||
        ts.isEnumDeclaration(statement) ||
        ts.isVariableStatement(statement))
    ) {
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations)
          if (ts.isIdentifier(declaration.name))
            names.add(declaration.name.text);
      } else if (statement.name) names.add(statement.name.text);
    }
    if (
      ts.isExportDeclaration(statement) &&
      statement.exportClause &&
      ts.isNamedExports(statement.exportClause)
    ) {
      for (const element of statement.exportClause.elements)
        names.add(element.name.text);
    }
  }
  return names;
}

for (const source of archive.sources) {
  const root = path.join(repo, "archives/maataa-ui-source-snapshots", source.id);
  if (!fs.existsSync(root)) continue;
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (
        entry.isDirectory() &&
        (ignoredDirectories.has(entry.name) || entry.name === ".git")
      )
        continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(absolute);
      else if (/\.(?:tsx?|jsx?)$/.test(entry.name)) {
        for (const name of exportedNames(absolute)) {
          if (!archiveExports.has(name)) archiveExports.set(name, new Set());
          archiveExports.get(name).add(source.id);
        }
      }
    }
  };
  walk(root);
}

function collectFiles(root) {
  const files = [];
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(absolute);
      else if (/\.(?:tsx?|jsx?|mjs)$/.test(entry.name)) files.push(absolute);
    }
  };
  walk(root);
  return files;
}

function canonicalModule(moduleName, packageName) {
  if (packageName === "@maataa/maataa-ui")
    return moduleName.replace("@maataa/maataa-ui", "@maataa/ui");
  return moduleName;
}

function hasExport(moduleName) {
  const suffix = moduleName.slice("@maataa/ui".length);
  if (!suffix) return true;
  const key = `.${suffix}`;
  const exact = pkg.exports[key];
  if (exact) return targetSupportsSuffix(exact, "", moduleName);
  for (const candidate of canonicalSubpaths) {
    if (!candidate.includes("*")) continue;
    const [start, end] = candidate.split("*");
    if (!key.startsWith(start) || !key.endsWith(end)) continue;
    const capture = key.slice(
      start.length,
      key.length - end.length || undefined,
    );
    if (targetSupportsSuffix(pkg.exports[candidate], capture, moduleName))
      return true;
  }
  return false;
}

function targetSupportsSuffix(target, capture, moduleName) {
  const values =
    typeof target === "string" ? [target] : Object.values(target ?? {});
  return values.some((value) => {
    if (typeof value !== "string") return false;
    const resolved = value.replaceAll("*", capture);
    if (resolved.endsWith(".css")) return moduleNameExistsInPackage(resolved);
    if (moduleName.endsWith(".css")) return false;
    return fs.existsSync(path.join(repo, resolved.replace(/^\.\//, "")));
  });
}

function moduleNameExistsInPackage(target) {
  return fs.existsSync(path.join(repo, target.replace(/^\.\//, "")));
}

const results = [];
for (const consumer of consumers) {
  if (!fs.existsSync(consumer.root)) {
    results.push({ ...consumer, status: "not found" });
    continue;
  }
  const imports = new Map();
  for (const file of collectFiles(consumer.root)) {
    const source = fs.readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      true,
    );
    for (const statement of sourceFile.statements) {
      if (
        !ts.isImportDeclaration(statement) ||
        !ts.isStringLiteral(statement.moduleSpecifier)
      )
        continue;
      const originalModule = statement.moduleSpecifier.text;
      if (!(
        originalModule === consumer.packageName ||
        originalModule.startsWith(`${consumer.packageName}/`)
      ))
        continue;
      const moduleName = canonicalModule(originalModule, consumer.packageName);
      if (!imports.has(moduleName)) imports.set(moduleName, new Set());
      const bindings = statement.importClause?.namedBindings;
      if (bindings && ts.isNamedImports(bindings)) {
        for (const specifier of bindings.elements)
          imports
            .get(moduleName)
            .add(specifier.propertyName?.text ?? specifier.name.text);
      }
    }
  }
  const gaps = [];
  let totalSymbols = 0;
  for (const [moduleName, names] of imports) {
    totalSymbols += names.size;
    const available = canonicalSymbols.get(moduleName) ?? new Set();
    const missingSymbols = [...names]
      .filter((name) => !available.has(name))
      .sort();
    const archiveCandidates = Object.fromEntries(
      missingSymbols.flatMap((name) => {
        const sources = [...(archiveExports.get(name) ?? [])].sort();
        return sources.length ? [[name, sources]] : [];
      }),
    );
    const exported = hasExport(moduleName);
    if (!exported || missingSymbols.length)
      gaps.push({
        moduleName,
        importedSymbols: names.size,
        exportPresent: exported,
        missingSymbols,
        archiveCandidates,
      });
  }
  results.push({
    id: consumer.id,
    packageName: consumer.packageName,
    root: consumer.root,
    importedSymbols: totalSymbols,
    importedSubpaths: [...imports].map(([moduleName, names]) => ({
      moduleName,
      symbolCount: names.size,
    })),
    gaps,
  });
}

const report = {
  generatedAt: "2026-10-07",
  canonicalPackage: {
    name: pkg.name,
    version: pkg.version,
    source: "src/",
    apiManifest: "manifests/PUBLIC_API.json",
  },
  archiveManifest: "archives/maataa-ui-source-snapshots/manifest.json",
  archiveComparison:
    "Named imports missing from the canonical API are checked against exported declarations in the absorbed source snapshots; these are candidates only, not a recommendation to port branded/dependencyful behavior.",
  consumerScope:
    "Active application source and stories; generated builds, static public assets, and archived snapshots are excluded.",
  consumers: results,
};
const jsonPath = path.join(
  repo,
  "docs/knowledge-graph/maataa-ui-active-consumer-api-comparison-2026-10-07.json",
);
fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
const lines = [
  "# MAATAA UI export comparison against active consumers",
  "",
  `Canonical package: \`${pkg.name}@${pkg.version}\` (\`src/\`). The archived source inventory is indexed by [the absorption manifest](../../archives/maataa-ui-source-snapshots/manifest.json). This scan reads active consumer TS/JS imports and compares named imports and subpaths to the canonical public API manifest; generated output and static assets are excluded.`,
  "",
  "Migration and validation outcomes are tracked in [the consumer migration status matrix](MAATAA_UI_CONSUMER_MIGRATION_STATUS_2026-10-07.md).",
  "",
  "## Consumer findings",
  "",
];
for (const item of results) {
  if (item.status) {
    lines.push(`### ${item.id}`, "", `Status: ${item.status}.`, "");
    continue;
  }
  const missing = item.gaps.reduce(
    (sum, gap) => sum + gap.missingSymbols.length + (gap.exportPresent ? 0 : 1),
    0,
  );
  lines.push(
    `### ${item.id}`,
    "",
    `Scanned ${item.importedSymbols} distinct named imports across ${item.importedSubpaths.length} package subpaths. ${missing ? `The canonical package has ${missing} unresolved import/API gaps.` : "All scanned imports resolve through the canonical API."}`,
    "",
  );
  for (const gap of item.gaps) {
    lines.push(
      `- \`${gap.moduleName}\`: ${gap.exportPresent ? "subpath exists" : "subpath missing"}${gap.missingSymbols.length ? `; missing names: ${gap.missingSymbols.join(", ")}` : ""}.`,
    );
    for (const [name, sources] of Object.entries(gap.archiveCandidates)) {
      lines.push(
        `  - \`${name}\` exists in absorbed snapshot(s): ${sources.map((source) => `\`${source}\``).join(", ")}; inspect before porting.`,
      );
    }
  }
  if (item.gaps.length) lines.push("");
}
lines.push(
  "## Port and migration decisions",
  "",
  "- MOM 3D Exhibition has moved its `Button` and `Card` imports and global package stylesheet to the canonical package through a local `file:` bridge. Its typecheck, 28 unit tests, production build, and Playwright checks for public routes, theme, and sign-in interaction passed. This bridge is machine-local and is not a distributable release dependency.",
  "- NEVO, MOM web, and MOM Storybook remain on their adapters: the scan shows their unresolved branded/runtime APIs and style entry points. Hybrid Next remains on its consumer copy until a separate adapter and portable distribution path are prepared.",
  "- No external package copy was retired. The MOM package still serves web, Storybook, and other workspaces; the NEVO adapter remains required by its active app. Retirement requires consumer-by-consumer migration plus a verified recovery snapshot.",
  "- Promote neutral, dependency-light capabilities into the canonical package only when active consumers need them. Existing `ButtonGroup`, FAB, LinkButton, Portal, outside-click, media-query, storage, resize/intersection observer, clipboard, pagination, online-status, auto-hide, and scroll-back-to-top implementations already exist in the canonical source; the archived hybrid hook files were empty stubs.",
  "- The neutral additions from this comparison are `Form`, `Fieldset`, and `FieldsetLegend` in the canonical forms surface, plus the dependency-free confirmation action. The plain `Legend` root name remains the existing chart legend; consumer adapters must use `FieldsetLegend` for native form semantics.",
  "- Keep NEVO branded components and wizard behavior behind `@maataa/ui/nevo` and `@maataa/ui/wizard`, with their styles and optional peer dependencies explicit.",
  "- Keep MOM runtime/HUD/theme surfaces in a MOM adapter package that consumes the canonical primitives; they depend on MOM-owned theme/runtime packages and are not neutral UI exports.",
  "- Treat local path linking as a development bridge only. Do not claim a portable consumer migration until the canonical package has an installable, versioned distribution and the consumer builds pass against it.",
  "",
);
fs.writeFileSync(
  path.join(
    repo,
    "docs/knowledge-graph/MAATAA_UI_API_CONSUMER_COMPARISON_2026-10-07.md",
  ),
  `${lines.join("\n").trimEnd()}\n`,
);
console.log(
  `Wrote API comparison for ${results.filter((item) => !item.status).length} active consumers: ${jsonPath}`,
);
