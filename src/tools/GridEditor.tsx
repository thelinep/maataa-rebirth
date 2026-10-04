import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type GridEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function GridEditor(props:GridEditorProps) { return <ToolSurface toolId="TOOL.GRID_EDITOR" name="Grid Editor" {...props} />; }
