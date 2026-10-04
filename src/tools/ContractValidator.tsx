import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ContractValidatorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ContractValidator(props:ContractValidatorProps) { return <ToolSurface toolId="TOOL.CONTRACT_VALIDATOR" name="Contract Validator" {...props} />; }
