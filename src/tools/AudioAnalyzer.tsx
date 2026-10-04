import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AudioAnalyzerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AudioAnalyzer(props:AudioAnalyzerProps) { return <ToolSurface toolId="TOOL.AUDIO_ANALYZER" name="Audio Analyzer" {...props} />; }
