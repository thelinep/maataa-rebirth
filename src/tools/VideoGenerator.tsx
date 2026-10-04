import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type VideoGeneratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function VideoGenerator(props:VideoGeneratorProps) { return <ToolSurface toolId="TOOL.VIDEO_GENERATOR" name="Video Generator" {...props} />; }
