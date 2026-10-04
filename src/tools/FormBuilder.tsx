import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type FormBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function FormBuilder(props:FormBuilderProps) { return <ToolSurface toolId="TOOL.FORM_BUILDER" name="Form Builder" {...props} />; }
