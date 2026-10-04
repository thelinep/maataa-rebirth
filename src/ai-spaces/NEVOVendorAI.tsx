import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type NEVOVendorAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function NEVOVendorAI(props:NEVOVendorAIProps) { return <AISpaceSurface spaceId="AI_SPACE.NEVO_VENDOR_AI" name="NEVO Vendor AI" {...props} />; }
