/**
 * MAATAA OS boundary, contract `maataa.os-boot-report/1`.
 *
 * Under QEMU the Cortex-M kernel prints a boot report over semihosting and
 * exits. This parser turns that real, OS-originated text into a typed record
 * with provenance supplied by the runner (commit, binary sha256).
 *
 * Time, by kernel version:
 * - maataa-os 50fce492 and earlier have no clock: `time.status` is
 *   "unavailable".
 * - From 52ad36ac the kernel runs a SysTick clock (src/clock.rs) and prints
 *   `time: kernel-monotonic-since-boot`: `time.status` is
 *   "monotonic-since-boot", with uptimes in nanoseconds. That clock is not
 *   trusted (uncalibrated oscillator). A Hemant reading, when present, comes
 *   from a host anchor and is labelled `host-unix-clock-unverified`.
 * "tick N" lines stay a scheduler simulation counter (`simulatedSchedulerTicks`),
 * never time. A report that claims a clock but whose uptimes go backwards, or
 * whose clock lines are malformed, fails closed.
 */

export const OS_BOOT_REPORT_SCHEMA = "maataa.os-boot-report/1" as const;

export interface OsBootReport {
  schema: typeof OS_BOOT_REPORT_SCHEMA;
  source: { kind: "qemu-semihosting-stdout"; machine: string; osCommit: string; binarySha256: string };
  booted: boolean;
  exitedCleanly: boolean;
  drivers: { ready: number; total: number };
  storageMounted: boolean;
  manifest: string | null;
  capsulesLoaded: number;
  simulatedSchedulerTicks: number;
  healthNominalTicks: number;
  time: OsTime;
  limitations: string[];
}

export type OsTime =
  | { status: "unavailable"; reason: string }
  | {
      status: "monotonic-since-boot";
      basis: "kernel-monotonic-since-boot";
      tickHz: number;
      /** Core clock the kernel configured SysTick with. Not a measurement. */
      coreClockHz: number;
      /** "board-assumption" (QEMU, fixed) or "rcc-configured" (hardware clock tree). */
      coreClockSource: "board-assumption" | "rcc-configured";
      /** Board named by the kernel (maataa-os e111e7e and later), else null. */
      board: string | null;
      uptimeAtReportNanos: number;
      /** Kernel uptime at each simulated scheduler tick, in order. */
      tickUptimesNanos: number[];
      uptimeAtExitNanos: number | null;
      /** Readings the kernel clamped to stay monotonic; expected 0. */
      regressions: number | null;
      /** Host-anchored Hemant time; null when the kernel had no anchor. */
      hemant: {
        basis: "host-unix-clock-unverified";
        /** Decimal string: the value exceeds Number.MAX_SAFE_INTEGER. */
        nanosSinceEpoch: string;
        position: { ahoratra: number; muhurta: number; kala: number; kastha: number; nimesha: number };
      } | null;
    };

export type ParseResult = { ok: true; report: OsBootReport } | { ok: false; error: string };

const COMMIT = /^[0-9a-f]{40}$/;
const SHA = /^[0-9a-f]{64}$/;
const MACHINE = /^[a-z0-9][a-z0-9-]{1,40}$/;

export function parseQemuBootReport(
  stdout: string,
  provenance: { osCommit: string; binarySha256: string; machine: string },
): ParseResult {
  if (!COMMIT.test(provenance.osCommit)) return { ok: false, error: "osCommit must be a full 40-hex commit" };
  if (!SHA.test(provenance.binarySha256)) return { ok: false, error: "binarySha256 must be 64 hex characters" };
  if (!MACHINE.test(provenance.machine)) return { ok: false, error: "machine name is invalid" };
  if (typeof stdout !== "string" || stdout.length === 0 || stdout.length > 64_000) return { ok: false, error: "empty or oversized boot output" };
  const lines = stdout.split(/\r?\n/).map((line) => line.trim());

  const booted = lines.includes("Starting Maataa OS kernel...");
  if (!booted) return { ok: false, error: "kernel start line not found; not a MAATAA OS boot report" };
  const drivers = /^drivers: (\d+)\/(\d+) ready$/.exec(lines.find((l) => l.startsWith("drivers:")) ?? "");
  if (!drivers) return { ok: false, error: "driver summary missing" };
  const manifestLine = lines.find((l) => l.startsWith("manifest: "));
  const capsules = /^capsules loaded: (\d+)$/.exec(lines.find((l) => l.startsWith("capsules loaded:")) ?? "");
  const ticks = lines.filter((l) => /^tick \d+$/.test(l)).map((l) => Number(l.slice(5)));
  const ordered = ticks.every((t, i) => t === i + 1);
  if (!ordered) return { ok: false, error: "scheduler tick lines are not a contiguous 1..n sequence" };
  const time = parseTime(lines);
  if ("error" in time) return { ok: false, error: time.error };

  return {
    ok: true,
    report: {
      schema: OS_BOOT_REPORT_SCHEMA,
      source: { kind: "qemu-semihosting-stdout", machine: provenance.machine, osCommit: provenance.osCommit, binarySha256: provenance.binarySha256 },
      booted,
      exitedCleanly: lines.includes("Exiting QEMU.") && lines.includes("Maataa OS prototype demo complete."),
      drivers: { ready: Number(drivers[1]), total: Number(drivers[2]) },
      // The boot report line ("storage mounted: true"), not the earlier mount log line.
      storageMounted: lines.includes("storage mounted: true"),
      manifest: manifestLine ? manifestLine.slice("manifest: ".length) : null,
      capsulesLoaded: capsules ? Number(capsules[1]) : 0,
      simulatedSchedulerTicks: ticks.length,
      healthNominalTicks: lines.filter((l) => l === "health: nominal").length,
      time: time.value,
      limitations: [
        "Virtual peripherals under QEMU; not hardware.",
        "Boot report is printed once and the emulator exits; there is no request/response channel.",
        "Scheduler ticks are a simulation counter, not elapsed time.",
      ],
    },
  };
}

