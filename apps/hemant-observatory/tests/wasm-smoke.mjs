import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const wasmPath = "target/wasm32-unknown-unknown/release/hemant_wasm.wasm";
const nativePath = "target/release/hemant-shell";
const OUTPUT_CAPACITY = 64 * 1024;
const bytes = readFileSync(wasmPath);
const { instance } = await WebAssembly.instantiate(bytes);
const { memory, hemant_alloc, hemant_free, hemant_time_result_json, hemant_method_registry_json, hemant_m2020_sclk_tdt_json, hemant_panchanga_sidereal_json } = instance.exports;
assert.ok(memory instanceof WebAssembly.Memory, "Wasm must export its linear memory");

function outputFrom(write) {
  const capacity = OUTPUT_CAPACITY;
  const ptr = hemant_alloc(capacity);
  assert.notEqual(ptr, 0, "Wasm output allocation should succeed");
  try {
    const length = write(ptr, capacity);
    assert.ok(length > 0, `Wasm writer returned ${length}`);
    const view = new Uint8Array(memory.buffer, ptr, length);
    return JSON.parse(new TextDecoder().decode(view));
  } finally {
    hemant_free(ptr, capacity);
  }
}

function halves(value) {
  const bits = BigInt.asUintN(128, value);
  return [BigInt.asIntN(64, bits >> 64n), BigInt.asIntN(64, bits)];
}

const registry = outputFrom((ptr, capacity) => hemant_method_registry_json(ptr, capacity));
assert.equal(registry.schema, "hemant.method-registry/1");
assert.ok(registry.methods.some((method) => method.id === "cloudflare-worker-date-now-v1"));
assert.ok(registry.methods.some((method) => method.id === "mars2020-sclk-v19-bounded-to-tdt-demo-v1"));
assert.ok(registry.methods.some((method) => method.id === "explicit-ayanamsha-tithi-nakshatra-yoga-angle-bins-v1"));

const m2020Clock = outputFrom((ptr, capacity) => hemant_m2020_sclk_tdt_json(189345666, 0, ptr, capacity));
assert.equal(m2020Clock.schema, "hemant.spacecraft-clock/1");
assert.equal(m2020Clock.parallel_scale, "TDT");
assert.equal(m2020Clock.tdt_nanoseconds_past_j2000, "189345666000000000");
assert.equal(m2020Clock.reference_utc_from_source_sclk_scet, "2006-001T00:00:00.816Z");
assert.equal(m2020Clock.verification, "unverified-reference-demonstration");

const angleResult = outputFrom((ptr, capacity) => instance.exports.hemant_panchanga_angles_json(196708488n, 188725018n, ptr, capacity));
assert.equal(angleResult.schema, "hemant.panchanga-instant/1");
assert.equal(angleResult.tithi_ordinal, 30);
assert.equal(angleResult.paksha, "krishna");
assert.equal(angleResult.karana_name, "Chatushpada");
assert.equal(angleResult.nakshatra, null, "sidereal fields must stay absent without selected ayanamsha");

const siderealResult = outputFrom((ptr, capacity) => hemant_panchanga_sidereal_json(
  10_000_000n, 23_333_333n, 0n, ptr, capacity,
));
assert.equal(siderealResult.schema, "hemant.panchanga-sidereal-instant/1");
assert.equal(siderealResult.tithi_ordinal, 2);
assert.equal(siderealResult.nakshatra_ordinal, 2);
assert.equal(siderealResult.yoga_ordinal, 3);
assert.equal(siderealResult.ayanamsha_microdegrees, 0);
assert.equal(siderealResult.day_assignment, null);

const ingress = outputFrom((ptr, capacity) => instance.exports.hemant_sankranti_bracket_json(
  0n, 309500000n, 86400000n, 310500000n, 10000000n, ptr, capacity,
));
assert.equal(ingress.unix_millis, 43200000);
assert.equal(ingress.sign_index, 10);

for (const unixNanos of [
  285148740000000000n,
  285148740123456789n,
  1791590400000000000n,
]) {
  const [high, low] = halves(unixNanos);
  const workerResult = outputFrom((ptr, capacity) => hemant_time_result_json(0, high, low, ptr, capacity));
  assert.equal(workerResult.schema, "hemant.time-result/2");
  assert.equal(workerResult.reading.source, "cloudflare-worker-date-now");
  assert.equal(workerResult.reading.verification, "unverified");

  const native = spawnSync(nativePath, ["--unix-nanos", unixNanos.toString(), "--json"], { encoding: "utf8" });
  assert.equal(native.status, 0, native.stderr);
  const nativeResult = JSON.parse(native.stdout);
  assert.deepEqual(workerResult.civil, nativeResult.civil);
  assert.deepEqual(workerResult.epoch, nativeResult.epoch);
  assert.deepEqual(workerResult.elapsed, nativeResult.elapsed);
  assert.deepEqual(workerResult.pending, nativeResult.pending);

  const suppliedResult = outputFrom((ptr, capacity) => hemant_time_result_json(1, high, low, ptr, capacity));
  assert.equal(suppliedResult.reading.source, "caller-supplied-unix-nanoseconds");
  assert.deepEqual(suppliedResult.elapsed, nativeResult.elapsed);
}

assert.equal(hemant_time_result_json(0, 0n, 0n, 0, 0), -3, "invalid output buffer must fail closed");
const invalidPtr = hemant_alloc(OUTPUT_CAPACITY);
assert.equal(hemant_m2020_sclk_tdt_json(189345666, 65536, invalidPtr, OUTPUT_CAPACITY), -1, "invalid SCLK fraction fails closed");
assert.equal(hemant_m2020_sclk_tdt_json(284040068, 0, invalidPtr, OUTPUT_CAPACITY), -1, "out-of-profile clock fails closed");
const [tooLateHigh, tooLateLow] = halves(253402300800000000000n);
assert.equal(hemant_time_result_json(0, tooLateHigh, tooLateLow, invalidPtr, OUTPUT_CAPACITY), -1, "out-of-range timestamps must fail closed");
assert.equal(hemant_time_result_json(9, 0n, 0n, invalidPtr, OUTPUT_CAPACITY), -5, "unknown clock sources must fail closed");
hemant_free(invalidPtr, OUTPUT_CAPACITY);
console.log("Wasm Worker boundary passes registry, source-provenance, and Rust parity fixtures.");
