import type { PropsWithChildren, ReactNode } from "react";
import type { EvidenceState, NavItem, Readiness } from "./contracts.js";

export function StatusBadge({ state }: { state: Readiness | EvidenceState }) {
  return <span className={`maataa-badge maataa-badge--${state}`}>{state}</span>;
}

export function Panel({ title, eyebrow, children }: PropsWithChildren<{ title: string; eyebrow?: string }>) {
  return <section className="maataa-panel">{eyebrow && <p className="maataa-eyebrow">{eyebrow}</p>}<h2>{title}</h2>{children}</section>;
}

export function AppShell({ navigation, activeId, title, context, children }: PropsWithChildren<{
  navigation: readonly NavItem[]; activeId: string; title: string; context?: ReactNode;
}>) {
  return <div className="maataa-shell">
    <aside><div className="maataa-brand"><span>माता</span><strong>Maataa UI</strong></div><nav aria-label="Primary">{navigation.map(item => <a aria-current={item.id === activeId ? "page" : undefined} href={item.href} key={item.id}>{item.label}</a>)}</nav></aside>
    <main><header><div><p className="maataa-eyebrow">Sovereign interaction layer</p><h1>{title}</h1></div>{context}</header>{children}</main>
    <button className="maataa-fab" aria-label="Ask Maataa">म</button>
  </div>;
}
