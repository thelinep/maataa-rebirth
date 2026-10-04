import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type MAATAAAIGovernanceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function MAATAAAIGovernance(props:MAATAAAIGovernanceProps) { return <AISpaceSurface spaceId="AI_SPACE.MAATAA_AI_GOVERNANCE" name="MAATAA AI Governance" {...props} />; }
