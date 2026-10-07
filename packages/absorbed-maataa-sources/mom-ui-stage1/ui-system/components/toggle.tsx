/** @maataa/maataa-ui · components · toggle — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
import { useState } from "react";
export type ToggleProps = { on?: boolean; onChange?: (v: boolean) => void; label?: string };
export function Toggle({ on, onChange, label }: ToggleProps) {
  const [internal, setInternal] = useState(on ?? false);
  const v = on ?? internal;
  return (
    <button
      role="switch"
      aria-checked={v}
      aria-label={label}
      onClick={() => {
        setInternal(!v);
        onChange?.(!v);
      }}
      style={{
        width: 42,
        height: 24,
        borderRadius: 999,
        border: "none",
        background: v ? token("--maataa-accent-secondary") : token("--maataa-border"),
        position: "relative",
        cursor: "pointer"
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: v ? 21 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .15s"
        }}
      />
    </button>
  );
}
export default Toggle;
export const meta = {
  layer: "components",
  id: "toggle",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
