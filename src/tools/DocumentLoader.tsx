import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DocumentLoaderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DocumentLoader(props:DocumentLoaderProps) { return <ToolSurface toolId="TOOL.DOCUMENT_LOADER" name="Document Loader" {...props} />; }
