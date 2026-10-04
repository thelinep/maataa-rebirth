import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type LoopEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function LoopEditor(props:LoopEditorProps) { return <ToolSurface toolId="TOOL.LOOP_EDITOR" name="Loop Editor" {...props} />; }
