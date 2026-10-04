import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIReviewWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIReviewWorkspace(props:AIReviewWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_REVIEW_WORKSPACE" name="AI Review Workspace" {...props} />; }
