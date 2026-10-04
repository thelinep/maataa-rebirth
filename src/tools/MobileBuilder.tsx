import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type MobileBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function MobileBuilder(props:MobileBuilderProps) { return <ToolSurface toolId="TOOL.MOBILE_BUILDER" name="Mobile Builder" {...props} />; }
