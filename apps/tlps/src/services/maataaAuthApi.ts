// Adapters for the local MAATAA Auth + API runtime (apps/maataa-auth-api, v1 routes).
// Two routes reach it, chosen at runtime:
// - "desktop": inside MAATAA Desktop (Tauri), every call goes through Desktop commands.
//   Desktop holds the bearer token in its own process (this page never keeps it), only
//   forwards an allow-list of project routes to 127.0.0.1, and links its project entry
//   to the API project ID and version it sees in the responses.
// - "dev-proxy": in a browser, through the Vite dev/preview proxy at /api/maataa (the
//   service binds to 127.0.0.1 and has no CORS policy). The token is held in memory only.
// The server keeps the project record: titles, version summaries and the SHA-256 of each
// plan snapshot. The plan body stays in this app. Times are Unix milliseconds.
import {
  approveVersion,
  createProjectRecord,
  hostUnixMs,
  previewVersion,
  validateProjectRecord,
  type ArtifactRef,
  type ProjectRecord,
  type VersionProposal,
} from "../../../shared/contracts/project-record.ts";
import { tlpsStorageKey } from "../workflow";
import {
  ServiceError,
  type AuthService,
  type ProjectEvent,
  type ProjectStore,
  type SessionIdentity,
  type StoredProject,
  type TlpsServices,
} from "./contracts";
import { mockBookings, mockLegal, mockPayments, sha256Hex } from "./mocks";

export const MAATAA_API_BASE = "/api/maataa";
const PROJECT_ID = /^prj:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
/** The server matches the raw path, so the ID is checked and sent unescaped (":" must not become "%3A"). */
const projectPath = (id: string) => {
  if (!PROJECT_ID.test(id)) throw new ServiceError("invalid", "The session has an unexpected project ID.");
  return id;
};
type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;
type Invoke = (command: string, args?: Record<string, unknown>) => Promise<unknown>;
type Method = "GET" | "POST" | "PUT";

export interface ApiResponse { status: number; body: string }

/** How requests reach the API. The transport, not the adapter, holds the token. */
export interface MaataaApiTransport {
  readonly route: "desktop" | "dev-proxy";
  /** Checks the token with /v1/auth/whoami and keeps it only when the server accepts it. */
  connect(token: string): Promise<ApiResponse>;
  disconnect(): Promise<void>;
  request(method: Method, path: string, body?: string, ifMatch?: number): Promise<ApiResponse>;
}

const UNREACHABLE: Record<MaataaApiTransport["route"], string> = {
  "desktop": "MAATAA Desktop could not reach the MAATAA Auth API on this computer. Start it with cargo run in apps/maataa-auth-api.",
  "dev-proxy": "The MAATAA Auth API is not reachable. Start it with cargo run in apps/maataa-auth-api.",
};

/** Browser route: the Vite proxy at `base`. The token lives in this closure only. */
export function createHttpTransport(fetchImpl: FetchLike = (i, init) => fetch(i, init), base = MAATAA_API_BASE): MaataaApiTransport {
  let secret: string | null = null;
  const send = async (token: string, method: Method, path: string, body?: string, ifMatch?: number): Promise<ApiResponse> => {
    const headers: Record<string, string> = { authorization: `Bearer ${token}` };
    if (body !== undefined) headers["content-type"] = "application/json";
    if (ifMatch !== undefined) headers["if-match"] = String(ifMatch);
    let response: Response;
    try {
      response = await fetchImpl(`${base}${path}`, { method, headers, ...(body !== undefined ? { body } : {}) });
    } catch {
      throw new ServiceError("unavailable", UNREACHABLE["dev-proxy"]);
    }
    return { status: response.status, body: await response.text().catch(() => "") };
  };
  return {
    route: "dev-proxy",
    async connect(token) {
      const response = await send(token, "GET", "/v1/auth/whoami");
      if (response.status === 200) secret = token;
      return response;
    },
    async disconnect() { secret = null; },
    async request(method, path, body, ifMatch) {
      if (!secret) throw new ServiceError("not-connected", "Connect with a project token first.");
      return send(secret, method, path, body, ifMatch);
    },
  };
}

/** Desktop route: Tauri commands. Desktop keeps the token and forwards allow-listed routes. */
export function createDesktopTransport(invoke: Invoke): MaataaApiTransport {
  const call = async (command: string, args?: Record<string, unknown>): Promise<ApiResponse> => {
    let raw: unknown;
    try {
      raw = await invoke(command, args);
    } catch (error) {
      const message = typeof error === "string" ? error : "";
      if (message.startsWith("not-connected")) throw new ServiceError("not-connected", "Connect with a project token first.");
      if (message.startsWith("invalid")) throw new ServiceError("invalid", "MAATAA Desktop refused this request.");
      throw new ServiceError("unavailable", UNREACHABLE.desktop);
    }
    const value = raw as Partial<ApiResponse> | null;
    if (!value || typeof value.status !== "number" || typeof value.body !== "string") throw new ServiceError("unavailable", "MAATAA Desktop returned an unexpected response.");
    return { status: value.status, body: value.body };
  };
  return {
    route: "desktop",
    connect: (token) => call("api_connect", { token }),
    async disconnect() { await invoke("api_disconnect").catch(() => undefined); },
    request: (method, path, body, ifMatch) => call("api_request", { method, path, body: body ?? null, ifMatch: ifMatch ?? null }),
  };
}

/** Desktop when this page runs in a MAATAA Desktop window, the dev proxy otherwise. */
export function defaultMaataaTransport(): MaataaApiTransport {
  const invoke = (globalThis as { __TAURI__?: { core?: { invoke?: Invoke } } }).__TAURI__?.core?.invoke;
  return invoke ? createDesktopTransport(invoke) : createHttpTransport();
}

