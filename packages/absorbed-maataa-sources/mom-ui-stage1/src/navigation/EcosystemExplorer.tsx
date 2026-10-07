"use client";

import type { DomainNode, EcosystemNode } from "@maataa/navigation";
import { statusLabel } from "@maataa/navigation";

type ExplorerProps = {
  nodes: EcosystemNode[] | DomainNode[];
  variant?: "systems" | "domains";
};

export function EcosystemExplorer({ nodes, variant = "systems" }: ExplorerProps) {
  return (
    <div className={`ecosystem-explorer ecosystem-explorer-${variant}`}>
      {nodes.map((node) => (
        <a className="explorer-card" href={node.href} key={node.id}>
          <span className={`nav-status nav-status-${node.status}`}>{statusLabel(node.status)}</span>
          <strong>{node.title}</strong>
          {"domain" in node ? <small>{node.domain}</small> : <small>{node.category}</small>}
          <p>{node.description}</p>
          <span className="explorer-tags">
            {node.tags.slice(0, 3).map((tag) => (
              <em key={tag}>{tag}</em>
            ))}
          </span>
          {"uptimeLabel" in node ? <span className="uptime-indicator">{node.uptimeLabel}</span> : null}
        </a>
      ))}
    </div>
  );
}
