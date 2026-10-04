import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DesktopAutomationProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DesktopAutomation(props:DesktopAutomationProps) { return <ToolSurface toolId="TOOL.DESKTOP_AUTOMATION" name="Desktop Automation" {...props} />; }
