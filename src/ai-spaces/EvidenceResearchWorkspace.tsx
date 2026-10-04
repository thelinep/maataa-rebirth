import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type EvidenceResearchWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function EvidenceResearchWorkspace(props:EvidenceResearchWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.EVIDENCE_RESEARCH_WORKSPACE" name="Evidence Research Workspace" {...props} />; }
