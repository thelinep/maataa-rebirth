import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DatasetViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DatasetViewer(props:DatasetViewerProps) { return <ToolSurface toolId="TOOL.DATASET_VIEWER" name="Dataset Viewer" {...props} />; }
