import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type GuardrailTesterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function GuardrailTester(props:GuardrailTesterProps) { return <ToolSurface toolId="TOOL.GUARDRAIL_TESTER" name="Guardrail Tester" {...props} />; }
