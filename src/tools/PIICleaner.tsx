import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PIICleanerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PIICleaner(props:PIICleanerProps) { return <ToolSurface toolId="TOOL.PII_CLEANER" name="PII Cleaner" {...props} />; }
