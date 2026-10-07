export function GlowRing({ className = "" }: { className?: string }) {
  return <div className={`glow-ring ${className}`.trim()} aria-hidden="true" />;
}
