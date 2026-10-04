import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TemplateBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TemplateBrowser(props:TemplateBrowserProps) { return <ToolSurface toolId="TOOL.TEMPLATE_BROWSER" name="Template Browser" {...props} />; }
