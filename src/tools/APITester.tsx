import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type APITesterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function APITester(props:APITesterProps) { return <ToolSurface toolId="TOOL.API_TESTER" name="API Tester" {...props} />; }
