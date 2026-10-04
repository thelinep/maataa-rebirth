import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FunctionSchemaEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FunctionSchemaEditor(props:FunctionSchemaEditorProps) { return <ToolSurface toolId="TOOL.FUNCTION_SCHEMA_EDITOR" name="Function Schema Editor" {...props} />; }
