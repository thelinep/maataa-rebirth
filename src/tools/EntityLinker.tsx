import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type EntityLinkerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function EntityLinker(props:EntityLinkerProps) { return <ToolSurface toolId="TOOL.ENTITY_LINKER" name="Entity Linker" {...props} />; }
