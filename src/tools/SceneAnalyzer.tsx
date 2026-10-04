import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SceneAnalyzerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SceneAnalyzer(props:SceneAnalyzerProps) { return <ToolSurface toolId="TOOL.SCENE_ANALYZER" name="Scene Analyzer" {...props} />; }
