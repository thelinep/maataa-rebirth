import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentPromptManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentPromptManager(props:AgentPromptManagerProps) { return <ToolSurface toolId="TOOL.AGENT_PROMPT_MANAGER" name="Agent Prompt Manager" {...props} />; }
