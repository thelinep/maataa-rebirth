import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AILegalWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AILegalWorkspace(props:AILegalWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_LEGAL_WORKSPACE" name="AI Legal Workspace" {...props} />; }
