import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SchemaBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SchemaBuilder(props:SchemaBuilderProps) { return <ToolSurface toolId="TOOL.SCHEMA_BUILDER" name="Schema Builder" {...props} />; }
