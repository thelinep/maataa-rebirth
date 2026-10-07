"use client";

import { RuntimeBadge, RuntimePanel, RuntimeTopologyMap } from "../primitives/index.ts";

export type RuntimeTopologyNode = {
  id: string;
  label: string;
  family: string;
  href?: string;
  health?: "ok" | "warn" | "fail";
};

export type RuntimeTopologyLink = {
  source: string;
  target: string;
  relation: "depends-on" | "routes-to" | "observes" | "owns";
};

export function RuntimeTopologyVisualizer({
  nodes,
  links,
  mode = "2d"
}: {
  nodes: readonly RuntimeTopologyNode[];
  links: readonly RuntimeTopologyLink[];
  mode?: "2d" | "3d";
}) {
  const healthCounts = nodes.reduce(
    (counts, node) => {
      counts[node.health ?? "ok"] += 1;
      return counts;
    },
    { ok: 0, warn: 0, fail: 0 }
  );

  return (
    <RuntimePanel className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Runtime Topology</h2>
          <p className="text-sm text-[color:var(--maataa-muted)]">
            {mode === "3d"
              ? "3D mode requested; rendering the deterministic 2D fallback until the Three.js runtime package is explicitly wired."
              : "2D deterministic topology fallback with live-health compatible node metadata."}
          </p>
        </div>
        <div className="flex gap-2">
          <RuntimeBadge tone="success">{healthCounts.ok} ok</RuntimeBadge>
          <RuntimeBadge tone="warning">{healthCounts.warn} warn</RuntimeBadge>
          <RuntimeBadge tone="danger">{healthCounts.fail} fail</RuntimeBadge>
        </div>
      </div>
      <RuntimeTopologyMap nodes={nodes} links={links} />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {nodes.map((node) => (
          <a
            key={node.id}
            href={node.href ?? "#"}
            className="rounded-xl border border-[color:var(--maataa-border)] bg-[color:var(--maataa-surface-alt)] p-3 text-sm"
          >
            <span className="block font-semibold text-[color:var(--maataa-text)]">{node.label}</span>
            <span className="text-[color:var(--maataa-muted)]">{node.family}</span>
          </a>
        ))}
      </div>
    </RuntimePanel>
  );
}
