import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ToolBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ToolBrowser(props:ToolBrowserProps) { return <ToolSurface toolId="TOOL.TOOL_BROWSER" name="Tool Browser" {...props} />; }
