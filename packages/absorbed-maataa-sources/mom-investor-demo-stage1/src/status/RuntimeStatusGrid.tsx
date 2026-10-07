export type RuntimeStatusGridItem = {
  label: string;
  value: string;
  status: "operational" | "degraded" | "unknown";
};

export function RuntimeStatusGrid({ items }: { items: RuntimeStatusGridItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={item.label}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-zinc-400">{item.label}</p>
            <span className={item.status === "operational" ? "text-emerald-300" : item.status === "degraded" ? "text-red-300" : "text-zinc-400"}>●</span>
          </div>
          <strong className="mt-3 block text-2xl text-white">{item.value}</strong>
          <span className="mt-2 block text-xs uppercase tracking-[0.16em] text-zinc-500">{item.status}</span>
        </article>
      ))}
    </div>
  );
}
