import type { BlockerLineageItem, EvidenceSeverity, EvidenceStatus } from "./types.js";

export function normalizeBlockers(
  fullSweep: Record<string, unknown> | undefined,
  blockersMarkdown?: string
): BlockerLineageItem[] {
  const rawBlockers = Array.isArray(fullSweep?.blockers) ? fullSweep.blockers : [];
  const blockers = rawBlockers.map((item, index) => normalizeBlocker(item, index));
  const knownCritical = [
    "certified ephemeris validation",
    "telemetry provenance",
    "physical device lab evidence",
    "production WebSocket security review",
    "human approval + rollback drill"
  ];
  const synthesized = knownCritical
    .filter(
      (title) =>
        !blockers.some(
          (blocker) =>
            blocker.title.toLowerCase().includes(title.toLowerCase()) ||
            blocker.currentEvidence.toLowerCase().includes(title.toLowerCase())
        )
    )
    .map((title, index) => ({
      id: `critical-production-blocker-${index + 1}`,
      title,
      severity: "critical" as const,
      status: "blocked" as const,
      firstSeen: "release/hemant-samwat/PRODUCTION_BLOCKER_CLOSURE_PLAN.md",
      currentEvidence: blockersMarkdown?.includes(title) ? "Recorded in BLOCKERS.md" : "Evidence missing",
      closureRequirements: closureRequirementsFor(title),
      owner: "Not recorded"
    }));
  return [...blockers, ...synthesized];
}

function normalizeBlocker(item: unknown, index: number): BlockerLineageItem {
  const record = isRecord(item) ? item : {};
  const label = stringValue(record.label) ?? stringValue(record.id) ?? `Blocker ${index + 1}`;
  const evidence = stringValue(record.evidence) ?? "Evidence missing";
  const classification = stringValue(record.classification) ?? "blocked";
  return {
    id: stringValue(record.id) ?? `blocker-${index}`,
    title: label,
    severity: severityFor(evidence, classification),
    status: statusFor(classification),
    firstSeen: "release/runtime-maturity/full-sweep.json",
    currentEvidence: evidence.slice(0, 1200),
    closureRequirements: closureRequirementsFor(label),
    owner: "Not recorded"
  };
}

function closureRequirementsFor(title: string): string[] {
  const lower = title.toLowerCase();
  if (lower.includes("rollback"))
    return ["Human approval record", "Rollback execution log", "Post-rollback route/API health", "Operator signoff"];
  if (lower.includes("telemetry"))
    return ["Telemetry source map", "Consent boundary", "Integrity chain", "Device/lab or production evidence"];
  if (lower.includes("ephemeris") || lower.includes("scientific") || lower.includes("astronomy"))
    return ["Ephemeris source map", "Comparison corpus", "Tolerance matrix", "Independent review evidence"];
  if (lower.includes("websocket"))
    return ["Security review", "Auth boundary", "Rate limit evidence", "Preview-scope proof"];
  if (lower.includes("device"))
    return ["Physical device matrix", "Browser/device screenshots", "Performance logs", "Accessibility notes"];
  return ["Verifier must pass", "Evidence artifact must exist", "Owner signoff must be recorded"];
}

function severityFor(evidence: string, classification: string): EvidenceSeverity {
  const value = `${evidence} ${classification}`.toLowerCase();
  if (/rollback|websocket|ephemeris|certified|device lab|production/.test(value)) return "critical";
  if (/blocked|fail/.test(value)) return "high";
  if (/sandbox|route/.test(value)) return "medium";
  return "info";
}

function statusFor(classification: string): EvidenceStatus {
  if (classification === "blocked") return "blocked";
  if (classification === "stable") return "pass";
  return "blocked";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value : undefined;
}
