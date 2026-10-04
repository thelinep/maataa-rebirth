import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AICampaignStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AICampaignStudio(props:AICampaignStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_CAMPAIGN_STUDIO" name="AI Campaign Studio" {...props} />; }