const UNAVAILABLE: OsTime = { status: "unavailable", reason: "maataa-os kernel exposes no clock service (no SysTick/RTC driver; hemant-core not linked into the kernel)" };
const NANOS = /^\d{1,16}$/;

function parseTime(lines: string[]): { value: OsTime } | { error: string } {
  const basis = lines.find((l) => l.startsWith("time: "));
  if (basis === undefined) return { value: UNAVAILABLE };
  if (basis !== "time: kernel-monotonic-since-boot") return { error: "unknown kernel time basis" };
  const clock = /^clock: systick (\d{1,7}) Hz, core (\d{1,10}) Hz \((board assumption|rcc configured)\)$/.exec(lines.find((l) => l.startsWith("clock: ")) ?? "");
  if (!clock) return { error: "clock line missing or malformed" };
  const boardLine = lines.find((l) => l.startsWith("board: "));
  const board = boardLine === undefined ? null : boardLine.slice("board: ".length);
  if (board !== null && !/^[a-z0-9][a-z0-9-]{1,60}$/.test(board)) return { error: "board line malformed" };
  const number = (prefix: string): number | null | undefined => {
    const line = lines.find((l) => l.startsWith(prefix));
    if (line === undefined) return null;
    const text = line.slice(prefix.length);
    return NANOS.test(text) ? Number(text) : undefined;
  };
  // The first "uptime ns:" line belongs to the boot report; later ones follow each tick.
  const uptimes: number[] = [];
  for (const line of lines) {
    if (!line.startsWith("uptime ns: ")) continue;
    const text = line.slice("uptime ns: ".length);
    if (!NANOS.test(text)) return { error: "uptime line malformed" };
    uptimes.push(Number(text));
  }
  const [uptimeAtReportNanos, ...tickUptimesNanos] = uptimes;
  if (uptimeAtReportNanos === undefined) return { error: "uptime missing" };
  const exit = number("uptime at exit ns: ");
  const regressions = number("clock regressions: ");
  if (exit === undefined || regressions === undefined) return { error: "clock summary malformed" };
  const sequence = [uptimeAtReportNanos, ...tickUptimesNanos, ...(exit === null ? [] : [exit])];
  if (!sequence.every((value, i) => i === 0 || value >= sequence[i - 1])) return { error: "kernel uptime went backwards" };

  let hemant: Extract<OsTime, { status: "monotonic-since-boot" }>["hemant"] = null;
  const anchor = lines.find((l) => l.startsWith("hemant anchor: "));
  if (anchor === "hemant anchor: host-unix-clock-unverified") {
    const since = /^hemant ns since epoch: (\d{1,20})$/.exec(lines.find((l) => l.startsWith("hemant ns since epoch: ")) ?? "");
    const position = /^hemant position: ahoratra (\d+) muhurta (\d+) kala (\d+) kastha (\d+) nimesha (\d+)$/.exec(lines.find((l) => l.startsWith("hemant position: ")) ?? "");
    if (!since || !position) return { error: "hemant lines malformed" };
    const [ahoratra, muhurta, kala, kastha, nimesha] = position.slice(1).map(Number);
    if (muhurta >= 30 || kala >= 30 || kastha >= 30 || nimesha >= 15) return { error: "hemant position out of range" };
    hemant = { basis: "host-unix-clock-unverified", nanosSinceEpoch: since[1], position: { ahoratra, muhurta, kala, kastha, nimesha } };
  } else if (anchor !== undefined && anchor !== "hemant anchor: unavailable") {
    return { error: "unknown hemant anchor" };
  }
  return {
    value: {
      status: "monotonic-since-boot",
      basis: "kernel-monotonic-since-boot",
      tickHz: Number(clock[1]),
      coreClockHz: Number(clock[2]),
      coreClockSource: clock[3] === "rcc configured" ? "rcc-configured" : "board-assumption",
      board,
      uptimeAtReportNanos,
      tickUptimesNanos,
      uptimeAtExitNanos: exit,
      regressions,
      hemant,
    },
  };
}
