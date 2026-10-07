"use client";

import type { CSSProperties } from "react";
import { resolveThemeStack, type ThemeStackInput } from "../../themes/index.ts";

export type RuntimeTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";
export type RuntimeSize = "sm" | "md" | "lg";

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function runtimeStyle(themeStack?: ThemeStackInput, style?: CSSProperties): CSSProperties {
  return {
    ...resolveThemeStack(themeStack ?? { themeIds: ["runtime-sovereign"] }).cssVariables,
    ...style
  } as CSSProperties;
}

export const toneClass: Record<RuntimeTone, string> = {
  neutral: "border-[color:var(--maataa-border)] text-[color:var(--maataa-text)]",
  primary: "border-[color:var(--maataa-primary)] text-[color:var(--maataa-primary)]",
  success: "border-[color:var(--maataa-success)] text-[color:var(--maataa-success)]",
  warning: "border-[color:var(--maataa-warning)] text-[color:var(--maataa-warning)]",
  danger: "border-[color:var(--maataa-danger)] text-[color:var(--maataa-danger)]",
  info: "border-[color:var(--maataa-secondary)] text-[color:var(--maataa-secondary)]"
};

export const panelClass =
  "rounded-2xl border border-[color:var(--maataa-border)] bg-[color:var(--maataa-surface)] text-[color:var(--maataa-text)] shadow-[0_18px_60px_var(--maataa-glow)]";
