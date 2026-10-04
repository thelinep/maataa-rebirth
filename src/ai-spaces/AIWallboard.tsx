import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIWallboardProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIWallboard(props:AIWallboardProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_WALLBOARD" name="AI Wallboard" {...props} />; }
