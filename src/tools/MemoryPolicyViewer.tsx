import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MemoryPolicyViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MemoryPolicyViewer(props:MemoryPolicyViewerProps) { return <ToolSurface toolId="TOOL.MEMORY_POLICY_VIEWER" name="Memory Policy Viewer" {...props} />; }
