import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ScreenshotToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ScreenshotTool(props:ScreenshotToolProps) { return <ToolSurface toolId="TOOL.SCREENSHOT_TOOL" name="Screenshot Tool" {...props} />; }
