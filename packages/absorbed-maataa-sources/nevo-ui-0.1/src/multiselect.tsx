"use client";

import type { ReactNode } from "react";
import { Select as BaseSelect } from "@base-ui/react/select";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export interface MultiSelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: readonly MultiSelectOption[];
  /** Controlled-only: an array of the currently-selected values, same
   * contract as every other stateful primitive here. `Select`
   * (components.tsx) stays the single-value native `<select>` -- this is
   * the multi-value sibling it never had, not a replacement for it. */
  value: readonly string[];
  onValueChange(value: string[]): void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * A `value: string[]` prop surface over Base UI's `Select` primitive with
 * `multiple` set (select/root/SelectRoot.d.ts confirms `multiple` on
 * `Select.Root`) -- the checkbox-style multi-value select this package's
 * plain `Select` never covered. Base UI's own multiple-selection mode
 * handles toggling items in/out of the array and keeping the popup open
 * across picks; this wrapper renders the selected labels (comma-joined)
 * in the trigger via `Select.Value`'s render-prop form, since the built-
 * in label lookup only covers a single selected value, not a set.
 */
export function MultiSelect({ options, value, onValueChange, label, placeholder = "Select…", disabled, className }: MultiSelectProps) {
  const field = (
    <BaseSelect.Root multiple value={[...value]} onValueChange={next => onValueChange(next as string[])} disabled={disabled}>
      <BaseSelect.Trigger className={classes("maataa-ui", "maataa-ui__multiselect-trigger", className)}>
        <BaseSelect.Value>
          {() => {
            if (value.length === 0) return placeholder;
            const labels = options.filter(option => value.includes(option.value)).map(option => option.label);
            return labels.length ? labels.map((entry, index) => <span key={index}>{index > 0 ? ", " : ""}{entry}</span>) : `${value.length} selected`;
          }}
        </BaseSelect.Value>
        <span aria-hidden="true" className="maataa-ui__multiselect-icon">▾</span>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="maataa-ui__multiselect-positioner" sideOffset={4}>
          <BaseSelect.Popup className="maataa-ui__multiselect-popup">
            <BaseSelect.List>
              {options.map(option => (
                <BaseSelect.Item key={option.value} value={option.value} disabled={option.disabled} className="maataa-ui__multiselect-item">
                  <BaseSelect.ItemIndicator className="maataa-ui__multiselect-item-indicator" aria-hidden="true">
                    ✓
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
  return label ? (
    <label className="maataa-ui maataa-ui__multiselect-label">
      {label}
      {field}
    </label>
  ) : (
    field
  );
}
