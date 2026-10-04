import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIEventAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIEventAssistant(props:AIEventAssistantProps) { return <ToolSurface toolId="TOOL.AI_EVENT_ASSISTANT" name="AI Event Assistant" {...props} />; }
