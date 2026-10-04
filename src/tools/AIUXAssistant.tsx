import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIUXAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIUXAssistant(props:AIUXAssistantProps) { return <ToolSurface toolId="TOOL.AI_UX_ASSISTANT" name="AI UX Assistant" {...props} />; }
