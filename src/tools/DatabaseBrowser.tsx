import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type DatabaseBrowserProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function DatabaseBrowser(props:DatabaseBrowserProps) { return <ToolSurface toolId="TOOL.DATABASE_BROWSER" name="Database Browser" {...props} />; }
