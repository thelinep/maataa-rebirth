import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type BundleAnalyzerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function BundleAnalyzer(props:BundleAnalyzerProps) { return <ToolSurface toolId="TOOL.BUNDLE_ANALYZER" name="Bundle Analyzer" {...props} />; }
