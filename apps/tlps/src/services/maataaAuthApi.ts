// Adapters for the local MAATAA Auth + API runtime (apps/maataa-auth-api, v1 routes).
// The browser reaches it through the Vite proxy at /api/maataa (the service binds to
// 127.0.0.1 and has no CORS policy). The bearer token is held in memory only and is never
// written to browser storage. The server keeps the project record: titles, version summaries
// and the SHA-256 of each plan snapshot. The plan body stays in this browser.
import {
  approveVersion,
  createProjectRecord,
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

const ERROR_CODES: Record<number, ServiceError["code"]> = { 400: "invalid", 401: "unauthorized", 403: "forbidden", 404: "not-found", 409: "conflict", 412: "conflict", 428: "invalid" };

async function call<T>(fetchImpl: FetchLike, base: string, token: string, path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetchImpl(`${base}${path}`, { ...init, headers: { ...(init.headers ?? {}), authorization: `Bearer ${token}`, ...(init.body ? { "content-type": "application/json" } : {}) } });
  } catch {
    throw new ServiceError("unavailable", "The MAATAA Auth API is not reachable. Start it with cargo run in apps/maataa-auth-api.");
  }
  const body = await response.json().catch(() => null) as (T & { error?: { code?: string } }) | null;
  if (!response.ok) {
    const code = ERROR_CODES[response.status] ?? "unavailable";
    throw new ServiceError(code, `MAATAA Auth API refused the request (${response.status} ${body?.error?.code ?? "error"}).`);
  }
  return body as T;
}

export function createMaataaAuth(fetchImpl: FetchLike = (i, init) => fetch(i, init), base = MAATAA_API_BASE): AuthService & { token(): string | null } {
  let session: SessionIdentity | null = null;
  let secret: string | null = null;
  return {
    mode: "maataa-auth-api",
    async connect(credential) {
      const token = credential.trim();
      if (!token) throw new ServiceError("invalid", "Paste the project token an administrator issued for you.");
      const who = await call<{ principal_id: string; project_id: string; scopes: string[]; expires_at: number }>(fetchImpl, base, token, "/v1/auth/whoami");
      secret = token;
      session = { principalId: who.principal_id, projectId: who.project_id, scopes: who.scopes, expiresAt: who.expires_at, mode: "maataa-auth-api" };
      return session;
    },
    current: () => session,
    disconnect() { session = null; secret = null; },
    token: () => secret,
  };
}

function toStored(record: ProjectRecord): StoredProject {
  return {
    projectId: record.projectId,
    title: record.title,
    currentVersion: record.currentVersion,
    versions: record.versions.map((version) => {
      const plan = version.artifacts.find((artifact) => artifact.storage.localKey === tlpsStorageKey);
      return { version: version.version, summary: version.summary, recordedAt: version.recordedAt, planDigest: plan?.sha256 ?? "", planBytes: plan?.bytes ?? 0 };
    }),
  };
}

export function createMaataaProjectStore(auth: ReturnType<typeof createMaataaAuth>, fetchImpl: FetchLike = (i, init) => fetch(i, init), base = MAATAA_API_BASE): ProjectStore {
  const credentials = () => {
    const session = auth.current();
    const token = auth.token();
    if (!session || !token) throw new ServiceError("not-connected", "Connect with a project token first.");
    return { session, token };
  };
  const readRecord = async () => {
    const { session, token } = credentials();
    const record = await call<ProjectRecord>(fetchImpl, base, token, `/v1/projects/${projectPath(session.projectId)}`);
    const errors = validateProjectRecord(record);
    if (errors.length) throw new ServiceError("invalid", `The server returned an unexpected record (${errors.join(", ")}).`);
    return record;
  };
  return {
    mode: "maataa-auth-api",
    async open(title) {
      const { session, token } = credentials();
      try {
        return toStored(await readRecord());
      } catch (error) {
        if (!(error instanceof ServiceError) || error.code !== "not-found") throw error;
      }
      const record = createProjectRecord({ title, domain: "film-production", ownerApp: "tlps", projectId: session.projectId });
      await call(fetchImpl, base, token, "/v1/projects", { method: "POST", body: JSON.stringify(record) });
      return toStored(record);
    },
    async read() { return toStored(await readRecord()); },
    async saveVersion({ baseVersion, summary, planJson }) {
      const { token } = credentials();
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
      const { record: next } = await approveVersion(record, preview, { proposalDigest: preview.digest, decidedBy: "local-user" }, [], "tlps:server-save", () => Math.floor(Date.now() / 1000));
      await call(fetchImpl, base, token, `/v1/projects/${projectPath(record.projectId)}`, { method: "PUT", headers: { "if-match": String(baseVersion) }, body: JSON.stringify(next) });
      return toStored(next);
    },
    async events() {
      const { session, token } = credentials();
      const body = await call<{ events: { action: string; projectVersion: number; recordedAt: number }[] }>(fetchImpl, base, token, `/v1/projects/${projectPath(session.projectId)}/events`);
      return body.events.map((event): ProjectEvent => ({ action: event.action, version: event.projectVersion, recordedAt: event.recordedAt }));
    },
  };
}

export function createMaataaServices(fetchImpl?: FetchLike, base?: string): TlpsServices {
  const auth = createMaataaAuth(fetchImpl, base);
  return { auth, projects: createMaataaProjectStore(auth, fetchImpl, base), bookings: mockBookings, payments: mockPayments, legal: mockLegal };
}
