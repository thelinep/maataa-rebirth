import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelVersionManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelVersionManager(props:ModelVersionManagerProps) { return <ToolSurface toolId="TOOL.MODEL_VERSION_MANAGER" name="Model Version Manager" {...props} />; }
