import { describe, expect, it } from "vitest";
import { ServiceError } from "../apps/tlps/src/services/contracts";
import { createMaataaServices } from "../apps/tlps/src/services/maataaAuthApi";
import { createMockServices } from "../apps/tlps/src/services/mocks";

const PROJECT = "prj:c969a38a-cb19-44df-8618-6d2993ae9307";
const code = async (promise: Promise<unknown>) => promise.then(() => "resolved", (error) => error instanceof ServiceError ? error.code : String(error));

/** Small stand-in for apps/maataa-auth-api v1: whoami, project create/read/update with If-Match, events. */
function fakeServer() {
  let record: Record<string, unknown> | null = null;
  const events: { action: string; projectVersion: number; recordedAt: number }[] = [];
  const calls: { method: string; url: string; headers: Record<string, string> }[] = [];
  const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  const fetchImpl = async (url: string, init: RequestInit = {}) => {
    const method = init.method ?? "GET";
    const headers = init.headers as Record<string, string>;
    calls.push({ method, url, headers });
    if (headers.authorization !== "Bearer good-token") return json(401, { error: { code: "unauthorized" } });
    const path = url.replace("http://api", "");
    if (path === "/v1/auth/whoami") return json(200, { principal_id: "producer-1", project_id: PROJECT, scopes: ["project:read", "project:write"], expires_at: 2000000000 });
    if (path === "/v1/projects" && method === "POST") { record = JSON.parse(String(init.body)); events.push({ action: "project.created", projectVersion: 0, recordedAt: 1 }); return json(201, {}); }
    if (path === `/v1/projects/${PROJECT}/events`) return json(200, { events });
    if (path === `/v1/projects/${PROJECT}`) {
      if (method === "GET") return record ? json(200, record) : json(404, { error: { code: "not-found" } });
      if (method === "PUT") {
        const next = JSON.parse(String(init.body));
        if (Number(headers["if-match"]) !== (record?.currentVersion as number) || next.currentVersion !== Number(headers["if-match"]) + 1) return json(409, { error: { code: "version-conflict" } });
        record = next; events.push({ action: "project.updated", projectVersion: next.currentVersion, recordedAt: 2 }); return json(200, {});
      }
    }
    return json(403, { error: { code: "forbidden" } });
  };
  return { fetchImpl, calls, setVersion: (v: number) => { if (record) record = { ...record, currentVersion: v }; } };
}

describe("TLPS services · MAATAA Auth API adapters", () => {
  it("connects, opens, saves versions with If-Match and reads events", async () => {
    const server = fakeServer();
    const services = createMaataaServices(server.fetchImpl, "http://api");
    expect(await code(services.auth.connect("bad-token"))).toBe("unauthorized");
    expect(await code(services.projects.read())).toBe("not-connected");
    const session = await services.auth.connect("good-token");
    expect(session).toMatchObject({ principalId: "producer-1", projectId: PROJECT, mode: "maataa-auth-api" });
    const opened = await services.projects.open("River Festival");
    expect(opened).toMatchObject({ title: "River Festival", currentVersion: 0 });
    const saved = await services.projects.saveVersion({ baseVersion: 0, summary: "First plan", planJson: "{\"a\":1}" });
    expect(saved.currentVersion).toBe(1);
    expect(saved.versions[0].planDigest).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(saved.versions[0].planBytes).toBe(7);
    const put = server.calls.find((call) => call.method === "PUT")!;
    expect(put.url).toBe(`http://api/v1/projects/${PROJECT}`);
    expect(put.headers["if-match"]).toBe("0");
    expect(server.calls.every((call) => !call.url.includes("%3A"))).toBe(true);
    expect(await code(services.projects.saveVersion({ baseVersion: 0, summary: "stale", planJson: "{}" }))).toBe("conflict");
    expect((await services.projects.events()).map((event) => event.action)).toEqual(["project.created", "project.updated"]);
    services.auth.disconnect();
    expect(await code(services.projects.events())).toBe("not-connected");
  });

  it("reports an unreachable server as unavailable", async () => {
    const services = createMaataaServices(async () => { throw new TypeError("fetch failed"); }, "http://api");
    expect(await code(services.auth.connect("good-token"))).toBe("unavailable");
  });
});

describe("TLPS services · mocks", () => {
  it("never confirms bookings, payments or legal clearance", async () => {
    const services = createMockServices();
    expect((await services.bookings.requestHold({ resourceKind: "location", name: "Fort", date: "2027-02-03" })).status).toBe("not-confirmed");
    expect((await services.payments.draftPaymentRequest({ payee: "Vendor", amount: 100, currency: "INR", purpose: "Advance" })).status).toBe("draft-not-sent");
    expect((await services.legal.submitForReview({ subject: "Permit", kind: "location-permit" })).status).toBe("awaiting-human-review");
    expect(await code(services.payments.draftPaymentRequest({ payee: "Vendor", amount: 0, currency: "INR", purpose: "" }))).toBe("invalid");
  });

  it("keeps the same version and conflict rules as the server adapter", async () => {
    const services = createMockServices();
    expect(await code(services.projects.open("x"))).toBe("not-connected");
    await services.auth.connect("Asha");
    await services.projects.open("Plan");
    await services.projects.saveVersion({ baseVersion: 0, summary: "v1", planJson: "{}" });
    expect(await code(services.projects.saveVersion({ baseVersion: 0, summary: "v1 again", planJson: "{}" }))).toBe("conflict");
    expect((await services.projects.read()).currentVersion).toBe(1);
  });
});
