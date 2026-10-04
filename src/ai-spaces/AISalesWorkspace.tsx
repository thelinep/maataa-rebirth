import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AISalesWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AISalesWorkspace(props:AISalesWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_SALES_WORKSPACE" name="AI Sales Workspace" {...props} />; }
