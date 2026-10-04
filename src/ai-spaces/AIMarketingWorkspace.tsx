import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIMarketingWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIMarketingWorkspace(props:AIMarketingWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_MARKETING_WORKSPACE" name="AI Marketing Workspace" {...props} />; }
