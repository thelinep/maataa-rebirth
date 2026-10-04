import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AITestAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AITestAssistant(props:AITestAssistantProps) { return <ToolSurface toolId="TOOL.AI_TEST_ASSISTANT" name="AI Test Assistant" {...props} />; }
