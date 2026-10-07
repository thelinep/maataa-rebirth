/** @maataa/maataa-ui · layouts · observatory — IMPLEMENTED. Headless React, inline styles, tokens from foundations. PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import type { ReactNode } from "react";
import { ShellFrame } from "./_frame.tsx";
export type ObservatoryLayoutProps = { children?: ReactNode };
export function ObservatoryLayout({ children }: ObservatoryLayoutProps) {
  return (
    <ShellFrame title="Observatory" nav={["Overview", "Entities", "Evidence", "Dual-Path"]}>
      {children}
    </ShellFrame>
  );
}
export default ObservatoryLayout;
export const meta = {
  layer: "layouts",
  id: "observatory",
  status: "IMPLEMENTED",
  implemented: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
