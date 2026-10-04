import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AIOperationsCenterProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AIOperationsCenter(props:AIOperationsCenterProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_OPERATIONS_CENTER" name="AI Operations Center" {...props} />; }
