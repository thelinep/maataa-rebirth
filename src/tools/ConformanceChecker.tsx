import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ConformanceCheckerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ConformanceChecker(props:ConformanceCheckerProps) { return <ToolSurface toolId="TOOL.CONFORMANCE_CHECKER" name="Conformance Checker" {...props} />; }
