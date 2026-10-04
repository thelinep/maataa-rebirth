import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIFinanceWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIFinanceWorkspace(props:AIFinanceWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_FINANCE_WORKSPACE" name="AI Finance Workspace" {...props} />; }
