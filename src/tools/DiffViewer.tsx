import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DiffViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DiffViewer(props:DiffViewerProps) { return <ToolSurface toolId="TOOL.DIFF_VIEWER" name="Diff Viewer" {...props} />; }
