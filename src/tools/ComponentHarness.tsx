import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ComponentHarnessProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ComponentHarness(props:ComponentHarnessProps) { return <ToolSurface toolId="TOOL.COMPONENT_HARNESS" name="Component Harness" {...props} />; }
