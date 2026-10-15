import { WORKSPACE_TYPES } from "@maataa/ui/registries/workspaceRegistry";
import { TLPS_WORKSPACE_TYPES } from "../../apps/tlps/src/registries/workspaceRegistry";
import { createWorkspaceDataSlice, WORKSPACE_DOMAIN_BY_GROUP } from "../redux-demo/workspaceDataSlices";

export const ARTWORK_WORLDS = ["welcome", "creative", "operations", "data", "market", "people", "governance", "platform"] as const;
export type ArtworkWorld = (typeof ARTWORK_WORLDS)[number];
export type ArtworkFrame = { id: string; title: string; family: string; source: "MAATAA" | "TLPS" | "Support Center"; world: ArtworkWorld; summary: string; navigation: readonly string[]; samples: readonly string[]; boundary: string };
const domainWorld: Record<string, ArtworkWorld> = {
  personal: "welcome", learning: "welcome", support: "welcome", experiment: "creative",
  creative: "creative", document: "creative", marketing: "creative", production: "creative",
  project: "operations", event: "operations", booking: "operations", operations: "operations", location: "operations",
  analytics: "data", ai: "data", commerce: "market", finance: "market",
  team: "people", guest: "people", communication: "people", governance: "governance", developer: "platform", platform: "platform",
};

export const SUPPORT_ARTWORK_FRAMES: ArtworkFrame[] = [
  ["WELCOME", "Game UI Help", "welcome", "Find your next step", ["Theme setup", "Workplace demos", "Support guides"]],
  ["SEARCH", "Find a clear answer", "data", "Search the local guide library", ["Search by topic", "Filter the guides", "Read an answer"]],
  ["GUIDE", "Your field guide", "creative", "Learn the interface one step at a time", ["Read the steps", "Try the local demo", "Keep your notes"]],
  ["EMPTY", "A new path awaits", "operations", "No matching results in this visual concept", ["Try another phrase", "Clear the filters", "Explore all guides"]],
  ["REQUEST", "Prepare your handoff", "people", "Describe the help you need", ["Describe the issue", "Leave out secrets", "Review before saving"]],
  ["REVIEW", "Review before sharing", "governance", "Check your local support draft", ["Check the details", "Confirm the context", "Choose what to export"]],
  ["SAVED", "A handoff to keep", "market", "Your local draft has an export path", ["Copy the packet", "Download JSON", "Use an approved channel"]],
  ["ACCESSIBILITY", "A comfortable journey", "platform", "Keep focus, motion and contrast comfortable", ["Use the keyboard", "Reduce motion", "Check text contrast"]],
  ["HANDBOOK", "Arcade Quest handbook", "welcome", "Learn the interface and its illustrated world", ["Explore the eight worlds", "Understand local progress", "Choose comfortable controls"]],
  ["PLAYBOOK", "Arcade Quest playbook", "operations", "Follow a practical route from idea to handover", ["Choose your theme", "Rehearse your workflow", "Review and export"]],
  ["GUIDES", "Arcade Quest guides", "creative", "Find a reference for every next step", ["Theme and appearance", "Workspace and artwork", "Help and support"]],
  ["PAYMENTS", "Merchant payment setup", "market", "Real checkout requires a connected merchant provider", ["Choose provider and currency", "Configure server credentials", "Verify webhooks before launch"]],
].map(([id, title, world, summary, samples]) => ({
  id: `SUPPORT.${id}`, title: title as string, family: "Support Center frames", source: "Support Center", world: world as ArtworkWorld, summary: summary as string,
  navigation: ["Help", "Guides", "Local handoff"], samples: samples as string[], boundary: "Artwork concept with illustrative content. No ticket is submitted or external action performed.",
}));

export const WORKSPACE_ARTWORK_FRAMES: ArtworkFrame[] = [
  ...WORKSPACE_TYPES.map((workspace): ArtworkFrame => {
    const slice = createWorkspaceDataSlice(workspace);
    const domain = WORKSPACE_DOMAIN_BY_GROUP[workspace.groupKey];
    if (!domainWorld[domain]) throw new Error(`No artwork world for ${workspace.groupKey}`);
    return { id: workspace.id, title: workspace.name, family: workspace.groupLabel, source: "MAATAA", world: domainWorld[domain], summary: slice.summary, navigation: slice.navigation, samples: slice.sections.flatMap((section) => section.lines).filter((line) => line !== workspace.name).slice(0, 3), boundary: slice.boundary };
  }),
  ...TLPS_WORKSPACE_TYPES.map((workspace): ArtworkFrame => ({
    id: workspace.id, title: workspace.name, family: workspace.groupLabel, source: "TLPS", world: workspace.groupKey === "TLPS_PRODUCTION" ? "creative" : "people",
    summary: `A local planning concept for ${workspace.name.toLowerCase()}.`, navigation: ["Prepare", "Review", "Handover"], samples: ["Sample brief · draft", "Responsibilities · unconfirmed", "Handover · local rehearsal"], boundary: "Synthetic TLPS artwork frame. No casting, hiring, booking, payment or production approval.",
  })),
];
export const ARTWORK_FRAMES: ArtworkFrame[] = [...SUPPORT_ARTWORK_FRAMES, ...WORKSPACE_ARTWORK_FRAMES];
export function artworkAsset(world: ArtworkWorld) { return `./artwork/${world}.webp`; }
export function artworkFilename(frame: ArtworkFrame) { return `${frame.id.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.webp`; }
