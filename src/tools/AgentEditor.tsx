import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentEditor(props:AgentEditorProps) { return <ToolSurface toolId="TOOL.AGENT_EDITOR" name="Agent Editor" {...props} />; }
