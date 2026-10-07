/** @maataa/maataa-ui · layouts · evidence-vault — IMPLEMENTED. Headless React, inline styles, tokens from foundations. PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import type { ReactNode } from "react";
import { ShellFrame } from "./_frame.tsx";
export type EvidenceVaultLayoutProps = { children?: ReactNode };
export function EvidenceVaultLayout({ children }: EvidenceVaultLayoutProps) {
  return <ShellFrame title="Evidence Vault" nav={["Reports","Approvals","Witness"]}>{children}</ShellFrame>;
}
export default EvidenceVaultLayout;
export const meta = { layer: "layouts", id: "evidence-vault", status: "IMPLEMENTED", implemented: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
