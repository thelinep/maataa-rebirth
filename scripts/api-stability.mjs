// Freezes the STABLE public API listed in manifests/STABLE_API.json.
//   node scripts/api-stability.mjs          refresh recorded signatures (after a recorded decision)
//   node scripts/api-stability.mjs --check  fail if a stable export is missing, deprecated or changed
// A signature is the TypeScript type of a value export, or the printed declaration of a type
// export (comments removed). Any change, including a compatible addition, needs review.
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const file = path.join(root, "manifests/STABLE_API.json");
const stable = JSON.parse(fs.readFileSync(file, "utf8"));
const api = JSON.parse(fs.readFileSync(path.join(root, "manifests/PUBLIC_API.json"), "utf8"));
const config = ts.readConfigFile(path.join(root, "tsconfig.json"), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const program = ts.createProgram(parsed.fileNames, { ...parsed.options, noEmit: true });
const checker = program.getTypeChecker();
const printer = ts.createPrinter({ removeComments: true, newLine: ts.NewLineKind.LineFeed });
const flags = ts.TypeFormatFlags.NoTruncation;
// Signatures must not depend on where the repository is checked out.
const rootPattern = new RegExp(root.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "/", "g");
const normalize = (text) => text.replace(rootPattern, "").replace(/\s+/g, " ").trim();

function signature(subpath, name) {
  const entry = api.entryPoints.find((e) => e.subpath === subpath && e.source);
  if (!entry) return { error: `entry point ${subpath} not found` };
  const sourceFile = program.getSourceFile(path.join(root, entry.source));
  const moduleSymbol = sourceFile && checker.getSymbolAtLocation(sourceFile);
  const symbol = moduleSymbol && checker.getExportsOfModule(moduleSymbol).find((s) => s.name === name);
  if (!symbol) return { error: `${name} is not exported from ${subpath}` };
  const resolved = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  if (resolved.getJsDocTags().some((tag) => tag.name === "deprecated")) return { error: `${subpath} ${name} is deprecated` };
  const declaration = resolved.getDeclarations()?.[0];
  if (!declaration) return { error: `${name} has no declaration` };
  if (resolved.flags & ts.SymbolFlags.Value) {
    return { value: normalize(checker.typeToString(checker.getTypeOfSymbolAtLocation(resolved, declaration), undefined, flags)) };
  }
  return { value: normalize(printer.printNode(ts.EmitHint.Unspecified, declaration, declaration.getSourceFile())) };
}

const errors = [];
const current = {};
for (const { subpath, name } of stable.exports) {
  const key = `${subpath} ${name}`;
  const result = signature(subpath, name);
  if (result.error) errors.push(result.error);
  else current[key] = result.value;
}
if (errors.length) throw new Error(`Stable API broken:\n- ${errors.join("\n- ")}`);

if (process.argv.includes("--check")) {
  const changed = Object.keys(current).filter((key) => stable.signatures[key] !== current[key]);
  const removed = Object.keys(stable.signatures).filter((key) => !(key in current));
  if (changed.length || removed.length) {
    throw new Error(`Stable API changed without a recorded decision:\n${[...changed.map((k) => `- changed: ${k}`), ...removed.map((k) => `- removed: ${k}`)].join("\n")}\nRecord an owner decision, then run node scripts/api-stability.mjs to refresh signatures.`);
  }
} else {
  stable.signatures = current;
  fs.writeFileSync(file, JSON.stringify(stable, null, 2) + "\n");
}
console.log(`${Object.keys(current).length} stable exports verified`);
