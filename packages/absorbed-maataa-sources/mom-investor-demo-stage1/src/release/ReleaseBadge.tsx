export function ReleaseBadge({ tag, commit }: { tag: string; commit?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-amber-200">
      {tag}
      {commit ? <span className="font-mono text-zinc-400">{commit.slice(0, 7)}</span> : null}
    </span>
  );
}
