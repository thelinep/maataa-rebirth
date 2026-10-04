import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AICRMWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AICRMWorkspace(props:AICRMWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_CRM_WORKSPACE" name="AI CRM Workspace" {...props} />; }
