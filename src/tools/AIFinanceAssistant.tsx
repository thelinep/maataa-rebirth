import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIFinanceAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIFinanceAssistant(props:AIFinanceAssistantProps) { return <ToolSurface toolId="TOOL.AI_FINANCE_ASSISTANT" name="AI Finance Assistant" {...props} />; }
