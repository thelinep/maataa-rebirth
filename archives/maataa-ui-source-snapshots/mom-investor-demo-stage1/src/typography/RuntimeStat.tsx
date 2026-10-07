export function RuntimeStat({ label, value, tone = "watch" }: { label: string; value: string; tone?: "good" | "watch" | "risk" }) {
  return (
    <div className={`runtime-stat runtime-stat-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
