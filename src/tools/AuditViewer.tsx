import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AuditViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AuditViewer(props:AuditViewerProps) { return <ToolSurface toolId="TOOL.AUDIT_VIEWER" name="Audit Viewer" {...props} />; }
