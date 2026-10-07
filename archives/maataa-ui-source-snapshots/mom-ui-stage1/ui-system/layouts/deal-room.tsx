/** @maataa/maataa-ui · layouts · deal-room — IMPLEMENTED. Headless React, inline styles, tokens from foundations. PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import type { ReactNode } from "react";
import { ShellFrame } from "./_frame.tsx";
export type DealRoomLayoutProps = { children?: ReactNode };
export function DealRoomLayout({ children }: DealRoomLayoutProps) {
  return (
    <ShellFrame title="Deal Room" nav={["Deals", "Portfolio", "Pipeline"]}>
      {children}
    </ShellFrame>
  );
}
export default DealRoomLayout;
export const meta = {
  layer: "layouts",
  id: "deal-room",
  status: "IMPLEMENTED",
  implemented: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
