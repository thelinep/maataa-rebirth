import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://127.0.0.1:8791";

async function request(path, options) {
  const response = await fetch(new URL(path, base), options);
  const body = await response.json();
  return { response, body };
}

const health = await request("/api/health");
assert.equal(health.response.status, 200);
assert.equal(health.body.status, "alive");
assert.equal(health.body.runtime, "rust-wasm-worker");
assert.equal(health.body.scientificReadiness, "incomplete");
assert.deepEqual(new Set(health.body.pendingMethods), new Set([
  "astronomy-solar-system-positions",
  "panchanga-ruleset",
]));

const methods = await request("/api/methods");
assert.equal(methods.response.status, 200);
assert.equal(methods.body.schema, "hemant.method-registry/1");
assert.ok(methods.body.methods.some((item) => item.id === "cloudflare-worker-date-now-v1"));

const time = await request("/api/time");
assert.equal(time.response.status, 200);
assert.equal(time.body.schema, "hemant.time-result/2");
assert.equal(time.body.reading.source, "cloudflare-worker-date-now");
assert.equal(time.body.reading.verification, "unverified");
assert.equal(time.body.reading.uncertainty, "unknown");

const conversion = await request("/api/convert?unix_nanos=285148740000000000");
assert.equal(conversion.response.status, 200);
assert.equal(conversion.body.reading.source, "caller-supplied-unix-nanoseconds");
assert.equal(conversion.body.civil.utc, "1979-01-14 07:59:00.000000000 UTC");
assert.equal(conversion.body.elapsed.ahoratra, 0);

const invalid = await request("/api/convert?unix_nanos=abc");
assert.equal(invalid.response.status, 400);
const extra = await request("/api/convert?unix_nanos=285148740000000000&extra=1");
assert.equal(extra.response.status, 400);
const wrongMethod = await request("/api/time", { method: "POST" });
assert.equal(wrongMethod.response.status, 405);
assert.equal(wrongMethod.response.headers.get("allow"), "GET");
const missing = await request("/api/does-not-exist");
assert.equal(missing.response.status, 404);

console.log("Wrangler preview API routes pass health, provenance, conversion, and fail-closed HTTP checks.");
