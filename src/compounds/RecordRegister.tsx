import React, { useMemo } from "react";
import { cx } from "../utils";
import { Button } from "../actions";
import { DataTable, type DataColumn } from "../data";
import { Badge } from "../feedback";
import { LiveStatus, useAnnouncer } from "./LiveStatus";
import { RecordForm } from "./RecordForm";
import { StatSummary } from "./StatSummary";
import { StatusStep } from "./StatusStep";
import { cleanRecord, formatMoney, pluralLabel, sumMoney, validateRecord, type RecordField, type RecordValues } from "./schema";

export interface RegisterRecord {
  id: string;
  values: RecordValues;
  status: string;
  sample?: boolean;
  updatedAt?: string;
}

export interface RecordRegisterProps {
  /** Singular name of one record, e.g. "Casting entry". */
  recordLabel: string;
  fields: readonly RecordField[];
  /** Ordered statuses; new records start at the first. */
  statuses: readonly string[];
  records: readonly RegisterRecord[];
  onRecordsChange: (next: RegisterRecord[]) => void;
  /** Example rows offered while the register is empty; added with sample: true. */
  samples?: readonly RecordValues[];
  maxRecords?: number;
  currency?: string;
  locale?: string;
  /** Override ID creation (tests, server IDs). */
  createId?: () => string;
  now?: () => string;
  className?: string;
}

let sequence = 0;
const defaultId = () => `rec-${Date.now().toString(36)}-${(sequence++).toString(36)}`;

/** Create a record from values, or throw with the validation messages. */
export function createRegisterRecord(fields: readonly RecordField[], statuses: readonly string[], values: RecordValues, options: { sample?: boolean; id?: string; now?: string } = {}): RegisterRecord {
  const errors = Object.values(validateRecord(fields, values));
  if (errors.length) throw new Error(errors.join(" "));
  return { id: options.id ?? defaultId(), values: cleanRecord(fields, values), status: statuses[0], sample: options.sample ?? false, updatedAt: options.now ?? new Date().toISOString() };
}

/** Parse untrusted stored rows: drops anything that does not fit the schema or statuses. */
export function parseRegisterRecords(raw: unknown, fields: readonly RecordField[], statuses: readonly string[], maxRecords = 200): RegisterRecord[] | null {
  if (!Array.isArray(raw)) return null;
  return raw.slice(0, maxRecords).flatMap((item): RegisterRecord[] => {
    if (typeof item !== "object" || item === null) return [];
    const record = item as Partial<RegisterRecord>;
    if (typeof record.id !== "string" || typeof record.status !== "string" || !statuses.includes(record.status)) return [];
    if (typeof record.values !== "object" || record.values === null) return [];
    const values = Object.fromEntries(fields.map((field) => [field.key, String((record.values as Record<string, unknown>)[field.key] ?? "")]));
    if (Object.keys(validateRecord(fields, values)).length) return [];
    return [{ id: record.id, values, status: record.status, sample: record.sample === true, updatedAt: typeof record.updatedAt === "string" ? record.updatedAt : "" }];
  });
}

/**
 * A complete local register: summary stats, a schema-driven add form, a table with a status
 * step and remove action per row, and one live region. Built from StatSummary, RecordForm,
 * DataTable, StatusStep and LiveStatus.
 */
export function RecordRegister({ recordLabel, fields, statuses, records, onRecordsChange, samples = [], maxRecords = 200, currency = "INR", locale = "en-IN", createId = defaultId, now = () => new Date().toISOString(), className }: RecordRegisterProps) {
  const [message, announce] = useAnnouncer();
  const plural = pluralLabel(recordLabel);
  const hasMoney = fields.some((field) => field.money);
  const firstKey = fields[0]?.key;
  const nameOf = (record: RegisterRecord) => record.values[firstKey] || recordLabel;

  const summary = useMemo(() => [
    { id: "total", label: plural, value: records.length },
    ...(hasMoney ? [{ id: "money", label: "Total estimate", value: formatMoney(sumMoney(fields, records.map((r) => r.values)), currency, locale) }] : []),
    ...statuses.map((status) => ({ id: `status-${status}`, label: status, value: records.filter((r) => r.status === status).length })),
  ], [records, statuses, fields, hasMoney, plural, currency, locale]);

  const columns: DataColumn<RegisterRecord>[] = [
    ...fields.map((field): DataColumn<RegisterRecord> => ({
      id: field.key,
      header: field.label,
      accessor: (row) => { const v = row.values[field.key]; return !v ? "—" : field.money ? formatMoney(Number(v), currency, locale) : v; },
    })),
    { id: "status", header: "Status", accessor: (row) => <span className="m-register-status"><StatusStep status={row.status} statuses={statuses} itemLabel={nameOf(row)} onAdvance={(next) => { onRecordsChange(records.map((r) => r.id === row.id ? { ...r, status: next, updatedAt: now() } : r)); announce(`${nameOf(row)} moved to ${next}.`); }} />{row.sample && <Badge>sample</Badge>}</span> },
    { id: "actions", header: <span className="m-sr-only">Actions</span>, accessor: (row) => <Button variant="secondary" aria-label={`Remove ${nameOf(row)}`} onClick={() => { onRecordsChange(records.filter((r) => r.id !== row.id)); announce(`${nameOf(row)} removed.`); }}>Remove</Button> },
  ];

  const addSamples = () => {
    onRecordsChange(samples.slice(0, maxRecords).map((values) => createRegisterRecord(fields, statuses, values, { sample: true, id: createId(), now: now() })));
    announce("Sample records added.");
  };

  return (
    <div className={cx("m-record-register", className)}>
      <StatSummary items={summary} label={`${plural} summary`} />
      <RecordForm
        aria-label={`Add ${recordLabel.toLowerCase()}`}
        fields={fields}
        submitLabel={`Add ${recordLabel.toLowerCase()}`}
        onSubmit={(values) => {
          if (records.length >= maxRecords) return `This list holds up to ${maxRecords} ${plural.toLowerCase()}.`;
          onRecordsChange([...records, createRegisterRecord(fields, statuses, values, { id: createId(), now: now() })]);
          announce(`${recordLabel} added.`);
        }}
        actions={records.length === 0 && samples.length > 0 ? <Button variant="secondary" onClick={addSamples}>Add sample records</Button> : undefined}
      />
      <div className="m-register-table">
        <DataTable data={[...records]} columns={columns} caption={plural} empty={`No ${plural.toLowerCase()} yet. Add one above${samples.length ? " or add the sample records" : ""}.`} />
      </div>
      <LiveStatus message={message} />
    </div>
  );
}
