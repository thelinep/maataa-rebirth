import type { DomainNode } from "@maataa/navigation";
import { statusLabel } from "@maataa/navigation";

export function DomainCard({ domain }: { domain: DomainNode }) {
  return (
    <a className="domain-runtime-card" href={domain.href}>
      <span>{domain.category}</span>
      <strong>{domain.domain}</strong>
      <p>{domain.description}</p>
      <em>{statusLabel(domain.status)}</em>
    </a>
  );
}
