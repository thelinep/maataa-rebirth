import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AdversarialTestToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AdversarialTestTool(props:AdversarialTestToolProps) { return <ToolSurface toolId="TOOL.ADVERSARIAL_TEST_TOOL" name="Adversarial Test Tool" {...props} />; }
