import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type WorkspaceBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function WorkspaceBuilder(props:WorkspaceBuilderProps) { return <ToolSurface toolId="TOOL.WORKSPACE_BUILDER" name="Workspace Builder" {...props} />; }
