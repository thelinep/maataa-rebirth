/** @maataa/maataa-ui · components · cards — themed via token() (canonical --maataa-* vars from ThemeProvider). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import type { ReactNode } from "react";
import { token } from "../foundations/ThemeProvider.tsx";
import { COLOR_TO_CANONICAL_TOKEN } from "../foundations/canonical-map.ts";
export type CardAccent =
  "sacredPurple" | "primaryGold" | "energeticBlue" | "successGreen" | "warningOrange" | "dangerRed";
export type CardProps = { title?: string; accent?: CardAccent; action?: string; children?: ReactNode };
export function Card({ title = "Card Title", accent = "sacredPurple", action, children }: CardProps) {
  const accentVar = token(COLOR_TO_CANONICAL_TOKEN[accent]);
  return (
    <div
      style={{
        background: token("--maataa-surface-alt"),
        border: "1px solid " + token("--maataa-border"),
        borderTop: "3px solid " + accentVar,
        borderRadius: 12,
        padding: 14,
        color: token("--maataa-text")
      }}
    >
      {title ? <div style={{ fontWeight: 600, marginBottom: 5 }}>{title}</div> : null}
      <div style={{ color: token("--maataa-text-muted"), fontSize: 12 }}>{children}</div>
      {action ? <div style={{ color: accentVar, fontSize: 12, marginTop: 10, fontWeight: 600 }}>{action} →</div> : null}
    </div>
  );
}
export default Card;
export const meta = {
  layer: "components",
  id: "cards",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
