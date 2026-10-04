import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type IconBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function IconBrowser(props:IconBrowserProps) { return <ToolSurface toolId="TOOL.ICON_BROWSER" name="Icon Browser" {...props} />; }
