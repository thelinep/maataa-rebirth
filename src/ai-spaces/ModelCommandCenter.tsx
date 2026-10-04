import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type ModelCommandCenterProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function ModelCommandCenter(props:ModelCommandCenterProps) { return <AISpaceSurface spaceId="AI_SPACE.MODEL_COMMAND_CENTER" name="Model Command Center" {...props} />; }
