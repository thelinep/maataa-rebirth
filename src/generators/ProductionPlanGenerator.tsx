import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ProductionPlanGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ProductionPlanGenerator(props:ProductionPlanGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PRODUCTION_PLAN_GENERATOR" name="Production Plan Generator" {...props} />; }
