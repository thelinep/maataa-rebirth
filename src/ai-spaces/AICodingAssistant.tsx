import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AICodingAssistantProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AICodingAssistant(props:AICodingAssistantProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_CODING_ASSISTANT" name="AI Coding Assistant" {...props} />; }
