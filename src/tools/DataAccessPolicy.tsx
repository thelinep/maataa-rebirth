import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DataAccessPolicyProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DataAccessPolicy(props:DataAccessPolicyProps) { return <ToolSurface toolId="TOOL.DATA_ACCESS_POLICY" name="Data Access Policy" {...props} />; }
