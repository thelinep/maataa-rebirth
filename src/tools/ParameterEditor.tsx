import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ParameterEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ParameterEditor(props:ParameterEditorProps) { return <ToolSurface toolId="TOOL.PARAMETER_EDITOR" name="Parameter Editor" {...props} />; }
