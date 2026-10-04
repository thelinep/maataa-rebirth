import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIHRWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIHRWorkspace(props:AIHRWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_HR_WORKSPACE" name="AI HR Workspace" {...props} />; }
