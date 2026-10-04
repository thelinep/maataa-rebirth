import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIProductAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIProductAssistant(props:AIProductAssistantProps) { return <ToolSurface toolId="TOOL.AI_PRODUCT_ASSISTANT" name="AI Product Assistant" {...props} />; }
