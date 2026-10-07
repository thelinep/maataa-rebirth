/**
 * @maataa/ui/status/StatusBadge
 * Compact readiness indicator built on the Badge primitive
 */

import React from "react";
import { Badge, type BadgeProps } from "../primitives/Badge";

export type Readiness = "ready" | "partial" | "blocked" | "unknown";

export interface StatusBadgeProps extends Omit<BadgeProps, "variant" | "children"> {
  /**
   * The readiness state to display
   */
  state: Readiness;
}

const readinessVariant: Record<Readiness, NonNullable<BadgeProps["variant"]>> = {
  ready: "success",
  partial: "warning",
  blocked: "error",
  unknown: "default",
};

/**
 * StatusBadge
 * Maps a `Readiness` state ("ready" | "partial" | "blocked" | "unknown")
 * to a pre-styled `Badge` variant, so callers displaying a readiness
 * indicator don't need to pick colors themselves.
 *
 * @example
 * ```tsx
 * <StatusBadge state="ready" />
 * <StatusBadge state="blocked" />
 * ```
 */
export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ state, ...props }, ref) => (
    <Badge ref={ref} variant={readinessVariant[state]} {...props}>
      {state}
    </Badge>
  )
);

StatusBadge.displayName = "StatusBadge";
