import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type TrainTestSplitToolProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function TrainTestSplitTool(props:TrainTestSplitToolProps) { return <ToolSurface toolId="TOOL.TRAIN_TEST_SPLIT_TOOL" name="Train/Test Split Tool" {...props} />; }
