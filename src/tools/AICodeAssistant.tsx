import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AICodeAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AICodeAssistant(props:AICodeAssistantProps) { return <ToolSurface toolId="TOOL.AI_CODE_ASSISTANT" name="AI Code Assistant" {...props} />; }
