import { buildRuntimeTimeline, type RuntimeTimelineEvent } from "@maataa/time-runtime";

export function RuntimeTimeline({ events }: { events: RuntimeTimelineEvent[] }) {
  const timeline = buildRuntimeTimeline(events);
  return (
    <div className="grid gap-3">
      {timeline.map((event) => (
        <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-4" key={event.id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-white">{event.title}</h3>
            <span className="rounded-full border border-amber-300/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-200">{event.hemantSamwat.label}</span>
          </div>
          <p className="mt-2 text-sm text-zinc-400">{event.category ?? "runtime"} · {event.display}</p>
        </article>
      ))}
    </div>
  );
}
