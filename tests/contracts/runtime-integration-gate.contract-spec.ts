// Desktop integration acceptance gate.
// - Synthetic cases prove the gate fails closed.
// - The live case runs ONLY when MAATAA_RUNTIME_URL points at a loopback
//   runtime (e.g. ALLB `wrangler dev`). Without it the live check is skipped
//   and reported as not run; it is never counted as a pass.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ALLB_EXPECTED_SERVICE,
  createLoopbackHealthTransport,
  performRuntimeHandshake,
  type RuntimeTransport,
} from "../../apps/shared/contracts/runtime-handshake.ts";
import { evaluateIntegrationGate } from "../../apps/shared/contracts/runtime-integration-gate.ts";

const opts = { clientVersion: "gate-test", createRequestId: () => "gate-0000001", requestedCapabilities: ["brahmi:tokenize"] };
const health = { status: "OK", service: ALLB_EXPECTED_SERVICE, environment: "test", contractVersion: "1.1.0" };
const stub = (h: unknown, capabilities?: unknown): RuntimeTransport => ({
  kind: "synthetic-test-double",
  probe: async () => ({ health: h, capabilities, transport: "synthetic-test-double", endpoint: "memory://stub" }),
});
const tokenize = [{ id: "brahmi:tokenize", available: true, mode: "SoftwareNative", detail: "synthetic" }];

test("gate fails closed with no runtime configured (current default state)", async () => {
  const verdict = evaluateIntegrationGate(await performRuntimeHandshake(null, opts));
  assert.equal(verdict.pass, false);
  assert.ok(verdict.failures.includes("state:unavailable"));
});

test("gate fails when health is fine but capabilities were not reported (ALLB HTTP today)", async () => {
  const verdict = evaluateIntegrationGate(await performRuntimeHandshake(stub(health), opts));
  assert.equal(verdict.pass, false);
  assert.ok(verdict.failures.includes("capabilities-not-reported-by-runtime"));
});

test("gate fails on identity / version / health / capability mismatch", async () => {
  const cases: [unknown, unknown, string][] = [
    [{ ...health, service: "impostor" }, tokenize, "identity-mismatch"],
    [{ ...health, contractVersion: "2.0.0" }, tokenize, "contract-version-mismatch"],
    [{ ...health, status: "DOWN" }, tokenize, "health-not-ok"],
    [health, [{ ...tokenize[0], available: false }], "missing-capability:brahmi:tokenize"],
  ];
  for (const [h, caps, failure] of cases) {
    const verdict = evaluateIntegrationGate(await performRuntimeHandshake(stub(h, caps), opts));
    assert.equal(verdict.pass, false, failure);
    assert.ok(verdict.failures.includes(failure), `${failure}: ${verdict.failures}`);
  }
});

test("gate passes only for a fully matching synthetic runtime, and still lists unverifiable claims", async () => {
  const verdict = evaluateIntegrationGate(await performRuntimeHandshake(stub(health, tokenize), opts));
  assert.equal(verdict.pass, true);
  assert.deepEqual(verdict.unverifiable, ["runtime-source-commit-attestation", "k7", "hemant-samwat-clock"]);
});

const liveUrl = process.env.MAATAA_RUNTIME_URL;
const liveSkip = liveUrl ? false : "MAATAA_RUNTIME_URL not set: live runtime check NOT RUN";

test("LIVE: real loopback runtime answers the handshake with expected identity and contract version", { skip: liveSkip }, async () => {
  const result = await performRuntimeHandshake(createLoopbackHealthTransport(liveUrl!, fetch as never), { ...opts, createRequestId: undefined });
  console.log(`LIVE_HANDSHAKE_RESULT ${JSON.stringify(result)}`);
  assert.equal(result.state, "connected", `reasons: ${result.reasons.join(", ")}`);
  assert.equal(result.runtime.service, ALLB_EXPECTED_SERVICE);
  assert.equal(result.evidence.transport, "http-loopback");
});

// Acceptance gate: stays RED until the runtime itself reports capabilities.
// A failure here with only `capabilities-not-reported-by-runtime` /
// `missing-capability:*` is the expected, truthful state for ALLB today.
test("LIVE: Desktop integration acceptance gate", { skip: liveSkip }, async () => {
  const result = await performRuntimeHandshake(createLoopbackHealthTransport(liveUrl!, fetch as never), { ...opts, createRequestId: undefined });
  const verdict = evaluateIntegrationGate(result);
  console.log(`LIVE_GATE_VERDICT ${JSON.stringify(verdict)}`);
  assert.equal(verdict.pass, true, `gate failed: ${verdict.failures.join(", ")}`);
});
