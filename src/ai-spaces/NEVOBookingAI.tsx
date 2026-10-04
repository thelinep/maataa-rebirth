import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type NEVOBookingAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function NEVOBookingAI(props:NEVOBookingAIProps) { return <AISpaceSurface spaceId="AI_SPACE.NEVO_BOOKING_AI" name="NEVO Booking AI" {...props} />; }
