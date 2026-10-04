import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type IconEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function IconEditor(props:IconEditorProps) { return <ToolSurface toolId="TOOL.ICON_EDITOR" name="Icon Editor" {...props} />; }
