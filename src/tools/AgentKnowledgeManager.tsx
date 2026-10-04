import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentKnowledgeManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentKnowledgeManager(props:AgentKnowledgeManagerProps) { return <ToolSurface toolId="TOOL.AGENT_KNOWLEDGE_MANAGER" name="Agent Knowledge Manager" {...props} />; }
