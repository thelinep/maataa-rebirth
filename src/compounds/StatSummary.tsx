import React from "react";
import { cx } from "../utils";
import { Stat } from "../data";

export interface StatSummaryItem { id?: string; label: React.ReactNode; value: React.ReactNode; helper?: React.ReactNode }
export interface StatSummaryProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "children"> {
  items: readonly StatSummaryItem[];
  /** Accessible name of the group, e.g. "Casting summary". */
  label: string;
}

/** A row of Stat atoms as a labelled list. Wraps to fewer columns on narrow screens. */
export function StatSummary({ items, label, className, ...rest }: StatSummaryProps) {
  return (
    <ul aria-label={label} className={cx("m-stat-summary", className)} {...rest}>
      {items.map((item, index) => <li key={item.id ?? index}><Stat label={item.label} value={item.value} helper={item.helper} /></li>)}
    </ul>
  );
}
