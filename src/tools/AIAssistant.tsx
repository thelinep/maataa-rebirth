import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIAssistant(props:AIAssistantProps) { return <ToolSurface toolId="TOOL.AI_ASSISTANT" name="AI Assistant" {...props} />; }
