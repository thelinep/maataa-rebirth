import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ServiceRecommendationGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ServiceRecommendationGenerator(props:ServiceRecommendationGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SERVICE_RECOMMENDATION_GENERATOR" name="Service Recommendation Generator" {...props} />; }
