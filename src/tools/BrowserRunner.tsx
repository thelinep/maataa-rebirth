import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type BrowserRunnerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function BrowserRunner(props:BrowserRunnerProps) { return <ToolSurface toolId="TOOL.BROWSER_RUNNER" name="Browser Runner" {...props} />; }
