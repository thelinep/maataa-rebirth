import type { TopologySnapshot } from "./types.js";

export function normalizeTopology(fullSweep: Record<string, unknown> | undefined): TopologySnapshot {
  const direct = getRecord(fullSweep?.directShellRouteEvidence);
  const probes = Array.isArray(direct?.probes) ? direct.probes : [];
  const urls = probes.map((probe) => getRecord(probe)?.url).filter((url): url is string => typeof url === "string");
  return {
    appRoutes: urls.filter((url) => !url.includes("/api/")).map(toPath),
    apiRoutes: urls.filter((url) => url.includes("/api/")).map(toPath),
    runtimeServices: ["runtime-maturity", "runtime-portability", "runtime-registry", "runtime-graph", "final-maturity"],
    domainHealth: ["127.0.0.1:3111 direct-shell probes recorded", "Production domains not asserted by this observatory"],
    dependencyMap: ["Build -> Preview Gate", "Preview Gate -> Promotion Gate", "Scientific Validation -> Production Certification", "Device Lab -> Production Certification", "Human Rollback -> Promotion Approval"],
    lastSnapshotTimestamp: typeof direct?.generatedAt === "string" ? direct.generatedAt : "Not recorded"
  };
}

function toPath(url: string) {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function getRecord(value: unknown): Record<string, unknown> | undefined {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
}
