import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CommandRunnerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CommandRunner(props:CommandRunnerProps) { return <ToolSurface toolId="TOOL.COMMAND_RUNNER" name="Command Runner" {...props} />; }
