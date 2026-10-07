export function DeviceTrustBadge({ trusted }: { trusted: boolean }) {
  return <span className={trusted ? "rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200" : "rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200"}>{trusted ? "Trusted" : "Unverified"}</span>;
}
