import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type AIReviewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function AIReviewer(props:AIReviewerProps) { return <ToolSurface toolId="TOOL.AI_REVIEWER" name="AI Reviewer" {...props} />; }
