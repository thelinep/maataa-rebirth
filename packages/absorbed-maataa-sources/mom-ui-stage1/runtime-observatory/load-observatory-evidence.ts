import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import type {
  EvidenceGraphNode,
  EvidenceSourceFile,
  RollbackEvidence,
  RuntimeObservatoryEvidence,
  SignedReleaseManifest
} from "./types.js";
import { assertEvidenceIntegrity } from "./evidence-integrity.js";
import { normalizeBlockers } from "./normalize-blockers.js";
import { normalizeGates } from "./normalize-gates.js";
import { normalizeHealthTimeline } from "./normalize-health-timeline.js";
import { normalizeSweepHistory } from "./normalize-sweep-history.js";
import { normalizeTopology } from "./normalize-topology.js";

type RawEvidence = {
  fullSweep?: Record<string, unknown>;
  markdown: Record<string, string>;
  sourceFiles: EvidenceSourceFile[];
};

const SOURCE_FILES = [
  { name: "FULL_SWEEP.md", path: "release/runtime-maturity/FULL_SWEEP.md" },
  { name: "full-sweep.json", path: "release/runtime-maturity/full-sweep.json" },
  { name: "BLOCKERS.md", path: "release/runtime-maturity/BLOCKERS.md" },
  { name: "PORTABILITY_STATUS.md", path: "release/runtime-maturity/PORTABILITY_STATUS.md" },
  { name: "OBSERVABILITY_STATUS.md", path: "release/runtime-maturity/OBSERVABILITY_STATUS.md" }
] as const;

export function loadRuntimeObservatoryEvidence(inputRoot = process.cwd()): RuntimeObservatoryEvidence {
  const root = resolveEvidenceRoot(inputRoot);
  const raw = readRawEvidence(root);
  const fullSweep = raw.fullSweep;
  const generatedAt = getString(fullSweep, "generatedAt") ?? new Date().toISOString();
  const sweepHistory = normalizeSweepHistory(fullSweep);
  const blockerLineage = normalizeBlockers(fullSweep, raw.markdown["BLOCKERS.md"]);
  const runtimeHealthTimeline = normalizeHealthTimeline(fullSweep);
  const topologySnapshots = normalizeTopology(fullSweep);
  const promotionGates = normalizeGates({ sweepHistory, blockerLineage, runtimeHealthTimeline });
  const rollbackEvidence = createRollbackEvidence(blockerLineage);
  const signedReleaseManifests = createSignedReleaseManifests(fullSweep, generatedAt);
  const evidenceGraph = createEvidenceGraph(sweepHistory, blockerLineage);
  const sandboxNotes = collectSandboxNotes(fullSweep, raw.markdown);
  const draft = {
    generatedAt,
    status: raw.sourceFiles.some((file) => !file.exists) ? "evidence-missing" : "preview-observatory-ready",
    previewReady: sweepHistory.some((item) => item.status === "pass" || item.status === "preview-pass"),
    productionReady: false,
    productionPromotionStatus: "blocked",
    sourceFiles: raw.sourceFiles,
    sandboxNotes,
    sweepHistory,
    evidenceGraph,
    blockerLineage,
    promotionGates,
    rollbackEvidence,
    topologySnapshots,
    signedReleaseManifests,
    runtimeHealthTimeline
  } satisfies Omit<RuntimeObservatoryEvidence, "integrity">;

  return {
    ...draft,
    integrity: assertEvidenceIntegrity(draft)
  };
}

function resolveEvidenceRoot(inputRoot: string) {
  const candidates = [inputRoot, resolve(inputRoot, "../.."), resolve(inputRoot, "../../..")];
  return (
    candidates.find(
      (candidate) => existsSync(join(candidate, "package.json")) && existsSync(join(candidate, "release"))
    ) ?? inputRoot
  );
}

function readRawEvidence(root: string): RawEvidence {
  const markdown: Record<string, string> = {};
  let fullSweep: Record<string, unknown> | undefined;
  const sourceFiles = SOURCE_FILES.map((source) => {
    const absolute = join(root, source.path);
    const exists = existsSync(absolute);
    if (exists) {
      const content = readFileSync(absolute, "utf8");
      if (source.name.endsWith(".md")) markdown[source.name] = content;
      if (source.name === "full-sweep.json") {
        try {
          fullSweep = JSON.parse(content) as Record<string, unknown>;
        } catch {
          fullSweep = undefined;
        }
      }
    }
    return {
      name: source.name,
      path: source.path,
      exists,
      bytes: exists ? statSync(absolute).size : undefined,
      status: exists ? "pass" : "missing"
    } satisfies EvidenceSourceFile;
  });
  return { fullSweep, markdown, sourceFiles };
}

