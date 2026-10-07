import type { ReactNode } from "react";

export function FieldShell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-zinc-300">
      <span>{label}</span>
      {children}
    </label>
  );
}
