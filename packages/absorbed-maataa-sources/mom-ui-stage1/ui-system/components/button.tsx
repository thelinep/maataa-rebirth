/** @maataa/maataa-ui · components · button — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
import type { ReactNode } from "react";
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";
export type ButtonProps = {
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: ReactNode;
};
export function Button({ variant = "primary", disabled = false, loading = false, onClick, children }: ButtonProps) {
  const bg =
    variant === "primary"
      ? token("--maataa-accent-primary")
      : variant === "secondary"
        ? token("--maataa-accent-secondary")
        : "transparent";
  const fg = variant === "primary" ? "#1a1206" : variant === "secondary" ? "#fff" : token("--maataa-text");
  const border = variant === "tertiary" ? "1px solid " + token("--maataa-border") : "1px solid transparent";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      style={{
        font: "inherit",
        fontWeight: 600,
        fontSize: 13,
        borderRadius: 9,
        padding: "9px 16px",
        background: bg,
        color: fg,
        border,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer"
      }}
    >
      {loading ? "↻ " : ""}
      {children}
    </button>
  );
}
export default Button;
export const meta = {
  layer: "components",
  id: "button",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
