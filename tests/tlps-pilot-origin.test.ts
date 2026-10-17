// @vitest-environment node
// The hosted pilot origin (tlps.in) reaches the Auth/API only over its private
// Unix socket, forwards only allow-listed routes and headers, and limits each
// client address. Runs the real script against a stub API on a temp socket.
import { spawn, type ChildProcess } from "node:child_process";
import { chmodSync, mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import http from "node:http";
import net from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const script = path.resolve(__dirname, "../scripts/tlps/pilot-origin.mjs");
const running: Array<{ stop: () => void }> = [];
afterEach(() => { while (running.length) running.pop()!.stop(); });

async function freePort(): Promise<number> {
  return new Promise((done) => {
    const probe = net.createServer().listen(0, "127.0.0.1", () => {
      const { port } = probe.address() as net.AddressInfo;
      probe.close(() => done(port));
    });
  });
}

function fixture(mode = 0o700) {
  // Short base path: Unix socket paths are limited to about 104 bytes on macOS.
  const base = mkdtempSync(path.join(process.platform === "darwin" ? "/tmp" : tmpdir(), "po-"));
  const web = path.join(base, "web");
  mkdirSync(web);
  writeFileSync(path.join(web, "index.html"), "<!doctype html><title>TLPS</title>");
  const run = path.join(base, "run");
  mkdirSync(run);
  chmodSync(run, mode);
  return { web, socket: path.join(run, "api.sock") };
}

async function stubApi(socket: string) {
  const seen: Array<{ method: string; url: string; headers: http.IncomingHttpHeaders }> = [];
  const server = http.createServer((req, res) => {
    seen.push({ method: req.method!, url: req.url!, headers: req.headers });
    req.resume();
    req.on("end", () => { res.writeHead(200, { "content-type": "application/json", "x-request-id": "r-1" }); res.end('{"ok":true}'); });
  });
  await new Promise<void>((done) => server.listen(socket, done));
  running.push({ stop: () => server.close() });
  return seen;
}

async function startOrigin(env: Record<string, string>): Promise<{ child: ChildProcess; output: () => string }> {
  const child = spawn(process.execPath, [script], { env: { PATH: process.env.PATH ?? "", HOME: process.env.HOME ?? "", ...env }, stdio: ["ignore", "pipe", "pipe"] });
  let text = "";
  child.stdout!.on("data", (d) => { text += d; });
  child.stderr!.on("data", (d) => { text += d; });
  running.push({ stop: () => child.kill() });
  await new Promise<void>((done) => {
    const check = () => (text.includes("TLPS origin ready") || child.exitCode !== null ? done() : setTimeout(check, 20));
    child.on("exit", () => done());
    check();
  });
  return { child, output: () => text };
}

async function call(port: number, method: string, url: string, headers: Record<string, string> = {}, body?: string) {
  const res = await fetch(`http://127.0.0.1:${port}${url}`, { method, headers: { host: `127.0.0.1:${port}`, ...headers }, body });
  return { status: res.status, headers: res.headers, text: await res.text() };
}

describe("TLPS pilot origin", () => {
  it("forwards allow-listed routes over the private socket with only the allowed headers", async () => {
    const { web, socket } = fixture();
    const seen = await stubApi(socket);
    const port = await freePort();
    const origin = await startOrigin({ TLPS_WEB_ROOT: web, TLPS_ORIGIN_PORT: String(port), TLPS_API_SOCKET: socket });
    expect(origin.output()).toContain("API via private socket");

    const id = "prj:11111111-2222-4333-8444-555555555555";
    const reply = await call(port, "DELETE", `/api/maataa/v1/projects/${id}`, { authorization: "Bearer mta_x", cookie: "session=1", "x-forwarded-host": "evil" });
    expect(reply.status).toBe(200);
    expect(reply.headers.get("x-request-id")).toBe("r-1");
    expect(seen).toHaveLength(1);
    expect(seen[0]).toMatchObject({ method: "DELETE", url: `/v1/projects/${id}` });
    expect(seen[0].headers.authorization).toBe("Bearer mta_x");
    expect(seen[0].headers.cookie).toBeUndefined();
    expect(seen[0].headers["x-forwarded-host"]).toBeUndefined();

    for (const blocked of ["/api/maataa/v1/admin/tokens", "/api/maataa/v1/knowledge/objects", "/api/maataa/readyz"]) {
      expect((await call(port, "POST", blocked, { authorization: "Bearer x" }, "{}")).status, blocked).toBe(404);
    }
    expect(seen).toHaveLength(1);
    expect((await call(port, "GET", "/")).text).toContain("TLPS");
  });

  it("limits each client address and answers 429 with retry-after", async () => {
    const { web, socket } = fixture();
    await stubApi(socket);
    const port = await freePort();
    await startOrigin({ TLPS_WEB_ROOT: web, TLPS_ORIGIN_PORT: String(port), TLPS_API_SOCKET: socket, TLPS_RATE_BURST: "3", TLPS_RATE_PER_SECOND: "0.01" });
    const statuses: number[] = [];
    for (let i = 0; i < 4; i++) statuses.push((await call(port, "GET", "/api/maataa/v1/auth/whoami", { "cf-connecting-ip": "203.0.113.7" })).status);
    expect(statuses).toEqual([200, 200, 200, 429]);
    const other = await call(port, "GET", "/api/maataa/v1/auth/whoami", { "cf-connecting-ip": "198.51.100.9" });
    expect(other.status).toBe(200);
    const limited = await call(port, "GET", "/api/maataa/v1/auth/whoami", { "cf-connecting-ip": "203.0.113.7" });
    expect(limited.headers.get("retry-after")).toBe("1");
  });

  it("refuses a shared socket directory and an unconfirmed TCP API", async () => {
    const open = fixture(0o755);
    const port = await freePort();
    const shared = await startOrigin({ TLPS_WEB_ROOT: open.web, TLPS_ORIGIN_PORT: String(port), TLPS_API_SOCKET: open.socket });
    expect(shared.child.exitCode).not.toBe(0);
    expect(shared.output()).toContain("owner-only");

    const tcp = await startOrigin({ TLPS_WEB_ROOT: open.web, TLPS_ORIGIN_PORT: String(port), TLPS_API_ORIGIN: "http://127.0.0.1:4381" });
    expect(tcp.child.exitCode).not.toBe(0);
    expect(tcp.output()).toContain("development-only");
  });
});
