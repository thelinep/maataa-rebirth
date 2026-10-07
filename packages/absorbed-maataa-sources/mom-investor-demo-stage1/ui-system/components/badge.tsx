/** @maataa/maataa-ui · components · badge — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
import type { ReactNode } from "react";
export type BadgeTone = "new" | "active" | "verified" | "pending" | "warning" | "error" | "info" | "draft" | "nogo";
const toneToken = (t: BadgeTone) => t === "active" || t === "verified" ? token("--maataa-status-ok") : t === "pending" || t === "warning" ? token("--maataa-status-warn") : t === "error" ? token("--maataa-status-danger") : t === "info" ? token("--maataa-accent-info") : t === "nogo" ? token("--maataa-accent-primary") : token("--maataa-accent-secondary");
export type BadgeProps = { tone?: BadgeTone; children?: ReactNode };
export function Badge({ tone = "new", children }: BadgeProps) {
  const c = tone === "draft" ? token("--maataa-text-muted") : toneToken(tone);
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 999, border: "1px solid " + c, color: c }}>{children}</span>;
}
export default Badge;
export const meta = { layer: "components", id: "badge", status: "IMPLEMENTED", themed: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
