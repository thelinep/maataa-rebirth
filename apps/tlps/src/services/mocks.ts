// In-memory adapters. They exist so the app and tests can run without a server.
// None of them books, pays, clears or authenticates anything real.
import {
  ServiceError,
  type AuthService,
  type BookingService,
  type LegalClearanceService,
  type PaymentService,
  type ProjectEvent,
  type ProjectStore,
  type SessionIdentity,
  type StoredProject,
  type TlpsServices,
} from "./contracts";

export async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return `sha256:${Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("")}`;
}

const byteLength = (text: string) => new TextEncoder().encode(text).length;
let sequence = 0;
const nextId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${(sequence++).toString(36)}`;

export function createMockAuth(): AuthService {
  let session: SessionIdentity | null = null;
  return {
    mode: "mock",
    async connect(credential) {
      const name = credential.trim();
      if (!name) throw new ServiceError("invalid", "Enter a name for the mock session.");
      session = { principalId: `mock:${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`, projectId: "prj:00000000-0000-4000-8000-000000000000", scopes: ["project:read", "project:write"], expiresAt: null, mode: "mock" };
      return session;
    },
    current: () => session,
    disconnect() { session = null; },
  };
}

export function createMockProjectStore(auth: AuthService, now: () => number = () => Math.floor(Date.now() / 1000)): ProjectStore {
  let project: StoredProject | null = null;
  const log: ProjectEvent[] = [];
  const requireSession = () => {
    const session = auth.current();
    if (!session) throw new ServiceError("not-connected", "Connect first.");
    return session;
  };
  const requireProject = () => {
    if (!project) throw new ServiceError("not-found", "No project yet. Open one first.");
    return project;
  };
  return {
    mode: "mock",
    async open(title) {
      const session = requireSession();
      if (!project) {
        const clean = title.trim().slice(0, 120);
        if (!clean) throw new ServiceError("invalid", "A project title is required.");
        project = { projectId: session.projectId, title: clean, currentVersion: 0, versions: [] };
        log.push({ action: "project.created", version: 0, recordedAt: now() });
      }
      return structuredClone(project);
    },
    async read() { requireSession(); return structuredClone(requireProject()); },
    async saveVersion({ baseVersion, summary, planJson }) {
      requireSession();
      const current = requireProject();
      if (baseVersion !== current.currentVersion) throw new ServiceError("conflict", `Version ${current.currentVersion} is newer than your copy (v${baseVersion}). Reload and save again.`);
      const text = summary.trim();
      if (!text || text.length > 280) throw new ServiceError("invalid", "A summary of 1–280 characters is required.");
      const version = current.currentVersion + 1;
      project = { ...current, currentVersion: version, versions: [...current.versions, { version, summary: text, recordedAt: now(), planDigest: await sha256Hex(planJson), planBytes: byteLength(planJson) }] };
      log.push({ action: "project.updated", version, recordedAt: now() });
      return structuredClone(project);
    },
    async events() { requireSession(); return [...log]; },
  };
}

export const mockBookings: BookingService = {
  mode: "mock",
  async requestHold(input) {
    if (!input.name.trim()) throw new ServiceError("invalid", "Name the resource to hold.");
    return { holdId: nextId("hold"), status: "not-confirmed", note: `Mock hold for ${input.name.trim()} on ${input.date || "an open date"}. Nothing was reserved; confirm directly with the provider.` };
  },
};

export const mockPayments: PaymentService = {
  mode: "mock",
  async draftPaymentRequest(input) {
    if (!(input.amount > 0)) throw new ServiceError("invalid", "Amount must be more than zero.");
    return { requestId: nextId("payreq"), status: "draft-not-sent", note: `Draft request of ${input.currency} ${input.amount} to ${input.payee || "an unnamed payee"}. No money moves and nothing was sent.` };
  },
};

export const mockLegal: LegalClearanceService = {
  mode: "mock",
  async submitForReview(input) {
    if (!input.subject.trim()) throw new ServiceError("invalid", "Describe what needs clearance.");
    return { reviewId: nextId("legal"), status: "awaiting-human-review", note: `Queued locally for a person to review (${input.kind}). This is not legal advice or a clearance.` };
  },
};

export function createMockServices(): TlpsServices {
  const auth = createMockAuth();
  return { auth, projects: createMockProjectStore(auth), bookings: mockBookings, payments: mockPayments, legal: mockLegal };
}
