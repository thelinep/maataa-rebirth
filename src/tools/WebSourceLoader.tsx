import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type WebSourceLoaderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function WebSourceLoader(props:WebSourceLoaderProps) { return <ToolSurface toolId="TOOL.WEB_SOURCE_LOADER" name="Web Source Loader" {...props} />; }
