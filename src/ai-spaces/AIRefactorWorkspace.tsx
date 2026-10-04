import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIRefactorWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIRefactorWorkspace(props:AIRefactorWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_REFACTOR_WORKSPACE" name="AI Refactor Workspace" {...props} />; }
