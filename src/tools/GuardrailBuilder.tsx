import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type GuardrailBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function GuardrailBuilder(props:GuardrailBuilderProps) { return <ToolSurface toolId="TOOL.GUARDRAIL_BUILDER" name="Guardrail Builder" {...props} />; }