function createEvidenceGraph(
  sweepHistory: RuntimeObservatoryEvidence["sweepHistory"],
  blockers: RuntimeObservatoryEvidence["blockerLineage"]
): RuntimeObservatoryEvidence["evidenceGraph"] {
  const statusFor = (id: string) => sweepHistory.find((item) => item.id.includes(id))?.status ?? "not-recorded";
  const criticalBlocker = blockers.some((blocker) => blocker.severity === "critical");
  const nodes: EvidenceGraphNode[] = [
    { id: "build", label: "Build", status: statusFor("build"), evidence: findEvidence(sweepHistory, "build") },
    {
      id: "typecheck",
      label: "Typecheck",
      status: statusFor("typecheck"),
      evidence: findEvidence(sweepHistory, "typecheck")
    },
    { id: "prisma", label: "Prisma", status: statusFor("prisma"), evidence: findEvidence(sweepHistory, "prisma") },
    {
      id: "runtime-routes",
      label: "Runtime Routes",
      status: statusFor("route"),
      evidence: "Direct shell and Node-localhost probes are shown separately."
    },
    {
      id: "semantic-registry",
      label: "Semantic Registry",
      status: statusFor("runtime-registry"),
      evidence: findEvidence(sweepHistory, "runtime-registry")
    },
    {
      id: "portability",
      label: "Portability",
      status: statusFor("portability"),
      evidence: findEvidence(sweepHistory, "portability")
    },
    {
      id: "observability",
      label: "Observability",
      status: statusFor("observability"),
      evidence: findEvidence(sweepHistory, "observability")
    },
    {
      id: "scientific-validation",
      label: "Scientific Validation",
      status: criticalBlocker ? "blocked" : "not-recorded",
      evidence: "Certification requires external ephemeris evidence."
    },
    {
      id: "device-lab",
      label: "Device Lab",
      status: criticalBlocker ? "blocked" : "not-recorded",
      evidence: "Physical lab evidence not recorded."
    },
    {
      id: "websocket-security",
      label: "WebSocket Security",
      status: criticalBlocker ? "blocked" : "not-recorded",
      evidence: "Production WebSocket security review remains required."
    },
    {
      id: "human-rollback",
      label: "Human Rollback Drill",
      status: criticalBlocker ? "blocked" : "missing",
      evidence: "Approval and execution evidence missing."
    }
  ];
  return {
    nodes,
    edges: [
      { source: "build", target: "preview-gate", label: "Build -> Preview Gate" },
      { source: "preview-gate", target: "promotion-gate", label: "Preview Gate -> Promotion Gate" },
      {
        source: "scientific-validation",
        target: "production-certification",
        label: "Scientific Validation -> Production Certification"
      },
      { source: "device-lab", target: "production-certification", label: "Device Lab -> Production Certification" },
      { source: "human-rollback", target: "promotion-approval", label: "Human Rollback -> Promotion Approval" }
    ]
  };
}

function findEvidence(items: RuntimeObservatoryEvidence["sweepHistory"], needle: string) {
  return (
    items.find((item) => item.id.includes(needle) || item.label.toLowerCase().includes(needle))?.evidence ??
    "Not recorded"
  );
}

function createRollbackEvidence(blockers: RuntimeObservatoryEvidence["blockerLineage"]): RollbackEvidence {
  const rollbackBlockers = blockers.filter((blocker) =>
    /rollback/i.test(`${blocker.id} ${blocker.title} ${blocker.currentEvidence}`)
  );
  return {
    lastRollbackDrill: "Not recorded",
    result: "missing",
    rto: "Evidence missing",
    rpo: "Evidence missing",
    operatorApproval: "Evidence missing",
    evidenceHash: "Evidence missing",
    missingEvidence:
      rollbackBlockers.length > 0
        ? rollbackBlockers.flatMap((blocker) => blocker.closureRequirements)
        : ["Human approval record", "Rollback execution log", "Post-rollback health verification"]
  };
}

function createSignedReleaseManifests(
  fullSweep: Record<string, unknown> | undefined,
  generatedAt: string
): SignedReleaseManifest[] {
  const commitBoundary = getString(fullSweep, "recommendedCommitBoundary") ?? "Not recorded";
  return [
    {
      manifestId: "runtime-maturity-full-sweep",
      commitHash: commitBoundary.includes("Commit") ? "commit-boundary-described" : "Not recorded",
      evidenceHash: "Unsigned local evidence",
      generatedAt,
      signedBy: "Not recorded",
      signatureStatus: "unsigned"
    }
  ];
}

function collectSandboxNotes(fullSweep: Record<string, unknown> | undefined, markdown: Record<string, string>) {
  const direct = getObject(fullSweep, "directShellRouteEvidence");
  const directNote = getString(direct, "note");
  const notes = [
    directNote,
    markdown["FULL_SWEEP.md"]?.match(/Node fetch[^\n]+/i)?.[0],
    markdown["BLOCKERS.md"]?.match(/sandbox[^\n]+/i)?.[0]
  ].filter(Boolean) as string[];
  return notes.length > 0 ? [...new Set(notes)] : ["Sandbox limitations not recorded."];
}

function getString(source: unknown, key: string): string | undefined {
  if (!source || typeof source !== "object") return undefined;
  const value = (source as Record<string, unknown>)[key];
  return typeof value === "string" ? value : undefined;
}

function getObject(source: unknown, key: string): Record<string, unknown> | undefined {
  if (!source || typeof source !== "object") return undefined;
  const value = (source as Record<string, unknown>)[key];
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
}
