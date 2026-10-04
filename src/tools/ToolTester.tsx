import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolTesterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolTester(props:ToolTesterProps) { return <ToolSurface toolId="TOOL.TOOL_TESTER" name="Tool Tester" {...props} />; }
