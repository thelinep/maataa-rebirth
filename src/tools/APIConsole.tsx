import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type APIConsoleProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function APIConsole(props:APIConsoleProps) { return <ToolSurface toolId="TOOL.API_CONSOLE" name="API Console" {...props} />; }
