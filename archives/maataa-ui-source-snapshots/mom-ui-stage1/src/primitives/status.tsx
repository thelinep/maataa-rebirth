"use client";

import type { ReactNode } from "react";
import { cx, panelClass, type RuntimeTone, toneClass } from "./shared.ts";

export function RuntimeBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: RuntimeTone }) {
  return (
    <span
      className={cx("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", toneClass[tone])}
    >
      {children}
    </span>
  );
}

export function RuntimeHealth({
  label,
  status
}: {
  label: ReactNode;
  status: "online" | "degraded" | "offline" | "preview";
}) {
  const tone =
    status === "online" ? "success" : status === "offline" ? "danger" : status === "degraded" ? "warning" : "info";
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-[color:var(--maataa-muted)]">{label}</span>
      <RuntimeBadge tone={tone}>{status}</RuntimeBadge>
    </div>
  );
}

export function RuntimeMetricCard({
  label,
  value,
  detail
}: {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
}) {
  return (
    <div className={cx(panelClass, "p-4 shadow-none")}>
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--maataa-muted)]">{label}</p>
      <p className="mt-2 text-2xl font-bold text-[color:var(--maataa-text)]">{value}</p>
      {detail && <p className="mt-1 text-sm text-[color:var(--maataa-muted)]">{detail}</p>}
    </div>
  );
}

export function RuntimeProgress({ value, label }: { value: number; label?: ReactNode }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div>
      {label && <div className="mb-1 text-xs text-[color:var(--maataa-muted)]">{label}</div>}
      <div className="h-2 overflow-hidden rounded-full bg-[color:var(--maataa-surface-alt)]">
        <div className="h-full rounded-full bg-[color:var(--maataa-primary)]" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
