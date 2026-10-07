import type { BlockerLineageItem, PromotionGate, RuntimeHealthTimelineItem, SweepHistoryItem } from "./types.js";

export function normalizeGates(input: {
  sweepHistory: SweepHistoryItem[];
  blockerLineage: BlockerLineageItem[];
  runtimeHealthTimeline: RuntimeHealthTimelineItem[];
}): PromotionGate[] {
  const hasBuild = passed(input.sweepHistory, "build");
  const hasTypecheck = passed(input.sweepHistory, "typecheck");
  const directRoutesStable = input.runtimeHealthTimeline.some(
    (item) => item.method === "direct-shell-curl" && item.status === "pass"
  );
  const nodeRoutesWarn = input.runtimeHealthTimeline.some(
    (item) => item.method !== "direct-shell-curl" && item.status === "warn"
  );
  const criticalBlockers = input.blockerLineage.filter(
    (blocker) => blocker.severity === "critical" && blocker.status === "blocked"
  );
  const hasRollback = !criticalBlockers.some((blocker) =>
    /rollback/i.test(`${blocker.title} ${blocker.currentEvidence}`)
  );
  const hasSecurity = !criticalBlockers.some((blocker) =>
    /websocket|security/i.test(`${blocker.title} ${blocker.currentEvidence}`)
  );
  const hasScience = !criticalBlockers.some((blocker) =>
    /ephemeris|scientific|device|telemetry/i.test(`${blocker.title} ${blocker.currentEvidence}`)
  );

  return [
    {
      id: "preview-ready",
      title: "Preview Ready",
      status: hasBuild && hasTypecheck ? "preview-pass" : "missing",
      requirements: ["Build evidence", "Typecheck evidence", "Preview-safe blockers visible"],
      evidence: [
        hasBuild ? "Build passed" : "Build not recorded",
        hasTypecheck ? "Typecheck passed" : "Typecheck not recorded"
      ]
    },
    {
      id: "staging-ready",
      title: "Staging Ready",
      status: directRoutesStable && !nodeRoutesWarn ? "pass" : "blocked",
      requirements: ["Route probes stable across verifier context", "No unresolved route-readiness race"],
      evidence: [
        directRoutesStable ? "Direct shell route probes passed" : "Direct shell route evidence missing",
        nodeRoutesWarn ? "Node-localhost probe limitation remains" : "Node-localhost limitation not recorded"
      ]
    },
    {
      id: "promotion-ready",
      title: "Promotion Ready",
      status: hasRollback && hasSecurity ? "pass" : "blocked",
      requirements: ["Rollback drill evidence", "Production WebSocket security review", "Human approval record"],
      evidence: [
        hasRollback ? "Rollback evidence recorded" : "Rollback evidence missing",
        hasSecurity ? "Security review recorded" : "Security review missing"
      ]
    },
    {
      id: "production-certified",
      title: "Production Certified",
      status: hasScience ? "pass" : "blocked",
      requirements: ["Scientific validation where applicable", "Physical device lab evidence", "Telemetry provenance"],
      evidence: [hasScience ? "Certification evidence recorded" : "Scientific/device/provenance evidence missing"]
    }
  ];
}

function passed(items: SweepHistoryItem[], needle: string) {
  return items.some(
    (item) =>
      (item.id.includes(needle) || item.label.toLowerCase().includes(needle)) &&
      (item.status === "pass" || item.status === "preview-pass")
  );
}
