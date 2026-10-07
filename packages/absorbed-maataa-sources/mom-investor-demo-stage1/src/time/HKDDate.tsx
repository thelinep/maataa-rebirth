import { formatRuntimeDate, toDate, type RuntimeDateInput } from "@maataa/time-runtime";

export function HKDDate({ value, className = "" }: { value: RuntimeDateInput; className?: string }) {
  return <time className={className} dateTime={toDate(value).toISOString()}>{formatRuntimeDate(value, "hkd")}</time>;
}
