import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentModelSelectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentModelSelector(props:AgentModelSelectorProps) { return <ToolSurface toolId="TOOL.AGENT_MODEL_SELECTOR" name="Agent Model Selector" {...props} />; }
