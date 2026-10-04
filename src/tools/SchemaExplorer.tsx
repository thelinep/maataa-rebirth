import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SchemaExplorerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SchemaExplorer(props:SchemaExplorerProps) { return <ToolSurface toolId="TOOL.SCHEMA_EXPLORER" name="Schema Explorer" {...props} />; }
