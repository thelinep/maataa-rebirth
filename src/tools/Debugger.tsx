import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DebuggerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function Debugger(props:DebuggerProps) { return <ToolSurface toolId="TOOL.DEBUGGER" name="Debugger" {...props} />; }
