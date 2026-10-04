import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIDocumentationWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIDocumentationWorkspace(props:AIDocumentationWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_DOCUMENTATION_WORKSPACE" name="AI Documentation Workspace" {...props} />; }
