import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentAccessPolicyProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentAccessPolicy(props:AgentAccessPolicyProps) { return <ToolSurface toolId="TOOL.AGENT_ACCESS_POLICY" name="Agent Access Policy" {...props} />; }
