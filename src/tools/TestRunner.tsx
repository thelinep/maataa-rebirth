import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TestRunnerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TestRunner(props:TestRunnerProps) { return <ToolSurface toolId="TOOL.TEST_RUNNER" name="Test Runner" {...props} />; }
