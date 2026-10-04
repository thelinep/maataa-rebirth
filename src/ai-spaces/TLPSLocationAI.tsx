import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type TLPSLocationAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function TLPSLocationAI(props:TLPSLocationAIProps) { return <AISpaceSurface spaceId="AI_SPACE.TLPS_LOCATION_AI" name="TLPS Location AI" {...props} />; }
