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

// REAL QEMU stdout for maataa-os 52ad36ac (kernel clock, rebased onto
// wortforfilms/os main), netduinoplus2. Built in the cloud workspace with
// -Zbuild-std and the committed Cargo.lock, so this binary hash differs from
// a native macOS build of the same commit.
const clocked = readFileSync(new URL("./fixtures/maataa-os-qemu-boot-52ad36ac.txt", import.meta.url), "utf8");
const clockedProvenance = {
  osCommit: "52ad36acdc63e2e97ecba2bd21e15ec4e80daa61",
  binarySha256: "67b61bea6db4a8088aaf59607633f73952d2912858ac38aa12045f826867ee41",
  machine: "netduinoplus2",
};

test("a kernel with a clock reports monotonic time since boot, and Hemant time only as host-anchored", () => {
  const result = parseQemuBootReport(clocked, clockedProvenance);
  assert.ok(result.ok, result.ok ? "" : result.error);
  const { time } = result.report;
  assert.equal(time.status, "monotonic-since-boot");
  if (time.status !== "monotonic-since-boot") return;
  assert.equal(time.basis, "kernel-monotonic-since-boot");
  assert.equal(time.tickHz, 1000);
  assert.equal(time.coreClockHz, 168_000_000);
  assert.equal(time.coreClockSource, "board-assumption");
  assert.equal(time.board, null); // 52ad36ac predates the board line
  assert.equal(time.tickUptimesNanos.length, result.report.simulatedSchedulerTicks);
  assert.equal(time.regressions, 0);
  assert.ok(time.uptimeAtExitNanos !== null && time.uptimeAtExitNanos > time.uptimeAtReportNanos);
  // Ticks sleep 10 ms of kernel time each.
  for (let i = 1; i < time.tickUptimesNanos.length; i++) {
    assert.ok(time.tickUptimesNanos[i] - time.tickUptimesNanos[i - 1] >= 10_000_000);
  }
  assert.ok(time.hemant);
  assert.equal(time.hemant.basis, "host-unix-clock-unverified");
  assert.match(time.hemant.nanosSinceEpoch, /^\d{19}$/);
  assert.ok(time.hemant.position.ahoratra > 17_000);
  // Scheduler ticks are still not time.
  assert.match(result.report.limitations.join(" "), /not elapsed time/);
});

test("a clock report that runs backwards or is malformed fails closed", () => {
  const lines = clocked.split("\n");
  const firstTick = lines.findIndex((l) => l.trim().startsWith("uptime ns:") && l.startsWith("  "));
  const backwards = [...lines];
  backwards[firstTick] = "  uptime ns: 1";
  assert.equal(parseQemuBootReport(backwards.join("\n"), clockedProvenance).ok, false);
  assert.equal(parseQemuBootReport(clocked.replace("time: kernel-monotonic-since-boot", "time: trusted"), clockedProvenance).ok, false);
  assert.equal(parseQemuBootReport(clocked.replace(/^clock: .*$/m, "clock: fast"), clockedProvenance).ok, false);
  assert.equal(parseQemuBootReport(clocked.replace("hemant anchor: host-unix-clock-unverified", "hemant anchor: verified"), clockedProvenance).ok, false);
  assert.equal(parseQemuBootReport(clocked.replace(/^hemant position: .*$/m, "hemant position: ahoratra 1 muhurta 99 kala 0 kastha 0 nimesha 0"), clockedProvenance).ok, false);
});

test("hardware builds report an RCC-configured clock and name the board", () => {
  const hardware = clocked
    .replace("core 168000000 Hz (board assumption)", "core 100000000 Hz (rcc configured)")
    .replace("time: kernel-monotonic-since-boot", "board: stm32f411\ntime: kernel-monotonic-since-boot");
  const result = parseQemuBootReport(hardware, clockedProvenance);
  assert.ok(result.ok, result.ok ? "" : result.error);
  const { time } = result.report;
  assert.ok(time.status === "monotonic-since-boot");
  assert.equal(time.coreClockHz, 100_000_000);
  assert.equal(time.coreClockSource, "rcc-configured");
  assert.equal(time.board, "stm32f411");
  assert.equal(parseQemuBootReport(hardware.replace("(rcc configured)", "(measured)"), clockedProvenance).ok, false);
  assert.equal(parseQemuBootReport(hardware.replace("board: stm32f411", "board: <script>"), clockedProvenance).ok, false);
});
