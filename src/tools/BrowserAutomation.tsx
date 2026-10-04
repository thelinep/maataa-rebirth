import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type BrowserAutomationProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function BrowserAutomation(props:BrowserAutomationProps) { return <ToolSurface toolId="TOOL.BROWSER_AUTOMATION" name="Browser Automation" {...props} />; }
