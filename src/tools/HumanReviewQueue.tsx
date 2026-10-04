import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type HumanReviewQueueProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function HumanReviewQueue(props:HumanReviewQueueProps) { return <ToolSurface toolId="TOOL.HUMAN_REVIEW_QUEUE" name="Human Review Queue" {...props} />; }
