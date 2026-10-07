/** @maataa/maataa-ui · components · pagination — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
import { useState } from "react";
export type PaginationProps = { pages?: number; page?: number; onChange?: (p: number) => void };
export function Pagination({ pages = 1, page, onChange }: PaginationProps) {
  const [internal, setInternal] = useState(page ?? 1);
  const cur = page ?? internal;
  const go = (p: number) => { setInternal(p); onChange?.(p); };
  return <nav aria-label="pagination" style={{ display: "flex", gap: 4 }}>{Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
    <button key={p} aria-current={p === cur ? "page" : undefined} onClick={() => go(p)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid " + token("--maataa-border"), background: p === cur ? token("--maataa-accent-secondary") : "transparent", color: p === cur ? "#fff" : token("--maataa-text-muted"), cursor: "pointer" }}>{p}</button>
  ))}</nav>;
}
export default Pagination;
export const meta = { layer: "components", id: "pagination", status: "IMPLEMENTED", themed: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
