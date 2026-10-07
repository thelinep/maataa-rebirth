/** @maataa/maataa-ui · components · tooltip — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
import { useState } from "react";
import type { ReactNode } from "react";
export type TooltipProps = { text?: string; children?: ReactNode };
export function Tooltip({ text = "", children }: TooltipProps) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show ? (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "100%",
            left: 0,
            background: token("--maataa-surface-alt"),
            border: "1px solid " + token("--maataa-border"),
            borderRadius: 9,
            padding: "8px 10px",
            fontSize: 12,
            color: token("--maataa-text-muted"),
            whiteSpace: "nowrap",
            zIndex: 10
          }}
        >
          {text}
        </span>
      ) : null}
    </span>
  );
}
export default Tooltip;
export const meta = {
  layer: "components",
  id: "tooltip",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
