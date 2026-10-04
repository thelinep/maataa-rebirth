import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContentPolicyViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContentPolicyViewer(props:ContentPolicyViewerProps) { return <ToolSurface toolId="TOOL.CONTENT_POLICY_VIEWER" name="Content Policy Viewer" {...props} />; }
