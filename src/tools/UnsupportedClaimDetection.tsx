import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type UnsupportedClaimDetectionProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function UnsupportedClaimDetection(props:UnsupportedClaimDetectionProps) { return <ToolSurface toolId="TOOL.UNSUPPORTED_CLAIM_DETECTION" name="Unsupported Claim Detection" {...props} />; }
