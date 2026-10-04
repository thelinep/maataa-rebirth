import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ProjectContextViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ProjectContextViewer(props:ProjectContextViewerProps) { return <ToolSurface toolId="TOOL.PROJECT_CONTEXT_VIEWER" name="Project Context Viewer" {...props} />; }
