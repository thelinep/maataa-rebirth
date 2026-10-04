import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AISecurityReviewWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AISecurityReviewWorkspace(props:AISecurityReviewWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_SECURITY_REVIEW_WORKSPACE" name="AI Security Review Workspace" {...props} />; }
