/**
 * @maataa/ui/data/ChartTooltip
 * Internal fixed-position hover tooltip shared by the chart components.
 * Not part of the public API.
 */

import React from "react";
import { Portal } from "../primitives/Portal";
import { colorTokens, radiusTokens, spacingTokens, typographyTokens } from "../tokens";

export interface ChartTooltipState {
  x: number;
  y: number;
  title: string;
  rows: { label: string; value: string; color?: string }[];
}

export const ChartTooltip: React.FC<{ state: ChartTooltipState | null }> = ({ state }) => {
  if (!state) return null;
  return (
    <Portal>
      <div
        role="tooltip"
        style={{
          position: "fixed",
          left: `${state.x}px`,
          top: `${state.y}px`,
          transform: "translate(-50%, -100%)",
          zIndex: 1000,
          pointerEvents: "none",
          padding: spacingTokens.sm,
          backgroundColor: colorTokens.background.inverse,
          color: colorTokens.text.inverse,
          borderRadius: radiusTokens.md,
          boxShadow: colorTokens.shadow.md,
          fontSize: typographyTokens.fontSize.xs,
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ fontWeight: typographyTokens.fontWeight.semibold, marginBottom: "2px" }}>
          {state.title}
        </div>
        {state.rows.map((row) => (
          <div
            key={row.label}
            style={{ display: "flex", alignItems: "center", gap: spacingTokens.xs }}
          >
            {row.color && (
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: radiusTokens.full,
                  backgroundColor: row.color,
                }}
              />
            )}
            <span>
              {row.label}: {row.value}
            </span>
          </div>
        ))}
      </div>
    </Portal>
  );
};

ChartTooltip.displayName = "ChartTooltip";
