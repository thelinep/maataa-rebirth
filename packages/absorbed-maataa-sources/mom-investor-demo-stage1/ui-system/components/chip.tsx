/** @maataa/maataa-ui · components · chip — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
import type { ReactNode } from "react";
export type ChipProps = { onRemove?: () => void; children?: ReactNode };
export function Chip({ onRemove, children }: ChipProps) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, background: token("--maataa-chip"), border: "1px solid " + token("--maataa-border"), borderRadius: 8, padding: "5px 10px", color: token("--maataa-text") }}>{children}{onRemove ? <button aria-label="remove" onClick={onRemove} style={{ background: "none", border: "none", color: token("--maataa-text-muted"), cursor: "pointer" }}>✕</button> : null}</span>;
}
export default Chip;
export const meta = { layer: "components", id: "chip", status: "IMPLEMENTED", themed: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
