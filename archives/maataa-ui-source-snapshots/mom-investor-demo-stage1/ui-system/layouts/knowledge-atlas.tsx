/** @maataa/maataa-ui · layouts · knowledge-atlas — IMPLEMENTED. Headless React, inline styles, tokens from foundations. PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import type { ReactNode } from "react";
import { ShellFrame } from "./_frame.tsx";
export type KnowledgeAtlasLayoutProps = { children?: ReactNode };
export function KnowledgeAtlasLayout({ children }: KnowledgeAtlasLayoutProps) {
  return <ShellFrame title="Knowledge Atlas" nav={["Search","Graph","Citations","Facts"]}>{children}</ShellFrame>;
}
export default KnowledgeAtlasLayout;
export const meta = { layer: "layouts", id: "knowledge-atlas", status: "IMPLEMENTED", implemented: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
