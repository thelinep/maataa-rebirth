import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ApprovalNodeProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ApprovalNode(props:ApprovalNodeProps) { return <ToolSurface toolId="TOOL.APPROVAL_NODE" name="Approval Node" {...props} />; }
