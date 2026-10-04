import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TypeCheckerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TypeChecker(props:TypeCheckerProps) { return <ToolSurface toolId="TOOL.TYPE_CHECKER" name="Type Checker" {...props} />; }
