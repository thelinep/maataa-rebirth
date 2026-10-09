import wasmModule from "../target/wasm32-unknown-unknown/release/hemant_wasm.wasm";
import { validateUnixNanosInput } from "../lib/contract";
// @ts-expect-error OpenNext generates the server entry during its build.
import openNextWorker from "../.open-next/worker.js";

const OUTPUT_CAPACITY = 64 * 1024;
const noStore = { "Cache-Control": "no-store", "Content-Type": "application/json; charset=utf-8" };

const instantiated = await WebAssembly.instantiate(wasmModule);
const wasm = instantiated.exports;
const memoryExport = wasm.memory;
if (!(memoryExport instanceof WebAssembly.Memory)) throw new Error("Hemant Wasm module did not export memory");
const memory = memoryExport;

function callWasm(name: string, args: unknown[]): unknown {
  const exported = wasm[name];
  if (typeof exported !== "function") throw new Error(`Hemant Wasm export missing: ${name}`);
  return exported.call(undefined, ...args);
}

function callWasmNumber(name: string, args: unknown[]): number {
  const result = callWasm(name, args);
  if (typeof result !== "number" || !Number.isInteger(result)) throw new Error(`Hemant Wasm export returned invalid result: ${name}`);
  return result;
}

function splitI128(value: bigint): [bigint, bigint] {
  const bits = BigInt.asUintN(128, value);
  return [BigInt.asIntN(64, bits >> 64n), BigInt.asIntN(64, bits)];
}

function wasmJson(exportName: string, args: unknown[] = []): unknown {
  const pointer = callWasmNumber("hemant_alloc", [OUTPUT_CAPACITY]);
  if (pointer <= 0) throw new Error("Hemant Wasm output allocation failed");
  try {
    const length = callWasmNumber(exportName, [...args, pointer, OUTPUT_CAPACITY]);
    if (length < 0 || length > OUTPUT_CAPACITY) throw new Error(`Hemant Wasm operation failed with code ${length}`);
    const bytes = new Uint8Array(memory.buffer, pointer, length);
    return JSON.parse(new TextDecoder().decode(bytes));
  } finally {
    callWasm("hemant_free", [pointer, OUTPUT_CAPACITY]);
  }
}

function timeJson(unixNanos: bigint, source: 0 | 1): unknown {
  const [high, low] = splitI128(unixNanos);
  return wasmJson("hemant_time_result_json", [source, high, low]);
}

function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: noStore });
}

function onlyGet(request: Request): Response | null {
  return request.method === "GET" ? null : new Response(JSON.stringify({ error: "method not allowed" }), {
    status: 405,
    headers: { ...noStore, Allow: "GET" },
  });
}

export default {
  async fetch(
    request: Request,
    env: { ASSETS: { fetch(request: Request): Promise<Response> } },
    ctx: { waitUntil(promise: Promise<unknown>): void; passThroughOnException(): void; props?: unknown },
  ): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return openNextWorker.fetch(request, env, ctx);
    const methodError = onlyGet(request);
    if (methodError) return methodError;

    try {
      if (url.pathname === "/api/time") {
        const millis = Date.now();
        if (!Number.isSafeInteger(millis) || millis < 0) return json({ error: "runtime clock is outside supported range" }, 503);
        return json(timeJson(BigInt(millis) * 1_000_000n, 0));
      }
      if (url.pathname === "/api/convert") {
        if ([...url.searchParams.keys()].some((key) => key !== "unix_nanos")) return json({ error: "only the unix_nanos parameter is accepted" }, 400);
        const input = validateUnixNanosInput(url.searchParams.get("unix_nanos"));
        if (!input.ok) return json({ error: input.error }, 400);
        return json(timeJson(BigInt(input.value), 1));
      }
      if (url.pathname === "/api/methods") return json(wasmJson("hemant_method_registry_json"));
      if (url.pathname === "/api/health") {
        const registry = wasmJson("hemant_method_registry_json") as { methods?: { id: string; status: string }[] };
        if (!Array.isArray(registry.methods)) return json({ status: "unavailable", component: "hemant-observatory", runtime: "rust-wasm", error: "method registry contract failed" }, 502);
        const pendingMethods = registry.methods.filter((method) => method.status === "pending").map((method) => method.id);
        return json({
          status: "alive",
          component: "hemant-observatory",
          runtime: "rust-wasm-worker",
          scientificReadiness: pendingMethods.length === 0 ? "complete" : "incomplete",
          pendingMethods,
          domain: null,
          domainVerification: "not-verified-by-application",
        });
      }
      return json({ error: "not found" }, 404);
    } catch {
      return json({ error: "Hemant Worker runtime failed closed" }, 503);
    }
  },
};
