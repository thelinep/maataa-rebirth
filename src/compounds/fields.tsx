// Labelled form fields: FormField (label, description, error wiring) + one control atom.
// One component per control so apps stop hand-writing <label><span/><input/></label>.
import React from "react";
import { cx } from "../utils";
import { DatePicker, FormField, Input, NativeSelect, NumberInput, Textarea } from "../forms";
import { optionLabel, optionValue, type RecordFieldOption } from "./schema";

interface FieldBase {
  label: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  id?: string;
  /** Class on the field wrapper; the control keeps the package class. */
  className?: string;
  /** Extra class on the control itself, for apps with their own control styling. */
  controlClassName?: string;
}

type InputRest = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "id" | "className" | "required">;

const wrap = (className: string | undefined, node: React.ReactNode) => (className ? <div className={className}>{node}</div> : node);

export type TextFieldProps = FieldBase & InputRest;
export function TextField({ label, value, onValueChange, description, error, required, id, className, controlClassName, ...rest }: TextFieldProps) {
  return wrap(className, <FormField label={label} description={description} error={error} required={required} id={id}>
    {(ids) => <Input id={ids.id} aria-describedby={ids.describedBy} aria-invalid={ids.invalid || undefined} aria-required={required || undefined} className={controlClassName} value={value} onChange={(event) => onValueChange(event.target.value)} {...rest} />}
  </FormField>);
}

export type NumberFieldProps = FieldBase & Omit<InputRest, "type">;
export function NumberField({ label, value, onValueChange, description, error, required, id, className, controlClassName, ...rest }: NumberFieldProps) {
  return wrap(className, <FormField label={label} description={description} error={error} required={required} id={id}>
    {(ids) => <NumberInput id={ids.id} inputMode="decimal" aria-describedby={ids.describedBy} aria-invalid={ids.invalid || undefined} aria-required={required || undefined} className={controlClassName} value={value} onChange={(event) => onValueChange(event.target.value)} {...rest} />}
  </FormField>);
}

export type DateFieldProps = FieldBase & Omit<InputRest, "type">;
export function DateField({ label, value, onValueChange, description, error, required, id, className, controlClassName, ...rest }: DateFieldProps) {
  return wrap(className, <FormField label={label} description={description} error={error} required={required} id={id}>
    {(ids) => <DatePicker id={ids.id} aria-describedby={ids.describedBy} aria-invalid={ids.invalid || undefined} aria-required={required || undefined} className={controlClassName} value={value} onChange={(event) => onValueChange(event.target.value)} {...rest} />}
  </FormField>);
}

export type TextAreaFieldProps = FieldBase & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange" | "id" | "className" | "required">;
export function TextAreaField({ label, value, onValueChange, description, error, required, id, className, controlClassName, ...rest }: TextAreaFieldProps) {
  return wrap(className, <FormField label={label} description={description} error={error} required={required} id={id}>
    {(ids) => <Textarea id={ids.id} aria-describedby={ids.describedBy} aria-invalid={ids.invalid || undefined} aria-required={required || undefined} className={controlClassName} value={value} onChange={(event) => onValueChange(event.target.value)} {...rest} />}
  </FormField>);
}

export type SelectFieldProps = FieldBase & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange" | "id" | "className" | "required"> & {
  options: readonly (string | RecordFieldOption)[];
  /** First, empty option; omit to have no empty choice. */
  placeholder?: string;
};
export function SelectField({ label, value, onValueChange, description, error, required, id, className, controlClassName, options, placeholder, ...rest }: SelectFieldProps) {
  return wrap(className, <FormField label={label} description={description} error={error} required={required} id={id}>
    {(ids) => (
      <NativeSelect id={ids.id} aria-describedby={ids.describedBy} aria-invalid={ids.invalid || undefined} aria-required={required || undefined} className={cx(controlClassName)} value={value} onChange={(event) => onValueChange(event.target.value)} {...rest}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((option) => <option key={optionValue(option)} value={optionValue(option)}>{optionLabel(option)}</option>)}
      </NativeSelect>
    )}
  </FormField>);
}
