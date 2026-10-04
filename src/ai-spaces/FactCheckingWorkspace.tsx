import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type FactCheckingWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function FactCheckingWorkspace(props:FactCheckingWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.FACT_CHECKING_WORKSPACE" name="Fact-Checking Workspace" {...props} />; }
