import * as React from "react";

/** Shared accessible slot frame for host-owned editor tools and document models. */
export function EditorWorkbenchFrame({ children, className = "", label }: { children: React.ReactNode; className?: string; label: string }) {
  return <section className="maataa-editor-workbench" aria-label={label}>
    <div className={`maataa-editor-workbench__body ${className}`.trim()}>{children}</div>
  </section>;
}
