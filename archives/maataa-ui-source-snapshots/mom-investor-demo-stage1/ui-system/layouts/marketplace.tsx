/** @maataa/maataa-ui · layouts · marketplace — IMPLEMENTED. Headless React, inline styles, tokens from foundations. PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import type { ReactNode } from "react";
import { ShellFrame } from "./_frame.tsx";
export type MarketplaceLayoutProps = { children?: ReactNode };
export function MarketplaceLayout({ children }: MarketplaceLayoutProps) {
  return <ShellFrame title="Marketplace" nav={["Catalog","Packs","Productize"]}>{children}</ShellFrame>;
}
export default MarketplaceLayout;
export const meta = { layer: "layouts", id: "marketplace", status: "IMPLEMENTED", implemented: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
