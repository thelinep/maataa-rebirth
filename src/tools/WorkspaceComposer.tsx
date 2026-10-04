import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type WorkspaceComposerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function WorkspaceComposer(props:WorkspaceComposerProps) { return <ToolSurface toolId="TOOL.WORKSPACE_COMPOSER" name="Workspace Composer" {...props} />; }
