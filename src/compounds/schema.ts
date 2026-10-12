// Field schemas shared by RecordForm, RecordRegister and any app that keeps simple records.

export type RecordFieldKind = "text" | "textarea" | "number" | "date" | "select";

export interface RecordFieldOption { value: string; label: string }

export interface RecordField {
  key: string;
  label: string;
  kind: RecordFieldKind;
  options?: readonly (string | RecordFieldOption)[];
  required?: boolean;
  /** An amount; RecordRegister sums these and formats them as money. */
  money?: boolean;
  /** Maximum characters; default 160 (textarea 2,000). */
  maxLength?: number;
  min?: number;
  max?: number;
  placeholder?: string;
  description?: string;
}

export type RecordValues = Record<string, string>;
export type RecordErrors = Record<string, string>;

export const optionValue = (option: string | RecordFieldOption) => (typeof option === "string" ? option : option.value);
export const optionLabel = (option: string | RecordFieldOption) => (typeof option === "string" ? option : option.label);

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Validates values against fields. Returns one plain-language message per invalid field. */
export function validateRecord(fields: readonly RecordField[], values: RecordValues): RecordErrors {
  const errors: RecordErrors = {};
  for (const field of fields) {
    const raw = (values[field.key] ?? "").trim();
    if (!raw) {
      if (field.required) errors[field.key] = `${field.label} is required.`;
      continue;
    }
    const maxLength = field.maxLength ?? (field.kind === "textarea" ? 2000 : 160);
    if (raw.length > maxLength) { errors[field.key] = `${field.label} must be ${maxLength} characters or fewer.`; continue; }
    if (field.kind === "number") {
      const n = Number(raw);
      const min = field.min ?? 0;
      if (!Number.isFinite(n) || n < min || (field.max !== undefined && n > field.max)) errors[field.key] = field.max !== undefined ? `${field.label} must be a number from ${min} to ${field.max}.` : `${field.label} must be a number of ${min} or more.`;
    }
    if (field.kind === "date" && (!ISO_DATE.test(raw) || Number.isNaN(Date.parse(`${raw}T00:00:00Z`)) || new Date(`${raw}T00:00:00Z`).toISOString().slice(0, 10) !== raw)) errors[field.key] = `${field.label} must be a valid date.`;
    if (field.kind === "select" && !field.options?.some((option) => optionValue(option) === raw)) errors[field.key] = `${field.label} must be one of the listed options.`;
  }
  return errors;
}

/** Trimmed values for exactly the schema's keys. */
export function cleanRecord(fields: readonly RecordField[], values: RecordValues): RecordValues {
  return Object.fromEntries(fields.map((field) => [field.key, (values[field.key] ?? "").trim()]));
}

export const pluralLabel = (label: string) => (/[^aeiou]y$/i.test(label) ? `${label.slice(0, -1)}ies` : /(s|x|ch|sh)$/i.test(label) ? `${label}es` : `${label}s`);

export function formatMoney(amount: number, currency = "INR", locale = "en-IN") {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${Math.round(amount)}`;
  }
}

export function sumMoney(fields: readonly RecordField[], rows: readonly RecordValues[]): number {
  const keys = fields.filter((field) => field.money).map((field) => field.key);
  return rows.reduce((total, row) => total + keys.reduce((sum, key) => sum + (Number(row[key]) || 0), 0), 0);
}

export function nextStatus(statuses: readonly string[], status: string): string | null {
  const index = statuses.indexOf(status);
  return index >= 0 && index < statuses.length - 1 ? statuses[index + 1] : null;
}
