import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type VisionAnalyzerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function VisionAnalyzer(props:VisionAnalyzerProps) { return <ToolSurface toolId="TOOL.VISION_ANALYZER" name="Vision Analyzer" {...props} />; }
