import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type PullRequestReviewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function PullRequestReviewer(props:PullRequestReviewerProps) { return <ToolSurface toolId="TOOL.PULL_REQUEST_REVIEWER" name="Pull Request Reviewer" {...props} />; }
