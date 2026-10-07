export function StatusCard({
  label,
  value,
  tone = "watch"
}: {
  label: string;
  value: string;
  tone?: "good" | "watch" | "risk";
}) {
  return (
    <div className={`status-card status-card-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