const ERROR_CODES: Record<number, ServiceError["code"]> = { 400: "invalid", 401: "unauthorized", 403: "forbidden", 404: "not-found", 409: "conflict", 412: "conflict", 428: "invalid" };

function decode<T>(response: ApiResponse): T {
  let body: (T & { error?: { code?: string } }) | null = null;
  try { body = response.body ? JSON.parse(response.body) : null; } catch { body = null; }
  if (response.status < 200 || response.status > 299) {
    const code = ERROR_CODES[response.status] ?? "unavailable";
    throw new ServiceError(code, `MAATAA Auth API refused the request (${response.status} ${body?.error?.code ?? "error"}).`);
  }
  return body as T;
}

const toTransport = (source?: FetchLike | MaataaApiTransport, base?: string): MaataaApiTransport =>
  source === undefined ? defaultMaataaTransport() : typeof source === "function" ? createHttpTransport(source, base) : source;

export function createMaataaAuth(source?: FetchLike | MaataaApiTransport, base?: string): AuthService & { readonly transport: MaataaApiTransport } {
  const transport = toTransport(source, base);
  let session: SessionIdentity | null = null;
  return {
    mode: "maataa-auth-api",
    transport,
    async connect(credential) {
      const token = credential.trim();
      if (!token) throw new ServiceError("invalid", "Paste the project token an administrator issued for you.");
      const who = decode<{ principal_id: string; project_id: string; scopes: string[]; expires_at: number }>(await transport.connect(token));
      session = { principalId: who.principal_id, projectId: who.project_id, scopes: who.scopes, expiresAt: hostUnixMs(who.expires_at), mode: "maataa-auth-api" };
      return session;
    },
    current: () => session,
    disconnect() { session = null; void transport.disconnect(); },
  };
}

function toStored(record: ProjectRecord): StoredProject {
  return {
    projectId: record.projectId,
    title: record.title,
    currentVersion: record.currentVersion,
    versions: record.versions.map((version) => {
      const plan = version.artifacts.find((artifact) => artifact.storage.localKey === tlpsStorageKey);
      return { version: version.version, summary: version.summary, recordedAt: hostUnixMs(version.recordedAt), planDigest: plan?.sha256 ?? "", planBytes: plan?.bytes ?? 0 };
    }),
  };
}

export function createMaataaProjectStore(auth: ReturnType<typeof createMaataaAuth>): ProjectStore {
  const { transport } = auth;
  const session = () => {
    const current = auth.current();
    if (!current) throw new ServiceError("not-connected", "Connect with a project token first.");
    return current;
  };
  const readRecord = async () => {
    const record = decode<ProjectRecord>(await transport.request("GET", `/v1/projects/${projectPath(session().projectId)}`));
    const errors = validateProjectRecord(record);
    if (errors.length) throw new ServiceError("invalid", `The server returned an unexpected record (${errors.join(", ")}).`);
    return record;
  };
  return {
    mode: "maataa-auth-api",
    async open(title) {
      const { projectId } = session();
      try {
        return toStored(await readRecord());
      } catch (error) {
        if (!(error instanceof ServiceError) || error.code !== "not-found") throw error;
      }
      const record = createProjectRecord({ title, domain: "film-production", ownerApp: "tlps", projectId });
      decode(await transport.request("POST", "/v1/projects", JSON.stringify(record)));
      return toStored(record);
    },
    async read() { return toStored(await readRecord()); },
    async saveVersion({ baseVersion, summary, planJson }) {
      const record = await readRecord();
      if (record.currentVersion !== baseVersion) throw new ServiceError("conflict", `The server has version ${record.currentVersion}; you started from v${baseVersion}. Reload and save again.`);
      const plan: ArtifactRef = {
        artifactId: `plan-v${record.currentVersion + 1}`,
        kind: "document",
        storage: { app: "tlps", localKey: tlpsStorageKey },
        sha256: await sha256Hex(planJson),
        bytes: new TextEncoder().encode(planJson).length,
        origin: { kind: "user-input", models: [] },
      };
      const proposal: VersionProposal = { projectId: record.projectId, baseVersion, summary, artifacts: [plan], checks: [], proposedBy: "tlps" };
      const preview = await previewVersion(record, proposal);
      if (preview.errors.length) throw new ServiceError("invalid", `This version cannot be saved (${preview.errors.join(", ")}).`);
      const { record: next } = await approveVersion(record, preview, { proposalDigest: preview.digest, decidedBy: "local-user" }, [], "tlps:server-save");
      decode(await transport.request("PUT", `/v1/projects/${projectPath(record.projectId)}`, JSON.stringify(next), baseVersion));
      // The server stamps version times itself; show what it stored.
      return toStored(await readRecord());
    },
    async events() {
      const body = decode<{ events: { action: string; projectVersion: number; recordedAt: number }[] }>(await transport.request("GET", `/v1/projects/${projectPath(session().projectId)}/events`));
      return body.events.map((event): ProjectEvent => ({ action: event.action, version: event.projectVersion, recordedAt: hostUnixMs(event.recordedAt) }));
    },
  };
}

/** With no arguments the route is chosen at runtime (Desktop commands, else the dev proxy). */
export function createMaataaServices(source?: FetchLike | MaataaApiTransport, base?: string): TlpsServices {
  const auth = createMaataaAuth(source, base);
  return { auth, projects: createMaataaProjectStore(auth), bookings: mockBookings, payments: mockPayments, legal: mockLegal };
}
