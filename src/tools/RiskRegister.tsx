import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type RiskRegisterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function RiskRegister(props:RiskRegisterProps) { return <ToolSurface toolId="TOOL.RISK_REGISTER" name="Risk Register" {...props} />; }
