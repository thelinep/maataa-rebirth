import { validateUnixNanosInput } from "./contract.ts";

export const SPACECRAFT_TELEMETRY_SCHEMA = "hemant.spacecraft-telemetry/1";
export const MAX_TELEMETRY_BYTES = 64_000;
export const TELEMETRY_UNIX_TIME_SCALE = "unix-utc-no-leap-seconds";

export const instruments = [
  { id: "flight-clock", name: "Flight clock / oscillator", role: "Timestamp source", location: "Onboard", note: "Needs calibration, synchronization history and drift estimate." },
  { id: "star-tracker", name: "Star tracker", role: "Inertial attitude observation", location: "Mounted sensor", note: "Supplies star-derived attitude observations; not spacecraft range." },
  { id: "imu-gyro", name: "IMU gyroscope", role: "Angular-rate observation", location: "Mounted sensor", note: "Bias and drift grow between independent attitude updates." },
  { id: "imu-accelerometer", name: "IMU accelerometer", role: "Specific-force observation", location: "Mounted sensor", note: "Interpretation depends on calibration and maneuver context." },
  { id: "sun-sensor", name: "Sun sensor", role: "Sun-vector observation", location: "Mounted sensor", note: "Useful for attitude and safe mode; not a full position fix." },
  { id: "magnetometer", name: "Magnetometer", role: "Magnetic-field observation", location: "Mission-dependent", note: "Useful only where a suitable field model and local field exist." },
  { id: "horizon-sensor", name: "Earth / planetary horizon sensor", role: "Limb-direction observation", location: "Mission-dependent", note: "Requires the relevant body to be visible." },
  { id: "gnss", name: "GNSS receiver", role: "Earth-orbit navigation observation", location: "Mission-dependent", note: "Coverage and geometry limit use; not a deep-space position source." },
  { id: "optical-nav-camera", name: "Optical navigation camera", role: "Image observation", location: "Mounted sensor", note: "Needs target identification, camera calibration and an estimator." },
  { id: "radio-ranging", name: "Radio transponder / range-Doppler link", role: "Radio tracking observation", location: "Spacecraft + ground segment", note: "Ground tracking data must be imported with station, count interval and method." },
  { id: "reaction-wheel", name: "Reaction-wheel telemetry", role: "Actuator state", location: "Mounted actuator", note: "Wheel speed/current are telemetry; wheel is not an attitude sensor by itself." },
  { id: "thruster-telemetry", name: "Thruster / maneuver telemetry", role: "Actuator state", location: "Mounted actuator", note: "Commanded thrust is not the same as measured delta-v." },
  { id: "flight-computer-health", name: "Flight-computer health", role: "Health telemetry", location: "Onboard", note: "Watchdog, ECC, temperature, voltage and reset counters." },
] as const;

export type InstrumentId = (typeof instruments)[number]["id"];
export type TelemetryMeasurement = {
  instrument: InstrumentId;
  instrument_id: string;
  quantity: string;
  value: number;
  unit: string;
  observed_at_unix_nanos: string;
  time_scale: string;
  frame: string;
  uncertainty: string;
  source: string;
};
export type SpacecraftTelemetry = {
  schema: typeof SPACECRAFT_TELEMETRY_SCHEMA;
  vehicle_id: string;
  data_class: "caller-supplied" | "simulation" | "observed" | "live";
  recorded_at: {
    unix_nanos: string;
    time_scale: string;
    clock_source: string;
    clock_calibration: string;
    clock_uncertainty: string;
    verification: "unverified";
  };
  measurements: TelemetryMeasurement[];
  navigation_solution: null;
};

export type TelemetryParse = { ok: true; value: SpacecraftTelemetry } | { ok: false; error: string };

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isText = (v: unknown, max = 160): v is string => typeof v === "string" && v.trim().length > 0 && v.length <= max;
const hasExactKeys = (v: Record<string, unknown>, keys: string[]) => Object.keys(v).length === keys.length && keys.every((key) => key in v);
const instrumentIds = new Set<string>(instruments.map(({ id }) => id));

