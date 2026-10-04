import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ExceptionManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ExceptionManager(props:ExceptionManagerProps) { return <ToolSurface toolId="TOOL.EXCEPTION_MANAGER" name="Exception Manager" {...props} />; }
