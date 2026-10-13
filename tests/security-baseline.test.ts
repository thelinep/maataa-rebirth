// @vitest-environment node
import { afterEach, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const script = path.resolve("scripts/security-baseline.mjs");
const temporary: string[] = [];
afterEach(() => temporary.splice(0).forEach(dir => fs.rmSync(dir, { recursive: true, force: true })));

function baseline(audit: unknown = { metadata: { vulnerabilities: { info: 0, low: 0, moderate: 0, high: 0, critical: 0 } } }, missingRequired = false) {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "maataa-security-test-")));
  temporary.push(root);
  const save = (file: string, content: string) => { fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true }); fs.writeFileSync(path.join(root, file), content); };
  save("package.json", JSON.stringify({ name: "fixture", version: "1.0.0", license: "MIT" }));
  save("pnpm-lock.yaml", "lockfileVersion: '9.0'\n");
  save("active/package.json", JSON.stringify({ name: "active", version: "2.0.0", optionalDependencies: { optional: "1.0.0" } }));
  save("active/LICENSE", "The MIT License (MIT)\nCopyright fixture\n");
  save("node_modules/.pnpm/stale/node_modules/stale/package.json", JSON.stringify({ name: "stale", version: "1.0.0", license: "MIT" }));
  const absent = { path: path.join(root, "absent"), version: "1.0.0" };
  const graph = [{ path: root, dependencies: { active: { path: path.join(root, "active"), dependencies: missingRequired ? { required: absent } : {}, optionalDependencies: { optional: absent } } } }];
  save("bin/pnpm", `#!/usr/bin/env node\nconst command=process.argv[2]; console.log(JSON.stringify(command==='list'?${JSON.stringify(graph)}:${JSON.stringify(audit)}));\n`);
  save("bin/git", "#!/usr/bin/env node\nconst args=process.argv.slice(2);if(args[0]==='rev-parse')console.log(args[1]==='HEAD'?'fixture-commit':'7e75dd421a5f1df83ceb9dc2cc65bce12561719b');\n");
  for (const file of ["bin/pnpm", "bin/git"]) fs.chmodSync(path.join(root, file), 0o755);
  const result = spawnSync(process.execPath, [script], { cwd: root, env: { ...process.env, PATH: `${path.join(root, "bin")}${path.delimiter}${process.env.PATH}` }, encoding: "utf8" });
  const read = (file: string) => JSON.parse(fs.readFileSync(path.join(root, ".certification/security", file), "utf8"));
  return { result, read };
}

it("inventories the active graph with license provenance and excludes stale cache packages", () => {
  const { result, read } = baseline();
  expect(result.status, result.stderr).toBe(0);
  const report = read("security.json");
  expect(report.packages).toBe(1);
  expect(report.uninstalledOptional).toHaveLength(1);
  expect(report.uninstalledOptional[0].status).toBe("NOT_APPLICABLE");
  const sbom = read("sbom.json");
  expect(sbom.components.map((item: { name: string }) => item.name)).toEqual(["active"]);
  expect(sbom.components[0].licenses[0].license.name).toBe("MIT");
  expect(sbom.components[0].properties[0].value).toBe("active/LICENSE");
  expect(sbom.dependencies.find((item: { ref: string }) => item.ref === "pkg:npm/fixture@1.0.0").dependsOn).toEqual(["pkg:npm/active@2.0.0"]);
  expect(read("licenses.json").reviewStatus).toBe("NOT_RUN");
});

it.each([{}, { metadata: { vulnerabilities: {} } }, { metadata: { vulnerabilities: { info: 0, low: 0, moderate: 1, high: 0, critical: 0 } } }])("refuses incomplete or vulnerable audit evidence: %j", audit => {
  const { result, read } = baseline(audit);
  expect(result.status).toBe(1);
  expect(read("security.json").gates.dependencyAudit).toBe("FAIL");
});

it("fails when a required resolved dependency is absent", () => {
  const { result } = baseline(undefined, true);
  expect(result.status).toBe(1);
  expect(result.stderr).toContain("ENOENT");
});
