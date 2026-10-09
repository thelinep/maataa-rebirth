import test from 'node:test';
import assert from 'node:assert/strict';
import { HEMANT_REFERENCE_EPOCH_MS, SUN_MU_KM3_S2, formatHemantElapsed, propagateHeliocentric } from '../apps/maataa-desktop-tauri/web/spacecraft-model.mjs';

test('zero duration preserves the supplied heliocentric state', () => {
  const state = [149_597_870.7, 0, 0, 0, 42.5, 0];
  const result = propagateHeliocentric(state, 0);
  assert.deepEqual(result.state, state);
  assert.equal(result.steps, 0);
});

test('one-day circular two-body propagation approximately conserves specific orbital energy', () => {
  const radius = 149_597_870.7;
  const circularSpeed = Math.sqrt(SUN_MU_KM3_S2 / radius);
  const initial = [radius, 0, 0, 0, circularSpeed, 0];
  const final = propagateHeliocentric(initial, 86_400).state;
  const energy = ([x, y, z, vx, vy, vz]) => (vx * vx + vy * vy + vz * vz) / 2 - SUN_MU_KM3_S2 / Math.hypot(x, y, z);
  assert.ok(Math.abs((energy(final) - energy(initial)) / energy(initial)) < 1e-10);
});

test('rejects invalid or excessive scenarios', () => {
  assert.throws(() => propagateHeliocentric([1, 2], 100), /six finite/);
  assert.throws(() => propagateHeliocentric([1, 2, 3, 4, 5, 6], -1), /zero and ten years/);
  assert.throws(() => propagateHeliocentric([1, 2, 3, 4, 5, 6], 1, 0), /step must be positive/);
});

test('Hemant display is explicitly elapsed units from its fixed reference epoch', () => {
  assert.equal(formatHemantElapsed(HEMANT_REFERENCE_EPOCH_MS), '0 ahoratra · 0 muhurta · 0 kala · 0 kastha · 0 nimesha');
  assert.match(formatHemantElapsed(HEMANT_REFERENCE_EPOCH_MS + 86_400_000), /^1 ahoratra/);
  assert.equal(formatHemantElapsed(HEMANT_REFERENCE_EPOCH_MS - 1), 'Before selected reference epoch');
});
