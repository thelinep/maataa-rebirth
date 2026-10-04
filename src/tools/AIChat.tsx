import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIChatProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIChat(props:AIChatProps) { return <ToolSurface toolId="TOOL.AI_CHAT" name="AI Chat" {...props} />; }
