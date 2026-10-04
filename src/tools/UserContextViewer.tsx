import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type UserContextViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function UserContextViewer(props:UserContextViewerProps) { return <ToolSurface toolId="TOOL.USER_CONTEXT_VIEWER" name="User Context Viewer" {...props} />; }
