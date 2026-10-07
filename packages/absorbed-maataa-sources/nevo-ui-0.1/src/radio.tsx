"use client";

import type { ReactNode } from "react";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Accessible group label, rendered above the options. Required --
   * a radio group with no name for what it's choosing between fails the
   * same "what am I selecting" test Select's own `label` prop exists for. */
  label: ReactNode;
  options: readonly RadioOption[];
  /** Controlled-only, same contract as `Select` (components.tsx): the
   * caller owns the selected value, this component owns none of it. */
  value: string;
  onValueChange(value: string): void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  /** Renders options in a row instead of a column. @default false */
  inline?: boolean;
}

/**
 * A single `options`/`value`/`onValueChange` prop surface over Base UI's
 * `RadioGroup`/`Radio` primitives -- the caller never touches
 * `Radio.Root`/`Radio.Indicator` directly, mirroring how `Select`
 * (components.tsx) hides the native `<select>`'s own markup. Base UI's
 * `RadioGroup` already provides roving-tabindex arrow-key navigation
 * between radios and the correct `role="radiogroup"`/`role="radio"`
 * pairing -- this wrapper only supplies the `label` (a real, associated
 * `<span>` via `aria-labelledby`, not a bare visual heading) and renders
 * one `Radio.Root` per option.
 */
export function RadioGroup({ label, options, value, onValueChange, name, required, disabled, className, inline = false }: RadioGroupProps) {
  return (
    <fieldset className={classes("maataa-ui", "maataa-ui__radio-group", inline && "maataa-ui__radio-group--inline", className)} disabled={disabled}>
      <legend className="maataa-ui__radio-group-label">
        {label}
        {required ? " *" : ""}
      </legend>
      <BaseRadioGroup value={value} onValueChange={next => onValueChange(String(next))} name={name} required={required} disabled={disabled} className="maataa-ui__radio-group-options">
        {options.map(option => (
          <label key={option.value} className="maataa-ui__radio-option" data-disabled={option.disabled || disabled ? "" : undefined}>
            <BaseRadio.Root value={option.value} disabled={option.disabled} className="maataa-ui__radio">
              <BaseRadio.Indicator className="maataa-ui__radio-indicator" />
            </BaseRadio.Root>
            <span>{option.label}</span>
          </label>
        ))}
      </BaseRadioGroup>
    </fieldset>
  );
}
