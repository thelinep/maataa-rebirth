import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type E2ERunnerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function E2ERunner(props:E2ERunnerProps) { return <ToolSurface toolId="TOOL.E2E_RUNNER" name="E2E Runner" {...props} />; }
