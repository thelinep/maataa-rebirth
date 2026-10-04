import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataBrowser(props:DataBrowserProps) { return <ToolSurface toolId="TOOL.DATA_BROWSER" name="Data Browser" {...props} />; }