export function parseSpacecraftTelemetryText(text: string): TelemetryParse {
  if (new TextEncoder().encode(text).length > MAX_TELEMETRY_BYTES) return { ok: false, error: "Payload exceeds 64 KB." };
  let raw: unknown;
  try { raw = JSON.parse(text); } catch { return { ok: false, error: "Enter valid JSON." }; }
  if (!isRecord(raw) || !hasExactKeys(raw, ["schema", "vehicle_id", "data_class", "recorded_at", "measurements", "navigation_solution"]) || raw.schema !== SPACECRAFT_TELEMETRY_SCHEMA) return { ok: false, error: `Expected the exact ${SPACECRAFT_TELEMETRY_SCHEMA} shape.` };
  if (!isText(raw.vehicle_id) || !["caller-supplied", "simulation", "observed", "live"].includes(String(raw.data_class))) return { ok: false, error: "Vehicle ID or data class is invalid." };
  const clock = raw.recorded_at;
  if (!isRecord(clock) || !hasExactKeys(clock, ["unix_nanos", "time_scale", "clock_source", "clock_calibration", "clock_uncertainty", "verification"])) return { ok: false, error: "recorded_at has missing or unknown fields." };
  const timestamp = validateUnixNanosInput(typeof clock.unix_nanos === "string" ? clock.unix_nanos : null);
  if (!timestamp.ok) return { ok: false, error: `recorded_at.unix_nanos: ${timestamp.error}.` };
  if (clock.time_scale !== TELEMETRY_UNIX_TIME_SCALE || !isText(clock.clock_source) || !isText(clock.clock_calibration) || !isText(clock.clock_uncertainty) || clock.verification !== "unverified") {
    return { ok: false, error: "Clock provenance must include time scale, source, calibration, uncertainty and unverified status." };
  }
  if (!Array.isArray(raw.measurements) || raw.measurements.length > 128) return { ok: false, error: "measurements must be an array with at most 128 entries." };
  const measurements: TelemetryMeasurement[] = [];
  for (const [index, item] of raw.measurements.entries()) {
    if (!isRecord(item) || !hasExactKeys(item, ["instrument", "instrument_id", "quantity", "value", "unit", "observed_at_unix_nanos", "time_scale", "frame", "uncertainty", "source"]) || typeof item.instrument !== "string" || !instrumentIds.has(item.instrument)) return { ok: false, error: `measurements[${index}] has unknown fields or an unsupported instrument.` };
    const observedAt = validateUnixNanosInput(typeof item.observed_at_unix_nanos === "string" ? item.observed_at_unix_nanos : null);
    if (!observedAt.ok) return { ok: false, error: `measurements[${index}].observed_at_unix_nanos is invalid.` };
    if (!isText(item.instrument_id) || !isText(item.quantity) || typeof item.value !== "number" || !Number.isFinite(item.value) || !isText(item.unit) || item.time_scale !== TELEMETRY_UNIX_TIME_SCALE || !isText(item.frame) || !isText(item.uncertainty) || !isText(item.source)) {
      return { ok: false, error: `measurements[${index}] needs a finite value, unit, time scale, frame, uncertainty and source.` };
    }
    measurements.push({
      instrument: item.instrument as InstrumentId,
      instrument_id: item.instrument_id,
      quantity: item.quantity,
      value: item.value,
      unit: item.unit,
      observed_at_unix_nanos: observedAt.value,
      time_scale: item.time_scale,
      frame: item.frame,
      uncertainty: item.uncertainty,
      source: item.source,
    });
  }
  if (raw.navigation_solution !== null) return { ok: false, error: "This input contract does not accept a navigation solution; position must come from a separately qualified estimator." };
  return {
    ok: true,
    value: {
      schema: SPACECRAFT_TELEMETRY_SCHEMA,
      vehicle_id: raw.vehicle_id,
      data_class: raw.data_class as SpacecraftTelemetry["data_class"],
      recorded_at: {
        unix_nanos: timestamp.value,
        time_scale: TELEMETRY_UNIX_TIME_SCALE,
        clock_source: clock.clock_source as string,
        clock_calibration: clock.clock_calibration as string,
        clock_uncertainty: clock.clock_uncertainty as string,
        verification: "unverified",
      },
      measurements,
      navigation_solution: null,
    },
  };
}

export function emptyTelemetryTemplate(): string {
  return JSON.stringify({
    schema: SPACECRAFT_TELEMETRY_SCHEMA,
    vehicle_id: "",
    data_class: "caller-supplied",
    recorded_at: {
      unix_nanos: "",
      time_scale: TELEMETRY_UNIX_TIME_SCALE,
      clock_source: "",
      clock_calibration: "",
      clock_uncertainty: "",
      verification: "unverified",
    },
    measurements: [],
    navigation_solution: null,
  }, null, 2);
}
