import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type LandingPageBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function LandingPageBuilder(props:LandingPageBuilderProps) { return <ToolSurface toolId="TOOL.LANDING_PAGE_BUILDER" name="Landing Page Builder" {...props} />; }
