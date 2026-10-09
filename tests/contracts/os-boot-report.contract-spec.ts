// The fixture is REAL QEMU stdout captured by scripts/collect-runtime-evidence.sh
// (run 20261009T010617Z) for maataa-os 50fce492 (clean tree), binary sha256 947213ed….
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseQemuBootReport } from "../../apps/shared/contracts/os-boot-report.ts";

const stdout = readFileSync(new URL("./fixtures/maataa-os-qemu-boot-50fce492.txt", import.meta.url), "utf8");
const provenance = {
  osCommit: "50fce492e9db0c0f88839a1cf03932709ef24b09",
  binarySha256: "947213ed4d629abd0085fb8f488041e9c01a8988f3d2777d29cd0456b7990b85",
  machine: "netduinoplus2",
};

test("real QEMU boot output parses into a provenance-bearing OS report with time unavailable", () => {
  const result = parseQemuBootReport(stdout, provenance);
  assert.ok(result.ok, result.ok ? "" : result.error);
  const r = result.report;
  assert.equal(r.booted, true);
  assert.equal(r.exitedCleanly, true);
  assert.deepEqual(r.drivers, { ready: 5, total: 5 });
  assert.equal(r.storageMounted, true);
  assert.equal(r.manifest, "maataa-os 0.1.0-alpha.1");
  assert.equal(r.capsulesLoaded, 2);
  assert.equal(r.simulatedSchedulerTicks, 6);
  assert.equal(r.healthNominalTicks, 6);
  assert.equal(r.time.status, "unavailable");
  assert.equal(r.source.osCommit, provenance.osCommit);
});

test("non-OS text, truncated reports and bad provenance fail closed", () => {
  assert.equal(parseQemuBootReport("hello world", provenance).ok, false);
  assert.equal(parseQemuBootReport(stdout.replace(/^drivers:.*$/m, ""), provenance).ok, false);
  assert.equal(parseQemuBootReport(stdout.replace("tick 3", "tick 9"), provenance).ok, false);
  assert.equal(parseQemuBootReport(stdout, { ...provenance, osCommit: "50fce49" }).ok, false);
  assert.equal(parseQemuBootReport(stdout, { ...provenance, binarySha256: "x" }).ok, false);
  assert.equal(parseQemuBootReport("", provenance).ok, false);
  const crashed = parseQemuBootReport(stdout.replace("Exiting QEMU.", ""), provenance);
  assert.ok(crashed.ok && crashed.report.exitedCleanly === false);
});

test("the report never presents scheduler ticks as time", () => {
  const result = parseQemuBootReport(stdout, provenance);
  assert.ok(result.ok);
  assert.equal(Object.keys(result.report).some((key) => /time|elapsed|clock/i.test(key) && key !== "time"), false);
  assert.deepEqual(Object.keys(result.report.time), ["status", "reason"]);
  assert.match(result.report.limitations.join(" "), /not elapsed time/);
});
