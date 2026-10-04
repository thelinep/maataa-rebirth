import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type BranchManagerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function BranchManager(props:BranchManagerProps) { return <ToolSurface toolId="TOOL.BRANCH_MANAGER" name="Branch Manager" {...props} />; }
