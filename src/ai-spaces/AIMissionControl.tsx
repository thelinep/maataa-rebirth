import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIMissionControlProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIMissionControl(props:AIMissionControlProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_MISSION_CONTROL" name="AI Mission Control" {...props} />; }
