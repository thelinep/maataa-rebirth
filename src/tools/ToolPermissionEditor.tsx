import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolPermissionEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolPermissionEditor(props:ToolPermissionEditorProps) { return <ToolSurface toolId="TOOL.TOOL_PERMISSION_EDITOR" name="Tool Permission Editor" {...props} />; }
