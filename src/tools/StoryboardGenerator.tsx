import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type StoryboardGeneratorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function StoryboardGenerator(props:StoryboardGeneratorProps) { return <ToolSurface toolId="TOOL.STORYBOARD_GENERATOR" name="Storyboard Generator" {...props} />; }
