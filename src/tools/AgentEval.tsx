import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentEvalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentEval(props:AgentEvalProps) { return <ToolSurface toolId="TOOL.AGENT_EVAL" name="Agent Eval" {...props} />; }
