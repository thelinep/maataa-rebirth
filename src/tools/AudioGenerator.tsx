import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AudioGeneratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AudioGenerator(props:AudioGeneratorProps) { return <ToolSurface toolId="TOOL.AUDIO_GENERATOR" name="Audio Generator" {...props} />; }
