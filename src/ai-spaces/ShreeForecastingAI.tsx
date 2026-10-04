import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type ShreeForecastingAIProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function ShreeForecastingAI(props:ShreeForecastingAIProps) { return <AISpaceSurface spaceId="AI_SPACE.SHREE_FORECASTING_AI" name="Shree Forecasting AI" {...props} />; }
