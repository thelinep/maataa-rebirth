import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIAudioStudioProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIAudioStudio(props:AIAudioStudioProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_AUDIO_STUDIO" name="AI Audio Studio" {...props} />; }
