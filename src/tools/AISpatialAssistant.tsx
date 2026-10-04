import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AISpatialAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AISpatialAssistant(props:AISpatialAssistantProps) { return <ToolSurface toolId="TOOL.AI_SPATIAL_ASSISTANT" name="AI Spatial Assistant" {...props} />; }
