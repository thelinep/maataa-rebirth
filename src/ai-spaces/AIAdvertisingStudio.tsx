import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIAdvertisingStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIAdvertisingStudio(props:AIAdvertisingStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_ADVERTISING_STUDIO" name="AI Advertising Studio" {...props} />; }
