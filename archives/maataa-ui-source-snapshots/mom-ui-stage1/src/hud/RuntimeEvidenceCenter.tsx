"use client";

import { useMemo, useState } from "react";
import type { RuntimeHUDMode } from "./types.ts";

export type RuntimeEvidenceCategory =
  "theme" | "routing" | "telemetry" | "topology" | "validation" | "rollback" | "promotion";

export type RuntimeEvidenceItem = {
  readonly id: string;
  readonly title: string;
  readonly category: RuntimeEvidenceCategory;
  readonly status: RuntimeHUDMode;
  readonly summary?: string;
  readonly path: string;
  readonly updatedAt?: string;
};

export type RuntimeEvidenceCenterProps = {
  readonly items?: readonly RuntimeEvidenceItem[];
  readonly emptyLabel?: string;
};

const CATEGORY_LABEL: Record<RuntimeEvidenceCategory, string> = {
  theme: "Theme Reports",
  routing: "Routing Reports",
  telemetry: "Telemetry Reports",
  topology: "Topology Reports",
  validation: "Validation Reports",
  rollback: "Rollback Reports",
  promotion: "Promotion Reviews"
};

export function RuntimeEvidenceCenter({
  items = [],
  emptyLabel = "No evidence reports supplied."
}: RuntimeEvidenceCenterProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | RuntimeEvidenceCategory>("all");
  const [grouping, setGrouping] = useState<"category" | "status">("category");

  const categories = useMemo(() => Array.from(new Set(items.map((item) => item.category))), [items]);
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery =
        !normalizedQuery ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.path.toLowerCase().includes(normalizedQuery) ||
        item.summary?.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, items, query]);

  const groups = useMemo(() => {
    const grouped = new Map<string, RuntimeEvidenceItem[]>();
    for (const item of filtered) {
      const key = grouping === "category" ? CATEGORY_LABEL[item.category] : item.status;
      grouped.set(key, [...(grouped.get(key) ?? []), item]);
    }
    return Array.from(grouped.entries());
  }, [filtered, grouping]);

  return (
    <section className="runtime-operational-center runtime-evidence-center" aria-label="Runtime evidence center">
      <header>
        <div>
          <p>Evidence Center</p>
          <h3>Operational Evidence Index</h3>
        </div>
        <span>
          {filtered.length}/{items.length}
        </span>
      </header>
      <div className="runtime-evidence-controls">
        <label>
          <span>Search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search reports" />
        </label>
        <label>
          <span>Filter</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as "all" | RuntimeEvidenceCategory)}
          >
            <option value="all">All reports</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {CATEGORY_LABEL[item]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Group</span>
          <select value={grouping} onChange={(event) => setGrouping(event.target.value as "category" | "status")}>
            <option value="category">Category</option>
            <option value="status">Status</option>
          </select>
        </label>
      </div>
      {items.length === 0 ? <p className="runtime-hud-empty">{emptyLabel}</p> : null}
      {items.length > 0 && filtered.length === 0 ? (
        <p className="runtime-hud-empty">No reports match the current filters.</p>
      ) : null}
      {groups.map(([group, groupItems]) => (
        <section key={group} className="runtime-evidence-group" aria-label={group}>
          <h4>{group}</h4>
          <div className="runtime-operational-list">
            {groupItems.map((item) => (
              <article key={item.id} data-mode={item.status}>
                <header>
                  <div>
                    <p>{CATEGORY_LABEL[item.category]}</p>
                    <h5>{item.title}</h5>
                  </div>
                  {item.updatedAt ? <time dateTime={item.updatedAt}>{item.updatedAt}</time> : null}
                </header>
                {item.summary ? <p>{item.summary}</p> : null}
                <code>{item.path}</code>
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
