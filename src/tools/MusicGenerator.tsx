import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MusicGeneratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MusicGenerator(props:MusicGeneratorProps) { return <ToolSurface toolId="TOOL.MUSIC_GENERATOR" name="Music Generator" {...props} />; }
