import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type VideoAnalyzerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function VideoAnalyzer(props:VideoAnalyzerProps) { return <ToolSurface toolId="TOOL.VIDEO_ANALYZER" name="Video Analyzer" {...props} />; }
