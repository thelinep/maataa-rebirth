export type RuntimeTimelineItem = {
  id: string;
  label: string;
  timestamp: string;
  tone?: "good" | "watch" | "risk";
};

export function RuntimeTimeline({ items }: { items: RuntimeTimelineItem[] }) {
  return (
    <ol className="runtime-timeline">
      {items.map((item) => (
        <li className={`runtime-timeline-item runtime-timeline-item-${item.tone ?? "watch"}`} key={item.id}>
          <span>{item.timestamp}</span>
          <strong>{item.label}</strong>
        </li>
      ))}
    </ol>
  );
}
