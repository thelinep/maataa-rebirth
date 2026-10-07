import type { EvidenceIntegrityResult, RuntimeObservatoryEvidence } from "./types.js";

type IntegrityInput = Omit<RuntimeObservatoryEvidence, "integrity">;

export function assertEvidenceIntegrity(evidence: IntegrityInput): EvidenceIntegrityResult {
  const criticalBlockers = evidence.blockerLineage.filter((blocker) => blocker.severity === "critical" && blocker.status === "blocked").length;
  const missingEvidenceCount = [
    ...evidence.sourceFiles.filter((file) => !file.exists),
    ...evidence.sweepHistory.filter((item) => item.status === "missing" || item.status === "not-recorded"),
    ...evidence.runtimeHealthTimeline.filter((item) => item.status === "missing" || item.status === "not-recorded")
  ].length;
  const previewPassPromoted = evidence.productionReady !== false || evidence.productionPromotionStatus !== "blocked";
  const notes = [
    criticalBlockers > 0 ? `${criticalBlockers} critical blocker(s) keep production promotion blocked.` : "No critical blockers recorded in local evidence.",
    missingEvidenceCount > 0 ? `${missingEvidenceCount} missing/not-recorded evidence item(s) remain visible.` : "No missing evidence in loaded files.",
    "Preview pass and production pass are distinct states."
  ];
  return {
    ok: !previewPassPromoted,
    productionPromotionBlocked: true,
    criticalBlockers,
    missingEvidenceCount,
    previewPassPromoted: false,
    notes
  };
}
