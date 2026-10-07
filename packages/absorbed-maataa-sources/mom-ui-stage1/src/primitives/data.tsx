"use client";

import type { ReactNode } from "react";
import { cx, panelClass } from "./shared.ts";

export type RuntimeColumn<Row> = {
  id: string;
  header: ReactNode;
  render: (row: Row) => ReactNode;
};

export function RuntimeTable<Row extends { id: string }>({
  rows,
  columns
}: {
  rows: readonly Row[];
  columns: readonly RuntimeColumn<Row>[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[color:var(--maataa-border)]">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead className="bg-[color:var(--maataa-surface-alt)] text-[color:var(--maataa-muted)]">
          <tr>
            {columns.map((column) => (
              <th key={column.id} className="px-4 py-3 font-semibold">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-[color:var(--maataa-border)]">
              {columns.map((column) => (
                <td key={column.id} className="px-4 py-3">
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RuntimeDataTimeline({
  items
}: {
  items: readonly { id: string; title: ReactNode; detail?: ReactNode; status?: ReactNode }[];
}) {
  return (
    <ol className="space-y-3">
      {items.map((item) => (
        <li key={item.id} className="grid grid-cols-[auto,1fr] gap-3">
          <span className="mt-1 h-3 w-3 rounded-full bg-[color:var(--maataa-primary)] shadow-[0_0_20px_var(--maataa-glow)]" />
          <span>
            <span className="block font-semibold text-[color:var(--maataa-text)]">{item.title}</span>
            {item.detail && <span className="block text-sm text-[color:var(--maataa-muted)]">{item.detail}</span>}
            {item.status && (
              <span className="mt-1 block text-xs text-[color:var(--maataa-primary)]">{item.status}</span>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function RuntimeTree({
  nodes
}: {
  nodes: readonly { id: string; label: ReactNode; children?: readonly { id: string; label: ReactNode }[] }[];
}) {
  return (
    <ul className="space-y-2 text-sm">
      {nodes.map((node) => (
        <li key={node.id} className={cx(panelClass, "p-3 shadow-none")}>
          <span className="font-semibold">{node.label}</span>
          {node.children && (
            <ul className="mt-2 space-y-1 border-l border-[color:var(--maataa-border)] pl-3 text-[color:var(--maataa-muted)]">
              {node.children.map((child) => (
                <li key={child.id}>{child.label}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export function RuntimeTopologyMap({
  nodes,
  links,
  className
}: {
  nodes: readonly { id: string; label: string; x?: number; y?: number; health?: "ok" | "warn" | "fail" }[];
  links: readonly { source: string; target: string }[];
  className?: string;
}) {
  const positioned = nodes.map((node, index) => ({
    ...node,
    x: node.x ?? 50 + (index % 5) * 120,
    y: node.y ?? 50 + Math.floor(index / 5) * 95
  }));
  const lookup = new Map(positioned.map((node) => [node.id, node]));
  return (
    <svg
      className={cx(
        "h-[360px] w-full rounded-2xl border border-[color:var(--maataa-border)] bg-[color:var(--maataa-surface)]",
        className
      )}
      role="img"
      aria-label="Runtime topology map"
      viewBox="0 0 640 360"
    >
      {links.map((link) => {
        const source = lookup.get(link.source);
        const target = lookup.get(link.target);
        if (!source || !target) return null;
        return (
          <line
            key={`${link.source}-${link.target}`}
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            stroke="var(--maataa-border)"
            strokeWidth="1.5"
          />
        );
      })}
      {positioned.map((node) => (
        <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
          <circle
            r="18"
            fill="var(--maataa-surface-alt)"
            stroke={
              node.health === "fail"
                ? "var(--maataa-danger)"
                : node.health === "warn"
                  ? "var(--maataa-warning)"
                  : "var(--maataa-primary)"
            }
            strokeWidth="2"
          />
          <text y="42" textAnchor="middle" fill="var(--maataa-text)" fontSize="11">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
