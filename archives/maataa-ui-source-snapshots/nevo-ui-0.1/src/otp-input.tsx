"use client";

import { OTPField } from "@base-ui/react/otp-field";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export interface OtpInputProps {
  /** Accessible label for the whole field -- rendered visually above the
   * slots, same pattern as `RadioGroup.label` (radio.tsx). */
  label: string;
  /** Number of digit/character slots. */
  length: number;
  /** Controlled-only, same contract as every other stateful primitive in
   * this package: the caller owns the entered code as a single string. */
  value: string;
  onValueChange(value: string): void;
  /** Restricts entry to numeric characters only (Base UI's own
   * `validationType`). @default "numeric" */
  validationType?: "numeric" | "alphanumeric" | "none";
  /** Masks entered characters (e.g. for a PIN rather than an OTP shown in
   * the clear). @default false */
  mask?: boolean;
  /** Submits the owning `<form>` automatically once every slot is filled.
   * @default false */
  autoSubmit?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  className?: string;
}

/**
 * A `length`/`value`/`onValueChange` prop surface over Base UI's
 * `OTPField` primitive (`@base-ui/react/otp-field`) -- the multi-slot
 * one-time-code/PIN input this package had no equivalent of. Base UI
 * handles the real complexity itself: paste-splitting a full code across
 * slots, arrow-key/backspace navigation between slots, and a single
 * hidden validation input for real `<form>` submission -- this wrapper
 * only renders `length` `OTPField.Input` slots and forwards the plain
 * string value, the same "caller owns the value, Base UI owns the
 * interaction" split as every other component in this package.
 */
export function OtpInput({ label, length, value, onValueChange, validationType = "numeric", mask = false, autoSubmit = false, disabled, required, name, className }: OtpInputProps) {
  return (
    <div className={classes("maataa-ui", "maataa-ui__otp", className)}>
      <span className="maataa-ui__otp-label" id={`${name ?? "maataa-otp"}-label`}>
        {label}
        {required ? " *" : ""}
      </span>
      <OTPField.Root
        length={length}
        value={value}
        onValueChange={next => onValueChange(next)}
        validationType={validationType}
        mask={mask}
        autoSubmit={autoSubmit}
        disabled={disabled}
        required={required}
        name={name}
        aria-labelledby={`${name ?? "maataa-otp"}-label`}
        className="maataa-ui__otp-slots"
      >
        {Array.from({ length }, (_, index) => (
          <OTPField.Input key={index} className="maataa-ui__otp-slot" />
        ))}
      </OTPField.Root>
    </div>
  );
}
