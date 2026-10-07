"use client";

import { useId } from "react";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

export interface ColorPickerProps {
  label: string;
  /** Controlled-only 6-digit hex string (e.g. "#1d4ed8"), same contract
   * as every other stateful primitive in this package. */
  value: string;
  onValueChange(value: string): void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

/**
 * No Base UI primitive exists for this one (checked: no `color-field` or
 * equivalent in `@base-ui/react@1.8.0`'s package list) -- so, unlike
 * every other new field in this pass, this composes the native
 * `<input type="color">` directly rather than a Base UI part. The native
 * control already gives a real OS-level color picker with full keyboard
 * support; what it's missing on its own is a way to *see or type* the
 * exact hex value (most browsers render it as a bare swatch button with
 * no visible text), so this pairs it with a synced text input rather
 * than replacing it -- same "compose, don't reimplement" rule as the
 * Base-UI-backed components, just against a native element instead.
 * The text input is the one that validates and calls `onValueChange`;
 * the swatch always mirrors `value` and forwards its own native picker
 * output straight through (already guaranteed 6-digit hex by the browser).
 */
export function ColorPicker({ label, value, onValueChange, disabled, required, className }: ColorPickerProps) {
  const id = useId();
  const swatchId = `${id}-swatch`;
  const textId = `${id}-text`;
  const valid = HEX_PATTERN.test(value);
  return (
    <div className={classes("maataa-ui", "maataa-ui__color-picker", className)}>
      <label htmlFor={textId} className="maataa-ui__color-picker-label">
        {label}
        {required ? " *" : ""}
      </label>
      <div className="maataa-ui__color-picker-controls">
        <input
          id={swatchId}
          type="color"
          aria-label={`${label} swatch`}
          value={valid ? value : "#000000"}
          disabled={disabled}
          onChange={event => onValueChange(event.target.value)}
          className="maataa-ui__color-picker-swatch"
        />
        <input
          id={textId}
          type="text"
          inputMode="text"
          spellCheck={false}
          value={value}
          required={required}
          disabled={disabled}
          aria-invalid={!valid}
          placeholder="#000000"
          onChange={event => onValueChange(event.target.value)}
          className="maataa-ui__color-picker-text"
        />
      </div>
      {!valid && value.length > 0 ? (
        <p role="alert" className="maataa-ui__color-picker-error">
          Enter a 6-digit hex color, e.g. #1d4ed8.
        </p>
      ) : null}
    </div>
  );
}
