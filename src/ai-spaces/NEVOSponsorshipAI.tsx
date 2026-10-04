import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type NEVOSponsorshipAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function NEVOSponsorshipAI(props:NEVOSponsorshipAIProps) { return <AISpaceSurface spaceId="AI_SPACE.NEVO_SPONSORSHIP_AI" name="NEVO Sponsorship AI" {...props} />; }
