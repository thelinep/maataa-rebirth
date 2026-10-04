import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TerminalProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function Terminal(props:TerminalProps) { return <ToolSurface toolId="TOOL.TERMINAL" name="Terminal" {...props} />; }
