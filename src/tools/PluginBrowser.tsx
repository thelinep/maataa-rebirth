import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PluginBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PluginBrowser(props:PluginBrowserProps) { return <ToolSurface toolId="TOOL.PLUGIN_BROWSER" name="Plugin Browser" {...props} />; }
