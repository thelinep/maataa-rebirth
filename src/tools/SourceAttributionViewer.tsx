import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SourceAttributionViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SourceAttributionViewer(props:SourceAttributionViewerProps) { return <ToolSurface toolId="TOOL.SOURCE_ATTRIBUTION_VIEWER" name="Source Attribution Viewer" {...props} />; }
