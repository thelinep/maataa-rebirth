import { formatHemantElapsed, propagateHeliocentric } from './spacecraft-model.mjs';

const byId = (id) => document.getElementById(id);
const sampleState = [149_597_870.7, 0, 0, 0, 42.5, 0];
const format = (value) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }).format(value);

function readScenario() {
  const state = ['nav-x', 'nav-y', 'nav-z', 'nav-vx', 'nav-vy', 'nav-vz'].map((id) => Number(byId(id).value));
  const hours = Number(byId('nav-duration').value);
  const localDateTime = byId('nav-epoch').value;
  const isoUtc = localDateTime ? `${localDateTime}${localDateTime.length === 16 ? ':00' : ''}Z` : '';
  const epoch = new Date(isoUtc);
  if (!Number.isFinite(epoch.getTime())) throw new TypeError('Enter a valid scenario start time in UTC.');
  return { state, hours, epoch };
}

function calculate() {
  const message = byId('nav-solution-state');
  try {
    const { state, hours, epoch } = readScenario();
    const result = propagateHeliocentric(state, hours * 3600);
    const [x, y, z, vx, vy, vz] = result.state;
    const radial = (x * vx + y * vy + z * vz) / result.rangeKm;
    const endTime = new Date(epoch.getTime() + hours * 3_600_000);
    byId('nav-result-time').textContent = endTime.toISOString().replace('.000Z', ' UTC');
    byId('nav-result-hemant').textContent = formatHemantElapsed(endTime.getTime());
    byId('nav-result-position').textContent = `X ${format(x)} · Y ${format(y)} · Z ${format(z)}`;
    byId('nav-result-velocity').textContent = `Vx ${format(vx)} · Vy ${format(vy)} · Vz ${format(vz)}`;
    byId('nav-result-range').textContent = `${format(result.rangeKm)} km (${format(result.rangeKm / 149_597_870.7)} AU)`;
    byId('nav-result-speed').textContent = `${format(result.speedKmS)} km/s`;
    byId('nav-result-radial').textContent = `${format(radial)} km/s`;
    message.textContent = `Simulated result · ${result.steps.toLocaleString()} integration steps · initial state is synthetic`;
  } catch (error) {
    message.textContent = error instanceof Error ? error.message : 'Unable to calculate this scenario.';
    for (const id of ['nav-result-time', 'nav-result-hemant', 'nav-result-position', 'nav-result-velocity', 'nav-result-range', 'nav-result-speed', 'nav-result-radial']) {
      byId(id).textContent = 'No solution';
    }
  }
}

byId('nav-calculate')?.addEventListener('click', calculate);
byId('nav-reset')?.addEventListener('click', () => {
  ['nav-x', 'nav-y', 'nav-z', 'nav-vx', 'nav-vy', 'nav-vz'].forEach((id, index) => { byId(id).value = String(sampleState[index]); });
  byId('nav-epoch').value = '2030-01-01T00:00';
  byId('nav-duration').value = '24';
  byId('nav-solution-state').textContent = 'Synthetic sample loaded; calculate to propagate.';
  for (const id of ['nav-result-time', 'nav-result-hemant', 'nav-result-position', 'nav-result-velocity', 'nav-result-range', 'nav-result-speed', 'nav-result-radial']) byId(id).textContent = '—';
});
