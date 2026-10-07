/** @maataa/maataa-ui · runtime-widgets · hkd-link — themed via token() (canonical --maataa-* vars from ThemeProvider). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
export type HkdLinkProps = { entity?: string; uri?: string; kind?: string };
export function HkdLink({ entity = "HKD-000", uri = "#", kind = "entity" }: HkdLinkProps) {
  return (
    <a href={uri} style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none", color: token("--maataa-status-ok"), fontSize: 13 }}>
      <span style={{ fontSize: 10, fontWeight: 700, background: token("--maataa-chip"), padding: "2px 6px", borderRadius: 5 }}>{kind}</span>
      {entity}
    </a>
  );
}
export default HkdLink;
export const meta = { layer: "runtime-widgets", id: "hkd-link", status: "IMPLEMENTED", themed: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
