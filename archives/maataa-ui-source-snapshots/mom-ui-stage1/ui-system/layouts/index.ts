// @maataa/maataa-ui · layouts — barrel
export { default as CommandCenterLayout, meta as commandCenterLayoutMeta } from "./command-center.tsx";
export { default as ObservatoryLayout, meta as observatoryLayoutMeta } from "./observatory.tsx";
export { default as KnowledgeAtlasLayout, meta as knowledgeAtlasLayoutMeta } from "./knowledge-atlas.tsx";
export { default as MarketplaceLayout, meta as marketplaceLayoutMeta } from "./marketplace.tsx";
export { default as DealRoomLayout, meta as dealRoomLayoutMeta } from "./deal-room.tsx";
export { default as EvidenceVaultLayout, meta as evidenceVaultLayoutMeta } from "./evidence-vault.tsx";
export const LAYER = {
  name: "layouts",
  members: ["command-center", "observatory", "knowledge-atlas", "marketplace", "deal-room", "evidence-vault"]
} as const;
