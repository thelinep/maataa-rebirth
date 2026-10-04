import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RedactionToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RedactionTool(props:RedactionToolProps) { return <ToolSurface toolId="TOOL.REDACTION_TOOL" name="Redaction Tool" {...props} />; }
