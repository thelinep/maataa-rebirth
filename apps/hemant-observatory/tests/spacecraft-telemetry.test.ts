import { test } from "node:test";
import assert from "node:assert/strict";
import { emptyTelemetryTemplate, instruments, parseSpacecraftTelemetryText, SPACECRAFT_TELEMETRY_SCHEMA, TELEMETRY_UNIX_TIME_SCALE } from "../lib/spacecraft-telemetry.ts";

const valid = {
  schema: SPACECRAFT_TELEMETRY_SCHEMA,
  vehicle_id: "demo-craft-1",
  data_class: "caller-supplied",
  recorded_at: {
    unix_nanos: "285148740000000000",
    time_scale: TELEMETRY_UNIX_TIME_SCALE,
    clock_source: "board oscillator declared by sender",
    clock_calibration: "unknown",
    clock_uncertainty: "unknown",
    verification: "unverified",
  },
  measurements: [{
    instrument: "imu-gyro",
    instrument_id: "imu-a",
    quantity: "angular_rate_x",
    value: 0.01,
    unit: "rad/s",
    observed_at_unix_nanos: "285148740000000000",
    time_scale: TELEMETRY_UNIX_TIME_SCALE,
    frame: "spacecraft-body",
    uncertainty: "unknown",
    source: "operator-entered test observation",
  }],
  navigation_solution: null,
};

test("spacecraft telemetry accepts a provenance-labelled caller-supplied measurement without upgrading verification", () => {
  const result = parseSpacecraftTelemetryText(JSON.stringify(valid));
  assert.ok(result.ok, result.ok ? "" : result.error);
  assert.equal(result.value.recorded_at.verification, "unverified");
  assert.equal(result.value.measurements[0].instrument, "imu-gyro");
  assert.equal(result.value.navigation_solution, null);
  assert.equal(instruments.length, 13);
});

test("spacecraft telemetry rejects malformed inputs, unknown instruments and forged navigation", () => {
  const cases = [
    "not json",
    JSON.stringify({ ...valid, schema: "other" }),
    JSON.stringify({ ...valid, extra: "ignored?" }),
    JSON.stringify({ ...valid, recorded_at: { ...valid.recorded_at, verification: "verified" } }),
    JSON.stringify({ ...valid, measurements: [{ ...valid.measurements[0], instrument: "unknown-sensor" }] }),
    JSON.stringify({ ...valid, measurements: [{ ...valid.measurements[0], value: 1e999 }] }),
    JSON.stringify({ ...valid, navigation_solution: { position: [1, 2, 3] } }),
    "x".repeat(64_001),
  ];
  for (const input of cases) assert.equal(parseSpacecraftTelemetryText(input).ok, false);
});

test("starter telemetry template is explicitly empty rather than fabricated flight data", () => {
  const template = JSON.parse(emptyTelemetryTemplate());
  assert.equal(template.data_class, "caller-supplied");
  assert.equal(template.measurements.length, 0);
  assert.equal(template.navigation_solution, null);
});
