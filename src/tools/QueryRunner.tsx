import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type QueryRunnerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function QueryRunner(props:QueryRunnerProps) { return <ToolSurface toolId="TOOL.QUERY_RUNNER" name="Query Runner" {...props} />; }
