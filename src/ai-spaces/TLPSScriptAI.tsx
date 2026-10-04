import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type TLPSScriptAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function TLPSScriptAI(props:TLPSScriptAIProps) { return <AISpaceSurface spaceId="AI_SPACE.TLPS_SCRIPT_AI" name="TLPS Script AI" {...props} />; }
