// Run: node --experimental-strip-types --test tests/contracts/
// Synthetic doubles only. A passing run here proves the adapter's validation
// and fail-closed behaviour, NOT a connection to ALLB.xyz or maataa-os.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import {
  ALLB_EXPECTED_SERVICE,
  createLoopbackHealthTransport,
  isCompatibleContractVersion,
  isLoopbackRuntimeUrl,
  parseRuntimeCapabilities,
  performRuntimeHandshake,
  type RuntimeTransport,
} from "../../apps/shared/contracts/runtime-handshake.ts";

const opts = { clientVersion: "test", createRequestId: () => "req-00000001", now: () => 1000 };
const stub = (health: unknown, capabilities?: unknown): RuntimeTransport => ({
  kind: "synthetic-test-double",
  async probe() {
    return { health, capabilities, transport: "synthetic-test-double", endpoint: "memory://stub" };
  },
});
const allbHealth = { status: "OK", service: ALLB_EXPECTED_SERVICE, environment: "test", contractVersion: "1.1.0" };

test("no transport configured reports unavailable, never connected", async () => {
  const result = await performRuntimeHandshake(null, opts);
  assert.equal(result.state, "unavailable");
  assert.deepEqual(result.reasons, ["no-runtime-transport-configured"]);
  assert.equal(result.evidence.timeBasis, "host-unix-clock-unverified");
  assert.deepEqual([...result.evidence.notClaimed], ["k7", "hemant-samwat-clock", "maataa-os-kernel"]);
});

test("ALLB-shaped health connects but leaves capabilities unreported", async () => {
  const result = await performRuntimeHandshake(stub(allbHealth), { ...opts, requestedCapabilities: ["brahmi:tokenize"] });
  assert.equal(result.state, "connected");
  assert.equal(result.capabilitiesReported, false);
  assert.deepEqual(result.missingCapabilities, ["brahmi:tokenize"]);
  assert.ok(result.reasons.includes("capabilities-not-reported"));
  assert.equal(result.evidence.runtimeEchoedRequestId, false);
});

test("reported capabilities are passed through truthfully, including unavailable NPU", async () => {
  const caps = [
    { id: "brahmi:tokenize", available: true, mode: "SoftwareNative", detail: "Native Rust tokenizer" },
    { id: "siddham:npu", available: false, mode: "SiddhamNpu", detail: "not detected" },
  ];
  const result = await performRuntimeHandshake(stub(allbHealth, caps), { ...opts, requestedCapabilities: ["brahmi:tokenize", "siddham:npu"] });
  assert.equal(result.state, "connected");
  assert.deepEqual(result.missingCapabilities, ["siddham:npu"]);
});

test("fails closed on wrong identity, version, unknown fields, unhealthy, malformed", async () => {
  const cases: [unknown, string, string][] = [
    [{ ...allbHealth, service: "other" }, "incompatible", "unexpected-runtime-identity"],
    [{ ...allbHealth, contractVersion: "2.0.0" }, "incompatible", "unsupported-contract-version"],
    [{ ...allbHealth, contractVersion: "1.2.0" }, "incompatible", "unsupported-contract-version"],
    [{ ...allbHealth, k7: true }, "incompatible", "unknown-health-fields"],
    [{ ...allbHealth, status: "DEGRADED" }, "unavailable", "runtime-not-healthy"],
    ["OK", "incompatible", "malformed-health"],
    [null, "incompatible", "malformed-health"],
  ];
  for (const [health, state, reason] of cases) {
    const result = await performRuntimeHandshake(stub(health), opts);
    assert.equal(result.state, state, JSON.stringify(health));
    assert.ok(result.reasons.includes(reason), `${reason} for ${JSON.stringify(health)}`);
  }
  const badCaps = await performRuntimeHandshake(stub(allbHealth, [{ id: "x:y", available: "yes", mode: "SoftwareNative", detail: "" }]), opts);
  assert.equal(badCaps.state, "incompatible");
});

test("transport errors and timeouts are unavailable", async () => {
  const throwing: RuntimeTransport = { kind: "t", probe: async () => { throw new Error("ECONNREFUSED"); } };
  assert.deepEqual((await performRuntimeHandshake(throwing, opts)).reasons, ["runtime-unreachable"]);
  const hanging: RuntimeTransport = { kind: "t", probe: () => new Promise(() => {}) };
  const slow = await performRuntimeHandshake(hanging, { ...opts, timeoutMs: 60 });
  assert.equal(slow.state, "unavailable");
  assert.deepEqual(slow.reasons, ["runtime-timeout"]);
});

