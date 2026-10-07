import type { EcosystemNode } from "@maataa/navigation";
import { domainNodes, ecosystemNodes, searchTargets } from "@maataa/navigation";
import { searchRuntime } from "@maataa/runtime-search";

export type MobileDockTab = {
  id: "home" | "ecosystem" | "domains" | "runtime" | "search";
  label: string;
  href?: string;
  mode?: "overlay" | "status" | "search";
};

export const mobileDockTabs: MobileDockTab[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "ecosystem", label: "Explore", mode: "overlay" },
  { id: "domains", label: "Domains", href: "/domains" },
  { id: "runtime", label: "Live", mode: "status" },
  { id: "search", label: "Search", mode: "search" }
];

export const mobileQuickActions: EcosystemNode[] = [
  node("radio"),
  node("digital-gurukul"),
  node("scripts"),
  node("maataa"),
  node("hemant-samwat"),
  node("status")
];

export const mobileEcosystemClusters = [
  {
    id: "live",
    title: "Live now",
    nodes: ecosystemNodes.filter((item) => item.status === "live")
  },
  {
    id: "knowledge",
    title: "Learn and explore",
    nodes: ecosystemNodes.filter((item) => ["digital-gurukul", "hemant-samwat", "scripts", "lipi", "proof"].includes(item.id))
  },
  {
    id: "domains",
    title: "Public domains",
    nodes: domainNodes
  }
];

export function mobileSearch(query: string, limit = 8): EcosystemNode[] {
  if (!query.trim()) return searchTargets.slice(0, limit);
  return searchRuntime(query, undefined, limit).map((item) => ({
    id: item.id,
    title: item.title,
    href: item.href,
    category: item.kind,
    status: item.status,
    description: item.description,
    tags: item.tags
  }));
}

function node(id: string): EcosystemNode {
  const found = ecosystemNodes.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Unknown mobile ecosystem node: ${id}`);
  }
  return found;
}
