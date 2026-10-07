/** @maataa/maataa-ui · components · topbar — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
import type { ReactNode } from "react";
export type TopbarProps = { title?: string; children?: ReactNode };
export function Topbar({ title = "", children }: TopbarProps) {
  return <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: token("--maataa-surface-alt"), border: "1px solid " + token("--maataa-border"), borderRadius: 10, padding: "9px 12px", color: token("--maataa-text") }}><strong>{title}</strong><div style={{ display: "flex", gap: 10 }}>{children}</div></header>;
}
export default Topbar;
export const meta = { layer: "components", id: "topbar", status: "IMPLEMENTED", themed: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
