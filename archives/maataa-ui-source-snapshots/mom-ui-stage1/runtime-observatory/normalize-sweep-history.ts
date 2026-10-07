import type { EvidenceStatus, SweepHistoryItem } from "./types.js";

export function normalizeSweepHistory(fullSweep: Record<string, unknown> | undefined): SweepHistoryItem[] {
  if (!fullSweep) {
    return [missing("full-sweep", "Full sweep evidence")];
  }
  const generatedAt = typeof fullSweep.generatedAt === "string" ? fullSweep.generatedAt : undefined;
  const summary = getObject(fullSweep, "summary");
  const items = Array.isArray(summary?.items) ? summary.items : [];
  const normalized = items.map((item, index) => normalizeSummaryItem(item, index, generatedAt));
  const directShell = normalizeDirectShell(fullSweep, generatedAt);
  const nodeFailures = normalizeNodeLocalhostFailures(fullSweep, generatedAt);
  return [...normalized, ...directShell, ...nodeFailures];
}

function normalizeSummaryItem(item: unknown, index: number, generatedAt?: string): SweepHistoryItem {
  const record = isRecord(item) ? item : {};
  const rawStatus = stringValue(record.status) ?? "not-recorded";
  const classification = stringValue(record.classification) ?? "not-recorded";
  return {
    id: stringValue(record.id) ?? `summary-${index}`,
    label: stringValue(record.label) ?? `Summary item ${index + 1}`,
    status: toEvidenceStatus(rawStatus, classification),
    classification,
    command: stringValue(record.command),
    durationMs: numberValue(record.durationMs),
    generatedAt,
    evidence: stringValue(record.command) ?? rawStatus
  };
}

function normalizeDirectShell(fullSweep: Record<string, unknown>, generatedAt?: string): SweepHistoryItem[] {
  const direct = getObject(fullSweep, "directShellRouteEvidence");
  const probes = Array.isArray(direct?.probes) ? direct.probes : [];
  return probes.map((probe, index) => {
    const record = isRecord(probe) ? probe : {};
    const ok = record.ok === true;
    return {
      id: `direct-shell-${index}`,
      label: stringValue(record.url) ?? `Direct shell route ${index + 1}`,
      status: ok ? "pass" : "fail",
      classification: stringValue(record.classification) ?? "direct-shell",
      command: "direct shell curl -sSI",
      generatedAt: stringValue(direct?.generatedAt) ?? generatedAt,
      evidence: `${stringValue(record.probeMethod) ?? "direct-shell"} status ${numberValue(record.status) ?? "Not recorded"}`
    };
  });
}

function normalizeNodeLocalhostFailures(fullSweep: Record<string, unknown>, generatedAt?: string): SweepHistoryItem[] {
  const post = getObject(fullSweep, "postRestartRouteReadiness");
  const routes = Array.isArray(post?.routes) ? post.routes : [];
  return routes.slice(0, 8).map((route, index) => {
    const record = isRecord(route) ? route : {};
    const ok = record.ok === true;
    return {
      id: `node-localhost-${stringValue(record.id) ?? index}`,
      label: `${stringValue(record.id) ?? `Route ${index + 1}`} Node/local probe`,
      status: ok ? "pass" : "warn",
      classification: ok ? "route-ready" : "sandbox-limitation",
      command: stringValue(record.probeMethod) ?? "node-localhost-probe",
      durationMs: numberValue(record.durationMs),
      generatedAt: stringValue(post?.generatedAt) ?? generatedAt,
      evidence: ok ? "Node/local probe succeeded" : (stringValue(record.error) ?? "Node-localhost route probe failed")
    };
  });
}

function missing(id: string, label: string): SweepHistoryItem {
  return { id, label, status: "missing", classification: "missing", evidence: "Evidence missing" };
}

function toEvidenceStatus(status: string, classification: string): EvidenceStatus {
  if (status === "pass" && classification === "preview-only") return "preview-pass";
  if (status === "pass") return "pass";
  if (status === "fail" && classification === "blocked") return "blocked";
  if (status === "fail") return "fail";
  if (status === "blocked") return "blocked";
  return "not-recorded";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getObject(source: unknown, key: string): Record<string, unknown> | undefined {
  if (!isRecord(source)) return undefined;
  const value = source[key];
  return isRecord(value) ? value : undefined;
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function numberValue(value: unknown) {
  return typeof value === "number" ? value : undefined;
}
