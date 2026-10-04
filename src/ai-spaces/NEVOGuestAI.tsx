import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type NEVOGuestAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function NEVOGuestAI(props:NEVOGuestAIProps) { return <AISpaceSurface spaceId="AI_SPACE.NEVO_GUEST_AI" name="NEVO Guest AI" {...props} />; }
