import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolSchemaEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolSchemaEditor(props:ToolSchemaEditorProps) { return <ToolSurface toolId="TOOL.TOOL_SCHEMA_EDITOR" name="Tool Schema Editor" {...props} />; }
