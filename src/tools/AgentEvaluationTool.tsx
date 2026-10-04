import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentEvaluationToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentEvaluationTool(props:AgentEvaluationToolProps) { return <ToolSurface toolId="TOOL.AGENT_EVALUATION_TOOL" name="Agent Evaluation Tool" {...props} />; }
