import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ModelAccessPolicyProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ModelAccessPolicy(props:ModelAccessPolicyProps) { return <ToolSurface toolId="TOOL.MODEL_ACCESS_POLICY" name="Model Access Policy" {...props} />; }
