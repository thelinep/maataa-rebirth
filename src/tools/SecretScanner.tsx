import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type SecretScannerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function SecretScanner(props:SecretScannerProps) { return <ToolSurface toolId="TOOL.SECRET_SCANNER" name="Secret Scanner" {...props} />; }
