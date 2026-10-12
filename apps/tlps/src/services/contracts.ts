// Service boundaries for TLPS. The app talks only to these interfaces.
// "mock" adapters run in memory and never claim a real outcome; the "maataa-auth-api"
// adapters call the local MAATAA Auth + API runtime (apps/maataa-auth-api).

export type ServiceMode = "mock" | "maataa-auth-api";

export class ServiceError extends Error {
  constructor(
    readonly code: "unauthorized" | "forbidden" | "not-found" | "conflict" | "invalid" | "unavailable" | "not-connected",
    message: string,
  ) {
    super(message);
    this.name = "ServiceError";
  }
}

export interface SessionIdentity {
  principalId: string;
  projectId: string;
  scopes: string[];
  /** Unix milliseconds; null for mock sessions. */
  expiresAt: number | null;
  mode: ServiceMode;
}

export interface AuthService {
  readonly mode: ServiceMode;
  /** Mock: any non-empty name. MAATAA Auth API: a project-scoped bearer token issued by an administrator. */
  connect(credential: string): Promise<SessionIdentity>;
  current(): SessionIdentity | null;
  disconnect(): void;
}

export interface StoredVersion {
  version: number;
  summary: string;
  /** Unix milliseconds (host clock, unverified). */
  recordedAt: number;
  /** SHA-256 of the plan snapshot; the plan body itself stays in this browser. */
  planDigest: string;
  planBytes: number;
}

export interface StoredProject {
  projectId: string;
  title: string;
  currentVersion: number;
  versions: StoredVersion[];
}

export interface ProjectEvent {
  action: string;
  version: number;
  recordedAt: number;
}

export interface ProjectStore {
  readonly mode: ServiceMode;
  /** Creates the project for the connected session, or returns the existing one. */
  open(title: string): Promise<StoredProject>;
  read(): Promise<StoredProject>;
  /** Saves a new version. Fails with "conflict" when baseVersion is not the current version. */
  saveVersion(input: { baseVersion: number; summary: string; planJson: string }): Promise<StoredProject>;
  events(): Promise<ProjectEvent[]>;
}

export interface BookingService {
  readonly mode: "mock";
  requestHold(input: { resourceKind: string; name: string; date: string }): Promise<{ holdId: string; status: "not-confirmed"; note: string }>;
}

export interface PaymentService {
  readonly mode: "mock";
  draftPaymentRequest(input: { payee: string; amount: number; currency: string; purpose: string }): Promise<{ requestId: string; status: "draft-not-sent"; note: string }>;
}

export type ClearanceKind = "location-permit" | "talent-release" | "music-licence" | "contract";
export interface LegalClearanceService {
  readonly mode: "mock";
  submitForReview(input: { subject: string; kind: ClearanceKind }): Promise<{ reviewId: string; status: "awaiting-human-review"; note: string }>;
}

export interface TlpsServices {
  auth: AuthService;
  projects: ProjectStore;
  bookings: BookingService;
  payments: PaymentService;
  legal: LegalClearanceService;
}
