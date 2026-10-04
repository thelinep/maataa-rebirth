import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIProcurementWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIProcurementWorkspace(props:AIProcurementWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_PROCUREMENT_WORKSPACE" name="AI Procurement Workspace" {...props} />; }
