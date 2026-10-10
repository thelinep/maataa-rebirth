import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const fixture = JSON.parse(readFileSync("fixtures/mars2020-sclk-v19-sample.json", "utf8"));
assert.equal(fixture.schema, "hemant.spacecraft-clock-reference/1");
assert.equal(fixture.source_product_version, 19);
assert.equal(fixture.source_checksum.algorithm, "SHA-256");
assert.equal(fixture.source_checksum.value, null);
assert.match(fixture.source_checksum.verification, /pending/);
assert.equal(fixture.independent_implementation_check.implementation, "NAIF CSPICE");
assert.match(fixture.independent_implementation_check.verification, /pending/);

function run(label, command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) {
    process.stderr.write(`${label} failed\n${result.stdout}${result.stderr}`);
    process.exit(result.status ?? 1);
  }
  process.stdout.write(`${label} passed\n`);
}

run("Mars 2020 SCLK core tests", "cargo", ["test", "--offline", "-p", "hemant-core", "sclk"]);
run("Build native shell for fixture smoke", "cargo", ["build", "--offline", "-p", "hemant-shell"]);
run("Mars 2020 source-vector smoke", "node", ["tests/sclk-fixture-smoke.mjs"]);
run("NASA/JPL Horizons fixture parser", "node", ["tests/jpl-fixture-smoke.mjs"]);

process.stdout.write("Aditya-L1 MAG L2 browser parser: run the dedicated desktop/mobile Playwright import tests; they use a generated NetCDF-4 contract fixture.\n");
process.stdout.write("Mars 2020 checksum and independent CSPICE differential: pending; this run verifies the checked-in bounded Rust demonstration only.\n");
