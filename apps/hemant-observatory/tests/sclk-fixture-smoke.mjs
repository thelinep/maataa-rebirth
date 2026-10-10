import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const fixture = JSON.parse(readFileSync("fixtures/mars2020-sclk-v19-sample.json", "utf8"));
const result = spawnSync("target/debug/hemant-shell", ["--mars2020-sclk", fixture.clock_input], { encoding: "utf8" });
assert.equal(result.status, 0, result.stderr);
const output = JSON.parse(result.stdout);
assert.equal(output.schema, "hemant.spacecraft-clock/1");
assert.equal(output.mission, "Mars 2020");
assert.equal(output.spacecraft_id, fixture.naif_spacecraft_id);
assert.equal(output.parallel_scale, fixture.expected_output.scale);
assert.equal(output.tdt_nanoseconds_past_j2000, fixture.expected_output.nanoseconds_past_j2000);
assert.equal(output.reference_utc_from_source_sclk_scet, fixture.source_scet_pair.utc);
assert.equal(output.verification, fixture.expected_output.verification);
console.log("Mars 2020 archival SCLK fixture matches the Rust shell contract.");
