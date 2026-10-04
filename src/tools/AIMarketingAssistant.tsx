import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIMarketingAssistantProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIMarketingAssistant(props:AIMarketingAssistantProps) { return <ToolSurface toolId="TOOL.AI_MARKETING_ASSISTANT" name="AI Marketing Assistant" {...props} />; }
