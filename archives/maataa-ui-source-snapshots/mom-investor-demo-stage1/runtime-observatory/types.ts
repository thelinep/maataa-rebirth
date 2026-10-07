export type EvidenceStatus = "pass" | "preview-pass" | "fail" | "blocked" | "missing" | "warn" | "not-recorded" | "unsigned";
export type EvidenceSeverity = "critical" | "high" | "medium" | "low" | "info";

export type EvidenceSourceFile = {
  name: string;
  path: string;
  exists: boolean;
  bytes?: number;
  status: EvidenceStatus;
};

export type SweepHistoryItem = {
  id: string;
  label: string;
  status: EvidenceStatus;
  classification: string;
  command?: string;
  durationMs?: number;
  generatedAt?: string;
  evidence: string;
};

export type EvidenceGraphNode = {
  id: string;
  label: string;
  status: EvidenceStatus;
  evidence: string;
};

export type EvidenceGraphEdge = {
  source: string;
  target: string;
  label: string;
};

export type BlockerLineageItem = {
  id: string;
  title: string;
  severity: EvidenceSeverity;
  status: EvidenceStatus;
  firstSeen: string;
  currentEvidence: string;
  closureRequirements: string[];
  owner: string;
};

export type PromotionGate = {
  id: "preview-ready" | "staging-ready" | "promotion-ready" | "production-certified";
  title: string;
  status: EvidenceStatus;
  requirements: string[];
  evidence: string[];
};

export type RollbackEvidence = {
  lastRollbackDrill: string;
  result: EvidenceStatus;
  rto: string;
  rpo: string;
  operatorApproval: string;
  evidenceHash: string;
  missingEvidence: string[];
};

export type TopologySnapshot = {
  appRoutes: string[];
  apiRoutes: string[];
  runtimeServices: string[];
  domainHealth: string[];
  dependencyMap: string[];
  lastSnapshotTimestamp: string;
};

export type SignedReleaseManifest = {
  manifestId: string;
  commitHash: string;
  evidenceHash: string;
  generatedAt: string;
  signedBy: string;
  signatureStatus: EvidenceStatus;
};

export type RuntimeHealthTimelineItem = {
  id: string;
  label: string;
  status: EvidenceStatus;
  method: string;
  timestamp: string;
  details: string;
};

export type RuntimeObservatoryEvidence = {
  generatedAt: string;
  status: "preview-observatory-ready" | "evidence-missing" | "blocked";
  previewReady: boolean;
  productionReady: false;
  productionPromotionStatus: "blocked";
  sourceFiles: EvidenceSourceFile[];
  sandboxNotes: string[];
  sweepHistory: SweepHistoryItem[];
  evidenceGraph: {
    nodes: EvidenceGraphNode[];
    edges: EvidenceGraphEdge[];
  };
  blockerLineage: BlockerLineageItem[];
  promotionGates: PromotionGate[];
  rollbackEvidence: RollbackEvidence;
  topologySnapshots: TopologySnapshot;
  signedReleaseManifests: SignedReleaseManifest[];
  runtimeHealthTimeline: RuntimeHealthTimelineItem[];
  integrity: EvidenceIntegrityResult;
};

export type EvidenceIntegrityResult = {
  ok: boolean;
  productionPromotionBlocked: true;
  criticalBlockers: number;
  missingEvidenceCount: number;
  previewPassPromoted: false;
  notes: string[];
};
