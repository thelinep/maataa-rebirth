import type { RuntimeHealthTimelineItem } from "./types.js";

export function normalizeHealthTimeline(fullSweep: Record<string, unknown> | undefined): RuntimeHealthTimelineItem[] {
  if (!fullSweep) {
    return [{ id: "health-missing", label: "Runtime health evidence", status: "missing", method: "local-file", timestamp: new Date().toISOString(), details: "full-sweep.json missing" }];
  }
  const generatedAt = typeof fullSweep.generatedAt === "string" ? fullSweep.generatedAt : new Date().toISOString();
  const items: RuntimeHealthTimelineItem[] = [];

  const direct = getRecord(fullSweep.directShellRouteEvidence);
  const directProbes = Array.isArray(direct?.probes) ? direct.probes : [];
  items.push(...directProbes.map((probe, index) => normalizeDirectProbe(probe, index, typeof direct?.generatedAt === "string" ? direct.generatedAt : generatedAt, "direct-health")));

  const post = getRecord(fullSweep.postRestartRouteReadiness);
  const postTimestamp = typeof post?.generatedAt === "string" ? post.generatedAt : generatedAt;
  const postRoutes = Array.isArray(post?.routes) ? post.routes : [];
  const postApis = Array.isArray(post?.apis) ? post.apis : [];
  items.push(...[...postRoutes, ...postApis].slice(0, 18).flatMap((probe, index) => normalizeProbe(probe, index, postTimestamp, "post-restart")));

  const currentRoutes = Array.isArray(fullSweep.routes) ? fullSweep.routes : [];
  const currentApis = Array.isArray(fullSweep.apis) ? fullSweep.apis : [];
  items.push(...[...currentRoutes, ...currentApis].slice(0, 24).flatMap((probe, index) => normalizeProbe(probe, index, generatedAt, "current-sweep")));

  if (!items.some((item) => item.method.includes("direct-shell"))) {
    items.push({
      id: "direct-shell-health-missing",
      label: "Direct shell route probe evidence",
      status: "missing",
      method: "direct-shell/not-recorded",
      timestamp: generatedAt,
      details: "No direct shell curl evidence was recorded in full-sweep.json."
    });
  }

  if (!items.some((item) => item.method.includes("node-localhost"))) {
    items.push({
      id: "node-localhost-health-missing",
      label: "Node localhost route probe evidence",
      status: "missing",
      method: "node-localhost/not-recorded",
      timestamp: generatedAt,
      details: "No Node localhost fetch evidence was recorded in full-sweep.json."
    });
  }

  return items;
}

function getRecord(value: unknown): Record<string, unknown> | undefined {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
}

function normalizeProbe(probe: unknown, index: number, timestamp: string, source: string): RuntimeHealthTimelineItem[] {
  const record = getRecord(probe) ?? {};
  const method = typeof record.probeMethod === "string" ? record.probeMethod : undefined;
  const items: RuntimeHealthTimelineItem[] = [];

  if (typeof record.nodeFetchError === "string") {
    items.push({
      id: `node-localhost-${source}-${stringValue(record.id) ?? index}`,
      label: labelFor(record, `Node route ${index + 1}`),
      status: "warn",
      method: "node-localhost/fetch",
      timestamp,
      details: record.nodeFetchError
    });
  }

  if (method?.includes("curl")) {
    items.push(normalizeDirectProbe(record, index, timestamp, source));
    return items;
  }

  items.push({
    id: `node-localhost-${source}-${stringValue(record.id) ?? index}`,
    label: labelFor(record, `Node route ${index + 1}`),
    status: statusFor(record, "warn"),
    method: `node-localhost/${method ?? "fetch"}`,
    timestamp,
    details: detailsFor(record)
  });
  return items;
}

function normalizeDirectProbe(probe: unknown, index: number, timestamp: string, source: string): RuntimeHealthTimelineItem {
  const record = getRecord(probe) ?? {};
  const status = typeof record.status === "number" ? record.status : numberValue(record.curlStatus);
  return {
    id: `direct-shell-${source}-${stringValue(record.id) ?? index}`,
    label: labelFor(record, `Direct route ${index + 1}`),
    status: statusFor(record, "fail"),
    method: `direct-shell/${stringValue(record.probeMethod) ?? "curl"}`,
    timestamp,
    details: status ? `HTTP ${status}` : detailsFor(record)
  };
}

function labelFor(record: Record<string, unknown>, fallback: string) {
  return stringValue(record.url) ?? stringValue(record.id) ?? fallback;
}

function statusFor(record: Record<string, unknown>, failedStatus: RuntimeHealthTimelineItem["status"]): RuntimeHealthTimelineItem["status"] {
  if (record.ok === true) return "pass";
  if (record.ok === false) return failedStatus;
  return "not-recorded";
}

function detailsFor(record: Record<string, unknown>) {
  if (record.ok === true) return "Probe passed";
  if (typeof record.error === "string") return record.error;
  if (typeof record.note === "string") return record.note;
  if (typeof record.status === "number") return `HTTP ${record.status}`;
  if (typeof record.curlStatus === "number") return `curl HTTP ${record.curlStatus}`;
  return "Probe failed or not recorded";
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function numberValue(value: unknown) {
  return typeof value === "number" ? value : undefined;
}
