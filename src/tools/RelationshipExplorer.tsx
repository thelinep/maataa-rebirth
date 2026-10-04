import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RelationshipExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RelationshipExplorer(props:RelationshipExplorerProps) { return <ToolSurface toolId="TOOL.RELATIONSHIP_EXPLORER" name="Relationship Explorer" {...props} />; }
