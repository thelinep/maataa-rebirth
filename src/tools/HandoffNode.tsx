import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type HandoffNodeProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function HandoffNode(props:HandoffNodeProps) { return <ToolSurface toolId="TOOL.HANDOFF_NODE" name="Handoff Node" {...props} />; }
