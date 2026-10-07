/** @maataa/maataa-ui · components · tabs — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
import { useState } from "react";
export type TabsProps = { items?: string[]; active?: number; onChange?: (i: number) => void };
export function Tabs({ items = [], active, onChange }: TabsProps) {
  const [internal, setInternal] = useState(active ?? 0);
  const cur = active ?? internal;
  return <div role="tablist" style={{ display: "flex", gap: 4, borderBottom: "1px solid " + token("--maataa-border") }}>{items.map((t, i) => (
    <button key={t} role="tab" aria-selected={i === cur} onClick={() => { setInternal(i); onChange?.(i); }} style={{ padding: "9px 14px", fontSize: 13, background: "none", border: "none", borderBottom: "2px solid " + (i === cur ? token("--maataa-accent-secondary") : "transparent"), color: i === cur ? token("--maataa-accent-secondary") : token("--maataa-text-muted"), cursor: "pointer", fontWeight: i === cur ? 600 : 400 }}>{t}</button>
  ))}</div>;
}
export default Tabs;
export const meta = { layer: "components", id: "tabs", status: "IMPLEMENTED", themed: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
