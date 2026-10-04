import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentDeploymentViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentDeploymentViewer(props:AgentDeploymentViewerProps) { return <ToolSurface toolId="TOOL.AGENT_DEPLOYMENT_VIEWER" name="Agent Deployment Viewer" {...props} />; }
