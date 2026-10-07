"use client";

import {
  companyNodes,
  developerNodes,
  domainNodes,
  ecosystemNodes,
  getNavigationSection,
  knowledgeNodes,
  solutionGroups,
  statusLabel,
  type EcosystemNode
} from "@maataa/navigation";
import type { ReactNode } from "react";
import { EcosystemExplorer } from "./EcosystemExplorer.tsx";

type MegaMenuProps = {
  active: string | null;
  onClose: () => void;
};

export function MegaMenu({ active, onClose }: MegaMenuProps) {
  if (!active) return null;

  return (
    <div className="mega-menu-shell" id="sovereign-mega-menu" onMouseLeave={onClose}>
      <div className="mega-menu-orbit" aria-hidden="true" />
      {active === "domains" ? (
        <MegaFrame
          eyebrow="Domain explorer"
          title="All public places."
          description="Open the live domains and see which areas are still in progress."
        >
          <EcosystemExplorer nodes={domainNodes} variant="domains" />
        </MegaFrame>
      ) : active === "solutions" ? (
        <MegaFrame
          eyebrow="Solutions"
          title="Choose by what you want to do."
          description="Listen, produce, learn, verify, or explore the public systems."
        >
          <div className="solution-menu-grid">
            {solutionGroups.map((group) => (
              <section key={group.id}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <NodeList nodes={group.nodes} />
              </section>
            ))}
          </div>
        </MegaFrame>
      ) : (
        <MegaFrame {...frameCopy(active)}>
          <NodeList
            nodes={
              active === "ecosystem"
                ? ecosystemNodes
                : active === "knowledge"
                  ? knowledgeNodes
                  : active === "developers"
                    ? developerNodes
                    : active === "company"
                      ? companyNodes
                      : getNavigationSection(active)
            }
          />
        </MegaFrame>
      )}
    </div>
  );
}

function MegaFrame({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mega-menu-frame">
      <header>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      {children}
    </div>
  );
}

function NodeList({ nodes }: { nodes: EcosystemNode[] }) {
  return (
    <div className="mega-node-grid">
      {nodes.map((node) => (
        <a className="mega-node" href={node.href} key={`${node.id}-${node.href}`}>
          <span className="mega-node-icon" aria-hidden="true">
            {node.title.slice(0, 1)}
          </span>
          <span>
            <strong>{node.title}</strong>
            <small>{node.description}</small>
            <em>{node.tags.slice(0, 3).join(" · ")}</em>
          </span>
          <b className={`nav-status nav-status-${node.status}`}>{statusLabel(node.status)}</b>
        </a>
      ))}
    </div>
  );
}

function frameCopy(active: string) {
  if (active === "knowledge") {
    return {
      eyebrow: "Knowledge explorer",
      title: "Scripts, articles, and learning paths.",
      description: "Start with readable content and script exploration."
    };
  }
  if (active === "developers") {
    return {
      eyebrow: "Developer links",
      title: "API health, status, docs, and source.",
      description: "Useful links for builders and operators."
    };
  }
  if (active === "company") {
    return {
      eyebrow: "Company and trust",
      title: "Mission, contact, legal, security, and press surfaces.",
      description: "The human-facing layer for consent, legitimacy, and communication."
    };
  }
  return {
    eyebrow: "Ecosystem",
    title: "The main places you can use.",
    description: "Navigate sound, production, scripts, apps, proof, and status."
  };
}
