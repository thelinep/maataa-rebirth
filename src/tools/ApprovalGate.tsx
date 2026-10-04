import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ApprovalGateProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ApprovalGate(props:ApprovalGateProps) { return <ToolSurface toolId="TOOL.APPROVAL_GATE" name="Approval Gate" {...props} />; }
