/** @maataa/maataa-ui · layouts · _frame — themed via token() (canonical --maataa-* vars from ThemeProvider). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import type { ReactNode } from "react";
import { ThemeProvider, token } from "../foundations/ThemeProvider.tsx";
export const PHKD_BANNER = "RUNTIME CONTROLLED_NO_GO · PRODUCTION PRODUCTION_READY_NO";
export type FrameProps = { title?: string; nav?: string[]; children?: ReactNode };
export function ShellFrame({ title = "Layout", nav = [], children }: FrameProps) {
  return (
    <ThemeProvider as="div">
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", minHeight: "100vh", background: token("--maataa-background"), color: token("--maataa-text"), fontFamily: "Inter, system-ui, sans-serif" }}>
        <aside style={{ background: token("--maataa-surface"), borderRight: "1px solid " + token("--maataa-border"), padding: 14 }}>
          <div style={{ color: token("--maataa-accent-primary"), fontWeight: 800, fontSize: 18 }}>∞ maataa</div>
          <nav style={{ marginTop: 12 }}>{nav.map((n) => <div key={n} style={{ padding: "7px 9px", color: token("--maataa-text-muted"), fontSize: 13 }}>{n}</div>)}</nav>
          <div style={{ marginTop: 12, padding: 9, border: "1px solid " + token("--maataa-accent-primary"), borderRadius: 8, color: token("--maataa-accent-primary"), fontSize: 10 }}>{PHKD_BANNER}</div>
        </aside>
        <main style={{ padding: 24 }}><h1 style={{ fontSize: 20, margin: "0 0 16px" }}>{title}</h1>{children}</main>
      </div>
    </ThemeProvider>
  );
}
export default ShellFrame;
