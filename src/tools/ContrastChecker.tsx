import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContrastCheckerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContrastChecker(props:ContrastCheckerProps) { return <ToolSurface toolId="TOOL.CONTRAST_CHECKER" name="Contrast Checker" {...props} />; }
