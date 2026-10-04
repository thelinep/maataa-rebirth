import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CodeEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CodeEditor(props:CodeEditorProps) { return <ToolSurface toolId="TOOL.CODE_EDITOR" name="Code Editor" {...props} />; }
