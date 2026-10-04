import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIMigrationWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIMigrationWorkspace(props:AIMigrationWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_MIGRATION_WORKSPACE" name="AI Migration Workspace" {...props} />; }
