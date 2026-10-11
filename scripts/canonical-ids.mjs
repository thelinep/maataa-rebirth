// Canonical ID stability (gate 7, option C, decided 2026-10-12).
//   node scripts/canonical-ids.mjs          add newly introduced IDs to the baseline
//   node scripts/canonical-ids.mjs --check  fail if a baseline ID disappeared without a migration,
//                                          or a retired ID was reused
// Rules: IDs are never reused or silently renamed. A rename or removal needs an entry in
// `migrations` (old -> new, new must exist) or in `retired` (major release only), plus a
// recorded decision, a versioned migration helper, tests against saved compositions and
// release notes. Additions are free.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const file = path.join(root, "manifests/CANONICAL_IDS.json");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "docs/canonical-catalog.json"), "utf8"));
const REGISTRIES = ["workspaces", "pages", "layouts", "devices", "components", "regions"];
const current = Object.fromEntries(REGISTRIES.map((name) => [name, (catalog.registries[name]?.records ?? []).map((r) => r.id).sort()]));
for (const name of REGISTRIES) if (!current[name].length) throw new Error(`Registry ${name} missing from docs/canonical-catalog.json`);

const baseline = fs.existsSync(file)
  ? JSON.parse(fs.readFileSync(file, "utf8"))
  : { schemaVersion: 1, decision: "Gate 7 option C, release owner, 2026-10-12 (chat statement, not a signed record)", migrations: {}, retired: [], ids: {} };

const errors = [];
const all = new Set(REGISTRIES.flatMap((name) => current[name]));
for (const name of REGISTRIES) {
  const now = new Set(current[name]);
  for (const id of baseline.ids[name] ?? []) {
    if (now.has(id)) continue;
    const target = baseline.migrations[id];
    if (target && all.has(target)) continue;
    if (baseline.retired.includes(id)) continue;
    errors.push(`${name}: ${id} disappeared without a migration or retirement record`);
  }
}
for (const id of baseline.retired) if (all.has(id)) errors.push(`retired ID ${id} is in use again`);
for (const [from, to] of Object.entries(baseline.migrations)) if (!all.has(to)) errors.push(`migration ${from} -> ${to} points to an unknown ID`);
if (errors.length) throw new Error(`Canonical ID rules violated:\n- ${errors.join("\n- ")}`);

const added = REGISTRIES.flatMap((name) => current[name].filter((id) => !(baseline.ids[name] ?? []).includes(id)));
if (process.argv.includes("--check")) {
  if (added.length) throw new Error(`${added.length} new canonical IDs are not in the baseline; run node scripts/canonical-ids.mjs to record them.`);
} else {
  for (const name of REGISTRIES) baseline.ids[name] = [...new Set([...(baseline.ids[name] ?? []), ...current[name]])].sort();
  fs.writeFileSync(file, JSON.stringify(baseline, null, 2) + "\n");
}
console.log(`${all.size} canonical IDs checked across ${REGISTRIES.length} registries`);
