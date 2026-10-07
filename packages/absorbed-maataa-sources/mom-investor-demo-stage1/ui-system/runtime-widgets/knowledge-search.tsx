/** @maataa/maataa-ui · runtime-widgets · knowledge-search — themed via token() (canonical --maataa-* vars from ThemeProvider). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { useState } from "react";
import { token } from "../foundations/ThemeProvider.tsx";
export type KnowledgeSearchProps = { items?: string[]; placeholder?: string };
export function KnowledgeSearch({ items = [], placeholder = "Search knowledge…" }: KnowledgeSearchProps) {
  const [q, setQ] = useState("");
  const hits = items.filter((i) => i.toLowerCase().includes(q.toLowerCase())).slice(0, 8);
  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} style={{ width: "100%", padding: "9px 12px", background: token("--maataa-surface-alt"), border: "1px solid " + token("--maataa-border"), borderRadius: 9, color: token("--maataa-text") }} />
      <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>{hits.map((h) => <li key={h} style={{ padding: "6px 4px", borderBottom: "1px solid " + token("--maataa-border"), fontSize: 13 }}>{h}</li>)}</ul>
      {q && hits.length === 0 ? <div style={{ color: token("--maataa-status-warn"), fontSize: 12 }}>No results</div> : null}
    </div>
  );
}
export default KnowledgeSearch;
export const meta = { layer: "runtime-widgets", id: "knowledge-search", status: "IMPLEMENTED", themed: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
