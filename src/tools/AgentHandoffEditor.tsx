import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentHandoffEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentHandoffEditor(props:AgentHandoffEditorProps) { return <ToolSurface toolId="TOOL.AGENT_HANDOFF_EDITOR" name="Agent Handoff Editor" {...props} />; }
