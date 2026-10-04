import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AITestWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AITestWorkspace(props:AITestWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_TEST_WORKSPACE" name="AI Test Workspace" {...props} />; }
