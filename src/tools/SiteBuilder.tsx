import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SiteBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SiteBuilder(props:SiteBuilderProps) { return <ToolSurface toolId="TOOL.SITE_BUILDER" name="Site Builder" {...props} />; }
