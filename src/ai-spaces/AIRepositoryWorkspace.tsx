import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIRepositoryWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIRepositoryWorkspace(props:AIRepositoryWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_REPOSITORY_WORKSPACE" name="AI Repository Workspace" {...props} />; }
