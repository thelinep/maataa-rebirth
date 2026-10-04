import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SQLEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SQLEditor(props:SQLEditorProps) { return <ToolSurface toolId="TOOL.SQL_EDITOR" name="SQL Editor" {...props} />; }
