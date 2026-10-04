import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SchemaEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SchemaEditor(props:SchemaEditorProps) { return <ToolSurface toolId="TOOL.SCHEMA_EDITOR" name="Schema Editor" {...props} />; }
