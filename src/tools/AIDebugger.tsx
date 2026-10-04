import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIDebuggerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIDebugger(props:AIDebuggerProps) { return <ToolSurface toolId="TOOL.AI_DEBUGGER" name="AI Debugger" {...props} />; }
