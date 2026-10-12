# Compounds (`@maataa/ui/compounds`)

Status: **EXPERIMENTAL** (not in the Beta stable list).

Compounds are built only from existing atoms. They add layout and wiring, never new visual primitives, so a theme change to an atom reaches every compound and every app that uses one.

| Compound | Built from | Use it for |
| --- | --- | --- |
| `TextField`, `NumberField`, `DateField`, `TextAreaField`, `SelectField` | `FormField` + `Input` / `NumberInput` / `DatePicker` / `Textarea` / `NativeSelect` | Any labelled control. Label, description, error, `aria-describedby`, `aria-invalid` and `aria-required` are wired for you. |
| `RecordForm` | the field compounds + `Button` | A form generated from a `RecordField[]` schema, validated on submit. |
| `StatSummary` | `Stat` | A labelled row of figures. |
| `StatusStep` | `Badge` + `Button` | A status that moves forward one step at a time. |
| `ChipPicker` | toggle buttons (`aria-pressed`) | Choosing one item from a short set. |
| `LiveStatus`, `useAnnouncer` | a polite live region | Confirmations such as "Saved". One per screen. |
| `RecordRegister` | `StatSummary`, `RecordForm`, `DataTable`, `StatusStep`, `LiveStatus` | A complete local list: summary, add form, table with status and remove, samples. |

Non-visual helpers:

- **Schema:** `RecordField`, `validateRecord`, `cleanRecord`, `pluralLabel`, `formatMoney`, `sumMoney`, `nextStatus`.
- **Records:** `createRegisterRecord` and `parseRegisterRecords` (drops stored rows that no longer fit the schema).
- **Storage:** `readStoredValue`, `readStoredText`, `writeStoredValue`, `removeStoredValue` and `useStoredValue(key, parse, initial)`. Every read is validated by `parse`, writes report failure instead of throwing, and other tabs' changes are picked up.

```tsx
import { RecordRegister, useStoredValue, parseRegisterRecords, type RecordField } from "@maataa/ui/compounds";

const fields: RecordField[] = [
  { key: "name", label: "Candidate", kind: "text", required: true },
  { key: "fee", label: "Fee estimate", kind: "number", money: true },
];
const statuses = ["Open", "Shortlisted", "Selected"];
const { value, setValue } = useStoredValue("casting.v1", (raw) => parseRegisterRecords(raw, fields, statuses), []);
<RecordRegister recordLabel="Casting entry" fields={fields} statuses={statuses} records={value} onRecordsChange={setValue} />;
```

Apps on a dark surface set the package theme once on their root (for example `data-maataa-theme="oled"`) instead of restyling compounds.
