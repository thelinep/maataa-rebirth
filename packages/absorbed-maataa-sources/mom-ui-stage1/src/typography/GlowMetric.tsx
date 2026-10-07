export function GlowMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="glow-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
