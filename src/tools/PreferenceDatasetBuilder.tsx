import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PreferenceDatasetBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PreferenceDatasetBuilder(props:PreferenceDatasetBuilderProps) { return <ToolSurface toolId="TOOL.PREFERENCE_DATASET_BUILDER" name="Preference Dataset Builder" {...props} />; }
