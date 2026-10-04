import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type BreakpointEditorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function BreakpointEditor(props:BreakpointEditorProps) { return <ToolSurface toolId="TOOL.BREAKPOINT_EDITOR" name="Breakpoint Editor" {...props} />; }
