import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DatasetBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DatasetBrowser(props:DatasetBrowserProps) { return <ToolSurface toolId="TOOL.DATASET_BROWSER" name="Dataset Browser" {...props} />; }
