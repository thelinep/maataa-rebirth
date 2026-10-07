/** @maataa/maataa-ui · components · tables — themed via token() (canonical --maataa-* vars from ThemeProvider). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
export type Column = { key: string; label: string };
export type Row = Record<string, string>;
export type DataTableProps = { columns?: Column[]; rows?: Row[]; statusKey?: string };
function statusToken(v: string): string {
  if (/active|pass|ok|backed/i.test(v)) return token("--maataa-status-ok");
  if (/pending|warn|preview/i.test(v)) return token("--maataa-status-warn");
  if (/error|fail|blocked/i.test(v)) return token("--maataa-status-danger");
  return token("--maataa-text-muted");
}
export function DataTable({ columns = [], rows = [], statusKey = "status" }: DataTableProps) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, color: token("--maataa-text") }}>
      <thead><tr>{columns.map((c) => <th key={c.key} style={{ textAlign: "left", padding: "9px 11px", borderBottom: "1px solid " + token("--maataa-border"), color: token("--maataa-text-muted"), fontSize: 11, textTransform: "uppercase" }}>{c.label}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => (
        <tr key={i}>{columns.map((c) => (
          <td key={c.key} style={{ padding: "9px 11px", borderBottom: "1px solid " + token("--maataa-border"), color: c.key === statusKey ? statusToken(r[c.key] || "") : token("--maataa-text") }}>{r[c.key]}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  );
}
export default DataTable;
export const meta = { layer: "components", id: "tables", status: "IMPLEMENTED", themed: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
