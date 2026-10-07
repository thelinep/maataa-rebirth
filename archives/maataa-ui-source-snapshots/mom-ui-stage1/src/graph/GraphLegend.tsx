export function GraphLegend({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-zinc-300"
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
