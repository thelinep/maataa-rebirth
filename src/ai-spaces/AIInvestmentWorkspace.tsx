import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIInvestmentWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIInvestmentWorkspace(props:AIInvestmentWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_INVESTMENT_WORKSPACE" name="AI Investment Workspace" {...props} />; }
