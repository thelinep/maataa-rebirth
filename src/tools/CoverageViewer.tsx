import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CoverageViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CoverageViewer(props:CoverageViewerProps) { return <ToolSurface toolId="TOOL.COVERAGE_VIEWER" name="Coverage Viewer" {...props} />; }
