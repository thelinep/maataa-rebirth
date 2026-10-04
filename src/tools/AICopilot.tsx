import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AICopilotProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AICopilot(props:AICopilotProps) { return <ToolSurface toolId="TOOL.AI_COPILOT" name="AI Copilot" {...props} />; }
