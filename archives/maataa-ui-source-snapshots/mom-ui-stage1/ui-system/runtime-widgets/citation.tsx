/** @maataa/maataa-ui · runtime-widgets · citation — themed via token() (canonical --maataa-* vars from ThemeProvider). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
export type CitationProps = { source?: string; ref?: string; verified?: boolean };
export function Citation({ source = "Unknown source", ref, verified = false }: CitationProps) {
  return (
    <div
      style={{
        borderLeft: "3px solid " + token("--maataa-accent-info"),
        padding: "6px 10px",
        background: token("--maataa-chip"),
        borderRadius: 6
      }}
    >
      <span style={{ fontSize: 13, color: token("--maataa-text") }}>{source}</span>
      {ref ? <span style={{ color: token("--maataa-text-muted"), fontSize: 12 }}> — {ref}</span> : null}
      {verified ? (
        <span style={{ color: token("--maataa-status-ok"), fontSize: 11, marginLeft: 6 }}>✔ verified</span>
      ) : null}
    </div>
  );
}
export default Citation;
export const meta = {
  layer: "runtime-widgets",
  id: "citation",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
