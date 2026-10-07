import type { ReactNode } from "react";

export function RuntimeShell({ children }: { children: ReactNode }) {
  return <div className="shell">{children}</div>;
}
