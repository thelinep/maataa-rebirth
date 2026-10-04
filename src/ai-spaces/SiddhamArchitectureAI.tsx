import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type SiddhamArchitectureAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function SiddhamArchitectureAI(props:SiddhamArchitectureAIProps) { return <AISpaceSurface spaceId="AI_SPACE.SIDDHAM_ARCHITECTURE_AI" name="Siddham Architecture AI" {...props} />; }
