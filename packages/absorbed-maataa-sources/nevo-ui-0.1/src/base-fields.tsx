"use client";

import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export function TextInput({ label, className, inputClassName, ...props }: { label: ReactNode; className?: string; inputClassName?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, "className">) {
  return <label className={classes("maataa-ui", "maataa-ui__text-input", className)}><span>{label}</span><input {...props} className={classes("maataa-ui__text-input-control", inputClassName)} /></label>;
}

export function Checkbox({ label, checked, onCheckedChange, description, disabled, className }: { label: ReactNode; checked: boolean; onCheckedChange(checked: boolean): void; description?: ReactNode; disabled?: boolean; className?: string }) {
  return <label className={classes("maataa-ui", "maataa-ui__checkbox", className)}><input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onCheckedChange(event.target.checked)} /><span><strong>{label}</strong>{description ? <small>{description}</small> : null}</span></label>;
}

export type DateRangeValue = { start: string; end: string };
export function DateRange({ label, value, onChange, startLabel = "Start date", endLabel = "End date", min, max, disabled, className }: { label: ReactNode; value: DateRangeValue; onChange(value: DateRangeValue): void; startLabel?: string; endLabel?: string; min?: string; max?: string; disabled?: boolean; className?: string }) {
  return <fieldset className={classes("maataa-ui", "maataa-ui__date-range", className)} disabled={disabled}><legend>{label}</legend><label>{startLabel}<input type="date" value={value.start} min={min} max={max} onChange={(event) => onChange({ ...value, start: event.target.value })} /></label><label>{endLabel}<input type="date" value={value.end} min={value.start || min} max={max} onChange={(event) => onChange({ ...value, end: event.target.value })} /></label></fieldset>;
}

export function ImageHolder({ label, src, alt = "", placeholder = "No image selected", onFileChange, accept = "image/*", className }: { label: string; src?: string; alt?: string; placeholder?: string; onFileChange?(file: File | null): void; accept?: string; className?: string }) {
  const change = (event: ChangeEvent<HTMLInputElement>) => onFileChange?.(event.target.files?.[0] ?? null);
  return <label className={classes("maataa-ui", "maataa-ui__image-holder", className)}><span>{label}</span><span className="maataa-ui__image-holder-preview">{src ? <img src={src} alt={alt} /> : placeholder}</span>{onFileChange ? <input type="file" accept={accept} onChange={change} /> : null}</label>;
}

export function NumberInput({ label, value, onChange, min, max, step = 1, disabled, required, className }: { label: ReactNode; value: number | ""; onChange(value: number | ""): void; min?: number; max?: number; step?: number; disabled?: boolean; required?: boolean; className?: string }) {
  return <label className={classes("maataa-ui", "maataa-ui__number-input", className)}><span>{label}{required ? " *" : ""}</span><input type="number" value={value} min={min} max={max} step={step} disabled={disabled} required={required} onChange={(event) => onChange(event.target.value === "" ? "" : event.target.valueAsNumber)} /></label>;
}

export function Toggle({ label, checked, onCheckedChange, description, disabled, className }: { label: ReactNode; checked: boolean; onCheckedChange(checked: boolean): void; description?: ReactNode; disabled?: boolean; className?: string }) {
  return <label className={classes("maataa-ui", "maataa-ui__toggle", className)}><span><strong>{label}</strong>{description ? <small>{description}</small> : null}</span><input type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={(event) => onCheckedChange(event.target.checked)} /><span aria-hidden="true" /></label>;
}
