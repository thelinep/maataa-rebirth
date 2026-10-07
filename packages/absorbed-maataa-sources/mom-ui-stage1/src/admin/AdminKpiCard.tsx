export function AdminKpiCard({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <article className="rounded-[var(--maataa-radius-lg)] border border-[color:var(--maataa-border)] bg-[color:var(--maataa-surface)]/82 p-5 text-[color:var(--maataa-text)] shadow-[0_16px_54px_var(--maataa-glow)]">
      <p className="text-sm font-bold text-[color:var(--maataa-muted)]">{label}</p>
      <strong className="mt-2 block text-3xl text-[color:var(--maataa-text)]">{value}</strong>
      {detail ? <span className="mt-2 block text-xs text-[color:var(--maataa-muted)]">{detail}</span> : null}
    </article>
  );
}
