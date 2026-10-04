import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type BrowserAgentProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function BrowserAgent(props:BrowserAgentProps) { return <ToolSurface toolId="TOOL.BROWSER_AGENT" name="Browser Agent" {...props} />; }
