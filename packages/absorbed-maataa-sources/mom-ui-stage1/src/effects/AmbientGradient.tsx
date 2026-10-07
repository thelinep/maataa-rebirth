export function AmbientGradient({ className = "" }: { className?: string }) {
  return <div className={`ambient-gradient ${className}`.trim()} aria-hidden="true" />;
}
