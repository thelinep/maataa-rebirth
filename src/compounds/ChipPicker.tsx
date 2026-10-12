import React from "react";
import { cx } from "../utils";

export interface ChipPickerItem { value: string; label: React.ReactNode; meta?: React.ReactNode; disabled?: boolean }
export interface ChipPickerProps {
  items: readonly ChipPickerItem[];
  value: string;
  onValueChange: (value: string) => void;
  /** Accessible name of the list. */
  label: string;
  /** Selecting the chosen chip again clears the choice. Default true. */
  allowDeselect?: boolean;
  className?: string;
}

/** Single-choice toggle chips (buttons with aria-pressed) in a labelled list. */
export function ChipPicker({ items, value, onValueChange, label, allowDeselect = true, className }: ChipPickerProps) {
  return (
    <ul aria-label={label} className={cx("m-chip-picker", className)}>
      {items.map((item) => {
        const pressed = item.value === value;
        return (
          <li key={item.value}>
            <button type="button" className="m-chip-picker-item" aria-pressed={pressed} disabled={item.disabled} onClick={() => onValueChange(pressed && allowDeselect ? "" : item.value)}>
              <span>{item.label}</span>{item.meta !== undefined && <small>{item.meta}</small>}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
