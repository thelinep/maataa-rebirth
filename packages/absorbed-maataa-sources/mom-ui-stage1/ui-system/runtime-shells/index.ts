// @maataa/maataa-ui · runtime-shells — barrel
export { default as HumanShell, meta as humanShellMeta } from "./human.tsx";
export { default as IdentityShell, meta as identityShellMeta } from "./identity.tsx";
export { default as CICShell, meta as cICShellMeta } from "./cic.tsx";
export { default as AIShell, meta as aIShellMeta } from "./ai.tsx";
export { default as KnowledgeShell, meta as knowledgeShellMeta } from "./knowledge.tsx";
export { default as HKDShell, meta as hKDShellMeta } from "./hkd.tsx";
export { default as TLPShell, meta as tLPShellMeta } from "./tlp.tsx";
export { default as InvestorHubShell, meta as investorHubShellMeta } from "./investor-hub.tsx";
export { default as CommerceShell, meta as commerceShellMeta } from "./commerce.tsx";
export const LAYER = {
  name: "runtime-shells",
  members: ["human", "identity", "cic", "ai", "knowledge", "hkd", "tlp", "investor-hub", "commerce"]
} as const;
