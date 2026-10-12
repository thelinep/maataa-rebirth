import React from "react";
import { Badge } from "../feedback";
import { Button } from "../actions";
import { nextStatus } from "./schema";

export interface StatusStepProps {
  status: string;
  /** Ordered statuses; the item can only move forward one step at a time. */
  statuses: readonly string[];
  onAdvance?: (next: string) => void;
  /** Names the item in the button's accessible name, e.g. "Sample candidate A". */
  itemLabel: string;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
  disabled?: boolean;
}

/** Current status as a Badge plus a button to the next status (none at the last step). */
export function StatusStep({ status, statuses, onAdvance, itemLabel, tone, disabled }: StatusStepProps) {
  const next = nextStatus(statuses, status);
  const last = statuses.indexOf(status) === statuses.length - 1;
  return (
    <span className="m-status-step">
      <Badge tone={tone ?? (last ? "success" : "neutral")}>{status}</Badge>
      {next && onAdvance && <Button variant="secondary" disabled={disabled} onClick={() => onAdvance(next)} aria-label={`Move ${itemLabel} to ${next}`}>→ {next}</Button>}
    </span>
  );
}
