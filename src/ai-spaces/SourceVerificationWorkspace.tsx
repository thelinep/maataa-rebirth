import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type SourceVerificationWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function SourceVerificationWorkspace(props:SourceVerificationWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.SOURCE_VERIFICATION_WORKSPACE" name="Source Verification Workspace" {...props} />; }
