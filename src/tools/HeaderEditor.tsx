import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type HeaderEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function HeaderEditor(props:HeaderEditorProps) { return <ToolSurface toolId="TOOL.HEADER_EDITOR" name="Header Editor" {...props} />; }
