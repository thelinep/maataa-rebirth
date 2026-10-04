import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContextEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContextEditor(props:ContextEditorProps) { return <ToolSurface toolId="TOOL.CONTEXT_EDITOR" name="Context Editor" {...props} />; }
