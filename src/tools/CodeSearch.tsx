import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CodeSearchProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CodeSearch(props:CodeSearchProps) { return <ToolSurface toolId="TOOL.CODE_SEARCH" name="Code Search" {...props} />; }
