import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MemoryEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MemoryEditor(props:MemoryEditorProps) { return <ToolSurface toolId="TOOL.MEMORY_EDITOR" name="Memory Editor" {...props} />; }
