"use client";

import { useMemo, useState } from "react";
import type { EcosystemItem } from "@maataa/content-engine";

type EcosystemGraphProps = {
  items: EcosystemItem[];
};

const relationPairs = [
  ["maataa", "radio"],
  ["maataa", "scripts"],
  ["maataa", "tlp"],
  ["maataa", "digital-gurukul"],
  ["maataa", "allb"],
  ["digital-gurukul", "hemant-samwat"],
  ["digital-gurukul", "tlp"],
  ["hemant-samwat", "lipi"],
  ["radio", "brahmini"],
  ["brahmini", "proof"],
  ["status", "maataa"],
  ["lipi", "scripts"],
  ["tlp", "proof"],
  ["allb", "status"]
] as const;

function graphCoordinate(index: number, total: number, axis: "x" | "y") {
  const angle = (index / total) * Math.PI * 2;
  const raw = 50 + (axis === "x" ? Math.cos(angle) : Math.sin(angle)) * 34;
  return Number(raw.toFixed(4));
}

export function EcosystemGraph({ items }: EcosystemGraphProps) {
  const [statusFilter, setStatusFilter] = useState<"all" | "live" | "beta" | "review">("all");
  const visibleItems = useMemo(
    () => (statusFilter === "all" ? items : items.filter((item) => item.status === statusFilter)),
    [items, statusFilter]
  );
  const visibleIds = new Set(visibleItems.map((item) => item.id));
  const relations = relationPairs.filter(([from, to]) => visibleIds.has(from) && visibleIds.has(to));

  return (
    <div className="ecosystem-graph" aria-label="Interactive ecosystem map">
      <div className="graph-toolbar" aria-label="Graph filters">
        {(["all", "live", "beta", "review"] as const).map((filter) => (
          <button
            className={statusFilter === filter ? "is-active" : ""}
            key={filter}
            onClick={() => setStatusFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="graph-stage">
        <svg className="graph-lines" viewBox="0 0 100 100" aria-hidden="true">
          {relations.map(([from, to], index) => {
            const fromIndex = visibleItems.findIndex((item) => item.id === from);
            const toIndex = visibleItems.findIndex((item) => item.id === to);
            const x1 = graphCoordinate(fromIndex, visibleItems.length, "x");
            const y1 = graphCoordinate(fromIndex, visibleItems.length, "y");
            const x2 = graphCoordinate(toIndex, visibleItems.length, "x");
            const y2 = graphCoordinate(toIndex, visibleItems.length, "y");
            return <line key={`${from}-${to}-${index}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </svg>
        {visibleItems.map((item, index) => {
          const x = graphCoordinate(index, visibleItems.length, "x");
          const y = graphCoordinate(index, visibleItems.length, "y");
          return (
            <a
              className={`graph-node graph-node-${item.status}`}
              href={item.href}
              key={item.id}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span>{item.title}</span>
              <small>{item.status}</small>
            </a>
          );
        })}
        <a className="graph-core" href="/maataa">
          <span>Maataa</span>
          <small>guide</small>
        </a>
      </div>
    </div>
  );
}