test("rejects malformed request IDs before contacting the transport", async () => {
  let called = false;
  const spy: RuntimeTransport = { kind: "t", probe: async () => { called = true; return { health: allbHealth, transport: "t", endpoint: "x" }; } };
  const result = await performRuntimeHandshake(spy, { ...opts, createRequestId: () => "bad id!" });
  assert.equal(result.state, "unavailable");
  assert.equal(called, false);
});

test("schema compatibility mirrors ALLB 1.0–1.1 rule", () => {
  for (const v of ["1.0.0", "1.1.0", "1.1.9"]) assert.ok(isCompatibleContractVersion(v), v);
  for (const v of ["1.2.0", "0.9.0", "2.0.0", "1.1", "v1.1.0", 110]) assert.ok(!isCompatibleContractVersion(v), String(v));
  assert.equal(parseRuntimeCapabilities({}), null);
  assert.equal(parseRuntimeCapabilities([{ id: "brahmi:tokenize", available: true, mode: "Quantum", detail: "" }]), null);
});

test("loopback transport refuses non-loopback or credentialed URLs", () => {
  for (const url of ["https://api.example.com", "http://192.168.1.2:8787", "http://u:p@127.0.0.1:8787", "http://127.0.0.1:8787/x", "file:///etc"]) {
    assert.ok(!isLoopbackRuntimeUrl(url), url);
    assert.throws(() => createLoopbackHealthTransport(url, fetch as never));
  }
  assert.ok(isLoopbackRuntimeUrl("http://127.0.0.1:8787"));
});

async function withServer(routes: Record<string, [number, unknown]>, run: (base: string, seen: string[]) => Promise<void>) {
  const seen: string[] = [];
  const server = createServer((req, res) => {
    seen.push(`${req.method} ${req.url} ${req.headers["x-maataa-request-id"]}`);
    const [status, body] = routes[req.url ?? ""] ?? [404, { error: "not found" }];
    res.statusCode = status;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(body));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  try { await run(`http://127.0.0.1:${port}`, seen); } finally { server.close(); }
}
const wasmCaps = [
  { id: "brahmi:tokenize", available: true, mode: "SoftwareWasm", detail: "Rust compiled to WebAssembly tokenizer" },
  { id: "siddham:npu", available: false, mode: "SiddhamNpu", detail: "not detected" },
];

test("loopback transport reads /capabilities when the worker provides it", async () => {
  await withServer({ "/health": [200, allbHealth], "/capabilities": [200, { contractVersion: "1.1.0", capabilities: wasmCaps }] }, async (base, seen) => {
    const result = await performRuntimeHandshake(createLoopbackHealthTransport(base, fetch as never), { ...opts, requestedCapabilities: ["brahmi:tokenize", "siddham:npu"] });
    assert.equal(result.state, "connected");
    assert.equal(result.capabilitiesReported, true);
    assert.deepEqual(result.missingCapabilities, ["siddham:npu"]);
    assert.deepEqual(seen, ["GET /health req-00000001", "GET /capabilities req-00000001"]);
  });
});

test("capability report with a different contract version or extra fields fails closed", async () => {
  for (const body of [{ contractVersion: "1.0.0", capabilities: wasmCaps }, { contractVersion: "1.1.0", capabilities: wasmCaps, k7: true }, { contractVersion: "1.1.0" }]) {
    await withServer({ "/health": [200, allbHealth], "/capabilities": [200, body] }, async (base) => {
      const result = await performRuntimeHandshake(createLoopbackHealthTransport(base, fetch as never), opts);
      assert.equal(result.state, "incompatible", JSON.stringify(body));
      assert.ok(result.reasons.includes("malformed-capabilities"));
    });
  }
  await withServer({ "/health": [200, allbHealth], "/capabilities": [500, { error: "x" }] }, async (base) => {
    const result = await performRuntimeHandshake(createLoopbackHealthTransport(base, fetch as never), opts);
    assert.equal(result.state, "incompatible");
  });
});

test("loopback HTTP transport performs a real request against a synthetic local server", async () => {
  const seen: string[] = [];
  const server = createServer((req, res) => {
    seen.push(`${req.method} ${req.url} ${req.headers["x-maataa-request-id"]}`);
    res.setHeader("content-type", "application/json");
    if (req.url === "/capabilities") { res.statusCode = 404; res.end("{}"); return; }
    res.end(JSON.stringify(allbHealth));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  try {
    const transport = createLoopbackHealthTransport(`http://127.0.0.1:${port}`, fetch as never);
    const result = await performRuntimeHandshake(transport, opts);
    assert.equal(result.state, "connected");
    assert.equal(result.evidence.transport, "http-loopback");
    assert.equal(result.capabilitiesReported, false, "older worker without /capabilities stays unreported");
    assert.deepEqual(seen, ["GET /health req-00000001", "GET /capabilities req-00000001"]);
  } finally {
    server.close();
  }
});
