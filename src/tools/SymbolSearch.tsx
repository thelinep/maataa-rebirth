import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SymbolSearchProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SymbolSearch(props:SymbolSearchProps) { return <ToolSurface toolId="TOOL.SYMBOL_SEARCH" name="Symbol Search" {...props} />; }
