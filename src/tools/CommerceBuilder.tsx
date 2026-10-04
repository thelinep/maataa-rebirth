import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type CommerceBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function CommerceBuilder(props:CommerceBuilderProps) { return <ToolSurface toolId="TOOL.COMMERCE_BUILDER" name="Commerce Builder" {...props} />; }
