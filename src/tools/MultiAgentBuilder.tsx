import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MultiAgentBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MultiAgentBuilder(props:MultiAgentBuilderProps) { return <ToolSurface toolId="TOOL.MULTI_AGENT_BUILDER" name="Multi-Agent Builder" {...props} />; }
