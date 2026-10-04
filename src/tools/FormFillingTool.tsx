import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FormFillingToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FormFillingTool(props:FormFillingToolProps) { return <ToolSurface toolId="TOOL.FORM_FILLING_TOOL" name="Form Filling Tool" {...props} />; }
