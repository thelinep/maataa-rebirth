import React, { useId, useState } from "react";
import { cx } from "../utils";
import { Button } from "../actions";
import { DateField, NumberField, SelectField, TextAreaField, TextField } from "./fields";
import { cleanRecord, validateRecord, type RecordErrors, type RecordField, type RecordValues } from "./schema";

export interface RecordFormProps {
  fields: readonly RecordField[];
  /** Called with trimmed values once every field is valid. Return a message to show it as a form error. */
  onSubmit: (values: RecordValues) => void | string;
  submitLabel?: React.ReactNode;
  /** Extra buttons next to submit (e.g. "Add sample records"). */
  actions?: React.ReactNode;
  initialValues?: RecordValues;
  /** Clear the form after a successful submit. Default true. */
  resetOnSubmit?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

/** Schema-driven form: one labelled field per RecordField, validation on submit, errors linked to their fields. */
export function RecordForm({ fields, onSubmit, submitLabel = "Add", actions, initialValues = {}, resetOnSubmit = true, className, ...aria }: RecordFormProps) {
  const prefix = useId();
  const [values, setValues] = useState<RecordValues>(initialValues);
  const [errors, setErrors] = useState<RecordErrors>({});
  const [formError, setFormError] = useState("");
  const set = (key: string) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => { const next = { ...current }; delete next[key]; return next; });
  };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validateRecord(fields, values);
    setErrors(found);
    if (Object.keys(found).length) { setFormError(`Check ${Object.keys(found).length === 1 ? "1 field" : `${Object.keys(found).length} fields`}.`); return; }
    const result = onSubmit(cleanRecord(fields, values));
    if (typeof result === "string") { setFormError(result); return; }
    setFormError("");
    if (resetOnSubmit) setValues(initialValues);
  };

  return (
    <form className={cx("m-record-form", className)} onSubmit={submit} noValidate {...aria}>
      {fields.map((field) => {
        const common = { id: `${prefix}-${field.key}`, label: field.label, value: values[field.key] ?? "", onValueChange: set(field.key), error: errors[field.key], required: field.required, description: field.description, placeholder: field.placeholder };
        switch (field.kind) {
          case "select": return <SelectField key={field.key} {...common} options={field.options ?? []} placeholder="Choose…" />;
          case "number": return <NumberField key={field.key} {...common} min={field.min ?? 0} max={field.max} />;
          case "date": return <DateField key={field.key} {...common} />;
          case "textarea": return <TextAreaField key={field.key} {...common} maxLength={field.maxLength ?? 2000} rows={3} />;
          default: return <TextField key={field.key} {...common} maxLength={field.maxLength ?? 160} />;
        }
      })}
      <div className="m-record-form-actions">
        <Button type="submit">{submitLabel}</Button>
        {actions}
      </div>
      {formError && <p className="m-field-error" role="alert">{formError}</p>}
    </form>
  );
}
