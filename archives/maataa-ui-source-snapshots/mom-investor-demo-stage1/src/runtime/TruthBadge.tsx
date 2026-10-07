"use client";

import { type CSSProperties } from "react";
import {
  RUNTIME_STATE_INTENT,
  RUNTIME_STATE_LABELS,
  resolveDisplayState,
  type RuntimeEvidence,
  type RuntimeState
} from "@maataa/theme";
import { useSovereignRuntime } from "./SovereignRuntimeProvider.tsx";

/**
 * TruthBadge renders an honest runtime-state badge. The displayed state is
 * resolved through the truth-mode engine using the active runtime: a `live`
 * claim without validation evidence is downgraded to NEEDS VALIDATION, and
 * offline/degraded/local-only evidence always wins. Colours come from the
 * active theme's per-state palette (`--sv-state-*`).
 */
export type TruthBadgeProps = {
  /** The state the surface is claiming. */
  state: RuntimeState;
  /** Evidence backing the claim; drives truth-mode downgrades. */
  evidence?: RuntimeEvidence;
};

export function TruthBadge({ state, evidence }: TruthBadgeProps) {
  const { truthMode } = useSovereignRuntime();
  const resolved = resolveDisplayState(state, evidence, truthMode);

  const style: CSSProperties = {
    color: `var(--sv-state-${resolved}-fg)`,
    borderColor: `var(--sv-state-${resolved}-border)`,
    backgroundColor: `var(--sv-state-${resolved}-bg)`
  };

  return (
    <span className="sv-truth-badge" data-state={resolved} style={style} title={RUNTIME_STATE_INTENT[resolved]}>
      {RUNTIME_STATE_LABELS[resolved]}
    </span>
  );
}
