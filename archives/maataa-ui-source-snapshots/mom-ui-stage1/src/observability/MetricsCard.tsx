export function MetricsCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="metrics-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {delta ? <em>{delta}</em> : null}
    </div>
  );
}
