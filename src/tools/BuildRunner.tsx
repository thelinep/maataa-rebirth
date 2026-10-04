import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type BuildRunnerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function BuildRunner(props:BuildRunnerProps) { return <ToolSurface toolId="TOOL.BUILD_RUNNER" name="Build Runner" {...props} />; }
