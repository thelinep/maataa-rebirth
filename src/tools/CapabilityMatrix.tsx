import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CapabilityMatrixProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CapabilityMatrix(props:CapabilityMatrixProps) { return <ToolSurface toolId="TOOL.CAPABILITY_MATRIX" name="Capability Matrix" {...props} />; }
