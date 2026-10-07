/** @maataa/maataa-ui · runtime-widgets · fact — themed via token() (canonical --maataa-* vars from ThemeProvider). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
export type FactProps = { claim?: string; provenance?: string; confidence?: "high" | "medium" | "low" };
export function Fact({ claim = "", provenance, confidence = "medium" }: FactProps) {
  const col =
    confidence === "high"
      ? token("--maataa-status-ok")
      : confidence === "low"
        ? token("--maataa-status-danger")
        : token("--maataa-status-warn");
  return (
    <div
      style={{
        background: token("--maataa-surface"),
        border: "1px solid " + token("--maataa-border"),
        borderRadius: 10,
        padding: 12,
        color: token("--maataa-text")
      }}
    >
      <div style={{ fontSize: 13 }}>{claim}</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11 }}>
        <span style={{ color: token("--maataa-text-muted") }}>{provenance || "no provenance"}</span>
        <span style={{ color: col, fontWeight: 700 }}>{confidence}</span>
      </div>
    </div>
  );
}
export default Fact;
export const meta = {
  layer: "runtime-widgets",
  id: "fact",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
