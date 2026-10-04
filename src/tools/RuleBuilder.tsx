import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RuleBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RuleBuilder(props:RuleBuilderProps) { return <ToolSurface toolId="TOOL.RULE_BUILDER" name="Rule Builder" {...props} />; }
