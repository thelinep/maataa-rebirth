import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIStrategyWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIStrategyWorkspace(props:AIStrategyWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_STRATEGY_WORKSPACE" name="AI Strategy Workspace" {...props} />; }
