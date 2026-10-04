import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIProductionAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIProductionAssistant(props:AIProductionAssistantProps) { return <ToolSurface toolId="TOOL.AI_PRODUCTION_ASSISTANT" name="AI Production Assistant" {...props} />; }
