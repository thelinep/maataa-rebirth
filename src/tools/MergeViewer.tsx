import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MergeViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MergeViewer(props:MergeViewerProps) { return <ToolSurface toolId="TOOL.MERGE_VIEWER" name="Merge Viewer" {...props} />; }
