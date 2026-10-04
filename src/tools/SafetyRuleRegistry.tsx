import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SafetyRuleRegistryProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SafetyRuleRegistry(props:SafetyRuleRegistryProps) { return <ToolSurface toolId="TOOL.SAFETY_RULE_REGISTRY" name="Safety Rule Registry" {...props} />; }
