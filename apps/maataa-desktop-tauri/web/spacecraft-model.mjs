// Educational, deterministic two-body propagator for the Desktop simulator.
// This is not flight software and deliberately has no sensor or actuator I/O.
export const SUN_MU_KM3_S2 = 132_712_440_018;
export const HEMANT_REFERENCE_EPOCH_MS = 285_148_740_000;

const norm = ([x, y, z]) => Math.hypot(x, y, z);
const derivative = ([x, y, z, vx, vy, vz]) => {
  const r = Math.hypot(x, y, z);
  if (!Number.isFinite(r) || r < 1) throw new RangeError('Position is too close to the central body.');
  const scale = -SUN_MU_KM3_S2 / (r * r * r);
  return [vx, vy, vz, scale * x, scale * y, scale * z];
};
const addScaled = (state, slope, amount) => state.map((value, index) => value + slope[index] * amount);

/** Propagate an inertial Cartesian state under Sun-only point-mass gravity. */
export function propagateHeliocentric(initialState, durationSeconds, maximumStepSeconds = 3600) {
  if (!Array.isArray(initialState) || initialState.length !== 6 || !initialState.every(Number.isFinite)) {
    throw new TypeError('State must contain six finite position and velocity values.');
  }
  if (!Number.isFinite(durationSeconds) || durationSeconds < 0 || durationSeconds > 10 * 365.25 * 86400) {
    throw new RangeError('Duration must be between zero and ten years.');
  }
  if (!Number.isFinite(maximumStepSeconds) || maximumStepSeconds <= 0) {
    throw new RangeError('Integration step must be positive.');
  }
  const count = Math.max(1, Math.ceil(durationSeconds / maximumStepSeconds));
  if (count > 100_000) throw new RangeError('Requested propagation exceeds the simulator step limit.');
  const step = durationSeconds / count;
  let state = [...initialState];
  for (let index = 0; index < count && durationSeconds > 0; index += 1) {
    const k1 = derivative(state);
    const k2 = derivative(addScaled(state, k1, step / 2));
    const k3 = derivative(addScaled(state, k2, step / 2));
    const k4 = derivative(addScaled(state, k3, step));
    state = state.map((value, axis) => value + (step / 6) * (k1[axis] + 2 * k2[axis] + 2 * k3[axis] + k4[axis]));
  }
  if (!state.every(Number.isFinite)) throw new RangeError('Propagation produced a non-finite state.');
  return { state, steps: durationSeconds === 0 ? 0 : count, rangeKm: norm(state.slice(0, 3)), speedKmS: norm(state.slice(3, 6)) };
}

/** Render elapsed Hemant units from the selected reference instant, not a Panchang date. */
export function formatHemantElapsed(epochMilliseconds) {
  if (!Number.isFinite(epochMilliseconds)) return 'Unavailable';
  const elapsedNs = BigInt(Math.trunc(epochMilliseconds)) * 1_000_000n - BigInt(HEMANT_REFERENCE_EPOCH_MS) * 1_000_000n;
  if (elapsedNs < 0n) return 'Before selected reference epoch';
  const nimeshaPerDay = 405_000n;
  let remaining = elapsedNs * nimeshaPerDay / 86_400_000_000_000n;
  const ahoratra = remaining / nimeshaPerDay;
  remaining %= nimeshaPerDay;
  const muhurta = remaining / 13_500n;
  remaining %= 13_500n;
  const kala = remaining / 450n;
  remaining %= 450n;
  const kastha = remaining / 15n;
  const nimesha = remaining % 15n;
  return `${ahoratra} ahoratra · ${muhurta} muhurta · ${kala} kala · ${kastha} kastha · ${nimesha} nimesha`;
}
