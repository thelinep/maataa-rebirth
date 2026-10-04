import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FileSourceLoaderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FileSourceLoader(props:FileSourceLoaderProps) { return <ToolSurface toolId="TOOL.FILE_SOURCE_LOADER" name="File Source Loader" {...props} />; }
