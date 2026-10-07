import type { ReactNode } from "react";

export function RuntimeOverlay({ children, open }: { children: ReactNode; open: boolean }) {
  if (!open) return null;
  return (
    <div className="runtime-overlay" role="dialog" aria-modal="true">
      {children}
    </div>
  );
}
