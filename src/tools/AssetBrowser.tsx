import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AssetBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AssetBrowser(props:AssetBrowserProps) { return <ToolSurface toolId="TOOL.ASSET_BROWSER" name="Asset Browser" {...props} />; }
