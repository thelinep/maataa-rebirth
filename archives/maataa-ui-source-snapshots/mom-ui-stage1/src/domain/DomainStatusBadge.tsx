export function DomainStatusBadge({ status }: { status: "live" | "beta" | "coming" | "issue" | string }) {
  const className =
    status === "live"
      ? "text-emerald-300 border-emerald-300/30 bg-emerald-300/10"
      : status === "beta"
        ? "text-amber-200 border-amber-300/30 bg-amber-300/10"
        : status === "issue"
          ? "text-red-300 border-red-300/30 bg-red-300/10"
          : "text-zinc-300 border-white/10 bg-white/[0.04]";
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${className}`}>
      {status}
    </span>
  );
}
