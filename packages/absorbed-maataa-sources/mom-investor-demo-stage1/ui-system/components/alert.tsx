/** @maataa/maataa-ui · components · alert — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
import type { ReactNode } from "react";
export type AlertKind = "success" | "info" | "warning" | "error";
const kindToken = (k: AlertKind) => k === "success" ? token("--maataa-status-ok") : k === "warning" ? token("--maataa-status-warn") : k === "error" ? token("--maataa-status-danger") : token("--maataa-accent-info");
export type AlertProps = { kind?: AlertKind; children?: ReactNode };
export function Alert({ kind = "info", children }: AlertProps) {
  const c = kindToken(kind);
  return <div role="alert" style={{ display: "flex", gap: 10, alignItems: "center", padding: "11px 13px", borderRadius: 9, fontSize: 13, border: "1px solid " + c, color: c }}>{children}</div>;
}
export default Alert;
export const meta = { layer: "components", id: "alert", status: "IMPLEMENTED", themed: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
