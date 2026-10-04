import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MockServerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MockServer(props:MockServerProps) { return <ToolSurface toolId="TOOL.MOCK_SERVER" name="Mock Server" {...props} />; }
