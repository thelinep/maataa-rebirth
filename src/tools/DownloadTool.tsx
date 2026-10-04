import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DownloadToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DownloadTool(props:DownloadToolProps) { return <ToolSurface toolId="TOOL.DOWNLOAD_TOOL" name="Download Tool" {...props} />; }
