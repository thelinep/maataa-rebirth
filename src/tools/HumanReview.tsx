import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type HumanReviewProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function HumanReview(props:HumanReviewProps) { return <ToolSurface toolId="TOOL.HUMAN_REVIEW" name="Human Review" {...props} />; }
