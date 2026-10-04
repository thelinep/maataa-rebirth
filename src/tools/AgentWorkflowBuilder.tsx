import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentWorkflowBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentWorkflowBuilder(props:AgentWorkflowBuilderProps) { return <ToolSurface toolId="TOOL.AGENT_WORKFLOW_BUILDER" name="Agent Workflow Builder" {...props} />; }
