export function CosmicGrid({ className = "" }: { className?: string }) {
  return <div className={`cosmic-grid ${className}`.trim()} aria-hidden="true" />;
}
