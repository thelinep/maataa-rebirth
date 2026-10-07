/** @maataa/maataa-ui · components · sidebar — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
export type SidebarProps = { items?: string[]; active?: number };
export function Sidebar({ items = [], active = 0 }: SidebarProps) {
  return <nav aria-label="sidebar" style={{ width: 200, background: token("--maataa-surface-alt"), border: "1px solid " + token("--maataa-border"), borderRadius: 10, padding: 10 }}>{items.map((it, i) => <a key={it} aria-current={i === active ? "page" : undefined} style={{ display: "block", padding: "7px 9px", borderRadius: 7, fontSize: 12.5, color: i === active ? "#fff" : token("--maataa-text-muted"), background: i === active ? token("--maataa-accent-secondary") : "transparent" }}>{it}</a>)}</nav>;
}
export default Sidebar;
export const meta = { layer: "components", id: "sidebar", status: "IMPLEMENTED", themed: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
