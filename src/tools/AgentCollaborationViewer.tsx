import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AgentCollaborationViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AgentCollaborationViewer(props:AgentCollaborationViewerProps) { return <ToolSurface toolId="TOOL.AGENT_COLLABORATION_VIEWER" name="Agent Collaboration Viewer" {...props} />; }
