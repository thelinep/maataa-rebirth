import React from "react";
import { cx } from "../utils";
import { Input } from "../forms";

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange" | "aria-label"> {
  /** Accessible name; search boxes usually have no visible label. */
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  /** Decorative icon shown before the input (hidden from screen readers). */
  icon?: React.ReactNode;
  /** Class on the wrapper; the input keeps the Input atom class. */
  className?: string;
  inputClassName?: string;
}

/** A search input with an accessible name and an optional leading icon. */
export function SearchField({ label, value, onValueChange, icon, className, inputClassName, ...rest }: SearchFieldProps) {
  return (
    <label className={cx("m-search-field", className)}>
      {icon !== undefined && <span aria-hidden="true" className="m-search-field-icon">{icon}</span>}
      <Input type="search" aria-label={label} className={inputClassName} value={value} onChange={(event) => onValueChange(event.target.value)} {...rest} />
    </label>
  );
}
